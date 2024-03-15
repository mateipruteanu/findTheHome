import { extendTheme } from "@chakra-ui/react";
import "@fontsource/roboto";
import "@fontsource/outfit";

const theme = extendTheme({
  fonts: {
    body: "Roboto, sans-serif",
    heading: "Outfit, sans-serif",
  },
});

export default theme;
