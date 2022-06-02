<script>
export default {
  data() {
    return {
      message: '안녕하세요', // 변수 선언
    };
  },
  methods: {
    alertMessage() {
      alert(this.message + '. 반갑습니다.'); // 함수 선언
    },
  },
};
</script>
<template>
  <h2>1. Vue2 == Options API</h2>
  <button type="text" @click="alertMessage">
    <!-- click 이벤트 핸들러 함수 -->
    {{ message }}
    <!-- 변수 -->
  </button>
</template>
