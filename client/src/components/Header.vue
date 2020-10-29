<template>
  <div>
    <v-app-bar max-height="400" elevation="0" fixed>
      <v-container>
        <v-row>
          <router-link to="/">
            <v-toolbar-title>Project Planner</v-toolbar-title>
          </router-link>

          <v-spacer></v-spacer>

          <template v-if="isLoggedIn">
            <v-row class=" justify-end align-center">
              <v-btn
                to="/dashboard"
                color="primary"
                class="ml-4 hidden-sm-and-down"
                text
              >
                dashboard
              </v-btn>
              <v-btn
                @click="logout"
                elevation="0"
                class="ml-4"
                color="primary black--text  hidden-sm-and-down"
                >log out</v-btn
              >
              <v-app-bar-nav-icon
                small
                class="ml-4 hidden-md-and-up"
                @click="toggleDrawer(true)"
              ></v-app-bar-nav-icon>
            </v-row>
          </template>
          <template v-else>
            <v-btn
              to="/register"
              color="primary"
              class="ml-4  hidden-sm-and-down"
              text
            >
              register
            </v-btn>
            <v-btn
              to="/login"
              color="primary"
              class="ml-4  hidden-sm-and-down"
              text
            >
              login
            </v-btn>
            <v-app-bar-nav-icon
              small
              class="ml-4 hidden-md-and-up"
              @click="toggleDrawer(true)"
            ></v-app-bar-nav-icon>
          </template>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute right temporary>
      <NavDrawer />
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NavDrawer from "./NavDrawer";
export default {
  name: "Header",
  components: {
    NavDrawer,
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "auth/isLoggedIn",
    }),
  },
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    ...mapActions({
      logout: "auth/logout",
    }),
    toggleDrawer(value) {
      this.drawer = value;
    },
  },
};
</script>

<style></style>
