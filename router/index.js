import { createRouter, createWebHistory } from "vue-router";
import Panier from "@/components/Panier.vue";
import Home from "@/components/Home.vue";

const routes = [{
    path: "/",
    name: "Home",
    component: Home
},
{
    path: "/panier",
    name: "Panier",
    component: Panier
},

]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;