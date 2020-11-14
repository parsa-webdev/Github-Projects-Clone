<template>
  <v-row class="justify-center" no-gutters v-if="currentProject">
    <v-col class="ma-4">
      <Todo
        :tasks="currentProject.tasks.filter((i) => i.status === 'todo')"
        :deleteTask="deleteTask"
        :updateTask="updateTask"
      />
    </v-col>
    <v-col class="ma-4">
      <InProgress
        :tasks="currentProject.tasks.filter((i) => i.status === 'in-progress')"
        :deleteTask="deleteTask"
        :updateTask="updateTask"
      />
    </v-col>
    <v-col class="ma-4">
      <Done
        :tasks="currentProject.tasks.filter((i) => i.status === 'done')"
        :deleteTask="deleteTask"
        :updateTask="updateTask"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Todo from "./Todo";
import InProgress from "./InProgress";
import Done from "./Done";

export default {
  name: "Columns",
  components: {
    Todo,
    InProgress,
    Done,
  },
  //   data() {
  //     return {
  //       myProject: null,
  //     };
  //   },
  computed: {
    ...mapGetters({
      currentProject: "project/currentProject",
      authenticating: "auth/authenticating",
    }),
  },

  methods: {
    ...mapActions({
      getCurrentProject: "project/getCurrentProject",
      deleteTask: "project/deleteTask",
      updateTask: "project/updateTask",
    }),
  },
};
</script>

<style></style>
