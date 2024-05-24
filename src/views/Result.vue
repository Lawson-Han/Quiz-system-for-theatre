<template>
  <div
    class="mt-4 md:w-6/12 mx-auto border-4 border-gray-400 p-3 w-full rounded-lg shadow-xl flex items-center justify-center md:p-5 mb-3">
    <div class="carousel-item active relative float-left w-full text-center">
      <p class="text-4xl mx-auto text-gray-700 max-w-4xl">
        Result Paper
      </p>
      <p class="text-gray-500 italic text-right">- By {{ username }} in Room {{ 123456 }} (Student)</p>
    </div>
  </div>

  <div class="mx-auto block p-6 rounded-lg shadow-lg bg-white max-w-sm right-20 absolute z-10">
    <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2 italic">Your Mark</h5>
    <p class="text-gray-700 text-7xl font-semibold hover:font-bold font-mono ">
      {{ percentage }}%
    </p>
  </div>

  <div class="grid grid-cols-1 text-gray-600 mx-auto w-11/12 md:w-5/12 overflow-y-hidden custom-height">
    <el-timeline style="margin: 20px 20px">
      <el-timeline-item v-for="(item, index) in results" :key="index"
        :type="correctLists[index] === true ? 'success' : 'danger'" size="large">
        <el-card>
          <template #header>
            <div class="card-header">
              <span class="text-xl italic">Q{{ index + 1 }}: {{ item.body }}</span>
            </div>
          </template>
          <ul class="text-lg bg-white border-gray-200 w-80 text-gray-900">
            <li v-for="(option, idx) in item.option" :key="idx" 
            :class="correctLists[index] === idx.toString() ? 
            'px-6 py-2 w-full rounded-lg bg-red-400 text-white'
            : correctLists[index] === true && idx === results[index].answer ? 
            'px-6 py-2 w-full rounded-lg bg-green-500 text-white' 
            : idx === results[index].answer ? 
            'px-6 py-2 w-full rounded-lg bg-green-500 text-white' 
            :'px-6 py-2 w-full rounded-lg' 
            " style="margin-top: 10px;">
              <span>{{ option }}</span>
            </li>
          </ul>


        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
  <el-button style="font-size: 20px" class="return-btn" type="warning" round @click="back()">Return home -></el-button>
</template>


<script scoped>
import Option from '../components/Option.vue';
import Question from '../static/question.json';

export default {

  components: {
    Option

  },
  data() {
    return {
      results: Question[sessionStorage.getItem('code')].questions,
      username: sessionStorage.getItem('uname'),
      correctLists: [],
    };
  },
  methods: {
    back() {
      this.$router.replace("/home");
      sessionStorage.clear();
    },
    
  },
  created() {
    // 从sessionStorage中取出已回答的结果
    console.log(sessionStorage.getItem('Q' + i));
    for (var i = 0; i < this.results.length; i++) {
      if (sessionStorage.getItem('Q' + i)) {
        // 能取出值
        this.correctLists.push(sessionStorage.getItem('Q' + i) === 'true' ? true : sessionStorage.getItem('Q' + i));
      }
      console.log(this.correctLists);
    }
  },
  computed: {
    percentage() {
      let correctNum = 0;
      for (var i = 0; i < this.correctLists.length; i++) {
        if (this.correctLists[i] === true)
          correctNum++;
      }
      // let percentage =parseInt((correctNum / this.correctLists.length) * 100);
      // sessionStorage.setItem('percentage', this.percentage);
      return parseInt((correctNum / this.correctLists.length) * 100);
    }
  }
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}

.return-btn {
  float: right;
  /* margin: 上 右 下 左 */
  margin: 0 4em 1em 0;

}
</style>

