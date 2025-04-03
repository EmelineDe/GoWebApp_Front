import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/HomeView.vue";
import QuestionnaireWizard from "@/views/QuestionnaireWizard.vue";
import RecapView from "@/views/RecapView.vue";
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
    path: "/recap",
    name: "Recap",
    component: RecapView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
