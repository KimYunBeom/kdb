<!-- setup이 script의 속성으로 변경 -->
<script setup>
const alertMessage = () => {
  alert(message + '. 반갑습니다. 3');
};

const message = '안녕하세요';
</script>
<template>
  <h2>3. Vue3 == Composition API, Single File Component</h2>
  <button type="text" @click="alertMessage">
    <!-- click 이벤트 핸들러 함수 -->
    {{ message }}
    <!-- 변수 -->
  </button>
</template>
