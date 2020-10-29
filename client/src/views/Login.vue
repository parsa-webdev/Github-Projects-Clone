<template>
  <v-container fill-height>
    <v-card
      style="max-width: 400px; width: 100%;"
      class="mx-auto pa-10"
      elevation="0"
    >
      <h1 class="display-1 mb-8 text-center">Login</h1>
      <v-form v-model="valid" @submit.prevent="submitForm">
        <v-text-field
          label="Email"
          type="email"
          v-model="email"
          filled
          dense
          :rules="[rules.required, rules.email]"
        ></v-text-field>
        <v-text-field
          label="Password"
          v-model="password"
          type="password"
          filled
          dense
          :rules="[rules.required, rules.min]"
        ></v-text-field>
        <v-btn
          type="submit"
          color="primary"
          class="mb-8 black--text"
          large
          block
          elevation="0"
          :disabled="!valid || authenticating"
          :loading="authenticating"
          >Sign In</v-btn
        >
        <p class="body-1  text-center">
          Don't have an account?
          <router-link to="/register">Sign Up</router-link>
        </p>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Login",

  data() {
    return {
      valid: false,
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        min: (value) => (value || "").length >= 6 || "Not 6 or more characters",
      },
      email: "",
      password: "",
    };
  },
  computed: { ...mapGetters({ authenticating: "auth/authenticating" }) },
  methods: {
    ...mapActions({
      login: "auth/login",
    }),
    submitForm() {
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
