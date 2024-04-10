import { createWebHistory, createRouter } from "vue-router";
import HomeBook from "@/views/HomeBook.vue";

const routes = [
    {
        path: "/",
        name: "homeBook",
        component: HomeBook,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/edit-book/:id",
        name: "book-edit",
        component: () => import("@/views/BookEdit.vue"),
        props: true
    },
    {
        path: "/add-book",
        name: "book-add",
        component: () => import("@/views/BookAdd.vue"),
    },
    {
        path: '/notify',
        name: 'notification',
        component: ()=> import('@/views/Notify.vue')
    }
    

];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;