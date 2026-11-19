import type { FeedType } from "../../types";

export const feedAccents: Record<FeedType, string> = {
  top: "#FF8A3D",
  new: "#5BB8FF",
  best: "#B69AFF",
  ask: "#42C9B0",
  show: "#FF9C55",
  jobs: "#7FA8FF",
  polls: "#E5A4FF",
};

export const feedLabels: Record<FeedType, string> = {
  top: "Top Story",
  new: "New Story",
  best: "Best Story",
  ask: "Ask MN",
  show: "Show MN",
  jobs: "Hiring",
  polls: "Poll",
};

export const feedIcons: Record<FeedType, string> = {
  top: "◇",
  new: "✦",
  best: "♛",
  ask: "◉",
  show: "⌘",
  jobs: "▤",
  polls: "△",
};

export const styles = {
  card: (accent: string, canExpand: boolean, expanded: boolean) => ({
    alignSelf: "start",
    width: "100%",
    height: canExpand ? (expanded ? "auto" : "340px") : "auto",
    minHeight: canExpand ? "340px" : "auto",
    position: "relative",
    borderRadius: "20px",
    padding: "2px",
    background: accent,
    transition: "all 0.25s ease",
    _hover: {
      boxShadow: `0 12px 35px ${accent}45`,
      transform: "translateY(-3px)",
    },
  }),

  inner: (canExpand: boolean, expanded: boolean) => ({
    height: canExpand ? (expanded ? "auto" : "100%") : "auto",
    minHeight: canExpand ? "336px" : "auto",
    background: "#202124",
    borderRadius: "18px",
    overflow: "hidden",
    position: "relative",
  }),

  leftPanel: {
    width: "104px",
    minWidth: "104px",
    alignSelf: "stretch",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 5,
    paddingY: 6,
    paddingX: 2,
    position: "relative",
    overflow: "hidden",
    borderRight: "1px solid rgba(255,255,255,0.08)",
    backgroundImage: `
      radial-gradient(
        circle at 12% 12%,
        rgba(255,138,61,0.72),
        transparent 52%
      ),
      radial-gradient(
        circle at 88% 88%,
        rgba(75,145,255,0.78),
        transparent 58%
      ),
      radial-gradient(
        circle at 50% 48%,
        rgba(116,75,180,0.18),
        transparent 65%
      ),
      linear-gradient(145deg, #25212A, #111820)
    `,
  },

  atmosphericGlow: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    backgroundImage: `
      linear-gradient(
        145deg,
        rgba(255,255,255,0.08),
        transparent 35%,
        transparent 65%,
        rgba(0,0,0,0.25)
      )
    `,
  },

  rankStack: {
    gap: 4,
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },

  rankLabel: {
    fontSize: "xs",
    color: "whiteAlpha.700",
    fontWeight: "bold",
    letterSpacing: "1.5px",
  },

  rankNumber: {
    fontSize: "4xl",
    color: "white",
    fontWeight: "800",
    lineHeight: 1,
    textShadow: "0 2px 12px rgba(0,0,0,0.4)",
  },

  feedIconBox: {
    width: "60px",
    height: "60px",
    borderRadius: "18px",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(15,18,26,0.42)",
    border: "1px solid rgba(255,255,255,0.22)",
    boxShadow: `
      0 8px 25px rgba(0,0,0,0.22),
      inset 0 1px 0 rgba(255,255,255,0.12)
    `,
    backdropFilter: "blur(8px)",
    position: "relative",
    zIndex: 1,
  },

  feedIcon: (accent: string) => ({
    fontSize: "3xl",
    color: "white",
    textShadow: `0 0 18px ${accent}`,
  }),

  accentIndicator: (accent: string) => ({
    width: "7px",
    height: "7px",
    borderRadius: "full",
    background: accent,
    boxShadow: `0 0 14px ${accent}`,
    position: "relative",
    zIndex: 1,
  }),

  rightPanel: (canExpand: boolean, expanded: boolean) => ({
    flex: 1,
    minWidth: 0,
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
    height: canExpand ? (expanded ? "auto" : "100%") : "auto",
    minHeight: canExpand ? "336px" : "auto",
    background: "#1B1E23",
  }),

  content: (canExpand: boolean, expanded: boolean) => ({
    flex: 1,
    minWidth: 0,
    flexDirection: "column",
    position: "relative",
    zIndex: 1,
    height: canExpand ? (expanded ? "auto" : "100%") : "auto",
    minHeight: canExpand ? "336px" : "auto",
    padding: { base: 4, md: 5 },
    gap: 3,
  }),

  sourceRow: {
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
  },

  sourceGroup: {
    gap: 2,
    minWidth: 0,
  },

  sourceDot: (accent: string) => ({
    width: "7px",
    height: "7px",
    borderRadius: "full",
    background: accent,
    boxShadow: `0 0 10px ${accent}88`,
  }),

  sourceText: {
    fontSize: "xs",
    color: "gray.300",
    fontWeight: "medium",
  },

  categoryBadge: (accent: string) => ({
    flexShrink: 0,
    background: `${accent}22`,
    color: accent,
    border: "1px solid",
    borderColor: `${accent}55`,
    borderRadius: "full",
    paddingX: 2.5,
    paddingY: 1,
    fontSize: "9px",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    backdropFilter: "blur(6px)",
  }),

  titleLink: {
    _hover: { textDecoration: "none" },
  },

  title: (accent: string, linked: boolean) => ({
    fontSize: linked
      ? { base: "xs", md: "md" }
      : { base: "md", md: "lg" },
    color: "white",
    lineHeight: 1.35,
    fontWeight: "700",
    textShadow: "0 2px 8px rgba(0,0,0,0.45)",
    ...(linked
      ? {
          _hover: { color: accent },
          transition: "color 0.2s",
        }
      : {}),
  }),

  externalLinkIcon: {
    marginLeft: 2,
    marginBottom: "1px",
    fontSize: "xs",
    color: "gray.400",
  },

  safeTextContainer: (expanded: boolean) => ({
    position: "relative",
    overflow: "hidden",
    maxHeight: expanded ? "none" : "104px",
  }),

  safeText: {
    fontSize: "sm",
    color: "gray.300",
    lineHeight: 1.7,
    "& p": { marginBottom: "8px" },
    "& a": {
      color: "#FF9B58",
      textDecoration: "underline",
    },
    "& pre": {
      whiteSpace: "pre-wrap",
      overflowWrap: "anywhere",
      background: "rgba(255,255,255,0.06)",
      padding: "10px",
      borderRadius: "8px",
      marginTop: "8px",
    },
    "& code": { color: "#FFB27D" },
    "& img": {
      maxWidth: "100%",
      height: "auto",
      borderRadius: "8px",
    },
  },

  readMoreButton: {
    color: "#FF9B58",
    marginTop: 2,
    paddingX: 0,
    _hover: {
      color: "#FFC08E",
      background: "transparent",
    },
  },

  emptyDescription: {
    height: "104px",
  },

  pollProgress: (accent: string) => ({
    borderRadius: "full",
    background: "whiteAlpha.200",
    "& > div": { background: accent },
  }),

  pollTotal: {
    fontSize: "xs",
    color: "gray.400",
  },

  footerSpacer: (canExpand: boolean, expanded: boolean) => ({
    flex: canExpand && !expanded ? 1 : 0,
    minHeight: 0,
  }),

  footer: {
    borderTop: "1px solid",
    borderColor: "whiteAlpha.200",
    paddingTop: 3,
  },

  footerRow: {
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 2,
  },

  authorGroup: {
    gap: 2,
    minWidth: 0,
  },

  authorAvatar: (accent: string) => ({
    width: "25px",
    height: "25px",
    flexShrink: 0,
    borderRadius: "full",
    background: `${accent}30`,
    border: "1px solid",
    borderColor: `${accent}55`,
    alignItems: "center",
    justifyContent: "center",
  }),

  authorInitial: (accent: string) => ({
    fontSize: "xs",
    fontWeight: "bold",
    color: accent,
  }),

  authorDetails: {
    alignItems: "flex-start",
    gap: 0,
    minWidth: 0,
  },

  authorName: {
    fontSize: "xs",
    color: "gray.200",
    fontWeight: "semibold",
  },

  timestamp: {
    fontSize: "10px",
    color: "gray.400",
  },

  metricsGroup: {
    gap: 3,
  },

  metric: {
    gap: 1,
  },

  scoreIcon: (accent: string) => ({
    fontSize: "xs",
    color: accent,
  }),

  scoreText: {
    fontSize: "xs",
    color: "gray.200",
    fontWeight: "semibold",
  },

  commentsIcon: {
    fontSize: "xs",
    color: "gray.400",
  },

  commentsText: {
    fontSize: "xs",
    color: "gray.200",
  },
};
