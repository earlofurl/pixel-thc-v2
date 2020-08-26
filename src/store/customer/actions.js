import apiService from "src/services/apiService";

export function createCustomer({ commit, dispatch }, customer) {
  return apiService
    .postCustomer(customer)
    .then(response => {
      console.log(response);
      commit("ADD_CUSTOMER", customer);
    })
    .catch(error => {
      throw new Error("Could not create customer");
    });
}

export function fetchCustomers({ commit, dispatch, state }) {
  return apiService
    .getCustomers()
    .then(response => {
      commit(
        "SET_CUSTOMERS_TOTAL",
        parseInt(response.headers["x-total-count"])
      );
      commit("SET_CUSTOMERS", response.data);
    })
    .catch(error => {
      throw new Error("Could not fetch customers");
    });
}

export function fetchCustomer({ commit, getters, state }, id) {
  if (id === state.customer.id) {
    return state.customer;
  }

  var customer = getters["getCustomerById"];

  if (customer) {
    commit("SET_CUSTOMER", customer);
    return customer;
  } else {
    return apiService.getCustomer(id).then(response => {
      commit("SET_CUSTOMER", response.data);
      return response.data;
    });
  }
}
