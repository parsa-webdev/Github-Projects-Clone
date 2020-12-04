import axios from "../../helpers/axios_interceptors";
import router from "../../router";
import { v4 as uuidv4 } from "uuid";

const state = {
  created: false,
  currentProject: {
    id: uuidv4(),
    tasks: [
      {
        id: uuidv4(),
        note: "Task 1",
        status: "todo",
      },
      {
        id: uuidv4(),
        note: "Task 2",
        status: "in-progress",
      },
      {
        id: uuidv4(),
        note: "Task 3",
        status: "done",
      },
    ],
  },
  errors: null,
};

const getters = {
  created: (state) => state.created,
  currentProject: (state) => state.currentProject,
  errors: (state) => state.errors,
};

const actions = {
  createTask({ commit }, args) {
    try {
      const task = {
        id: uuidv4(),
        note: args.note,
        status: args.status,
      };

      commit("addTask", task);
    } catch (err) {
      console.log(err);
    }
  },
  deleteTask({ commit }, id) {
    commit("removeTask", id);
  },
  updateTask({ commit }, args) {
    commit("taskStatus", args);
  },
};

const mutations = {
  setErrors: (state, err) => {
    state.errors = err;
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
