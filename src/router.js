import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './pages/AppHome.vue';
import AppShowApartment from './pages/AppShowApartment.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        }, {
            name: 'apartments/show',
            path: '/apartments/:slug',
            component: AppShowApartment,
            meta: {
                title: 'Apartment'
            }
        }
    ]
});
export { router };