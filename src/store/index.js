import Vue from "vue";
import Vuex from "vuex";
import customer from "./customer";
import lab from "./lab";
import lineItem from "./lineItem";
import order from "./order";
import stock from "./stock";

// import example from './module-example'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      customer,
      lab,
      lineItem,
      order,
      stock
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
