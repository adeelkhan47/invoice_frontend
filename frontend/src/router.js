import { createRouter, createWebHistory } from "vue-router";
import SigninSignup from "./components/SigninSignup.vue";
import FormScreen from "./components/FormScreen.vue";
import { getToken } from "./services/localStorage";

const routes = [
  { path: "/", component: SigninSignup },
  { path: "/signup", component: SigninSignup },
  { path: "/form", component: FormScreen, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = getToken();
  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    if (isAuthenticated) {
      next({ path: "/form" });
    } else {
      next();
    }
  }
});

export default router;
