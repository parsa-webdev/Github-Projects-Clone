<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <div class="pt-16 pb-8">
      <Header />
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
import Header from "./components/Header";
export default {
  name: "App",
  components: {
    Header,
  },
};
</script>
