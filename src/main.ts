import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

// Pinia
import { createPinia } from "pinia";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        dark: false,
        colors: {
          background: "#FFFFFF",
          surface: "#FFFFFF",
          primary: "#FF5252",
          secondary: "#FFFFFF",
          accent: "#FF5252",
          lightPink: "#FFF0F1",
        },
      },
    },
  },
  defaults: {
    VCard: {
      VCardTitle: {
        class: "font-poppins",
      },
    },
  },
});

const pinia = createPinia();

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(pinia);
app.mount("#app");
