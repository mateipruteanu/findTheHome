import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Listing } from "@/entities/Listing";
import ListingModalBody from "./ListingModalBody";
import { LightModeColors } from "@/colors";
import MortgageCalculatorModal from "./MortgageCalculatorModal";

export default function ListingModal({
  listing,
  isOpen,
  onClose,
}: {
  listing: Listing;
  isOpen: boolean;
  onClose: () => void;
}) {
  const mortgageCalculatorModal = useDisclosure();

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent
        minW={"fit-content"}
        minH={"fit-content"}
        borderRadius={"3xl"}
      >
        <ModalBody>
          <ListingModalBody listing={listing} />
          <MortgageCalculatorModal
            isOpen={mortgageCalculatorModal.isOpen}
            onClose={mortgageCalculatorModal.onClose}
            listing={listing}
          />
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
            onClick={mortgageCalculatorModal.onOpen}
            variant={"outline"}
            borderRadius={"full"}
          >
            Calculate Mortgage
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
