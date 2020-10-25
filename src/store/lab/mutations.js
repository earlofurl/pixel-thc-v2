export function ADD_LAB(state, lab) {
  state.lab.push(lab);
}

export function SET_LAB(state, lab) {
  state.lab = lab;
}

export function SET_LABS_TOTAL(state, labsTotal) {
  state.labsTotal = labsTotal;
}

export function SET_LABS(state, labs) {
  state.labs = labs;
}

export function SET_CURRENT_LABS(state, labs) {
  state.currentLabs = labs;
}
