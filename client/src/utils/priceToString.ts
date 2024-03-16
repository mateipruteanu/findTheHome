export default function priceToString(price: number): string {
  if (price < 1000000) {
    return "$" + price / 1000 + "K";
  }
  return "$" + price / 1000000 + "M";
}
