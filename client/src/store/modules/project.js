import axios from "axios";
import router from "../../router/";
import { v4 as uuidv4 } from "uuid";

const state = {
  loading: false,
  created: false,
  allProjects: [],
  currentProject: null,
};

const getters = {
  loading: (state) => state.loading,
  created: (state) => state.created,
  allProjects: (state) => state.allProjects,
  currentProject: (state) => state.currentProject,
};

const actions = {
  async getProjects({ commit }, args) {
    commit("loading", null);
    const res = await axios.get("api/app/projects");
    commit("setProjects", res.data);
  },
  async createProject({ commit }, args) {
    commit("loading", null);
    const newProject = {
      id: uuidv4(),
      title: args.title,
    };
    commit("addProject", newProject);
  },
  async getCurrentProject({ commit }, id) {
    try {
      commit("loading", null);

      const currentProject = {
        id,
        title: "Vintage Vinyls",
        author_name: "Parsa",
        author_id: uuidv4(),
        tasks: [
          {
            id: uuidv4(),
            note: "Fix Bug",
            status: "todo",
            project_id: uuidv4(),
          },
          {
            id: uuidv4(),
            note: "Fix Bsd",
            status: "in-progress",
            project_id: uuidv4(),
          },
          {
            id: uuidv4(),
            note: "Fix more Bug",
            status: "todo",
            project_id: uuidv4(),
          },
          {
            id: uuidv4(),
            note: "Add Feature",
            status: "done",
            project_id: uuidv4(),
          },
        ],
      };

      // const currentTasks = currentProject.tasks;

      commit("setCurrentProject", currentProject);
      // commit("setCurrentTasks", currentTasks);
    } catch (err) {
      console.log(err);
    }
  },
  async createTask({ commit }, args) {
    try {
      const newTask = {
        id: uuidv4(),
        note: args.note,
        status: args.status,
        project_id: uuidv4(),
      };

      commit("addTask", newTask);
    } catch (err) {
      console.log(err);
    }
  },
  async deleteTask({ commit }, id) {
    commit("removeTask", id);
  },
  async updateTask({ commit }, args) {
    commit("taskStatus", args);
  },
  async deleteProject({ commit }, id) {
    commit("removeProject", id);
    router.push("/dashboard");
  },
};

const mutations = {
  loading: (state, status) => {
    state.loading = true;
  },
  addProject: (state, newProject) => {
    state.created = true;
    state.loading = false;
    state.allProjects = [newProject, ...state.allProjects];
  },
  setProjects: (state, projects) => {
    state.loading = false;
    state.allProjects = projects;
  },
  setCurrentProject: (state, project) => {
    state.currentProject = project;
    state.loading = false;
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
