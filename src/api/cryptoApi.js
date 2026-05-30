import { requestJson } from "./request";

export const getCryptoPrices = async () => {
  try {
    return await requestJson(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
    );
  } catch (error) {
    return {
      error:
        error?.message ||
        "Failed to fetch crypto prices.",
    };
  }
};
