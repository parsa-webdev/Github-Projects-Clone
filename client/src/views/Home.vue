<template>
  <v-container fill-height>
    <v-row class="flex flex-column">
      <h1 class="display-4 my-14 mb-5 text-center">Project Planner</h1>
      <h1 class=" display-6 font-weight-regular primary--text mb-8 text-center">
        A Github Projects Manager Clone
      </h1>
      <v-row class="flex-column justify-center align-center">
        <v-btn
          to="/create"
          color="primary black--text py-5 px-15 font-weight-bold"
          >CREATE PROJECT</v-btn
        >
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
};
</script>
