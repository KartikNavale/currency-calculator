import React, { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);

  const handleConvert = () => {
    const conversionRate = 2.17;
    const parsedAmount = parseFloat(amount);

    if (!isNaN(parsedAmount)) {
      const result = parsedAmount * conversionRate;
      setConvertedAmount(result);
    } else {
      console.error("Invalid amount input");
    }
  };

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(
          "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
        );
        const data = await response.json();
        setCurrencies(Object.keys(data));
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);

  return (
    <>
      <div className="main-div">
        <div className="parent-div">
          <h1 className="heading">Currency Converter</h1>
          <div className="input-div">
            <div className="input-div-childMain">
              <p className="head-p">Amount</p>
              <input
                className="amount-input"
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="input-div-child">
              <p className="head-p">From</p>
              <form>
                <select
                  className="country-input"
                  name="fromCurrency"
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                >
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </form>
            </div>
            <div className="input-div-child-icon">
              <img className="swap-icon" src="img/Swap1.png" alt="" />
            </div>
            <div className="input-div-child">
              <p className="head-p">To</p>
              <form>
                <select
                  className="country-input"
                  name="toCurrency"
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                >
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </form>
            </div>
          </div>
          <div>
            <button className="btn" onClick={handleConvert}>
              Convert
            </button>
            <p className="result-p">Converted Amount:</p>
            <p className="last-p">
              {convertedAmount !== null
                ? `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`
                : ""}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
