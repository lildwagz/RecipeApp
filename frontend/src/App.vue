<template>
  <TheHeader />
  <main class="main-content">
    <router-view />
  </main>
  <footer>
    <p>Menggunakan <a href="https://www.themealdb.com/" target="_blank">TheMealDB API</a></p>
    <p>Dibuat Oleh Azzam Rabbaney dan tim</p>
  </footer>
</template>

<script setup>
import TheHeader from '@/components/TheHeader.vue';
</script>

<style>
/* Style global bisa diletakkan di sini atau di file terpisah seperti base.css */
.main-content {
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

footer {
  text-align: center;
  padding: 2rem 1rem;
  background-color: #333;
  color: #f0f0f0;
  margin-top: 3rem;
}

footer a {
  color: #4CAF50;
}
</style>