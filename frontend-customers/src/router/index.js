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
    // {
    //     path: "/:id",
    //     name: "book-edit",
    //     component: () => import("@/views/BookEdit.vue"),
    //     props: true
    // },
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