import axios from "axios";

const state = {
  user: null,
  isLoggedIn: false,
  authenticating: false,
  verifyingUser: false,
  errors: null,
};
const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
  authenticating: (state) => state.authenticating,
  errors: (state) => state.errors,
  verifyingUser: (state) => state.verifyingUser,
  user: (state) => state.user,
};
const actions = {
  async login({ commit }, userInput) {
    try {
      commit("authenticating", null);

      const res = await axios.post("auth/login", userInput);

      commit("authenticated", res.data);
    } catch (err) {
      commit("setErrors", { login: err.response.data.error.message });
    }
  },
  async register({ commit }, userInput) {
    try {
      commit("authenticating", null);

      const res = await axios.post("auth/register", userInput);

      commit("authenticated", res.data);
    } catch (err) {
      commit("setErrors", { register: err.response.data.error.message });
    }
  },
  logout({ commit }) {
    console.log("logout");
    commit("logout", null);
  },
};
const mutations = {
  verifyingUser: (state, value) => {
    state.verifyingUser = true;
    state.errors = null;
  },
  authenticated: (state, user) => {
    state.isLoggedIn = true;
    state.authenticating = false;
    state.verifyingUser = false;
    state.errors = null;
    state.user = user;
  },
  authenticating: (state, value) => {
    state.authenticating = true;
  },
  setErrors: (state, err) => {
    state.errors = err;
    state.authenticating = false;
    state.verifyingUser = false;
  },
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
