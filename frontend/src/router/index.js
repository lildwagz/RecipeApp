import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/recipe/:id',
            name: 'RecipeDetails',
            component: () => import('../views/RecipeDetailView.vue')
        },
        {
            path: '/favorites',
            name: 'Favorites',
            component: () => import('../views/FavoritesView.vue')
        }
    ]
})

export default router