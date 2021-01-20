import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import UserJoin from "../views/UserJoin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/join",
    name: "UserJoin",
    component: UserJoin
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
