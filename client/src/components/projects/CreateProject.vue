<template>
  <v-card
    style="max-width: 500px; width: 100%;"
    class="mx-auto pa-10 mb-10"
    elevation="0"
  >
    <h1 class="display-1 mb-2 text-center">Welcome, {{ user.username }}</h1>
    <p class="subtitle-1 mb-8 text-center">
      You can start by creating a project.
    </p>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <v-text-field
        label="Title"
        type="text"
        v-model="projectTitle"
        filled
        dense
        :rules="[rules.required]"
      ></v-text-field>
      <v-btn
        type="submit"
        :disabled="!valid"
        color="primary"
        large
        block
        elevation="0"
        >Add Project</v-btn
      >
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CreateProject",
  data() {
    return {
      valid: false,
      rules: {
        required: (value) => !!value || "Required.",
      },
      projectTitle: "",
    };
  },
  computed: { ...mapGetters({ user: "auth/user" }) },
  methods: {
    ...mapActions({
      createProject: "project/createProject",
    }),
    submitForm() {
      const userInput = {
        title: this.projectTitle,
      };
      this.createProject(userInput);
    },
  },
};
</script>

<style></style>
