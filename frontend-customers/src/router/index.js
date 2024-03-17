import { createWebHistory, createRouter } from "vue-router";
import Home from "@/view/Home.vue";

const routes = [
    {
        path: "/home",
        name: "homeBook",
        component: Home,
    },
    // {
    //     path: "/:pathMatch(.*)*",
    //     name: "notfound",
    //     component: () => import("@/views/NotFound.vue"),
    // },
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
    // {
    //     path: "/add-book",
    //     name: "book-add",
    //     component: () => import("@/views/BookAdd.vue"),
    // }
    

];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;