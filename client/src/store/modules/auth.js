import axios from "axios";
import router from "../../router";
const state = {
  user: null,
  isLoggedIn: false,
  authenticating: false,
  verifyingUser: true,
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
  checkUser({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        commit("authenticating", null);
        const res = await axios.get("api/auth/verifyuser", {
          "Cache-Control": "no-cache",
        });
        commit("authenticated", res.data);
        resolve();
      } catch (err) {
        commit("setErrors", { unauthorized: err.message });
        reject(new Error("Not Logged In"));
      }
    });
  },
  async login({ commit, dispatch }, userInput) {
    try {
      commit("authenticating", null);

      const res = await axios.post("api/auth/login", userInput);

      commit("authenticated", res.data);

      dispatch("project/getProjects", {}, { root: true });

      router.push("/create");
    } catch (err) {
      commit("setErrors", { login: err.response.data.error.message });
    }
  },
  async logout({ commit }) {
    try {
      const res = await axios.delete("api/auth/logout");

      commit("logout", null);
      router.push("/login");
    } catch (err) {
      console.log(err.response.data.error.message);
    }
  },
  async register({ commit }, userInput) {
    try {
      commit("authenticating", null);

      const res = await axios.post("api/auth/register", userInput);

      commit("authenticated", res.data);
      router.push("/create");
    } catch (err) {
      commit("setErrors", { register: err.response.data.error.message });
    }
  },
};

const mutations = {
  verifyingUser: (state, value) => {
    state.verifyingUser = false;
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
    state.verifyingUser = false;
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
