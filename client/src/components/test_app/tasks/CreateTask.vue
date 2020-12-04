<template>
  <v-form v-model="valid" @submit.prevent="addTask">
    <v-text-field
      label="Task"
      type="text"
      v-model="task"
      filled
      dense
      class="mb-0"
      :rules="[rules.required]"
    ></v-text-field>
    <v-btn
      type="submit"
      color="primary black--text"
      class="mb-1 mr-3 "
      elevation="0"
      :disabled="!valid"
      >Add</v-btn
    >
    <v-btn class="mb-1" elevation="0" @click="toggleForm(false)">Cancel</v-btn>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CreateTask",
  props: ["toggleForm", "status"],
  data() {
    return {
      task: "",
      valid: false,
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  computed: {
    ...mapGetters({
      currentProject: "project/currentProject",
    }),
  },
  methods: {
    ...mapActions({
      createTask: "testapp/createTask",
    }),
    addTask() {
      this.createTask({
        note: this.task,
        status: this.status,
      });
    },
  },
};
</script>

<style></style>
