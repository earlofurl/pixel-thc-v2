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

// BUG: Successfully adding to state, and fixed NaN conversion error, but not always adjusting the correct item.
// Seems to stick to the first item adjusted and then add every subsequent quantity to that first item.
export function ADJUST_STOCK_QUANTITY(state, row) {
  console.log(row);
  let stockItem = state.stocks.find(x => x.id === row.stockId);
  stockItem.quantity =
    parseFloat(stockItem.quantity) + parseFloat(row.quantity);
  // store.dispatch("stock/fetchStockById", row.stock)
  // console.log(stockItem)
  // console.log(adjustQuantity)
  // console.log(state.stocks)
  // let stockToAdjust = stock
  // state.stock.quantity = stockItem.quantity + quantity
}
