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
