<template>
  <div class="justify-center">
    <v-progress-circular
      v-if="authenticating"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <template v-else>
      <v-row class="justify-center" v-if="errors && errors.currentProject">
        <h1>{{ errors.currentProject }}</h1>
      </v-row>
      <ProjectData v-else :queryId="$route.params.id" />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProjectData from "../components/projects/ProjectData";

export default {
  name: "EachProject",
  components: {
    ProjectData,
  },
  computed: {
    ...mapGetters({
      authenticating: "auth/authenticating",
      isLoggedIn: "auth/isLoggedIn",
      errors: "project/errors",
    }),
  },
};
</script>

<style></style>
