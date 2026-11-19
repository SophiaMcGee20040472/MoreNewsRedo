import type { FeedType, MNItem, PollOption } from "./types";

const BASE = "https://hacker-news.firebaseio.com/v0";

export const ENDPOINTS: Record<FeedType, string> = {
  top: `${BASE}/topstories.json`,
  new: `${BASE}/newstories.json`,
  best: `${BASE}/beststories.json`,
  ask: `${BASE}/askstories.json`,
  show: `${BASE}/showstories.json`,
  jobs: `${BASE}/jobstories.json`,
  polls: `${BASE}/pollstories.json`,
};

export const PAGE_BATCH_SIZE = 10;
const MAX_CONCURRENT_REQUESTS = 10;

async function getJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Hacker News API error (${response.status}).`);
  }

  return response.json() as Promise<T>;
}

export async function fetchFeedIds(
  feed: FeedType,
  signal?: AbortSignal,
): Promise<number[]> {
  const data = await getJson<unknown>(ENDPOINTS[feed], signal);

  if (!Array.isArray(data)) {
    throw new Error("The API returned an invalid story list.");
  }

  return data.filter((id): id is number => typeof id === "number");
}

async function fetchPollOptions(
  ids: number[],
  signal?: AbortSignal,
): Promise<PollOption[]> {
  const results = await Promise.all(
    ids.map(async (id): Promise<PollOption | null> => {
      try {
        const option = await getJson<MNItem>(`${BASE}/item/${id}.json`, signal);

        if (!option || option.deleted || option.dead) {
          return null;
        }

        return {
          id: option.id,
          text: option.text,
          score: option.score ?? 0,
        };
      } catch (error) {
        if (signal?.aborted) {
          throw error;
        }

        return null;
      }
    }),
  );

  return results.filter((item): item is PollOption => item !== null);
}

export async function fetchItem(
  id: number,
  signal?: AbortSignal,
): Promise<MNItem | null> {
  let item: MNItem | null;

  try {
    item = await getJson<MNItem | null>(`${BASE}/item/${id}.json`, signal);
  } catch (error) {
    if (signal?.aborted) {
      throw error;
    }

    if (error instanceof Error && /API error \(404\)/.test(error.message)) {
      return null;
    }

    throw error;
  }

  if (!item || item.deleted || item.dead) {
    return null;
  }

  if (item.type === "poll" && item.parts?.length) {
    item.pollOptions = await fetchPollOptions(item.parts, signal);
  }

  return item;
}

export async function fetchItems(
  ids: number[],
  signal?: AbortSignal,
  onItem?: (item: MNItem) => void,
): Promise<MNItem[]> {
  if (ids.length === 0) {
    return [];
  }

  if (signal?.aborted) {
    throw new DOMException("Aborted", "AbortError");
  }

  const results: Array<MNItem | null> = new Array(ids.length).fill(null);

  let nextIndex = 0;

  async function worker() {
    while (true) {
      if (signal?.aborted) {
        throw new DOMException("Aborted", "AbortError");
      }

      const index = nextIndex++;

      if (index >= ids.length) {
        return;
      }

      const item = await fetchItem(ids[index], signal);

      results[index] = item;

      if (item) {
        onItem?.(item);
      }
    }
  }

  const workerCount = Math.min(MAX_CONCURRENT_REQUESTS, ids.length);

  await Promise.all(Array.from({ length: workerCount }, () => worker()));

  return results.filter((item): item is MNItem => item !== null);
}

export function formatTime(timestamp = 0): string {
  if (!timestamp) {
    return "Time unavailable";
  }

  const seconds = Math.max(0, Math.floor(Date.now() / 1000 - timestamp));

  if (seconds < 60) {
    return "Just now";
  }

  if (seconds < 3600) {
    return `${Math.floor(seconds / 60)}m ago`;
  }

  if (seconds < 86400) {
    return `${Math.floor(seconds / 3600)}h ago`;
  }

  if (seconds < 30 * 86400) {
    return `${Math.floor(seconds / 86400)}d ago`;
  }

  return new Date(timestamp * 1000).toLocaleDateString();
}

export function getDomain(url?: string): string {
  if (!url) {
    return "news.ycombinator.com";
  }

  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "news.ycombinator.com";
  }
}
