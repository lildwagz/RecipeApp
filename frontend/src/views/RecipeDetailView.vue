<template>
  <div v-if="loading" class="loader"></div>
  <div v-else-if="error" class="error-message">{{ error }}</div>
  <div v-else-if="meal" class="meal-details-container">
    <h2>{{ meal.strMeal }}</h2>
    <div class="meal-details-content">
      <img :src="meal.strMealThumb" :alt="meal.strMeal">
      <button @click="favoritesStore.toggleFavorite(meal)" :class="{ favorited: favoritesStore.isFavorited(meal.idMeal) }" class="favorite-button">
        {{ favoritesStore.isFavorited(meal.idMeal) ? 'Hapus dari Favorit' : 'Simpan ke Favorit' }}
      </button>

      <h3>Kategori: <span class="category-tag">{{ meal.strCategory }}</span></h3>
      <h3>Asal: <span class="category-tag">{{ meal.strArea }}</span></h3>

      <h3>Bahan-bahan:</h3>
      <ul>
        <li v-for="(ingredient, index) in ingredients" :key="index">{{ ingredient }}</li>
      </ul>

      <h3>Instruksi:</h3>
      <p class="instructions">{{ meal.strInstructions }}</p>

      <div v-if="youtubeEmbedUrl" class="video-container">
        <h3>Video Tutorial:</h3>
        <iframe :src="youtubeEmbedUrl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useFavoritesStore } from '@/stores/favoritesStore';

const route = useRoute();
const favoritesStore = useFavoritesStore();
const meal = ref(null);
const loading = ref(false);
const error = ref(null);

const ingredients = computed(() => {
  if (!meal.value) return [];
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal.value[`strIngredient${i}`];
    const measure = meal.value[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      list.push(`${measure || ''} ${ingredient}`.trim());
    }
  }
  return list;
});

const youtubeEmbedUrl = computed(() => {
  if (!meal.value || !meal.value.strYoutube) return '';
  const match = meal.value.strYoutube.match(/(?:v=)([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : '';
});

onMounted(async () => {
  loading.value = true;
  const mealID = route.params.id;
  try {
    // Ganti URL dengan format API yang baru
    const response = await fetch(`/api/proxy/lookup.php?i=${mealID}`);

    // Tambahkan pengecekan jika respons dari server tidak OK (misal: error 404 atau 500)
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    if (data?.meals?.[0]) {
      meal.value = data.meals[0];
    } else {
      error.value = "Resep tidak ditemukan.";
    }
  } catch (e) {
    console.error("Gagal memuat detail resep:", e); // Tambahkan log untuk debugging
    error.value = "Gagal memuat detail resep.";
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.meal-details-container { background-color: #fff; padding: 2rem; border-radius: 10px; box-shadow: 0 6px 15px rgba(0,0,0,0.1); }
.meal-details-content img { display: block; max-width: 500px; width: 100%; margin: 0 auto 1.5rem auto; border-radius: 10px; }
.meal-details-content h3 { color: #388E3C; margin-top: 1.8rem; border-bottom: 2px solid #e0e0e0; padding-bottom: 0.6rem; }
.instructions { white-space: pre-wrap; background-color: #f9f9f9; padding: 1rem; border-radius: 5px; }
.favorite-button { margin: 1rem 0; padding: 0.8rem 1.5rem; font-size: 1rem; background-color: #FF69B4; color: white; border: none; border-radius: 20px; cursor: pointer; }
.favorite-button.favorited { background-color: #c71585; }
.video-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin-top: 1rem; }
.video-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
</style>