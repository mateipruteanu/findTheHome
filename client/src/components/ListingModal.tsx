import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { Listing } from "@/entities/Listing";
import ListingModalBody from "./ListingModalBody";
import { LightModeColors } from "@/colors";

export default function ListingModal({
  listing,
  isOpen,
  onClose,
}: {
  listing: Listing;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent
        minW={"fit-content"}
        minH={"fit-content"}
        borderRadius={"3xl"}
      >
        <ModalBody>
          <ListingModalBody listing={listing} />
        </ModalBody>

        <ModalFooter>
          <Button
            mr={3}
            onClick={onClose}
            variant={"ghost"}
            borderRadius={"full"}
          >
            Close
          </Button>
          <Button
            mr={3}
            onClick={onClose}
            variant={"solid"}
            bgColor={LightModeColors.secondary}
            borderRadius={"full"}
            as={"a"}
            href={`mailto:${listing.postedBy.email}`}
          >
            Contact
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
