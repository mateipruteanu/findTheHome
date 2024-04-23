import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Listing } from "@/entities/Listing";
import { LightModeColors } from "@/colors";
import { useState } from "react";
import CustomSlider from "./CustomSlider";
import { useRouter } from "next/navigation";

type Filters = {
  priceLowerThan: string;
  priceHigherThan: string;
  numOfBedsLowerThan: string;
  numOfBedsHigherThan: string;
  numOfBathsLowerThan: string;
  numOfBathsHigherThan: string;
  numOfMetersSquaredLowerThan: string;
  numOfMetersSquaredHigherThan: string;
};

export default function FiltersModal({
  isOpen,
  onClose,
  homeType,
  listingType,
  city,
}: {
  isOpen: boolean;
  onClose: () => void;
  homeType: "apartment" | "house";
  listingType: "sale" | "rent";
  city: string;
}) {
  const router = useRouter();
  const [filters, setFilters] = useState({
    price: [0, 1000000],
    numOfBeds: [0, 20],
    numOfBaths: [0, 20],
    numOfMeterSquared: [0, 1000],
  });

  const onPriceChangeEnd = (val: number[]) => {
    setFilters((prev) => ({ ...prev, price: val }));
  };

  const onNumOfBedsChangeEnd = (val: number[]) => {
    setFilters((prev) => ({ ...prev, numOfBeds: val }));
  };

  const onNumOfBathsChangeEnd = (val: number[]) => {
    setFilters((prev) => ({ ...prev, numOfBaths: val }));
  };

  const onNumOfMeterSquaredChangeEnd = (val: number[]) => {
    setFilters((prev) => ({ ...prev, numOfMeterSquared: val }));
  };

  const onFilterButtonClick = () => {
    const filtersToSend: Filters = {
      priceLowerThan: filters.price[1].toString(),
      priceHigherThan: filters.price[0].toString(),
      numOfBedsLowerThan: filters.numOfBeds[1].toString(),
      numOfBedsHigherThan: filters.numOfBeds[0].toString(),
      numOfBathsLowerThan: filters.numOfBaths[1].toString(),
      numOfBathsHigherThan: filters.numOfBaths[0].toString(),
      numOfMetersSquaredLowerThan: filters.numOfMeterSquared[1].toString(),
      numOfMetersSquaredHigherThan: filters.numOfMeterSquared[0].toString(),
    };

    console.log(filtersToSend);

    const searchQuery = new URLSearchParams({
      homeType,
      listingType,
      city,
      ...filtersToSend,
    }).toString();

    console.log(searchQuery);

    router.push(`/search?${searchQuery}`);

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent
        minW={"fit-content"}
        minH={"fit-content"}
        borderRadius={"3xl"}
      >
        <ModalHeader>Filters</ModalHeader>
        <ModalBody>
          <Text>Price</Text>
          <CustomSlider
            minValue={0}
            maxValue={2000000}
            step={5000}
            defaultValues={[100000, 500000]}
            onChangeEnd={onPriceChangeEnd}
          />
          <Text>Number of Beds</Text>
          <CustomSlider
            minValue={0}
            maxValue={20}
            step={1}
            defaultValues={[5, 10]}
            onChangeEnd={onNumOfBedsChangeEnd}
          />
          <Text>Number Of Baths</Text>
          <CustomSlider
            minValue={0}
            maxValue={20}
            step={1}
            defaultValues={[5, 10]}
            onChangeEnd={onNumOfBathsChangeEnd}
          />
          <Text>Number of Meters Squared</Text>
          <CustomSlider
            minValue={0}
            maxValue={1000}
            step={25}
            defaultValues={[200, 600]}
            onChangeEnd={onNumOfMeterSquaredChangeEnd}
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
            onClick={onFilterButtonClick}
            variant={"solid"}
            bgColor={LightModeColors.secondary}
            borderRadius={"full"}
          >
            Filter
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
