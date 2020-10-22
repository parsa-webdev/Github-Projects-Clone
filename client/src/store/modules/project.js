import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const state = {
  creating: false,
  created: false,
  allProjects: [
    {
      id: uuidv4(),
      title: "Hipstagram",
    },
    {
      id: uuidv4(),
      title: "Bitter",
    },
    {
      id: uuidv4(),
      title: "Cookuisines",
    },
  ],
};

const getters = {
  creating: (state) => state.creating,
  created: (state) => state.created,
  allProjects: (state) => state.allProjects,
};

const actions = {
  async createProject({ commit }, args) {
    commit("creating", null);
    const newProject = {
      id: uuidv4(),
      title: args.title,
    };
    commit("addProject", newProject);
  },
};

const mutations = {
  creating: (state, status) => {
    state.creating = true;
  },
  addProject: (state, newProject) => {
    state.created = true;
    state.creating = false;
    state.allProjects = [newProject, ...state.allProjects];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
