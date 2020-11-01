<template>
  <div>
    <v-app-bar max-height="400" elevation="0" fixed style="z-index: 20">
      <v-container>
        <v-row>
          <router-link to="/">
            <v-toolbar-title>Project Planner</v-toolbar-title>
          </router-link>

          <v-spacer></v-spacer>

          <template v-if="!verifyingUser">
            <v-app-bar-nav-icon
              small
              class="ml-4 hidden-sm-and-up"
              @click="toggleDrawer(true)"
            ></v-app-bar-nav-icon>
            <div v-if="isLoggedIn" class="hidden-xs-only">
              <v-btn to="/create" color="primary" class="ml-4" text>
                Create
              </v-btn>
              <v-btn
                @click="logout"
                elevation="0"
                class="ml-4"
                color="primary black--text"
                >log out</v-btn
              >
            </div>
            <div v-else class="hidden-xs-only">
              <v-btn to="/register" color="primary" class="ml-4" text>
                register
              </v-btn>
              <v-btn to="/login" color="primary" class="ml-4" text>
                login
              </v-btn>
            </div>
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
      verifyingUser: "auth/verifyingUser",
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
