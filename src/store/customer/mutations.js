export function ADD_CUSTOMER(state, customer) {
  state.customers.push(customer);
}

export function SET_CUSTOMERS(state, customers) {
  state.customers = customers;
}

export function SET_CUSTOMERS_TOTAL(state, customersTotal) {
  state.customersTotal = customersTotal;
}

export function SET_CUSTOMER(state, customer) {
  state.customer = customer;
}

export function ADD_FACILITY(state, facility) {
  state.facilities.push(facility);
}

export function SET_FACILITIES(state, facilities) {
  state.facilities = facilities;
}
