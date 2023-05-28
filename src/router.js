import { createRouter, createWebHistory } from 'vue-router';
import Home_page from './components/Home.vue';
import Contact from "./components/Contact.vue";
const routes = [
    { path: '/', component: Home_page },
    { path: '/contact', component: Contact },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
