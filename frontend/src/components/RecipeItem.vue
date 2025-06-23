<template>
  <router-link :to="{ name: 'RecipeDetails', params: { id: meal.idMeal } }" class="recipe-item-link">
    <div class="recipe-item">
      <img :src="meal.strMealThumb" :alt="meal.strMeal" loading="lazy">
      <h3>{{ meal.strMeal }}</h3>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  meal: { type: Object, required: true }
});
</script>

<style scoped>
/* Diadaptasi dari style.css */
.recipe-item-link { text-decoration: none; color: inherit; }
.recipe-item { display: flex; flex-direction: column; background-color: #fff; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; text-align: center; cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease; height: 100%; }
.recipe-item:hover { transform: translateY(-8px); box-shadow: 0 8px 16px rgba(0,0,0,0.12); }
.recipe-item img { width: 100%; height: 200px; object-fit: cover; }
.recipe-item h3 { margin: 1rem 0.5rem; flex-grow: 1; display: flex; align-items: center; justify-content: center; padding: 0 0.5rem; font-size: 1.2rem; }
</style>