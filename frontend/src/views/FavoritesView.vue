<template>
  <div class="favorites-view">
    <h2>Resep Favorit Saya</h2>
    <div v-if="favoritesStore.favoriteCount === 0" class="message">
      Anda belum memiliki resep favorit.
    </div>
    <RecipeList v-else :meals="favoritesStore.favorites" />
  </div>
</template>

<script setup>
import { useFavoritesStore } from '@/stores/favoritesStore';
import RecipeList from '@/components/RecipeList.vue';

const favoritesStore = useFavoritesStore();
</script>

<style scoped>
h2 {
  text-align: center;
  border-bottom: 3px solid #4CAF50;
  display: inline-block;
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
}
.favorites-view {
  text-align: center;
}
</style>