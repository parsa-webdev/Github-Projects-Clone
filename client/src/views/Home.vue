<template>
  <v-container fill-height>
    <v-row class="flex flex-column">
      <h1 class="display-4 my-10 mb-5 text-center">Project Planner</h1>
      <h1 class=" display-6 font-weight-regular primary--text mb-2 text-center">
        A Github Projects Manager Clone
      </h1>
      <p class=" font-weight-regular grey--text lighten-4 mb-2 text-center">
        This is a frontend only mockup of the existing app that you need to be
        authenticated to use.<br />
        Try out the buttons to see what you can do.
      </p>
      <p class=" font-weight-regular mb-3 text-center">
        To use the actual app, you need to be logged in.
      </p>
      <div class="justify-center">
        <ProjectData />
      </div>
    </v-row>
  </v-container>
</template>

<script>
import ProjectData from "../components/test_app/projects/ProjectData";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    ProjectData,
  },
  computed: { ...mapGetters({ authenticating: "auth/authenticating" }) },
};
</script>
