import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/",
    name: "main",
    component: () => import("../views/main.vue"),
  },
  {
    path: "/modal",
    name: "modal",
    component: () => import("../components/modal.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
