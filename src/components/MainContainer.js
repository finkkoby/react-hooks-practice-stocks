import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [alphaSort, setAlphaSort] = useState(false)
  const [priceSort, setPriceSort] = useState(false)
  const [filterBy, setFilterBy] = useState('')

  useEffect(() => {
    fetch('http://localhost:3001/stocks')
    .then(res => res.json())
    .then(list => setStocks(list))
  }, [])

  function handleSortChange(e) {
    if(alphaSort === false && priceSort === false) {
      if(e.target.value === 'Alphabetically') {
        setAlphaSort(!alphaSort)
      }
      else if(e.target.value === 'Price') {
        setPriceSort(!priceSort)
      }
    } else {
      if(e.target.value === 'Alphabetically' && priceSort) {
        setAlphaSort(!alphaSort)
        setPriceSort(!priceSort)
      }
      else if(e.target.value === 'Price' && alphaSort) {
        setAlphaSort(!alphaSort)
        setPriceSort(!priceSort)
      }
    }
  }

  function handleFilterChange(e) {
    setFilterBy(e.target.value)
  }

  const sortedArr = stocks.sort((a, b) => {
    if(alphaSort === false && priceSort === false) {
      return 0
    } else if (alphaSort) {
      if(a.name < b.name) {
        return -1
      } else if (a.name > b.name) {
        return 1
      } else {
        return 0
      }
    } else if (priceSort) {
      if(a.price < b.price) {
        return -1
      } else if (a.price > b.price) {
        return 1
      } else {
        return 0
      }
    }
  })

  const filteredStocks = stocks.filter(stock => {
    if(filterBy === '') {
      return true
    } else if(filterBy === stock.type) {
      return true
    } else {
      return false
    }
  })


  return (
    <div>
      <SearchBar alphaSort={alphaSort} priceSort={priceSort} filterBy={filterBy} onSortChange={handleSortChange} onFilterChange={handleFilterChange}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} portfolio={portfolio} setPortfolio={setPortfolio}/>
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={stocks} setStocks={setStocks} portfolio={portfolio} setPortfolio={setPortfolio}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
