<script setup>
import API from '../util/api.js';

const getTodos = async () => {
  const url = `http://localhost:8001/`;
  const args = {};
  const httpMethod = 'GET';

  const response = await API(httpMethod, url, args);
  console.log('response', response);
};

getTodos();
</script>

<template>
  <h1 class="text-2xl">Todo</h1>
  <div class="dark:text-gray-500">Need To work!</div>
</template>
