import apiService from "src/services/apiService";

export function fetchOrders({ commit, dispatch, state }) {
  return apiService
    .getOrders()
    .then(response => {
      commit("SET_ORDERS_TOTAL", parseInt(response.headers["x-total-count"]));
      commit("SET_ORDERS", response.data);
    })
    .catch(error => {
      throw new Error("Could not fetch orders");
    });
}

export function fetchOrder({ commit, getters, state }, id) {
  if (id === state.order.id) {
    return state.order;
  }

  var order = getters["getOrderById"];

  if (order) {
    commit("SET_ORDER", order);
    return order;
  } else {
    return apiService.getOrder(id).then(response => {
      commit("SET_ORDER", response.data);
      return response.data;
    });
  }
}

export function addToNewOrder({ commit, state }, newOrderItem) {
  commit("ADD_TO_NEW_ORDER", newOrderItem);
}

export function createFreshNewOrderObject({ commit, state }) {
  commit("CREATE_FRESH_NEW_ORDER_OBJECT");
}

export function createOrder({ commit, dispatch }, order) {
  return apiService
    .postOrder(order)
    .then(response => {
      console.log(response);
      commit("ADD_ORDER", order);
    })
    .catch(error => {
      throw new Error("Could not create order");
    });
}

export function putOrder({ commit, state }, newOrderItem) {
  commit("SET_ORDER", newOrderItem);
}

export function clearNewOrderTable({ commit, state }) {
  commit("CLEAR_NEW_ORDER_TABLE");
}

export function removeNewItem({ commit, state }, newOrderItem) {
  commit("REMOVE_NEW_ITEM");
}

export function changeOrderStatus({ commit, state }, { id, status }) {
  status = { status: status };
  return apiService.patchOrderStatus(id, status).then(response => {
    console.log(response.data);
    commit("SET_ORDER", response.data);
  });
}

export function deleteOrder({ commit, state }, id) {
  return apiService.deleteOrder(id).then(response => {
    commit("DELETE_ORDER");
    return response;
  });
}

export function deleteLineItem({ commit, getters, state }, id) {
  return apiService.deleteLineItem(id).then(response => {
    console.log(response);
    commit("DELETE_LINEITEM", response.data);
    return response.data;
  });
}

export function addToOrder({ commit, getters, state }, newOrder) {
  console.log(
    "Items incoming to addToOrder from newOrder state are: " +
      JSON.stringify(newOrder)
  );
  // lineItems.push(order.lineItems);
  // lineItems.push(items);
  return apiService
    .patchOrderItems(newOrder.id, newOrder.lineItems)
    .then(response => {
      console.log(response);
      commit("UPDATE_ORDER_ITEMS", response.data);
      return response.data;
    });
}
