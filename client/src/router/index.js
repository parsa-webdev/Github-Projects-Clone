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

  // console.log({
  //   from: from.path,
  //   pathTo: to.path,
  //   requiresAuth,
  //   authenticated,
  // });

  await store.dispatch("auth/checkUser");

  if (store.getters["auth/isLoggedIn"]) {
    if (authenticated) {
      // If we are in login/register
      next({
        name: "Create",
      });
    } else if (requiresAuth) {
      // If we are in dashboard, project
      next();
    } else {
      // If we are in safe routes (home, 404)
      next();
    }
  } else {
    if (authenticated) {
      // If we are in login/register
      next();
    } else if (requiresAuth) {
      // If we are in dashboard, project
      next({
        name: "Login",
      });
    } else {
      // If we are in safe routes (home, 404)
      next();
    }
  }

  // if (requiresAuth) {
  //   await store.dispatch("auth/checkUser");
  //   next();
  // } else {
  //   next("login");
  // }

  // if (authenticated) {
  //   await store.dispatch("auth/checkUser");
  //   next("create");
  // } else {
  //   next();
  // }
});

export default router;
