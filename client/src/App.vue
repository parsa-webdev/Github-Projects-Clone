<template>
  <v-app dark>
    <div class="pt-16 pb-8">
      <Header />
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
import Header from "./components/Header";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Header,
  },
  methods: {
    ...mapActions({
      checkUser: "auth/checkUser",
      getProjects: "project/getProjects",
    }),
  },
  async mounted() {
    try {
      await this.checkUser();
      this.getProjects();
    } catch (err) {
      console.log(err.message);
    }
  },
};
</script>
