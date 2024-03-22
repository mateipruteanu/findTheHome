import { Box } from "@chakra-ui/react";
import { Suspense } from "react";

export default function LoginPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Box>
        <Suspense>{children}</Suspense>
      </Box>
    </Box>
  );
}
