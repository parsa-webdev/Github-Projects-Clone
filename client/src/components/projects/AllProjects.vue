<template>
  <v-row class="justify-center">
    <!-- show loader if loading otherwise loop -->
    <div v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-else v-for="project in projects" :key="project.id">
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-card class="mx-3 mb-6" max-width="344" elevation="0">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"
            ></v-img>

            <v-card-text>
              <h2 class="title primary--text text-center py-2">
                {{ project.title }}
              </h2>
            </v-card-text>

            <v-fade-transition>
              <v-overlay v-if="hover" absolute color="primary">
                <v-btn
                  :to="{ name: 'EachProject', params: { id: project.id } }"
                  class="primary--text"
                  elevation="2"
                  >OPEN PROJECT</v-btn
                >
              </v-overlay>
            </v-fade-transition>
          </v-card>
        </template>
      </v-hover>
    </div>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AllProjects",
  data: () => ({
    overlay: false,
  }),
  computed: {
    ...mapGetters({
      projects: "project/allProjects",
      loading: "project/loading",
    }),
  },
  mounted() {
    this.getProjects();
  },
  methods: {
    ...mapActions({
      getProjects: "project/getProjects",
    }),
  },
};
</script>

<style></style>
