import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
    const favorites = ref([]);

    const favoriteCount = computed(() => favorites.value.length);

    function toggleFavorite(meal) {
        const index = favorites.value.findIndex(f => f.idMeal === meal.idMeal);
        if (index > -1) {
            favorites.value.splice(index, 1);
        } else {
            favorites.value.push({
                idMeal: meal.idMeal,
                strMeal: meal.strMeal,
                strMealThumb: meal.strMealThumb,
            });
        }
        localStorage.setItem('recipeFavorites', JSON.stringify(favorites.value));
    }

    function isFavorited(mealId) {
        return favorites.value.some(f => f.idMeal === mealId);
    }

    onMounted(() => {
        const storedFavorites = localStorage.getItem('recipeFavorites');
        if (storedFavorites) {
            favorites.value = JSON.parse(storedFavorites);
        }
    });

    return { favorites, favoriteCount, toggleFavorite, isFavorited };
});