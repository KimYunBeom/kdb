<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="bg-white dark:bg-slate-800 dark:text-white text-center min-h-screen">
    <Header></Header>
    <hr />
    <main class="py-2 my-3">
      <router-view />
    </main>
    <hr />
    <Footer></Footer>
  </div>
</template>

<style scoped></style>
