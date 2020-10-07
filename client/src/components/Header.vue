<template>
  <div>
    <router-link to="/">home</router-link>
    <router-link to="/register">register</router-link>
    <router-link to="/login">login</router-link>
    <router-link to="/dashboard">dashboard</router-link>

    <v-btn @click="logout"> log out</v-btn>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Header",
  methods: {
    ...mapActions({
      logout: "auth/logout",
    }),
  },
};
</script>

<style></style>
