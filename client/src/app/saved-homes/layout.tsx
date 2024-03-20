import { Box } from "@chakra-ui/react";

export default function SavedHomesPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Box>{children}</Box>
    </Box>
  );
}
