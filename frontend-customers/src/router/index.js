import { createWebHistory, createRouter } from "vue-router";
import Home from "@/view/Home.vue";

const routes = [
    {
        path: "/home",
        name: "homeBook",
        component: Home,
    },
    {
        path: "/login",
        name: "loginPage",
        component: () => import("@/view/Login.vue"),
    },
    {
        path: "/register",
        name: "registerPage",
        component: () => import("@/view/Register.vue"),
    },
    {
        path: "/bookinfo/:bookId",
        name: "bookinfo",
        component: () => import("@/view/BookInfo.vue"),
        props: true,
    },
    {
        path: "/custome/info",
        name: "customerinfo",
        component: () => import("@/view/CustomerInfo.vue"),
    },

];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;