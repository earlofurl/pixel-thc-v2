import apiService from "src/services/apiService";

export function fetchFacilities({ commit, dispatch, state }) {
  return apiService
    .getFacilities()
    .then(response => {
      commit("SET_FACILITIES", response.data);
    })
    .catch(error => {
      throw new Error("Could not fetch facilities");
    });
}

export function fetchFacility({ commit, getters, state }, id) {
  if (id === state.facility.id) {
    return state.facility;
  }

  var facility = getters["getFacilityById"];

  if (facility) {
    commit("SET_FACILITY", facility);
    return facility;
  } else {
    return apiService.getFacility(id).then(response => {
      commit("SET_FACILITY", response.data);
      return response.data;
    });
  }
}

// export function fetchFacilitiesByCustomer({ commit, dispatch, state, id }) {
//   return apiService
//     .getFacilitiesByCustomer(id)
//     .then(response => {
//       commit("SET_FACILITIES", response.data);
//     })
//     .catch(error => {
//       throw new Error("Could not fetch facilities");
//     });
// }
