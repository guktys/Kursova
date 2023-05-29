import { createRouter, createWebHistory } from 'vue-router';
import Home_page from './components/Home.vue';
import Contact from "./components/Contact.vue";
import Login from "./components/login.vue"
import UserPanel from "@/components/UserPanel.vue";
const routes = [
    { path: '/', component: Home_page },
    { path: '/contact', component: Contact },
    { path: '/login', component: Login },
    { path: '/user_panel', component:UserPanel, meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
