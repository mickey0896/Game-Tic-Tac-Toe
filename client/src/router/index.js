import { createRouter, createWebHistory } from "vue-router";
const routes = [
  //   {
  //     path: "/:pathMatch(.*)*",
  //     name: "notfound",
  //     component: () => import("@/views/notfound.vue"),
  //   },
  //   {
  //     path: "/test",
  //     name: "test",
  //     component: () => import("../views/test.vue"),

  //   },
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
