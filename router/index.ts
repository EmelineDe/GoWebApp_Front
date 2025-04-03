import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../src/views/HomeView.vue";
import QuestionnaireWizard from "../src/views/QuestionnaireWizard.vue";
import RecapView from "../src/views/RecapView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/service/:type",
    name: "service",
    component: QuestionnaireWizard,
  },
  {
    path: "/récapitulatif",
    name: "Recap",
    component: RecapView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
