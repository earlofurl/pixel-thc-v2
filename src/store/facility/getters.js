export function getFacilityById(state, id) {
  return state.facilities.find(facility => facility.id === id);
}

export function getFacilitiesByCustomer(state, customerId) {
  return state.facilities.find(facility => facility.customerId === customerId);
}
