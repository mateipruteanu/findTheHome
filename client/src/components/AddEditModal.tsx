import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import ListingModalForm from "./ListingModalForm";
import { useState } from "react";
import { Listing } from "@/entities/Listing";
import { CreateListingDTO } from "@/dtos/CreateListingDTO";
import copyListingToDTO from "@/utils/copyListingtoDTO";

export default function AddEditModal({
  mode,
  isOpen,
  OnClose,
  listing,
}: {
  mode: "add" | "edit";
  isOpen: boolean;
  OnClose: () => void;
  listing?: Listing;
}) {
  let initialListing: CreateListingDTO = {
    title: "",
    description: "",
    price: 0,
    address: {
      country: "",
      city: "",
      street: "",
      postalCode: "",
    },
    image: "",
    homeType: "HOUSE",
    listingType: "RENT",
    numOfBaths: 0,
    numOfBeds: 0,
    numOfMeterSquared: 0,
  };
  if (listing) {
    initialListing = copyListingToDTO(listing);
  }

  const [listingDetails, setListingDetails] = useState(initialListing);

  const handleAddSaveButtonClick = () => {
    if (mode === "add") {
      console.log("Add button clicked");
      console.log("Listing Details:", listingDetails);
    } else {
      console.log("Save button clicked");
      console.log("Listing Details:", listingDetails);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={OnClose}
      size={"xl"}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {mode === "add" ? "Add Listing" : "Edit Listing"}
        </ModalHeader>
        <ModalBody>
          <ListingModalForm
            listingDetails={listingDetails}
            setListingDetails={setListingDetails}
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={OnClose}>
            Close
          </Button>
          <Button colorScheme="green" onClick={handleAddSaveButtonClick}>
            {mode === "add" ? "Add" : "Save"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
