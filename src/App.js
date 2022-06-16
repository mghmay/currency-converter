import React, { useState, useEffect } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow'

const BASE_URL = 'http://api.exchangeratesapi.io/v1/';
const ACCESS_KEY = '?access_key=467fe1816b9464809158fe3b5d3b150e';

function App() {
  
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null)
  const [amount, setAmount] = useState(1);
  // the below lets use know if the input is from the from or tocurrency field
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  // note that we want to know if we are changing the to or from amount so that we can either 
  // divide or times by the exchange rate
  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    // note this would works if the cunts didn't charge for convertion!!
    fetch(`${BASE_URL}latest${ACCESS_KEY}&base=${fromCurrency}&symbols=${toCurrency}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
    // setExchangeRate(data.rates[toCurrency]))
  }, [fromCurrency, toCurrency])

  useEffect(() => {
    fetch(`${BASE_URL}latest${ACCESS_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        const secondCurrency = Object.keys(data.rates)[1];
        setCurrencyOptions([...Object.keys(data.rates)])
        setFromCurrency(firstCurrency);
        setToCurrency(secondCurrency)
        setExchangeRate(data.rates[firstCurrency])
      })
  }, [])

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    //true here means that we would times it
    setAmountInFromCurrency(true);
  }

  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    // false here means that we would divide it
    setAmountInFromCurrency(false);
  }

  return (
    <>
      <h1>Currency converter</h1>
      <CurrencyRow 
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        //note here that the target is taken from the currency row component
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
      />
    </>
    
  );
}

export default App;
