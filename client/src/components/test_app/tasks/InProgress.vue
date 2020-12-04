<template>
  <v-card class="pa-6" elevation="0">
    <v-row align="center" class="flex-nowrap mb-6" no-gutters>
      <v-card-text class="pa-0">
        <h2 class="headline font-weight-bold">In Progress</h2>
      </v-card-text>
      <v-spacer />
      <v-btn
        @click="toggleForm(true)"
        x-small
        fab
        light
        color="primary"
        elevation="0"
      >
        <v-icon size="medium" class="black--text" light>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-row>
    <div v-if="form">
      <CreateTask :toggleForm="toggleForm" status="in-progress" />
    </div>
    <div v-for="task in tasks" :key="task.id" class="mt-3 py-1">
      <Task :task="task" :deleteTask="deleteTask" :updateTask="updateTask" />
    </div>
  </v-card>
</template>

<script>
import Task from "./Task";
import CreateTask from "./CreateTask";
export default {
  name: "InProgress",

  data() {
    return {
      form: false,
    };
  },
  methods: {
    toggleForm(value) {
      this.form = value;
    },
  },
  props: ["tasks", "deleteTask", "updateTask"],
  components: {
    Task,
    CreateTask,
  },
};
</script>

<style></style>
