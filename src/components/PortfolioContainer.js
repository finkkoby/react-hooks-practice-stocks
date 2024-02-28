import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolio, setPortfolio }) {

  function handleStockSell(item) {
    const newPortStocks = portfolio.filter(stock => {
      if(stock === item) return false
      else return true
    })
    setPortfolio(newPortStocks)
  }

  const boughtStocks = portfolio.map(stock => {
    return <Stock stock={stock} key={stock.ticker} onStockClick={handleStockSell} />
  })
  return (
    <div>
      <h2>My Portfolio</h2>
      {boughtStocks}
    </div>
  );
}

export default PortfolioContainer;
