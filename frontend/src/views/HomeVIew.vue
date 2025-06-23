<template>
  <div class="home-view">
    <div v-if="mealStore.loading" class="loader"></div>
    <div v-else-if="mealStore.error" class="error-message">{{ mealStore.error }}</div>
    <div v-else-if="mealStore.meals.length === 0 && mealStore.pageTitle" class="message">{{ mealStore.pageTitle }}</div>

    <RecipeList v-else :meals="mealStore.meals" />
  </div>
</template>

<script setup>
import RecipeList from '@/components/RecipeList.vue';
import { useMealStore } from '@/stores/mealStore'; // Impor store

const mealStore = useMealStore(); // Gunakan store
</script>

<style scoped>
/* Diadaptasi dari style.css */
input[type="text"] { padding: 0.7rem; width: 250px; border: 1px solid #ddd; border-radius: 5px; }
button, select { padding: 0.7rem 1.2rem; border-radius: 5px; border: 1px solid transparent; cursor: pointer; }
</style>