import { SUPPORTED_CURRENCIES } from "./constants";

const currencyConfig = SUPPORTED_CURRENCIES.reduce(
  (map, { code, locale }) => {
    map[code] = locale;
    return map;
  },
  {}
);

export function formatCurrency(
  amount,
  currency = "PHP",
  locale = currencyConfig[currency] || "en-US"
) {
  const safeAmount =
    typeof amount === "number" && Number.isFinite(amount)
      ? amount
      : 0;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(safeAmount);
}
