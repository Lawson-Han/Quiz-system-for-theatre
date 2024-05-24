<template>
  <div
    class="grid grid-rows-6 grid-cols-1 text-gray-600 mx-auto w-11/12 md:w-8/12 lg:w-7/12 overflow-y-hidden custom-height">
    <div class="row-span-2">
      <div class="min-h-full items-center justify-between py-4 rounded-lg flex flex-col items-center">
        <div class="my-4" style="width: 500px">
          <el-steps :space="200" :active="currentQuestion">
            <el-step v-for="(item, index) in correctLists.length" :key="index" :status="this.correctLists[index] === null
                ? 'process' : this.correctLists[index] === undefined
                  ? 'wait' : this.correctLists[index]
                    ? 'success' : 'error'"></el-step>
          </el-steps>
        </div>
        <div
          class="border-4 border-gray-400 p-3 w-full rounded-lg shadow-xl flex items-center justify-center md:p-5 mb-3">
          <h1 class="text-center font-medium md:text-lg" v-html="results[currentQuestion].body" style="font-weight: 500">
          </h1>
        </div>
      </div>
    </div>

    <div class="row-span-3">
      <div class="min-h-full flex flex-col justify-center">
        <div class="grid grid-cols-1 gap-4 md:gap-4 md:grid-cols-2" v-if="!results[currentQuestion].isMultiple">
          <Option v-for="(option, index) in results[currentQuestion].option" :key="index" :text="option" :idx="index"
            @answerID="answerSelected"></Option>
        </div>

        <div class="grid grid-cols-1 gap-4 md:gap-4 md:grid-cols-2" v-else>

          <el-checkbox v-for="(option, index) in results[currentQuestion].option" :key="index" :label="option"
            :idx="index" size="large" @change="answerSelected(idx)"
            class="w-full bg-gray-200 rounded-lg p-4 transition md:text-lg md:p-6 custom-checkbox"
            style="margin-left: 0px; zoom:125%;" border></el-checkbox>

        </div>
      </div>
    </div>
    <div class="">
      <div class="min-h-full min-w-full flex items-center justify-center">
        <Transition name="grow-fade">
          <button @click="getNextQuestion"
            class="px-12 py-4 bg-gray-600 text-white text-lg rounded-lg hover:bg-gray-700 transition w-full md:w-1/3"
            v-show="answerSelect != -1" id="allowNext">
            Next
          </button>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script scoped>
import Option from '../components/Option.vue';
import Question from '../static/question.json';
import axios from 'axios';
export default {

  components: {
    Option

  },
  data() {
    return {
      results: Question[sessionStorage.getItem('code')].questions,
      answerSelect: -1,
      currentQuestion: 0,
      correctLists: [],
      multiChosen: ["1"],
      resultList: []
    };

  },
  methods: {
    answerSelected(params) {
      this.answerSelect = params;
      console.log(params)

    },
    getNextQuestion() {
      // 判断刚提交的答案是否正确
      this.resultList.push(this.answerSelect);
      
      if (this.results[this.currentQuestion].answer === this.answerSelect) {
        this.correctLists[this.currentQuestion] = true;
        sessionStorage.setItem('Q' + this.currentQuestion, 'true')// Q1 - 'true'

      } else {
        this.correctLists[this.currentQuestion] = false;
        sessionStorage.setItem('Q' + this.currentQuestion, this.answerSelect)        // Q1 - 2

      }
      // console.log(Q0);
      // 判断是否结束答题
      if (this.currentQuestion < this.results.length - 1) {
        // 将下一个答案 状态调为待定
        this.currentQuestion++;
        this.correctLists[this.currentQuestion] = null;
        // 重置答案已选择状态
        this.answerSelect = -1;
      } else {
        console.log(this.resultList);

        axios({
          method: 'post',
          data: {
            result: this.resultList,
            roomcode: sessionStorage.getItem('code'),
            name: sessionStorage.getItem('uname'),
          },
          url: 'http://localhost:3000/result',
        }).then(res => {
          console.log(res.data)
        })
        this.$router.replace("/result");
        sessionStorage.setItem('status', 'result');
      }

    }
  },
  created() {
    // 如果不是特定按钮 不允许按下
    document.addEventListener("mousedown", function (e) {
      // 检查当前页面的 URL 是否为答题页面
      if (window.location.href.includes("/join")) {
        // 如果当前目标不是特定按钮，则阻止点击
        if (e.target.id !== "allowNext") {
          e.preventDefault();
        }
      }
    }, false);

    this.correctLists = new Array(this.results.length);



    // 从sessionStorage中取出已回答的结果
    for (var i = 0; i < this.results.length; i++) {
      if (sessionStorage.getItem('Q' + i)) {
        // 能取出值
        this.correctLists[i] = sessionStorage.getItem('Q' + i) === 'true' ? true : false;
      } else {
        this.currentQuestion = i;
        break;
      }
    }
    // 启用第一个题目 将状态改为待定null
    this.correctLists[this.currentQuestion] = null;
  },
  destroyed() {
    document.removeEventListener("mousedown", function (e) {
      if (e.target.id !== "allowNext") {
        e.preventDefault()
      }
    }, false);
  },
}
</script>

<style scoped>
h1 {
  font-family: Epilogue, Helvetica;
}

.grow-fade-enter-active {
  transition: all 0.2s ease-out;
}

.grow-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.grow-fade-enter-from,
.grow-fade-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(60px);
}

.custom-height {
  min-height: 100vh;
}

@media only screen and (max-width: 800px) {
  .custom-height {
    /* 92vh to make up for the toolbar in the mobile browser */
    min-height: 92vh;
  }
}


.custom-checkbox>>>.el-checkbox {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #E5E7EB;
  /* 对应于 bg-gray-200 */
  border-radius: 0.375rem;
  /* 对应于 rounded-lg */
}

.custom-checkbox>>>.el-checkbox__label {
  flex: 1;
  padding: 1rem;
  /* 对应于 p-4 */
  transition: all 0.2s ease-in-out;
  font-size: 1.125rem;
  /* 对应于 md:text-lg */
  padding: 1.5rem;
  /* 对应于 md:p-6 */
  box-sizing: border-box;
}

.custom-checkbox>>>.el-checkbox__input {
  display: none;
}

.custom-checkbox>>>.el-checkbox__inner {
  width: 200px;
  height: 200px;
}
</style>
