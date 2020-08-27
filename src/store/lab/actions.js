import apiService from "src/services/apiService";

export function fetchLabs({ commit, dispatch, state }) {
  return apiService
    .getLabResults()
    .then(response => {
      commit("SET_LABS_TOTAL", parseInt(response.headers["x-total-count"]));
      commit("SET_LABS", response.data);
    })
    .catch(error => {
      throw new Error("Could not fetch labs");
    });
}
