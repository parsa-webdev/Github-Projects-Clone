<template>
  <v-list fill-height nav dense>
    <v-list-item-group v-if="isLoggedIn" class="pt-16">
      <p class="text-center" to="/">Project Planner</p>
      <v-list-item>
        <v-list-item-title>
          <v-row class="justify-center">
            <v-btn to="/dashboard" text class="text-center primary--text"
              >Dashboard</v-btn
            >
          </v-row>
        </v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-title
          ><v-row class="justify-center">
            <v-btn @click="logout" class="text-center " text>LOG OUT</v-btn>
          </v-row></v-list-item-title
        >
      </v-list-item>
    </v-list-item-group>
    <v-list-item-group
      v-else
      class="justify-center align-center mt-16"
      active-class="primary--text "
    >
      <p class="text-center">Project Planner</p>
      <v-list-item>
        <v-list-item-title
          ><v-row class="justify-center">
            <v-btn to="/login" text class="text-center primary--text"
              >LOGIN</v-btn
            >
          </v-row></v-list-item-title
        >
      </v-list-item>

      <v-list-item>
        <v-list-item-title
          ><v-row class="justify-center">
            <v-btn to="/register" text class="text-center primary--text"
              >REGISTER</v-btn
            >
          </v-row></v-list-item-title
        >
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "NavDrawer",

  computed: {
    ...mapGetters({
      isLoggedIn: "auth/isLoggedIn",
    }),
  },

  methods: {
    ...mapActions({
      logout: "auth/logout",
    }),
  },
};
</script>

<style></style>
