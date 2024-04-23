import { HStack, Button, Text } from "@chakra-ui/react";

export default function Pagination({
  page,
  setPage,
  totalPages,
}: {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}) {
  return (
    <HStack justifyContent={'center'} pb={'30px'}>
      <Button isDisabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </Button>
      <Text>
        Page {page} of {totalPages}
      </Text>
      <Button
        isDisabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </Button>
    </HStack>
  );
}
