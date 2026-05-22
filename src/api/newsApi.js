import { requestJson } from "./request";

const API_KEY =
  import.meta.env.VITE_GNEWS_API_KEY;

export const getFinanceNews = async () => {
  if (!API_KEY) {
    return { articles: [] };
  }

  try {
    return await requestJson(
      `https://gnews.io/api/v4/search?q=finance&lang=en&max=5&token=${API_KEY}`
    );
  } catch (error) {
    console.error(error);
    return { articles: [] };
  }
};
