
import Vue from "vue"
import VueRouter from "vue-router"

import { getAuth } from "firebase/auth";

import Home from "../views/Home"
import Login from "../views/Login"
import CreateMemory from "../views/CreateMemory"
import AllMemories from "../views/AllMemories"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/create-memory',
    name: 'CreateMemory',
    component: CreateMemory,
    meta: { requiresAuth: true }
  },
  {
    path: '/all-memories',
    name: 'AllMemories',
    component: AllMemories,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: 'EverythingElse',
    component: Home,
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth    = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = getAuth().currentUser;
  // console.log("isauthenticated", isAuthenticated);
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
