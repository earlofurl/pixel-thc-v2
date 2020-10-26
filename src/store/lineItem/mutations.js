export function ADD_LINEITEM(state, lineItem) {
  state.lineItems.push(lineItem);
}

export function SET_LINEITEMS(state, lineItems) {
  state.lineItems = lineItems;
}

export function SET_LINEITEM(state, lineItem) {
  state.lineItem = lineItem;
}

export function DELETE_LINEITEM(state, lineItem) {
  const index = state.lineItems.indexOf(lineItem);
  state.lineItems.splice(index, 1);
}
