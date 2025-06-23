<template>
  <header class="app-header">
    <h1>Temukan Resep Lezat!</h1>
    <nav class="main-nav">
      <router-link to="/" class="nav-button">Home</router-link>
      <router-link to="/favorites" class="nav-button">
        Favorit Saya (<span>{{ favoritesStore.favoriteCount }}</span>)
      </router-link>
    </nav>

    <div class="controls-container">
      <div class="search-container">
        <input
            type="text"
            v-model="mealStore.searchQuery"
            @keyup.enter="mealStore.handleSearch"
            placeholder="Ketik nama masakan..."
        />
        <button @click="mealStore.handleSearch">Cari</button>
      </div>
      <div class="filter-container">
        <label for="categoryFilter">Filter Kategori:</label>
        <select v-model="mealStore.selectedCategory" @change="mealStore.handleFilter">
          <option value="">Semua Kategori</option>
          <option v-for="cat in mealStore.categories" :key="cat.strCategory" :value="cat.strCategory">
            {{ cat.strCategory }}
          </option>
        </select>
      </div>
      <button @click="mealStore.getRandomMeal" class="utility-button">Resep Acak</button>
    </div>
  </header>
</template>

<script setup>
import { onMounted } from 'vue';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { useMealStore } from '@/stores/mealStore'; // Impor store baru

const favoritesStore = useFavoritesStore();
const mealStore = useMealStore(); // Gunakan store baru

// Muat kategori saat komponen header dimuat
onMounted(() => {
  if (mealStore.categories.length === 0) {
    mealStore.loadCategories();
  }
});
</script>

<style scoped>
.app-header { background-color: #4CAF50; color: #fff; padding: 1.5rem 1rem; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.main-nav { display: flex; justify-content: center; gap: 1rem; margin-top: 1rem; }
.nav-button { background-color: #388E3C; color: white; border: none; padding: 0.7rem 1.5rem; border-radius: 5px; cursor: pointer; font-size: 1rem; text-decoration: none; transition: background-color 0.3s ease; }
.nav-button:hover, .utility-button:hover { background-color: #2E7D32; }
.router-link-exact-active { background-color: #2E7D32; }

/* Style untuk kontrol yang dipindahkan */
.controls-container { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 1rem; margin-top: 1.5rem; padding: 1rem; background-color: rgba(0,0,0,0.1); border-radius: 8px; }
.search-container, .filter-container { display: flex; align-items: center; gap: 0.5rem; }
input[type="text"] { padding: 0.7rem; width: 250px; border: 1px solid #ddd; border-radius: 5px; color: #333; }
label { color: white; }
button, select { padding: 0.7rem 1.2rem; border-radius: 5px; border: 1px solid transparent; cursor: pointer; background-color: #388E3C; color: white; font-size: 1rem; }
select { color: #333; background-color: #fff; }
</style>