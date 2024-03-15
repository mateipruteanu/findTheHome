import Navbar from "@/components/Navbar";
import { Box } from "@chakra-ui/react";

export default function AccountLayout({
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
