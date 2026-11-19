import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Link,
  Text,
  Badge,
  useDisclosure,
} from "@chakra-ui/react";

import { ExternalLinkIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import StoryFeed from "./components/StoryFeed/StoryFeed";

export default function App() {
  const menu = useDisclosure();

  return (
    <Box minH="100vh" bg="#373348" color="white">
      <Box
        as="header"
        position="sticky"
        top={0}
        zIndex={20}
        bg="#1B1E23"
        color="white"
        borderBottom="1px solid"
        borderColor="whiteAlpha.100"
        backdropFilter="blur(16px)"
      >
        <Container maxW="1440px">
          <Flex
            minH={{ base: "66px", md: "76px" }}
            align="center"
            justify="space-between"
            gap={4}
          >
            <HStack spacing={3}>
              <Box
                as="img"
                src="/assets/mnlogo.WebP"
                alt="MoreNews logo"
                width={{ base: "176px", sm: "205px" }}
                height="auto"
                objectFit="contain"
                loading="eager"
                fetchPriority="high"
              />
            </HStack>
            <HStack
              as="nav"
              aria-label="Main navigation"
              spacing={5}
              display={{ base: "none", md: "flex" }}
            >
              <Badge
                bg="whiteAlpha.100"
                color="orange.200"
                px={3}
                py={1}
                borderRadius="full"
                letterSpacing=".08em"
              >
                LIVE FEED
              </Badge>

              <Link
                href="https://news.ycombinator.com/"
                isExternal
                fontSize="sm"
                color="whiteAlpha.800"
                fontWeight="semibold"
                _hover={{ color: "orange.200" }}
              >
                Original MN <ExternalLinkIcon mx="2px" />
              </Link>
            </HStack>
            <IconButton
              display={{ base: "inline-flex", md: "none" }}
              aria-label={menu.isOpen ? "Close menu" : "Open menu"}
              aria-expanded={menu.isOpen}
              aria-controls="mobile-navigation"
              icon={menu.isOpen ? <CloseIcon /> : <HamburgerIcon />}
              variant="ghost"
              color="white"
              fontSize="lg"
              onClick={menu.onToggle}
              _hover={{ bg: "whiteAlpha.100" }}
            />
          </Flex>
          {menu.isOpen && (
            <Flex
              as="nav"
              id="mobile-navigation"
              aria-label="Mobile navigation"
              display={{ base: "flex", md: "none" }}
              pb={4}
              pt={1}
              direction="column"
              gap={3}
            >
              <Badge
                alignSelf="flex-start"
                bg="whiteAlpha.100"
                color="orange.200"
                px={3}
                py={1}
                borderRadius="full"
              >
                LIVE FEED
              </Badge>

              <Link
                href="https://news.ycombinator.com/"
                isExternal
                fontSize="sm"
                color="whiteAlpha.800"
                onClick={menu.onClose}
              >
                Visit Original Hacker News <ExternalLinkIcon mx="2px" />
              </Link>

              <Text fontSize="xs" color="whiteAlpha.500">
                Choose a feed below to browse stories.
              </Text>
            </Flex>
          )}
        </Container>
      </Box>
      <Container maxW="1440px" p={{ base: 5, md: 12 }}>
        <Box as="main">
          <StoryFeed />
        </Box>
        <Flex
          as="footer"
          mt={14}
          pt={6}
          borderTop="1px solid"
          borderColor="gray.200"
          justify="space-between"
          align={{ base: "flex-start", sm: "center" }}
          direction={{ base: "column", sm: "row" }}
          gap={2}
        >
          <Text color="gray.50" fontSize="sm">
            More News · Powered by the official Firebase API
          </Text>
          <Link
            href="https://github.com/HackerNews/API"
            isExternal
            color="gray.50"
            fontSize="sm"
            _hover={{ color: "orange.200" }}
          >
            API documentation <ExternalLinkIcon mx="2px" />
          </Link>
        </Flex>
      </Container>
    </Box>
  );
}
