<script setup>
import { ref, reactive } from 'vue';

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

const cnt1 = ref(0);
const cnt2 = reactive({
  val: 0,
});

const addCount = () => {
  cnt1.value++;
  cnt2.val++;
};
</script>

<template>
  <div class="bg-white dark:bg-slate-800 text-center">
    <Header></Header>
    <main>
      <div class="px-3 py-4">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="addCount">
          Click me!
        </button>
        <div class="text-sky-400">cnt1 : {{ cnt1 }}</div>
        <div class="text-blue-500">cnt2 : {{ cnt2.val }}</div>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<style scoped></style>
