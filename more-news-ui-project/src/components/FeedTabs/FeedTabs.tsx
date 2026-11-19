import { useState } from "react";
import {
  HStack,
  Button,
  Flex,
  Heading,
  Text,
  Box,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import type { FeedType } from "../../types";
import { feedTabsStyles as styles } from "./FeedTabs.styles";

interface Props {
  value: FeedType;
  onChange: (feed: FeedType) => void;
}

const tabs: { id: FeedType; label: string; icon: string }[] = [
  { id: "top", label: "Top Posts", icon: "▲" },
  { id: "new", label: "New Posts", icon: "●" },
  { id: "best", label: "Best", icon: "✦" },
  { id: "ask", label: "Ask MN", icon: "*" },
  { id: "show", label: "Show MN", icon: "↗" },
  { id: "jobs", label: "Jobs", icon: "▣" },
];

export default function FeedTabs({ value, onChange }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const selected = tabs.find((tab) => tab.id === value) ?? tabs[0];

  const choose = (id: FeedType) => {
    onChange(id);
    setMobileOpen(false);
  };

  return (
    <Box sx={styles.container}>
      <Flex sx={styles.header}>
        <Box sx={styles.titleSection}>
          <Heading size="md" sx={styles.heading}>
            Browse More News
          </Heading>
        </Box>
        <HStack sx={styles.headerActions}>
          <Text sx={styles.categoryCount}>
            {tabs.length} categories
          </Text>
        </HStack>
      </Flex>
      <Box sx={styles.mobileSection}>
        <Button
          sx={styles.mobileSelect}
          rightIcon={
            <ChevronDownIcon
              transform={
                mobileOpen
                  ? "rotate(180deg)"
                  : "rotate(0deg)"
              }
              transition="transform 0.2s ease"
            />
          }
          aria-expanded={mobileOpen}
          aria-haspopup="true"
          aria-controls="mobile-feed-menu"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <HStack spacing={2}>
            <Text sx={styles.selectedIcon}>
              {selected.icon}
            </Text>
            <Text>{selected.label}</Text>
          </HStack>
        </Button>

        {mobileOpen && (
          <Box
            id="mobile-feed-menu"
            sx={styles.mobileMenu}
          >
            <Flex sx={styles.mobileMenuList}>
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  sx={styles.mobileMenuItem(
                    value === tab.id
                  )}
                  size="md"
                  variant="ghost"
                  leftIcon={
                    <Text sx={styles.selectedIcon}>
                      {tab.icon}
                    </Text>
                  }
                  onClick={() => choose(tab.id)}
                >
                  {tab.label}
                </Button>
              ))}
            </Flex>
          </Box>
        )}
      </Box>
      <Wrap sx={styles.desktopMenu} spacing={2}>
        {tabs.map((tab) => (
          <WrapItem key={tab.id}>
            <Button
              size="md"
              leftIcon={
                <Text fontSize="xs">
                  {tab.icon}
                </Text>
              }
              onClick={() => choose(tab.id)}
              sx={styles.desktopMenuItem(
                value === tab.id
              )}
            >
              {tab.label}
            </Button>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
}
