export function ADD_STOCK(state, stock) {
  state.stock.push(stock);
}

export function SET_STOCK(state, stock) {
  state.stock = stock;
}

export function SET_STOCK_TOTAL(state, stockTotal) {
  state.stockTotal = stockTotal;
}

export function SET_STOCKS(state, stocks) {
  state.stocks = stocks;
}

// BUG: Successfully adding to state, but not always the correct item.
export function ADJUST_STOCK_QUANTITY(state, row) {
  console.log(row);
  const stockItem = state.stocks.find(x => x.id === row.stock);
  stockItem.quantity = parseInt(stockItem.quantity) + parseInt(row.quantity);
  // store.dispatch("stock/fetchStockById", row.stock)
  // console.log(stockItem)
  // console.log(adjustQuantity)
  // console.log(state.stocks)
  // let stockToAdjust = stock
  // state.stock.quantity = stockItem.quantity + quantity
}
