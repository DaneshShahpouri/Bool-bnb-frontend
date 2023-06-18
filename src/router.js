import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './pages/AppHome.vue';
import AppMessage from './pages/AppMessage.vue';
import AppShowApartment from './pages/AppShowApartment.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        }, {
            path: '/message',
            name: 'message',
            component: AppMessage
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