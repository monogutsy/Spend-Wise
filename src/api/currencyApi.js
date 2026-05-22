import { requestJson } from "./request";

export const getExchangeRates = async () => {
  try {
    return await requestJson(
      "https://open.er-api.com/v6/latest/PHP"
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};
