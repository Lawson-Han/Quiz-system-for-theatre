<template>
  <div class='chat'>
    <el-page-header class="chat__header" @back="goBack">
      <template #content>
        <span class="text-large font-600 mr-3"> Create a quiz </span>
      </template>
      <template #extra>
        <div class="flex items-center">
          <span class="text-large font-600 mr-3"> Welcome, <i>{{ username }} </i></span>

          <div class="flex">
            <el-button type="primary" @click="publish()">
              <el-icon>
                <Finished />
              </el-icon>
              Create a Quiz

            </el-button>
          </div>


        </div>
      </template>
    </el-page-header>
    <el-container>
      <el-aside width="15%" style="background-color: rgb(238, 241, 246)">
        <el-scrollbar>
          <el-menu :default-openeds="['1', '2']" default-active="2-1">
            <el-menu-item :disabled="this.muted" index="1" @click="add_question()"><el-icon>
                <Plus />
              </el-icon>New question</el-menu-item>
            <el-sub-menu index="2">
              <template #title>
                <el-icon>
                  <ChatLineSquare />
                </el-icon>Questions
              </template>
              <el-menu-item v-for="(item, index) in questions" :key="index" :index="'2-' + (index + 1)"
                @click="openQuestion(index, item)">
                <el-popconfirm title="Are you sure to delete this?" @confirm="remove_question(item, index)">
                  <template #reference>
                    <el-button type="danger" link style="margin-right: 10px">X</el-button>
                  </template>
                </el-popconfirm>

                Question {{ index + 1 }}
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-main>
        <question-form :question='questionSelected' :ID='ID'></question-form>

      </el-main>
    </el-container>
  </div>
</template>


<script >
import QuestionForm from "../components/QuestionForm.vue"
import { ElMessage } from 'element-plus'
import axios from 'axios'

export default {
  created() {
    this.questionSelected = this.questions[0];

  },
  components: {
    QuestionForm
  },
  data() {
    return {
      questions: [
        {
          body: "The programming language 'Swift' was created to replace what other programming language?",
          answer: 1,
          multi_answer: [0, 1],
          isMultiple: false,
          option: ["Ruby", "Objective-C", "C++", "C#"]
        },
        {
          body: "In computing terms, typically what does CLI stand for?",
          answer: 2,
          multi_answer: [0, 1],
          isMultiple: false,
          option: ["Common Language Input", "Control Line Interface", "Command Line Interface", "Common Language Interface"]
        },
        {
          body: "What does the computer software acronym JVM stand for?",
          answer: 0,
          multi_answer: [0, 1],
          isMultiple: false,
          option: ["Java Virtual Machine", "Java Vendor Machine", "Java Visual Machine", "Just Virtual Machine"]
        },
      ],
      questionSelected: null,
      ID: 1,
      muted: false,
      username: sessionStorage.getItem('uname'),
      code: null,
    }
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
    openQuestion(index, item) {
      this.questionSelected = item;
      this.ID = index + 1;
    },
    add_question() {
      if (this.questions.length < 6) {
        this.questions.push({
          body: "",
          answer: 0,
          multi_answer: [0, 1],
          isMultiple: false,
          option: []
        })
        if (this.questions.length == 6) {
          this.muted = true;
        }
      } else {
        this.muted = true;
      }
    },
    remove_question(item, index) {
      this.questions.splice(index, 1);
      // 删除以后打开新的此位置窗口 否则打开第一个窗口
      if (index >= this.questions.length) {
        this.openQuestion(0, this.questions[0])
      } else {
        this.openQuestion(index, this.questions[index])
      }

      // 若数量少于6个问题 重新允许添加
      if (this.questions.length < 6) {
        this.muted = false;
      }

      // 提示成功删除
      ElMessage({
        message: 'The question was deleted successfully.',
        type: 'success',
      });
    },
    publish() {
      for (var i = 0; i < this.questions.length; i++) {
        // check the body and option
        if (this.questions[i].body == '' || this.questions[i].option[0].trim() == ""
          || this.questions[i].option[1].trim() == "" || this.questions[i].option[2].trim() == ""
          || this.questions[i].option[3].trim() == "") {
          ElMessage.error('Oops, question ' + (i + 1).toString() + " was not finished editing!")
          return;
        }
        // check the multi-choice
        if (this.questions[i].isMultiple) {
          if (this.questions[i].multi_answer.length < 2) {
            console.log(this.questions[i].multi_answer)
            ElMessage.error('Ahh, question ' + (i + 1).toString() 
            + " multiple options were not edited correctly. ")
            return;
          }}}
      ElMessage({
        message: 'You have created a room successfully.',
        type: 'success',
      })
      this.$router.replace("/room");
      sessionStorage.setItem('status', 'room');

      let room_code = "";
      var j;
      for (var i = 0; i < 6; i++) {
        j = Math.floor(Math.random() * 10);
        room_code = room_code + String(j);
      }
      this.code = room_code;
      sessionStorage.setItem('roomcode', this.code);
      console.log(this.code);

      axios({
        method: 'post',
        data: {
          roomcode: this.code,
          question: this.questions
        },
        url: 'http://localhost:3000/question',
      }).then(res => {
        console.log(res.data)
      })

    },
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
  max-width: 1000px;
  min-width: 950px;
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
</style>
