import axios from "axios";

const state = {
  user: null,
  isLoggedIn: false,
  authenticating: false,
  verifyingUser: true,
  errors: null,
};
const getters = {};
const actions = {
  async login({ commit }, userInput) {
    try {
      console.log(userInput);
    } catch (err) {
      console.log(err.response.data);
    }
  },
  async register({ commit }, userInput) {
    try {
      console.log(userInput);
    } catch (err) {
      console.log(err);
    }
  },
  logout({ commit }) {
    console.log("logout");
    commit("logout", null);
  },
};
const mutations = {
  logout: (state, value) => {
    state.authenticating = false;
    state.isLoggedIn = false;
    state.errors = null;
    state.user = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
