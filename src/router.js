import { createRouter, createWebHistory } from 'vue-router';
import Home_page from './components/Home.vue';
import Contact from "./components/Contact.vue";
import Login from "./components/login.vue"
import UserPanel from "@/components/UserPanel.vue";
import About from "@/components/About.vue";
import Appointments from "@/components/Appointments.vue";
const routes = [
    { path: '/', component: Home_page },
    { path: '/contact', component: Contact },
    { path: '/login', component: Login },
    { path: '/user_panel', component:UserPanel },
    { path: '/about', component:About },
    { path: '/appointments', component:Appointments },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

//router.beforeEach(requireAuth); // Перемещение вызова после создания router

export default router;
