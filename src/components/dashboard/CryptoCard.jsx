import { useEffect, useState } from "react";
import { getCryptoPrices } from "../../api/cryptoApi";

function CryptoCard() {
  const [crypto, setCrypto] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    getCryptoPrices().then((data) => {
      if (!isMounted) {
        return;
      }

      if (data?.error) {
        setError(data.error);
        return;
      }

      if (!data) {
        setError("Prices unavailable.");
        return;
      }

      setCrypto(data);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (error) {
    return (
      <div className="card crypto-card">
        <p className="empty-text">{error}</p>
      </div>
    );
  }

  if (!crypto?.bitcoin || !crypto?.ethereum) {
    return (
      <div className="card crypto-card">
        <p className="empty-text">Loading...</p>
      </div>
    );
  }

  return (
    <div className="card crypto-card">
      <h3>Crypto Market</h3>

      <div className="currency-list">
        <div className="currency-item">
          <span>BTC</span>
          <strong>${crypto.bitcoin.usd}</strong>
        </div>
        <div className="currency-item">
          <span>ETH</span>
          <strong>${crypto.ethereum.usd}</strong>
        </div>
      </div>
    </div>
  );
}

export default CryptoCard;
