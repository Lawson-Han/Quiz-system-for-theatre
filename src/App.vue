<script>
import { RouterLink, RouterView } from 'vue-router'
import JoinQuiz from './views/JoinQuiz.vue'
import CreateQuiz from './views/CreateQuiz.vue'
import Result from './views/Result.vue'
import Room from './views/RoomCode.vue'
import { store } from './store';
export default {
  created(){
    window.myapp = this;
  },
  components: {
    // 需要用到的components
    CreateQuiz,
    JoinQuiz,
    Result,
    Room
  },
  data() {
    return {
      // 本页面需要使用的data
      store,
      status
    };
  },
  methods: {

  }
};
</script>


<template>
  <RouterView />
</template>


<style>
body {
  /* 主页面使用的css 全局*/
  background-color: floralwhite;
}
</style>
