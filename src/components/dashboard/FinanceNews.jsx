import { useEffect, useState } from "react";
import { getFinanceNews } from "../../api/newsApi";

function FinanceNews() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getFinanceNews().then((data) => {
      setArticles(data.articles || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="panel">
      <h3>Finance News</h3>

      {loading ? (
        <p className="empty-text">Loading news...</p>
      ) : articles.length === 0 ? (
        <p className="empty-text">No news available</p>
      ) : (
        articles.slice(0, 5).map((article) => (
          <div
            key={article.url}
            className="news-item"
          >
            <a
              className="news-link"
              href={article.url}
              target="_blank"
              rel="noreferrer"
            >
              {article.title}
            </a>
          </div>
        ))
      )}
    </div>
  );
}

export default FinanceNews;
