import apiService from "src/services/apiService";

export function fetchLineItems({ commit }, ids) {
  console.log(ids);

  let request = "";
  for (let id in ids) {
    request += "ids=" + ids[id] + "&";
  }

  console.log(request);

  return apiService
    .getLineItems(request)
    .then(response => {
      console.log(response.data);
      commit("SET_LINEITEMS", response.data);
    })
    .catch(error => {
      throw new Error("Could not fetch lineItems");
    });
}

export function fetchLineItemsByOrder({ commit, getters, state }, orderId) {
  return apiService.getLineItemsByOrderId(orderId).then(response => {
    commit("SET_LINEITEMS", response.data);
    return response.data;
  });
}

export function fetchLineItem({ commit, getters, state }, id) {
  if (id === state.lineItem.id) {
    return state.lineItem;
  }

  var lineItem = getters["getLineItemById"];

  if (lineItem) {
    commit("SET_LINEITEM", lineItem);
    return lineItem;
  } else {
    return apiService.getLineItem(id).then(response => {
      commit("SET_LINEITEM", response.data);
      return response.data;
    });
  }
}

export async function changeLineItemStatus(
  { commit, getters, state },
  id,
  status
) {
  return apiService.changeLineItemStatus(id, status).then(response => {
    console.log(response.data);
    commit("SET_LINEITEM", response.data);
    return response.data;
  });
}
