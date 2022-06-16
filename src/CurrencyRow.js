import React from 'react'
// note the destructuring of the prop, this could also be done as const {currencyOptions} = props
export default function CurrencyRow({ currencyOptions, selectedCurrency, onChangeCurrency, amount, onChangeAmount }) {
  return (
    <div>
      <input type="number" className="input" value={amount} onChange={onChangeAmount}/>
      <select value={selectedCurrency} onChange={onChangeCurrency}>
      {currencyOptions.map(option => <option key= {option} value={option}>{option}</option>)}
      </select>
    </div>
  )
}
