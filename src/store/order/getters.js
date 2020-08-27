export function getOrderById(state, id) {
  return state.orders.find(order => order.id === id);
}
