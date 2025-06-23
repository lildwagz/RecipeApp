import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useMealStore = defineStore('meals', () => {
    const router = useRouter();
    const meals = ref([]);
    const categories = ref([]);
    const searchQuery = ref('');
    const selectedCategory = ref('');
    const loading = ref(false);
    const error = ref(null);
    const pageTitle = ref('Selamat Datang! Cari resep atau pilih kategori.');

    async function fetchAPI(endpoint, params = {}) {
        loading.value = true;
        error.value = null;

        // Membangun URL baru: /api/proxy/nama_endpoint.php
        let url = `/api/proxy/${endpoint}`;
        const query = new URLSearchParams(params).toString();

        if (query) {
            url += `?${query}`;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.error('API request failed with status:', response.status, response.statusText);
                throw new Error('Gagal mengambil data dari server.');
            }
            return await response.json();
        } catch (e) {
            console.error('An error occurred in fetchAPI:', e);
            error.value = e.message;
            return null;
        } finally {
            loading.value = false;
        }
    }
    async function loadCategories() {
        const data = await fetchAPI('categories.php');
        if (data && data.categories) {
            categories.value = data.categories;
        }
    }

    async function handleSearch() {
        if (router.currentRoute.value.name !== 'home') {
            await router.push({ name: 'home' });
        }
        if (!searchQuery.value.trim()) return;
        selectedCategory.value = '';
        pageTitle.value = `Hasil Pencarian: "${searchQuery.value}"`;
        const data = await fetchAPI('search.php', { s: searchQuery.value });
        meals.value = data?.meals || [];
        if (meals.value.length === 0) {
            pageTitle.value = `Tidak ada resep ditemukan untuk "${searchQuery.value}".`;
        }
    }

    async function handleFilter() {
        if (router.currentRoute.value.name !== 'home') {
            await router.push({ name: 'home' });
        }
        searchQuery.value = '';
        if (!selectedCategory.value) {
            meals.value = [];
            pageTitle.value = 'Selamat Datang! Cari resep atau pilih kategori.';
            return;
        }
        pageTitle.value = `Kategori: ${selectedCategory.value}`;
        const data = await fetchAPI('filter.php', { c: selectedCategory.value });
        meals.value = data?.meals || [];
    }

    async function getRandomMeal() {
        const data = await fetchAPI('random.php');
        if (data?.meals?.[0]) {
            router.push({ name: 'RecipeDetails', params: { id: data.meals[0].idMeal } });
        }
    }

    return {
        meals, categories, searchQuery, selectedCategory, loading, error, pageTitle,
        loadCategories, handleSearch, handleFilter, getRandomMeal,
    };
});