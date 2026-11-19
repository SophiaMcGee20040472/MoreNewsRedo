import { useCallback, useEffect, useRef, useState } from "react";
import { fetchFeedIds, fetchItems, PAGE_BATCH_SIZE } from "../api";
import type { FeedType, MNItem } from "../types";

export function useFeed(feed: FeedType) {
  const [items, setItems] = useState<MNItem[]>([]);
  const [ids, setIds] = useState<number[]>([]);
  const [nextIndex, setNextIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const controllerRef = useRef<AbortController | null>(null);
  const generationRef = useRef(0);
  const loadingMoreRef = useRef(false);

  const addItem = useCallback((item: MNItem) => {
    setItems((currentItems) => {
      if (currentItems.some((existing) => existing.id === item.id)) {
        return currentItems;
      }

      return [...currentItems, item];
    });
  }, []);

  useEffect(() => {
    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    const currentGeneration = ++generationRef.current;

    loadingMoreRef.current = false;

    setItems([]);
    setIds([]);
    setNextIndex(0);
    setLoading(true);
    setLoadingMore(false);
    setError(null);

    async function loadInitialFeed() {
      let firstItemReceived = false;

      try {
        const feedIds = await fetchFeedIds(feed, controller.signal);

        if (
          controller.signal.aborted ||
          currentGeneration !== generationRef.current
        ) {
          return;
        }

        setIds(feedIds);

        const initialIds = feedIds.slice(0, PAGE_BATCH_SIZE);

        if (initialIds.length === 0) {
          return;
        }

        await fetchItems(initialIds, controller.signal, (item) => {
          if (
            controller.signal.aborted ||
            currentGeneration !== generationRef.current
          ) {
            return;
          }

          addItem(item);

          if (!firstItemReceived) {
            firstItemReceived = true;
            setLoading(false);
            setLoadingMore(true);
          }
        });

        if (
          controller.signal.aborted ||
          currentGeneration !== generationRef.current
        ) {
          return;
        }

        setNextIndex(initialIds.length);
      } catch (err) {
        if (
          !controller.signal.aborted &&
          currentGeneration === generationRef.current
        ) {
          setError(
            err instanceof Error ? err.message : "Unable to load this feed.",
          );
        }
      } finally {
        if (
          !controller.signal.aborted &&
          currentGeneration === generationRef.current
        ) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    }

    void loadInitialFeed();

    return () => {
      controller.abort();
    };
  }, [feed, refreshKey, addItem]);

  const loadMore = useCallback(async (): Promise<boolean> => {
    if (
      loadingMoreRef.current ||
      loading ||
      loadingMore ||
      nextIndex >= ids.length
    ) {
      return false;
    }

    const controller = controllerRef.current;

    if (!controller || controller.signal.aborted) {
      return false;
    }

    const currentGeneration = generationRef.current;

    const batchIds = ids.slice(nextIndex, nextIndex + PAGE_BATCH_SIZE);

    if (batchIds.length === 0) {
      return false;
    }

    loadingMoreRef.current = true;
    setLoadingMore(true);
    setError(null);

    try {
      const batch = await fetchItems(batchIds, controller.signal, (item) => {
        if (
          !controller.signal.aborted &&
          currentGeneration === generationRef.current
        ) {
          addItem(item);
        }
      });

      if (
        controller.signal.aborted ||
        currentGeneration !== generationRef.current
      ) {
        return false;
      }

      if (batch.length === 0) {
        throw new Error(
          "No stories could be loaded from this batch. Please try again.",
        );
      }

      setNextIndex((currentIndex) => currentIndex + batchIds.length);

      return true;
    } catch (err) {
      if (
        !controller.signal.aborted &&
        currentGeneration === generationRef.current
      ) {
        setError(
          err instanceof Error ? err.message : "Unable to load more stories.",
        );
      }

      return false;
    } finally {
      if (currentGeneration === generationRef.current) {
        loadingMoreRef.current = false;
        setLoadingMore(false);
      }
    }
  }, [ids, loading, loadingMore, nextIndex, addItem]);

  const refresh = useCallback(() => {
    setRefreshKey((current) => current + 1);
  }, []);

  const hasMore = nextIndex < ids.length;

  return {
    items,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    refresh,
  };
}
