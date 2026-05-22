import { useEffect, useState } from "react";

import { getExchangeRates } from "../../api/currencyApi";

function CurrencyCard() {
  const [rates, setRates] = useState(null);
  const [error, setError] = useState("");
  const amountPhp = 1000;

  useEffect(() => {
    let isMounted = true;

    async function loadRates() {
      const data = await getExchangeRates();

      if (!isMounted) {
        return;
      }

      if (!data?.rates) {
        setError("Rates unavailable");
        return;
      }

      setRates(data.rates);
      setError("");
    }

    loadRates();

    return () => {
      isMounted = false;
    };
  }, []);

  if (error) {
    return <p className="empty-text">{error}</p>;
  }

  if (!rates) {
    return (
      <p className="empty-text">Loading rates...</p>
    );
  }

  return (
    <div className="currency-list">
      <div className="currency-item">
        <span>USD</span>
        <strong>
          ${(amountPhp * rates.USD).toFixed(2)}
        </strong>
      </div>

      <div className="currency-item">
        <span>EUR</span>
        <strong>
          EUR {(amountPhp * rates.EUR).toFixed(2)}
        </strong>
      </div>

      <div className="currency-item">
        <span>JPY</span>
        <strong>
          JPY {(amountPhp * rates.JPY).toFixed(0)}
        </strong>
      </div>
    </div>
  );
}

export default CurrencyCard;
