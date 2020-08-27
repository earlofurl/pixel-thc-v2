export function getStockById(state, id) {
  return state.stock.find(stock => stock.id === id);
}
