<script>
export default {
  setup() {
    // setup() 내부로 data(), methods() 등 통합
    function alertMessage() {
      alert(this.message + '. 반갑습니다. 2');
    }

    return {
      alertMessage,
      message: '안녕하세요',
    };
  },
};
</script>
<template>
  <h2>2. Vue3 == Composition API</h2>
  <button type="text" @click="alertMessage">
    <!-- click 이벤트 핸들러 함수 -->
    {{ message }}
    <!-- 변수 -->
  </button>
</template>
