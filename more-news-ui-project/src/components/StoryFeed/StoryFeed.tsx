import { useEffect, useMemo, useState } from "react";

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

import { RepeatIcon } from "@chakra-ui/icons";

import SpinLoader from "../SpinLoader";
import { useFeed } from "../../hooks/useFeed";
import type { FeedType, MNItem, SortType } from "../../types";
import FeedTabs from "../FeedTabs/FeedTabs";
import StoryCard from "../StoryCard/StoryCard";
import { storyFeedStyles as styles } from "./StoryFeed.styles";

const PAGE_SIZE = 10;

const meta: Record<
  FeedType,
  {
    eyebrow: string;
    title: string;
    description: string;
    defaultSort: SortType;
    sorts: { value: SortType; label: string }[];
  }
> = {
  top: {
    eyebrow: "MORE NEWS / TOP",
    title: "Top Posts",
    description: "The stories the community is talking about right now.",
    defaultSort: "score",
    sorts: [
      { value: "score", label: "Highest score" },
      { value: "comments", label: "Most comments" },
      { value: "newest", label: "Newest" },
    ],
  },
  new: {
    eyebrow: "MORE NEWS / NEW",
    title: "Latest Posts",
    description: "Fresh submissions from the More News community.",
    defaultSort: "newest",
    sorts: [
      { value: "newest", label: "Newest first" },
      { value: "oldest", label: "Oldest first" },
      { value: "score", label: "Highest score" },
    ],
  },
  best: {
    eyebrow: "MORE NEWS / BEST",
    title: "Best Stories",
    description: "Highly rated stories from across More News.",
    defaultSort: "score",
    sorts: [
      { value: "score", label: "Highest score" },
      { value: "comments", label: "Most comments" },
      { value: "newest", label: "Newest" },
    ],
  },
  ask: {
    eyebrow: "MORE NEWS / ASK",
    title: "Ask MN",
    description:
      "Questions, advice and thoughtful conversations from the community.",
    defaultSort: "newest",
    sorts: [
      { value: "newest", label: "Newest first" },
      { value: "comments", label: "Most comments" },
      { value: "score", label: "Highest score" },
    ],
  },
  show: {
    eyebrow: "MORE NEWS / SHOW",
    title: "Show MN",
    description: "Products, experiments and projects shared by their makers.",
    defaultSort: "newest",
    sorts: [
      { value: "newest", label: "Newest first" },
      { value: "score", label: "Highest score" },
      { value: "comments", label: "Most comments" },
    ],
  },
  jobs: {
    eyebrow: "MORE NEWS / JOBS",
    title: "Who is Hiring?",
    description:
      "Opportunities posted by companies in the More News community.",
    defaultSort: "newest",
    sorts: [
      { value: "newest", label: "Newest first" },
      { value: "oldest", label: "Oldest first" },
    ],
  },
  polls: {
    eyebrow: "MORE NEWS / POLLS",
    title: "Community Polls",
    description: "Community polls and their current vote counts.",
    defaultSort: "newest",
    sorts: [
      { value: "newest", label: "Newest first" },
      { value: "score", label: "Highest score" },
      { value: "comments", label: "Most comments" },
    ],
  },
};

function sortItems(items: MNItem[], sort: SortType) {
  return [...items].sort((a, b) => {
    if (sort === "score") {
      return (b.score ?? 0) - (a.score ?? 0);
    }

    if (sort === "comments") {
      return (b.descendants ?? 0) - (a.descendants ?? 0);
    }

    if (sort === "oldest") {
      return (a.time ?? 0) - (b.time ?? 0);
    }

    return (b.time ?? 0) - (a.time ?? 0);
  });
}

