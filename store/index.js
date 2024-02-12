import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    state: () => ({
      CalcUsers: [],
    }),
    mutations: {
      PostUsersCalculate: (state, option = null) => state.CalcUsers = option,
    },
    actions: {
    },
  });
};

export default createStore