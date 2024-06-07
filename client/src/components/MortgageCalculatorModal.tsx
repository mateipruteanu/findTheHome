import { Listing } from "@/entities/Listing";
import calculateMonthlyMortgagePayment from "@/utils/calculateMonthlyMortgagePayment";
import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  Text,
  ModalHeader,
  ModalOverlay,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";

export default function MortgageCalculatorModal({
  isOpen,
  onClose,
  listing,
}: {
  isOpen: boolean;
  onClose: () => void;
  listing: Listing;
}) {
  const [mortgageDetails, setMortgageDetails] = useState({
    homePrice: listing.price,
    downPayment: 0,
    loanTermInYears: 20,
    interestRatePercentage: 5,
  });

  const [monthlyMortgagePayment, setMonthlyMortgagePayment] = useState(0);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mt={20}>
        <ModalHeader>Calculate Monthly Mortgage Payment</ModalHeader>
        <ModalBody>
          <FormControl id="down-payment">Down Payment</FormControl>
          <Input
            type="number"
            value={mortgageDetails.downPayment}
            onChange={(e) =>
              setMortgageDetails({
                ...mortgageDetails,
                downPayment: parseInt(e.target.value),
              })
            }
          />
          <FormControl id="loan-term">Loan Term (in years)</FormControl>
          <Input
            type="number"
            value={mortgageDetails.loanTermInYears}
            onChange={(e) =>
              setMortgageDetails({
                ...mortgageDetails,
                loanTermInYears: parseInt(e.target.value),
              })
            }
          />
          <FormControl id="interest-rate">Interest Rate (%)</FormControl>
          <Input
            type="number"
            value={mortgageDetails.interestRatePercentage}
            onChange={(e) =>
              setMortgageDetails({
                ...mortgageDetails,
                interestRatePercentage: parseInt(e.target.value),
              })
            }
          />

          <Button
            onClick={() => {
              setMonthlyMortgagePayment(
                calculateMonthlyMortgagePayment(
                  mortgageDetails.homePrice,
                  mortgageDetails.downPayment,
                  mortgageDetails.loanTermInYears,
                  mortgageDetails.interestRatePercentage
                )
              );
            }}
            mt={4}
          >
            Calculate Monthly Payment
          </Button>

          <Heading size={"md"} mt={5}>
            Monthly Mortgage Payment: ${monthlyMortgagePayment}
          </Heading>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