export default function StoryFeed() {
  const [feed, setFeed] = useState<FeedType>("new");
  const [sort, setSort] = useState<SortType>("newest");
  const [page, setPage] = useState(1);

  const { items, loading, loadingMore, error, hasMore, loadMore, refresh } =
    useFeed(feed);

  const config = meta[feed];

  useEffect(() => {
    setSort(config.defaultSort);
    setPage(1);
  }, [feed]);

  const sorted = useMemo(() => sortItems(items, sort), [items, sort]);

  const pages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));

  const currentPage = Math.min(page, pages);

  const shown = sorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const totalLoaded = items.length;

  async function nextPage() {
    if (loadingMore) {
      return;
    }

    if (currentPage < pages) {
      setPage(currentPage + 1);
      return;
    }

    if (hasMore) {
      const loaded = await loadMore();

      if (loaded) {
        setPage(currentPage + 1);
      }
    }
  }

  function changeFeed(next: FeedType) {
    if (next === feed) {
      return;
    }

    setFeed(next);
    setPage(1);
  }

  return (
    <Box sx={styles.page}>
      <FeedTabs value={feed} onChange={changeFeed} />
      <Flex sx={styles.header}>
        <Box>
          <Text sx={styles.eyebrow}>{config.eyebrow}</Text>

          <Heading as="h1" sx={styles.title}>
            {config.title}
          </Heading>

          <Text sx={styles.description}>{config.description}</Text>
        </Box>
        <HStack sx={styles.sortControls}>
          <FormControl display="flex" alignItems="center" width="auto" gap={2}>
            <FormLabel htmlFor="story-sort" sx={styles.sortLabel} mb={0}>
              Sort by
            </FormLabel>

            <Select
              id="story-sort"
              name="story-sort"
              value={sort}
              onChange={(event) => {
                setSort(event.target.value as SortType);
                setPage(1);
              }}
              sx={styles.sortSelect}
              size="md"
            >
              {config.sorts.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormControl>

          <Button
            aria-label="Refresh feed"
            title="Refresh feed"
            variant="outline"
            colorScheme="orange"
            onClick={() => {
              setPage(1);
              refresh();
            }}
          >
            <RepeatIcon aria-hidden="true" />
          </Button>
        </HStack>
      </Flex>

      {error && (
        <Alert status="error" sx={styles.errorAlert}>
          <AlertIcon aria-hidden="true" />
          <Box sx={styles.errorMessage}>{error}</Box>
          <Button size="sm" onClick={refresh}>
            Retry
          </Button>
        </Alert>
      )}
      {loading && items.length === 0 ? (
        <SpinLoader />
      ) : shown.length === 0 ? (
        <Box sx={styles.emptyState}>
          <Heading as="h2" size="md" sx={styles.emptyTitle}>
            Nothing to show just yet
          </Heading>
          <Text sx={styles.emptyDescription}>
            Try refreshing this feed in a moment.
          </Text>
        </Box>
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, xl: 2 }} sx={styles.storyGrid}>
            {shown.map((item, index) => (
              <StoryCard
                key={item.id}
                item={item}
                rank={(currentPage - 1) * PAGE_SIZE + index + 1}
                feed={feed}
              />
            ))}
          </SimpleGrid>
          {loadingMore && (
            <Flex justify="center" py={5} role="status" aria-live="polite">
              <Text color="gray.300" fontSize="sm">
                Loading more stories...
              </Text>
            </Flex>
          )}
        </>
      )}
      {!loading && (
        <Stack sx={styles.pagination}>
          <HStack
            as="nav"
            aria-label="Story pagination"
            sx={styles.paginationControls}
          >
            <Button
              size="sm"
              variant="solid"
              colorScheme="orange"
              aria-label="Go to previous page"
              onClick={() => {
                setPage((previous) => Math.max(1, previous - 1));
              }}
              isDisabled={currentPage === 1}
            >
              ← Prev
            </Button>
            {Array.from({ length: pages }, (_, index) => index + 1)
              .filter(
                (pageNumber) =>
                  pageNumber === 1 ||
                  pageNumber === pages ||
                  Math.abs(pageNumber - currentPage) <= 1,
              )
              .map((pageNumber, index, visible) => (
                <Box key={pageNumber} display="contents">
                  {index > 0 && pageNumber - visible[index - 1] > 1 && (
                    <Text as="span" aria-hidden="true" sx={styles.pageEllipsis}>
                      …
                    </Text>
                  )}
                  <Button
                    size="sm"
                    variant={pageNumber === currentPage ? "solid" : "outline"}
                    colorScheme={pageNumber === currentPage ? "orange" : "blue"}
                    aria-label={`Go to page ${pageNumber}`}
                    aria-current={
                      pageNumber === currentPage ? "page" : undefined
                    }
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                </Box>
              ))}

            <Button
              size="sm"
              variant="solid"
              colorScheme="orange"
              aria-label="Go to next page"
              onClick={() => void nextPage()}
              isDisabled={loadingMore || (currentPage === pages && !hasMore)}
            >
              Next →
            </Button>
          </HStack>
          <Text sx={styles.paginationSummary}>
            {totalLoaded} stories loaded · {currentPage} of {pages} pages
          </Text>
        </Stack>
      )}
    </Box>
  );
}
