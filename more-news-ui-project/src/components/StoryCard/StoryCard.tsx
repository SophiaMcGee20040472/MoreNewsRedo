import { useMemo, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";

import type { FeedType, MNItem } from "../../types";
import { styles, feedAccents, feedIcons, feedLabels } from "./StoryCard.styles";

interface Props {
  item: MNItem;
  rank: number;
  feed: FeedType;
  imageUrl?: string;
}

interface PollOption {
  id?: number;
  title?: string;
  text?: string;
  score?: number;
}

function getPlainText(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function SafeMNText({
  html,
  expanded,
  onToggle,
}: {
  html: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  const plainText = useMemo(() => getPlainText(html), [html]);
  const canExpand = plainText.length > 180;

  return (
    <Box>
      <Box sx={styles.safeTextContainer(expanded)}>
        <Text
          sx={styles.safeText}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Box>

      {canExpand && (
        <Button
          variant="ghost"
          size="xs"
          sx={styles.readMoreButton}
          rightIcon={expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          onClick={onToggle}
        >
          {expanded ? "Read less" : "Read more"}
        </Button>
      )}
    </Box>
  );
}

export default function StoryCard({
  item,
  rank,
  feed,
  imageUrl,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const accent = feedAccents[feed];
  const canExpandCard = feed === "ask" || feed === "show";

  // const pollOptions = (
  //   item as MNItem & { pollOptions?: PollOption[] }
  // ).pollOptions;

  // const totalVotes =
  //   pollOptions?.reduce(
  //     (total, option) => total + (option.score || 0),
  //     0
  //   ) || 0;

  const authorInitial = item.by
    ? item.by.charAt(0).toUpperCase()
    : "?";

  const domain = useMemo(() => {
    if (!item.url) return "news.ycombinator.com";

    try {
      return new URL(item.url).hostname.replace(/^www\./, "");
    } catch {
      return "news.ycombinator.com";
    }
  }, [item.url]);

  const toggleExpanded = () => {
    setExpanded((previous) => !previous);
  };

  return (
    <Box sx={styles.card(accent, canExpandCard, expanded)}>
      <Flex sx={styles.inner(canExpandCard, expanded)}>
        <Flex sx={styles.leftPanel}>
          <Box sx={styles.atmosphericGlow} />

          <VStack sx={styles.rankStack}>
            <Text sx={styles.rankLabel}>RANK</Text>
            <Heading sx={styles.rankNumber}>{rank}</Heading>
          </VStack>
          <Flex sx={styles.feedIconBox}>
            <Text sx={styles.feedIcon(accent)}>{feedIcons[feed]}</Text>
          </Flex>
          <Box sx={styles.accentIndicator(accent)} />
        </Flex>
        <Flex sx={styles.rightPanel(canExpandCard, expanded)}>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt=""
            />
          )}

          <Flex sx={styles.content(canExpandCard, expanded)}>
            <Flex sx={styles.sourceRow}>
              <HStack sx={styles.sourceGroup}>
                <Box sx={styles.sourceDot(accent)} />
                <Text sx={styles.sourceText} noOfLines={1}>
                  {domain || "news.ycombinator.com"}
                </Text>
              </HStack>

              <Badge sx={styles.categoryBadge(accent)}>
                {feedLabels[feed]}
              </Badge>
            </Flex>
            <Box>
              {item.url ? (
                <Link
                  href={item.url}
                  isExternal
                  sx={styles.titleLink}
                >
                  <Heading noOfLines={3} sx={styles.title(accent, true)}>
                    {item.title}
                    <ExternalLinkIcon sx={styles.externalLinkIcon} />
                  </Heading>
                </Link>
              ) : (
                <Heading noOfLines={3} sx={styles.title(accent, false)}>
                  {item.title}
                </Heading>
              )}
            </Box>
            {canExpandCard && (
              <Box>
                {item.text ? (
                  <SafeMNText
                    html={item.text}
                    expanded={expanded}
                    onToggle={toggleExpanded}
                  />
                ) : (
                  <Box sx={styles.emptyDescription} />
                )}
              </Box>
            )}
            <Box sx={styles.footerSpacer(canExpandCard, expanded)} />
            <Box sx={styles.footer}>
              <Flex sx={styles.footerRow}>
                <HStack sx={styles.authorGroup}>
                  <Flex sx={styles.authorAvatar(accent)}>
                    <Text sx={styles.authorInitial(accent)}>
                      {authorInitial}
                    </Text>
                  </Flex>
                  <VStack sx={styles.authorDetails}>
                    <Text sx={styles.authorName} noOfLines={1}>
                      {item.by || "Unknown"}
                    </Text>
                  </VStack>
                </HStack>
                <HStack sx={styles.metricsGroup}>
                  <HStack sx={styles.metric}>
                    <Text sx={styles.scoreIcon(accent)}>▲</Text>
                    <Text sx={styles.scoreText}>
                      {item.score ?? 0}
                    </Text>
                  </HStack>
                  <HStack sx={styles.metric}>
                    <Text sx={styles.commentsIcon}>◉</Text>
                    <Text sx={styles.commentsText}>
                      {item.descendants ?? 0}
                    </Text>
                  </HStack>
                </HStack>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
