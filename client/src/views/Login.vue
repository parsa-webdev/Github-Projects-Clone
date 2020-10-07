<template>
  <v-container class="md">
    <form @submit.prevent="onSubmit">
      <input v-model="email" type="email" label="email" />
      <input v-model="password" type="password" label="password" />
      <button>submit</button>
    </form>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions({
      login: "auth/login",
    }),
    onSubmit: function() {
      const userInput = {
        email: this.email,
        password: this.password,
      };

      this.login(userInput);
    },
  },
};
</script>

<style></style>
