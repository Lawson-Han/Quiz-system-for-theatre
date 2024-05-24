<template>
  <div class='chat'>
    <el-page-header class="chat__header" @back="goBack">
      <template #content>
        <span class="text-large font-600 mr-3"> Student Feedback </span>
        <span style="margin-left: 100px"> You are in room {{ roomcode }}</span>
      </template>

      <template #extra>
        <div class="flex items-center">
          <span class="text-large font-600 mr-3"> Welcome, <i>{{ username }}</i>.</span>

        </div>
      </template>
    </el-page-header>
    <el-container>
      <el-aside width="15%" style="background-color: rgb(238, 241, 246)">
        <el-scrollbar>
          <el-menu :default-openeds="['1', '2']" default-active="2-1">
            <el-menu-item v-for="(item, index) in questions" :key="index" :index="'2-' + (index + 1)"
              @click="openQuestion(index, item)">
              <el-icon>
                <ChatLineSquare />
              </el-icon>Question {{ index + 1 }}
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main>

        <p class="text-3xl" style="margin-top: 1%">Question {{ ID }}</p>
        <p v-text="questionSelected.body" class="text-xl text-gray-500" style="margin-top: 5%"> </p>
        <el-row>
          <el-col :span="14" class="my-12">
            <el-card shadow="always" class="card">
              <el-breadcrumb separator="|">
                <el-breadcrumb-item class="item">
                  <p class="text-4xl text-blue-500 text-center item"> {{ calcScore }}% </p>
                  <p class="text-xl text-gray-600 text-center item">Accuracy</p>
                </el-breadcrumb-item>
                <el-breadcrumb-item class="item">
                  <p class="text-4xl text-green-500 text-center item">
                    {{ answerList[questionSelected.answer] }}

                  </p>
                  <p class="text-xl text-gray-600 text-center item">Correct answer</p>
                </el-breadcrumb-item>
                <el-breadcrumb-item class="item">
                  <p class="text-4xl text-red-500 text-center item" width="50%"> {{ mostChosen }} </p>
                  <p class="text-xl text-gray-600 text-center item" width="50%">Most choose</p>
                </el-breadcrumb-item>
              </el-breadcrumb>
            </el-card>
          </el-col>
        </el-row>
        <el-col :span="18">
          <!-- <el-row style="flex-wrap: nowrap; margin: 5% 0">
            <el-button style="flex-wrap: nowrap; margin-right: 5%;" :disabled="true" color="green">Option A:
            </el-button>
            <el-text class="mt-1" maxlength="30" size="large" v-text="questionSelected.option[0]"></el-text>
          </el-row>

          <el-row style="flex-wrap: nowrap; margin: 5% 0">
            <el-button style="margin-right: 5%;">Option B: </el-button>
            <el-text class="mt-1" maxlength="30" size="large" v-text="questionSelected.option[1]"></el-text>
          </el-row>

          <el-row style="flex-wrap: nowrap; margin: 5% 0">
            <el-button style="margin-right: 5%;">Option C: </el-button>
            <el-text class="mt-1" maxlength="30" size="large" v-text="questionSelected.option[2]"></el-text>
          </el-row>

          <el-row style="flex-wrap: nowrap; margin: 5% 0">
            <el-button style="margin-right: 5%;">Option D: </el-button>
            <el-text class="mt-1" maxlength="30" size="large" v-text="questionSelected.option[3]"></el-text>
          </el-row> -->

          <el-row v-for="(item, index) in answerList" style="flex-wrap: nowrap; margin: 5% 0">
            <el-button style="margin-right: 5%;" :disabled="item === answerList[questionSelected.answer]" :color=" item === answerList[questionSelected.answer] ? 'green' : ''" >Option {{ item }}: </el-button>
            <el-text class="mt-1" maxlength="30" size="large" v-text="questionSelected.option[index]"></el-text>
          </el-row>

        </el-col>



      </el-main>

    </el-container>
  </div>
</template>


<script>
import Question from '../static/question.json';
import Result from '../static/result.json';

export default {
  created() {
    this.questionSelected = this.questions[0];
  },
  components: {

  },
  data() {
    return {
      roomcode: sessionStorage.getItem('roomcode'),
      questions: Question[sessionStorage.getItem('roomcode')].questions,
      results: Result[sessionStorage.getItem('roomcode')],
      questionSelected: null,
      ID: 1,
      muted: false,
      username: sessionStorage.getItem('uname'),
      answerList: ["A", "B", "C", "D"],
    }
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
    openQuestion(index, item) {
      this.questionSelected = item;
      this.ID = index + 1;
    }
  },
  computed: {
    calcScore() {
      var sum = 0;
      for (var key in this.results) {
        sum += (this.results[key][this.ID - 1] === this.questions[this.ID - 1].answer) ? 1 : 0;
      }
      return parseInt((sum / Object.keys(this.results).length) * 100);
    },
    mostChosen() {
      var choiceList = [];
      for (var key in this.results) {
        choiceList.push(this.results[key][this.ID - 1]);
      }

      const counts = {};
      let maxCount = 0;
      let mode = [];

      for (const value of choiceList) {
        if (!counts[value]) {
          counts[value] = 0;
        }
        counts[value]++;
        if (counts[value] > maxCount) {
          maxCount = counts[value];
          mode = [value];
        } else if (counts[value] === maxCount) {
          mode.push(value);
        }

      }
      mode.sort((a, b) => a - b);
      const result = mode.map((mode) => this.answerList[mode]);
      return result.join(', ');

    }
  }
}
</script>

<style scoped>
.chat {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  height: 80%;
  min-height: 800px;
  width: 80%;
  max-width: 1200px;
  min-width: 800px;
  background-color: #ffffff;
  margin: 5% auto 0rem;
  border-radius: 1.5rem;
  box-shadow: 0px 1px 20px #9c9cc855;
}

.chat__header {
  background: #ffffff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05);
  border-radius: 24px 24px 0px 0px;
  padding: 1.8rem;
  font-size: 20px;
  font-weight: 700;
}


.card {
  display: flex;
  justify-content: center;
  flex-direction: row;
  min-width: 600px;
}

.item {
  flex: 1;
  text-align: center;
  margin: 0 10px;
}

.option {
  font-family: Helvetica;
  font-size: 18px;
  line-height: 1.7;
  letter-spacing: tracking-wider;
  flex: 1;
  text-align: center;
}

.option1 {
  font-family: Helvetica;
  font-size: 18px;
  line-height: 1.7;
  letter-spacing: tracking-wider;
  flex: 1;
  text-align: center;

}
</style>




