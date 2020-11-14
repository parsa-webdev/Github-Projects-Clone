import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Create from "../views/Create.vue";
import EachProject from "../views/EachProject.vue";

import store from "../store/";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      authenticated: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      authenticated: true,
    },
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/project/:id",
    name: "EachProject",
    component: EachProject,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const authenticated = to.matched.some((record) => record.meta.authenticated);
  console.log({
    from: from.path,
    pathTo: to.path,
    requiresAuth,
    authenticated,
  });
  try {
    await store.dispatch("auth/checkUser");
    if (authenticated) {
      next("create");
    } else {
      next();
    }
  } catch (err) {
    if (requiresAuth) {
      next("login");
    } else {
      next();
    }
  }

  // if (requiresAuth) {
  //   try {
  //     await store.dispatch("auth/checkUser");

  //     next();
  //   } catch (err) {
  //     next("login");
  //   }
  // } else {
  //   next();
  // }
});

export default router;
