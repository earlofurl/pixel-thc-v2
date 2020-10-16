export function getLineItemById(state, id) {
  return state.lineItems.find(lineItem => lineItem.id === id);
}

export function getLineItemsByOrderId(state, orderId) {
  return state.lineItems.filter(lineItem => lineItem.orderId === orderId);
}
