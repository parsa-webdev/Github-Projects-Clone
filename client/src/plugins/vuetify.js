import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#2b9cff",
        // secondary: "#BEE1F8",
        // accent: "#8c9eff",
        // error: "#b71c1c",
        background: "#DDEAF6",
      },
    },
  },
});
