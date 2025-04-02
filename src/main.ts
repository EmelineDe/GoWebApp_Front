import "./assets/main.css";
import "./assets/theme.css";
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
    defaultTheme: "goweb",
    themes: {
      goweb: {
        dark: false,
        colors: {
          primary: "#FF445F",
          secondary: "#F2F2F2",
          background: "#FFFFFF",
          surface: "#FFFFFF",
          greyLight: "#F2F2F2",
          textDark: "#443D3C",
          textLight: "#FFFFFF",
          accent: "#DEFae9",
          softPink: "#FFECEF",
          black: "#000000",
        },
        variables: {
          // Fonts
          "font-family": 'Poppins, "Catamaran", "Aller", sans-serif',

          // Font sizes
          "font-size-xs": "10px",
          "font-size-sm": "12px",
          "font-size-md": "14px",
          "font-size-lg": "18px",
          "font-size-xl": "20px",
          "font-size-xxl": "24px",
          "font-size-xxxl": "34px",

          // Font weights
          "font-weight-regular": 400,
          "font-weight-medium": 500,
          "font-weight-semibold": 600,
          "font-weight-bold": 700,
          "font-weight-extrabold": 800,

          // Line heights
          "line-height-tight": "100%",
          "line-height-normal": "135%",
          "line-height-loose": "1.4",

          // Letter spacing
          "letter-spacing-normal": "0%",
          "letter-spacing-tight": "-0.01em",

          // Border radius
          "border-radius-sm": "10px",
          "border-radius-lg": "43px",
          "border-radius-cardtop": "0 16px 0 0",

          // Shadows
          "box-shadow-card": "4px 7px 18px 7px rgba(0, 0, 0, 0.05)",

          // Layout
          "container-width": "1066px",
          "inner-card-width": "893px",
          "button-width": "423px",
          "image-size": "572px 309px",
          "recap-height": "736px",
          "recap-max-height": "805px",

          // Paddings
          "card-padding": "32px 38px",
          "button-padding": "13px 16px",
          "cta-padding": "16px 24px",

          // Heights
          "button-height": "56px",
          "image-height": "309px",
        },
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
