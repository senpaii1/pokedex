import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: "#ffcc00", // Pikachu yellow 🎉
    secondary: "#0075BE", // Pokemon blue
    background: "#ffeb99", // Light yellow
    accent: "#ff5733", // Fun orange
  },
  fonts: {
    heading: "Comic Sans MS, sans-serif",
    body: "Arial, sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "background",
        color: "black",
      },
    },
  },
});

export default theme;
