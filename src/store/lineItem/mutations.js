export function ADD_LINEITEM(state, lineItem) {
  state.lineItems.push(lineItem);
}

export function SET_LINEITEMS(state, lineItems) {
  state.lineItems = lineItems;
}

export function SET_LINEITEM(state, lineItem) {
  state.lineItem = lineItem;
}

// export function DELETE_LINEITEM(state, lineItem) {
//   console.log(state);
//   console.log(lineItem.id);
//   // const index = state.lineItems.indexOf(lineItem);
//   // console.log(index);
//   console.log(state.order.lineItems);
//   const index = state.order.lineItems.findIndex(
//     item => item.id === lineItem.id
//   );
//   console.log(index);
//   return state.order.lineItems.splice(index, 1);
// }
