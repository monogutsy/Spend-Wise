import {
  ALLOW_INSECURE_CLIENT_NEWS_KEY,
  NEWS_PROXY_URL,
} from "../config/appConfig";
import { requestJson } from "./request";

const API_KEY =
  import.meta.env.VITE_GNEWS_API_KEY;

function getInsecureClientNewsUrl() {
  return `https://gnews.io/api/v4/search?q=finance&lang=en&max=5&token=${API_KEY}`;
}

export const getFinanceNews = async () => {
  if (NEWS_PROXY_URL) {
    try {
      return await requestJson(NEWS_PROXY_URL);
    } catch (error) {
      return {
        articles: [],
        error:
          error?.message ||
          "Failed to fetch finance news.",
      };
    }
  }

  if (
    ALLOW_INSECURE_CLIENT_NEWS_KEY &&
    API_KEY
  ) {
    try {
      return await requestJson(
        getInsecureClientNewsUrl()
      );
    } catch (error) {
      return {
        articles: [],
        error:
          error?.message ||
          "Failed to fetch finance news.",
      };
    }
  }

  return {
    articles: [],
    error:
      "Finance news is disabled. Configure VITE_NEWS_PROXY_URL to enable secure server-side news fetching.",
  };
};
