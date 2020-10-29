<template>
  <div>
    <v-divider></v-divider>
    <v-row align="center" class="flex-nowrap pt-5" no-gutters>
      <v-card-text class="pa-0">
        <p class="body-1 mb-0">{{ task.note }}</p>
      </v-card-text>
      <v-spacer />
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn small fab text elevation="0" v-bind="attrs" v-on="on">
            <v-icon size="medium">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>
              <v-list-item-title
                ><p class="text-center primary--text ma-0">
                  Move To
                </p></v-list-item-title
              >
            </v-list-item-title>
          </v-list-item>

          <v-list-item v-for="(status, index) in otherStatuses" :key="index">
            <v-list-item-title
              ><v-btn @click="updateTask({ id: task.id, status })" text block>{{
                status
              }}</v-btn></v-list-item-title
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title
              ><v-btn color="error" @click="deleteTask(task.id)" block
                >Delete</v-btn
              ></v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["task", "deleteTask", "updateTask"],
  data() {
    return {
      otherStatuses: [],
    };
  },
  mounted() {
    let statuses = ["todo", "in-progress", "done"];
    statuses = statuses.filter((status) => status !== this.task.status);

    this.otherStatuses = statuses;
  },
};
</script>

<style></style>
