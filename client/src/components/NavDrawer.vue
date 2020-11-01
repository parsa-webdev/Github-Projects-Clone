<template>
  <v-list fill-height nav>
    <v-list-item-group v-if="isLoggedIn" class="pt-16 px-4">
      <v-list-item to="/create" active-class="primary--text">
        <v-list-item-title class="text-center">
          Create
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="logout">
        <v-list-item-title class="text-center primary--text">
          Logout
        </v-list-item-title>
      </v-list-item>
    </v-list-item-group>
    <v-list-item-group v-else class="pt-16 px-4">
      <v-list-item to="/login" active-class="primary--text">
        <v-list-item-title class="text-center">
          Login
        </v-list-item-title>
      </v-list-item>

      <v-list-item to="/register" active-class="primary--text">
        <v-list-item-title class="text-center">
          Register
        </v-list-item-title>
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
