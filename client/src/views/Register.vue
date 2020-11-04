<template>
  <v-container fill-height>
    <v-card
      style="max-width: 400px; width: 100%;"
      class="mx-auto pa-10"
      elevation="0"
    >
      <h1 class="display-1 mb-8 text-center">Create an Account</h1>
      <v-form v-model="valid" @submit.prevent="submitForm">
        <v-alert type="error" v-if="errors && errors.register">{{
          errors.register
        }}</v-alert>
        <v-text-field
          label="Username"
          type="text"
          v-model="username"
          filled
          dense
          :rules="[rules.required]"
        ></v-text-field>
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
          >Sign Up</v-btn
        >
        <p class="body-1 text-center">
          Already have an account? <router-link to="/login">Log In</router-link>
        </p>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Register",
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
      username: "",
      email: "",
      password: "",
    };
  },

  computed: {
    ...mapGetters({
      authenticating: "auth/authenticating",
      errors: "auth/errors",
    }),
  },
  methods: {
    ...mapActions({
      register: "auth/register",
    }),
    submitForm() {
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
