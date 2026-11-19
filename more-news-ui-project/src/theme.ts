import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  fonts: {
    heading: "'Space Grotesk', sans-serif",
    body: "'DM Sans', sans-serif",
  },
  colors: {
    mn: {
      orange: "#C05621",
      orangeHover: "#C05621",
      ink: "#19191f",
      muted: "#92929e",
      canvas: "#f3f4f6",
      line: "#303039",
    },
  },
  styles: {
    global: {
      body: {
        bg: "#f3f4f6",
        color: "#202027",
      },
      "*::selection": {
        background: "#ff6600",
        color: "white",
      },
    },
  },
  components: {
    Button: {
      defaultProps: { colorScheme: "orange" },
      baseStyle: { fontWeight: 700, borderRadius: "10px" },
    },
    Select: {
      baseStyle: { field: { borderRadius: "10px", bg: "" } },
    },
  },
});
