import axios from "axios";
import router from "../../router/";
import { v4 as uuidv4 } from "uuid";

const state = {
  loading: true,
  created: false,
  allProjects: [],
  currentProject: null,
  errors: null,
};

const getters = {
  loading: (state) => state.loading,
  created: (state) => state.created,
  allProjects: (state) => state.allProjects,
  currentProject: (state) => state.currentProject,
  errors: (state) => state.errors,
};

const actions = {
  async getProjects({ commit }, args) {
    try {
      commit("loading", null);
      const res = await axios.get("api/app/projects");
      commit("setProjects", res.data);
    } catch (err) {
      commit("setErrors", { getProjects: err.response.data.error.message });
    }
  },
  async createProject({ commit }, userInput) {
    try {
      commit("loading", null);

      const res = await axios.post("api/app/project/", userInput);

      const project = {
        id: res.data._id,
        title: res.data.title,
        author_id: res.data.author_id,
        author_name: res.data.author_name,
      };

      commit("addProject", project);
    } catch (err) {
      console.log(err.response.data);
    }
  },
  async getCurrentProject({ commit }, id) {
    try {
      commit("loading", null);

      console.log(id);

      const res = await axios.get(`api/app/project/${id}`);

      commit("setCurrentProject", res.data);
    } catch (err) {
      commit("setErrors", { currentProject: err.response.data.error.message });
    }
  },
  async createTask({ commit }, args) {
    try {
      const res = await axios.post(`api/app/project/${args.projectID}/task`, {
        note: args.note,
        status: args.status,
      });

      commit("addTask", res.data);
    } catch (err) {
      console.log(err);
    }
  },
  async deleteTask({ commit }, id) {
    await axios.delete(`api/app/task/${id}`);
    commit("removeTask", id);
  },
  async updateTask({ commit }, args) {
    await axios.put(`api/app/task/${args.id}`, {
      status: args.status,
    });

    commit("taskStatus", args);
  },
  async deleteProject({ commit }, id) {
    await axios.delete(`api/app/project/${id}`);
    commit("removeProject", id);
    router.push("/create");
  },
};

const mutations = {
  loading: (state, status) => {
    state.loading = true;
  },
  setErrors: (state, err) => {
    state.errors = err;
  },
  addProject: (state, newProject) => {
    state.created = true;
    state.loading = false;
    state.allProjects = [newProject, ...state.allProjects];
  },
  setProjects: (state, projects) => {
    state.loading = false;
    state.allProjects = projects;
    state.errors = null;
  },
  setCurrentProject: (state, project) => {
    state.currentProject = project;
    state.loading = false;
    state.errors = null;
  },
  addTask: (state, newTask) => {
    state.currentProject.tasks = [newTask, ...state.currentProject.tasks];
  },
  removeTask: (state, id) => {
    state.currentProject.tasks = state.currentProject.tasks.filter(
      (i) => i.id !== id
    );
  },
  taskStatus: (state, args) => {
    let tasks = state.currentProject.tasks;
    const index = tasks.findIndex((i) => i.id === args.id);
    tasks[index].status = args.status;
  },
  removeProject: (state, id) => {
    state.allProjects = state.allProjects.filter((i) => i.id !== id);
    state.currentProject = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
