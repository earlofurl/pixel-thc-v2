export function getCustomerById(state, id) {
  return state.customers.find(customer => customer.id === id);
}

export function getCustomerNameById(state, id) {
  customer = state.customers.find(customer => customer.id === id);
  return customer.name;
}
