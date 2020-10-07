<template>
  <v-container class="md">
    <form @submit.prevent="onSubmit">
      <input v-model="username" type="text" label="email" />
      <input v-model="email" type="email" label="email" />
      <input v-model="password" type="password" label="password" />
      <button>submit</button>
    </form>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions({
      register: "auth/register",
    }),
    onSubmit: function() {
      const userInput = {
        username: this.username,
        email: this.email,
        password: this.password,
      };

      this.register(userInput);
    },
  },
};
</script>

<style></style>
