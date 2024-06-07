export default function calculateMonthlyMortgagePayment(
  homePrice: number,
  downPayment: number,
  loanTermInYears: number,
  interestRatePercentage: number
): number {
  const principal = homePrice - downPayment;

  const monthlyInterestRate = interestRatePercentage / 100 / 12;

  const totalNumberOfPayments = loanTermInYears * 12;

  const monthlyPayment =
    (principal *
      (monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, totalNumberOfPayments))) /
    (Math.pow(1 + monthlyInterestRate, totalNumberOfPayments) - 1);

  return Math.round(monthlyPayment * 100) / 100;
}
