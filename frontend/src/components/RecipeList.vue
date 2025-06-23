<template>
  <div class="recipe-grid">
    <RecipeItem
        v-for="meal in meals"
        :key="meal.idMeal"
        :meal="meal"
    />
  </div>
</template>

<script setup>
import RecipeItem from './RecipeItem.vue';
defineProps({
  meals: { type: Array, required: true }
});
</script>

<style scoped>
.recipe-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; }
</style>