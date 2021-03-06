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
  { id, status }
) {
  console.log(id, status);
  status = { packedStatus: status };
  return apiService.changeLineItemStatus(id, status).then(response => {
    console.log(response.data);
    commit("SET_LINEITEM", response.data);
    return response.data;
  });
}

export function changeLineItemQuantity(
  { commit, getters, state },
  { id, quantity }
) {
  return apiService.changeLineItemQuantity(id, quantity).then(response => {
    commit("SET_LINEITEM", response.data);
    return response.data;
  });
}

export function changeLineItemPpu({ commit, getters, state }, { id, ppu }) {
  return apiService.changeLineItemPpu(id, ppu).then(response => {
    commit("SET_LINEITEM", response.data);
    return response.data;
  });
}

// export function deleteLineItem({ commit, getters, state }, id) {
//   return apiService.deleteLineItem(id).then(response => {
//     console.log(response);
//     commit("DELETE_LINEITEM", response.data);
//     return response.data;
//   });
// }
