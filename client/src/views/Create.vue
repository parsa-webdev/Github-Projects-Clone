<template>
  <v-container fill-height>
    <v-row class="flex-column justify-center">
      <CreateProject />
      <AllProjects />
    </v-row>
  </v-container>
</template>

<script>
import CreateProject from "../components/projects/CreateProject";
import AllProjects from "../components/projects/AllProjects";
export default {
  name: "Create",
  components: {
    CreateProject,
    AllProjects,
  },
};
</script>

<style></style>
