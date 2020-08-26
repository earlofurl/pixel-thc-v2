import { authGuard } from "../auth/authGuard";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Home.vue") }]
  },
  {
    path: "/profile",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Profile.vue"),
        beforeEnter: authGuard
      }
    ]
  },
  {
    path: "/lab",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Lab.vue"),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "/customers",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Customers.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "create",
        component: () => import("pages/CustomerCreate.vue"),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
