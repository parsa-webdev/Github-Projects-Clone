<template>
  <v-container fill-height>
    <v-row class="flex-column justify-center">
      <CreateProject />
      <!--  -->
      <AllProjects v-if="!authenticating" />
    </v-row>
  </v-container>
</template>

<script>
import CreateProject from "../components/projects/CreateProject";
import AllProjects from "../components/projects/AllProjects";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Create",
  components: {
    CreateProject,
    AllProjects,
  },
  computed: { ...mapGetters({ authenticating: "auth/authenticating" }) },
};
</script>

<style></style>
