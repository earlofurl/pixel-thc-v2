import apiService from "src/services/apiService";

export function createStock({ commit, dispatch }, stock) {
  return apiService
    .postStock(stock)
    .then(response => {
      console.log(response);
      commit("ADD_STOCK", stock);
    })
    .catch(error => {
      throw new Error("Could not create stock");
    });
}

export function fetchStock({ commit, dispatch, state }) {
  return apiService
    .getStock()
    .then(response => {
      commit("SET_STOCK_TOTAL", parseInt(response.headers["x-total-count"]));
      commit("SET_STOCK", response.data);
    })
    .catch(error => {
      throw new Error("Could not fetch stock");
    });
}

export function fetchStockById({ commit, getters, state }, id) {
  if (id === state.stock.id) {
    return state.stock;
  }

  var stock = getters["getStockById"];

  if (stock) {
    commit("SET_STOCK", stock);
    return stock;
  } else {
    return apiService.getStockById(id).then(response => {
      commit("SET_STOCK", response.data);
      return response.data;
    });
  }
}

export function putStock({ commit, state }, stock) {
  return apiService.putStock(stock);
}

export function patchStock({ commit, state }, stockPatch) {
  return apiService.patchStock(stockPatch);
}

export function adjustStockQuantity({ commit, state }, row) {
  // console.log(row.quantity)
  // const stockItem = state.stocks.find(x => x.id === row.stock);
  // const stockItem = fetchStockById(row.stock);
  // console.log(quantity)
  // console.log(stockItem);
  // const adjustQuantity = row.quantity
  // console.log(adjustQuantity)
  // stockItem.quantity = row.quantity
  commit("ADJUST_STOCK_QUANTITY", row);
  // commit("ADJUST_STOCK_QUANTITY", row);
}
