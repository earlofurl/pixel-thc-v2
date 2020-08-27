export function getLabById(state, id) {
  return state.labs.find(lab => lab.id === id);
}
