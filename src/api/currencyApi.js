import { requestJson } from "./request";

export const getExchangeRates = async () => {
  try {
    return await requestJson(
      "https://open.er-api.com/v6/latest/PHP"
    );
  } catch (error) {
    return {
      rates: null,
      error:
        error?.message ||
        "Failed to fetch exchange rates.",
    };
  }
};
