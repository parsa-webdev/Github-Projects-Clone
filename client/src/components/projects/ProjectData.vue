<template>
  <div>
    <v-row class="justify-center" v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-row>

    <v-container class="pt-16" fill-height v-else>
      <v-row
        class="justify-center align-center mb-8"
        v-if="currentProject"
        no-gutters
      >
        <h1 class="display-1 mr-4">
          {{ currentProject.title }}
        </h1>
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn x-small color="error" fab v-bind="attrs" v-on="on">
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
          </template>

          <v-card class="pa-4">
            <v-card-title class="primary--text text-center">
              Are you sure you want to remove this project?
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="error"
                @click="deleteProject(currentProject.id)"
                text
              >
                DELETE
              </v-btn>
              <v-btn text @click="dialog = false">
                CANCEL
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <Columns />
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Columns from "../tasks/Columns";
export default {
  name: "ProjectData",
  props: ["queryId"],
  data() {
    return {
      myProject: null,
      dialog: false,
    };
  },
  components: {
    Columns,
  },
  computed: {
    ...mapGetters({
      currentProject: "project/currentProject",
      loading: "project/loading",
      authenticating: "auth/authenticating",
    }),
  },

  methods: {
    ...mapActions({
      getCurrentProject: "project/getCurrentProject",
      deleteProject: "project/deleteProject",
    }),
  },
  mounted() {
    this.getCurrentProject(this.queryId);
  },
};
</script>

<style></style>
