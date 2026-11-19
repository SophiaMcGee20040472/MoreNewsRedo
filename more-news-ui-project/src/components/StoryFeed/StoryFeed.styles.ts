import type { SystemStyleObject } from "@chakra-ui/react";

export const storyFeedStyles = {
  page: {} satisfies SystemStyleObject,

  header: {
    justifyContent: "space-between",
    alignItems: { base: "flex-start", md: "flex-end" },
    gap: 4,
    mb: 6,
    flexDirection: { base: "column", md: "row" },
  } satisfies SystemStyleObject,

  eyebrow: {
    color: "#5BB8FF",
    fontSize: "xs",
    fontWeight: "bold",
    letterSpacing: "0.14em",
    mb: 2,
  } satisfies SystemStyleObject,

  title: {
    fontSize: { base: "2xl", md: "3xl" },
    letterSpacing: "-0.04em",
  } satisfies SystemStyleObject,

  description: {
    color: "gray.300",
    mt: 2,
  } satisfies SystemStyleObject,

  sortControls: {
    gap: 3,
    color: "orange.700",
  } satisfies SystemStyleObject,

  sortLabel: {
    color: "white",
    fontSize: "sm",
    whiteSpace: "nowrap",
  } satisfies SystemStyleObject,

  sortSelect: {
    w: { base: "190px", md: "205px" },
    background: "white",
    color: "black",
    fontSize: "md",
  } satisfies SystemStyleObject,

  errorAlert: {
    borderRadius: "xl",
    mb: 5,
  } satisfies SystemStyleObject,

  errorMessage: {
    flex: 1,
  } satisfies SystemStyleObject,

  emptyState: {
    bg: "white",
    borderRadius: "2xl",
    p: 10,
    textAlign: "center",
    border: "1px solid",
    borderColor: "gray.200",
  } satisfies SystemStyleObject,

  emptyTitle: {
    mb: 2,
  } satisfies SystemStyleObject,

  emptyDescription: {
    color: "gray.50",
  } satisfies SystemStyleObject,

  storyGrid: {
    gap: 5,
  } satisfies SystemStyleObject,

  pagination: {
    alignItems: "center",
    gap: 4,
    mt: 8,
  } satisfies SystemStyleObject,

  paginationControls: {
    gap: 2,
    flexWrap: "wrap",
    justifyContent: "center",
  } satisfies SystemStyleObject,

  pageEllipsis: {
    color: "gray.400",
    px: 1,
  } satisfies SystemStyleObject,

  paginationSummary: {
    color: "gray.50",
    fontSize: "xs",
  } satisfies SystemStyleObject,
} as const;
