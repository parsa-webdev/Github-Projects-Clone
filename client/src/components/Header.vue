<template>
  <v-app-bar elevation="0" fixed height="60">
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

    <v-container>
      <v-row>
        <router-link to="/">
          <v-toolbar-title>Project Planner</v-toolbar-title>
        </router-link>

        <v-spacer></v-spacer>

        <template v-if="isLoggedIn">
          <v-btn to="/dashboard" color="primary" class="ml-4" text>
            dashboard
          </v-btn>
          <v-btn
            @click="logout"
            elevation="0"
            class="ml-4"
            color="primary white--text"
            >log out</v-btn
          >
        </template>
        <template v-else>
          <v-btn to="/register" color="primary" class="ml-4" text>
            register
          </v-btn>
          <v-btn to="/login" color="primary" class="ml-4" text>
            login
          </v-btn>
        </template>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Header",
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
