import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { Listing } from "@/entities/Listing";
import {
  IconDotsVertical,
  IconEditCircle,
  IconEraser,
} from "@tabler/icons-react";
import useDeleteListing from "@/hooks/useDeleteListing";
import { useRef } from "react";
import AddEditModal from "./AddEditModal";

export default function ListingOptions({ listing }: { listing: Listing }) {
  const { isLoading, error, deleteListing } = useDeleteListing();
  const deleteModal = useDisclosure();
  const editModal = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleEditClick = () => {
    console.log("Edit clicked for listing", listing.id);
  };

  const handleDeleteClick = async () => {
    await deleteListing(listing.id);
    deleteModal.onClose();
    setTimeout(() => window.location.reload(), 1000);
  };

  return (
    <>
      <Popover placement="bottom" isLazy>
        <PopoverTrigger>
          <IconButton
            aria-label="Listing options"
            icon={<IconDotsVertical />}
            variant="solid"
            bgColor={"transparent"}
            borderRadius={"full"}
          />
        </PopoverTrigger>
        <PopoverContent width={"min-content"} borderRadius={"xl"}>
          <PopoverArrow />
          <PopoverBody borderRadius={"full"}>
            <Stack direction={"column"}>
              <Button
                variant={"ghost"}
                leftIcon={<IconEditCircle />}
                onClick={editModal.onOpen}
                borderRadius={"full"}
              >
                Edit
              </Button>
              <Button
                variant={"ghost"}
                leftIcon={<IconEraser />}
                onClick={deleteModal.onOpen}
                borderRadius={"full"}
                colorScheme="red"
              >
                Delete
              </Button>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <AlertDialog
        isOpen={deleteModal.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={deleteModal.onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius={"xl"}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Listing "{listing.title}"
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={deleteModal.onClose} borderRadius={"full"}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDeleteClick}
                ml={3}
                borderRadius={"full"}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <AddEditModal isOpen={editModal.isOpen} OnClose={editModal.onClose} mode={"edit"} listing={listing} />
    </>
  );
}
