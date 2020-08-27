export function getLineItemById(state, id) {
  return state.lineItems.find(lineItem => lineItem.id === id);
}
