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
import useAddListing from "@/hooks/useAddListing";
import useUpdateListing from "@/hooks/useUpdateListing";

export default function AddEditModal({
  mode,
  isOpen,
  OnClose,
  listing,
  onListingUpdate,
}: {
  mode: "add" | "edit";
  isOpen: boolean;
  OnClose: () => void;
  listing?: Listing;
  onListingUpdate?: () => void;
}) {
  const emptyListing: CreateListingDTO = {
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
  let initialListing: CreateListingDTO;
  if (listing) {
    initialListing = copyListingToDTO(listing);
  } else {
    initialListing = emptyListing;
  }

  const [listingDetails, setListingDetails] = useState(initialListing);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const handleImageUpload = (file: File[]) => {
    if (file.length === 0) {
      return;
    }
    setImageFile(file[0]);
    const url = URL.createObjectURL(file[0]);
    setImageURL(url);
  };
  const {
    addListing,
    isLoading: isAdding,
    error: addingError,
  } = useAddListing();
  const {
    updateListing,
    isLoading: isUpdating,
    error: updatingError,
  } = useUpdateListing();

  const handleAddSaveButtonClick = async () => {
    if (mode === "add") {
      if (imageFile) {
        await addListing(listingDetails, imageFile);
        if (!isAdding && !addingError) {
          if (onListingUpdate) onListingUpdate();
          setListingDetails(emptyListing);
          setImageFile(null);
          if (imageURL) {
            URL.revokeObjectURL(imageURL);
          }
          setImageURL(null);
          OnClose();

        }
      }
    } else {
      await updateListing(listing?.id || "", listingDetails);
      if (!isUpdating && !updatingError) {
        if (onListingUpdate) onListingUpdate();
        OnClose();
        setListingDetails(emptyListing);
      }
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
            imageFile={imageFile}
            imageURL={imageURL}
            handleImageUpload={handleImageUpload}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            mr={3}
            onClick={OnClose}
            variant={"ghost"}
            borderRadius={"full"}
          >
            Close
          </Button>
          <Button
            variant="solid"
            colorScheme="green"
            borderRadius={"full"}
            onClick={handleAddSaveButtonClick}
          >
            {mode === "add" ? "Add Listing" : "Save Listing"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
