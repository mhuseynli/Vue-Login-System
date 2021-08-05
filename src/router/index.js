import Vue from "vue"
import VueRouter from "vue-router"
import AuthGuard from "./auth-guard.js"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    beforeEnter: AuthGuard,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/profile/:id",
    name: "ViewProfile",
    component: () => import("@/views/ViewProfile"),
    props: true,
    beforeEnter: AuthGuard,
  },
  {
    path: "/create",
    name: "CreateUser",
    component: () => import("@/views/CreateUser"),
    props: true,
    beforeEnter: AuthGuard,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
