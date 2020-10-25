export function ADD_ORDER(state, order) {
  state.orders.push(order);
}

export function SET_ORDERS(state, orders) {
  state.orders = orders;
}

export function SET_ORDERS_TOTAL(state, ordersTotal) {
  state.ordersTotal = ordersTotal;
}

export function SET_ORDER(state, order) {
  state.order = order;
}

export function ADD_TO_NEW_ORDER(state, newOrderItem) {
  state.newOrder.push(newOrderItem);
}

export function CREATE_FRESH_NEW_ORDER_OBJECT(state) {
  state.newOrder = [];
}

export function REMOVE_NEW_ITEM(state, newOrderItem) {
  const index = state.newOrder.indexOf(newOrderItem);
  state.newOrder.splice(index, 1);
}

export function DELETE_ORDER(state, order) {
  const index = state.orders.indexOf(order);
  state.orders.splice(index, 1);
}
