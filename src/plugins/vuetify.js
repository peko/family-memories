import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify(
  {
    theme: {
      themes: {
        light: {
            primary:   "#ff5722",
            secondary: "#ff9800",
            accent:    "#2196f3",
            error:     "#e91e63",
            warning:   "#ffc107",
            info:      "#03a9f4",
            success:   "#4caf50"
          }
      }
    }    
  }
);
