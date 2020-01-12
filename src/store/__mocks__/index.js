import Vue from 'vue';
import Vuex from 'vuex';
import products from './modules/products';


Vue.use(Vuex);

const state = {};
const mutations = {};
const actions = {};
const modules = { products };

function createStoreMocks(custom = {
  state: {},
  mutations: {},
  actions: {},
  modules: { products },
}) {
  const mockState = Object.assign({}, state, custom.state);
  const mockActions = Object.assign({}, actions, custom.actions);
  const mockMutations = Object.assign({}, mutations, custom.mutations);
  const mockModules = Object.assign({}, modules, custom.modules);

  return {
    state: mockState,
    actions: mockActions,
    modules: mockModules,
    mutations: mockMutations,
    store: new Vuex.Store({
      state: mockState,
      mutations: mockMutations,
      actions: mockActions,
      modules: mockModules,
    }),
  };
}

export default createStoreMocks;
