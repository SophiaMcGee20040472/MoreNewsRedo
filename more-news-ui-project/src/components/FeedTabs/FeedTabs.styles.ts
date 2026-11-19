import type { SystemStyleObject } from "@chakra-ui/react";

export const feedTabsStyles = {
  container: {
    bg: "transparent",
    color: "white",
    borderRadius: { base: "xl", md: "2xl" },
    marginX: 0,
    mb: { base: 7, md: 10 },
    boxShadow: "0 14px 36px rgba(20,20,28,.10)",
    overflow: "visible",
    textAlign: "left",
  } satisfies SystemStyleObject,

  header: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    mb: { base: 0, md: 4 },
    textAlign: "left",
  } satisfies SystemStyleObject,

  titleSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    textAlign: "left",
  } satisfies SystemStyleObject,

  eyebrow: {
    color: "mn.orange",
    fontSize: "9px",
    fontWeight: "extrabold",
    letterSpacing: ".18em",
    mb: 1,
    textAlign: "left",
  } satisfies SystemStyleObject,

  heading: {
    fontFamily: "heading",
    letterSpacing: "-.02em",
    textAlign: "left",
    width: "100%",
  } satisfies SystemStyleObject,

  headerActions: {
    gap: 2,
  } satisfies SystemStyleObject,

  categoryCount: {
    fontSize: "xs",
    color: "whiteAlpha.900",
    display: { base: "none", md: "block" },
  } satisfies SystemStyleObject,

  mobileSection: {
    display: { base: "block", md: "none" },
    mt: 3,
    position: "relative",
    zIndex: 10,
    width: "100%",
  } satisfies SystemStyleObject,

  mobileSelect: {
    width: "100%",
    justifyContent: "space-between",
    bg: "white",
    color: "gray.800",
    borderRadius: "xl",
    fontWeight: "semibold",
    textAlign: "left",
    _hover: {
      bg: "gray.100",
    },
    _active: {
      bg: "gray.100",
    },
  } satisfies SystemStyleObject,

  selectedIcon: {
    color: "mn.orange",
    fontSize: "xs",
  } satisfies SystemStyleObject,

  mobileMenu: {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: 0,
    right: 0,
    width: "100%",
    p: 2,
    bg: "#24242d",
    border: "1px solid",
    borderColor: "whiteAlpha.200",
    borderRadius: "xl",
    boxShadow: "0 12px 30px rgba(0,0,0,.35)",
    zIndex: 100,
    overflow: "hidden",
  } satisfies SystemStyleObject,

  mobileMenuList: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    width: "100%",
    alignItems: "stretch",
  } satisfies SystemStyleObject,

  mobileMenuItem: (
    isSelected: boolean
  ): SystemStyleObject => ({
    display: "flex",
    width: "100%",
    minWidth: 0,
    flexShrink: 0,
    justifyContent: "flex-start",
    textAlign: "left",
    color: isSelected ? "white" : "whiteAlpha.800",
    bg: isSelected ? "whiteAlpha.200" : "transparent",
    borderRadius: "lg",
    whiteSpace: "nowrap",
    _hover: {
      bg: "whiteAlpha.100",
    },
    _active: {
      bg: "whiteAlpha.200",
    },
  }),

  desktopMenu: {
    display: { base: "none", md: "flex" },
  } satisfies SystemStyleObject,

  desktopMenuItem: (
    isSelected: boolean
  ): SystemStyleObject => ({
    bg: isSelected ? "mn.orange" : "white",
    color: isSelected ? "white" : "gray.700",
    boxShadow: isSelected
      ? "0 6px 16px rgba(255,102,0,.25)"
      : "none",
    transition: "all .18s ease",
    _hover: {
      bg: isSelected ? "mn.orangeHover" : "gray.100",
      transform: "translateY(-1px)",
    },
  }),
} as const;
