import React from "react";
import Stock from "./Stock";

function StockContainer({ stocks, portfolio, setPortfolio }) {

  function handleStockBuy(stock) {
    if (portfolio.length > 0) {
      for (let item of portfolio) {
        if (item.name === stock.name) {
          return
        }
      }
      setPortfolio([...portfolio, stock])
    } else if(portfolio.length === 0) {
      setPortfolio([...portfolio, stock])
    }
  }

  const stockCards = stocks.map(stock => {
    return <Stock stock={stock} key={stock.ticker} onStockClick={handleStockBuy}/>
  })
  return (
    <div>
      <h2>Stocks</h2>
      {stockCards}
    </div>
  );
}

export default StockContainer;
