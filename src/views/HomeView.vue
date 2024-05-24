<template>
  <div class="whole-box">
    <div class="contain">
      <div class="big-box" :class="{ active: isJoin }">
        <div class="big-contain" v-if="isJoin">
          <div class="btitle">Join the quiz</div>
          <div class="bform">
            <!-- ref 指代当前this.refs需要的东西-->
            <!-- model 指代当前form 绑定的模型数据-->
            <!-- rules 指代当前规则-->
            <!-- class 指代当前css样式-->
            <el-form ref="joinFormRef" :model="joinForm" :rules="joinFormRules" label-width="100px" class="join_form">
              <!-- Credentials -->
              <el-form-item label="Room code" prop="code">
                <el-input size="large" v-model="joinForm.code"></el-input>
              </el-form-item>
              <el-form-item label="Nickname" prop="nickname">
                <el-input size="large" type="nickname" v-model="joinForm.nickname"></el-input>
              </el-form-item>
            </el-form>
          </div>

          <button class="bbutton" @click="join()">Join</button>
        </div>
        <div class="big-contain" v-else>
          <div class="btitle">Create a quiz room</div>
          <div class="bform">
            <el-form ref="joinFormRef" :model="joinForm" :rules="joinFormRules" label-width="100px" class="join_form">
              <!-- Credentials -->
              <el-form-item label="Nickname" prop="nickname">
                <el-input size="large" type="nickname" v-model="joinForm.nickname" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <button class="bbutton" @click="create()">Create</button>

        </div>
      </div>
      <div class="small-box" :class="{ active: isJoin }">
        <div class="small-contain" v-if="isJoin">
          <div class="stitle">Wanna create a quiz room?</div>
          <p class="scontent">Easily having a quiz with students!</p>
          <button class="sbutton" @click="changeType">Create</button>
        </div>
        <div class="small-contain" v-else>
          <div class="stitle">Want to join the quiz?</div>
          <p class="scontent">Start your learning trip!</p>
          <button class="sbutton" @click="changeType">Join</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Code from '../static/roomcode.json';
export default {
  data() {
    return {
      code: Code.roomcode,
      isJoin: true,
      // 表单的数据绑定对象
      joinForm: {
        code: '',
        nickname: ''
      },
      // 表单规则验证
      joinFormRules: {
        code: [
          { required: true, message: 'Empty room code', trigger: 'blur' },
          { min: 6, max: 6, message: 'Only 6 characters long', trigger: 'blur' },
          { pattern: /^[0-9]+$/, message: 'Only numeric characters' }
        ],
        nickname: [
          { required: true, message: 'Empty nickname', trigger: 'blur' },
          { min: 3, max: 10, message: 'Between 3 to 10 characters', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9]+$/, message: 'Only alphanumeric characters' }
        ]
      },



    }
  },
  methods: {
    changeType() {
      this.isJoin = !this.isJoin
      this.$refs.joinFormRef.resetFields()
    },
    join() {
      this.$refs.joinFormRef.validate((valid) => {
        if (valid) {
          if (this.code.includes(this.joinForm.code)) {

            this.$router.replace("/join");
            sessionStorage.setItem('uname', this.joinForm.nickname);
            sessionStorage.setItem('status', 'join');
            sessionStorage.setItem('code', this.joinForm.code);
          } else {
            this.$message.error('Oops, the code is invalid.');
          }
        }
      })
    },
    create() {
      this.$refs.joinFormRef.validate((valid) => {
        if (valid) {
          this.$router.replace("/create");
          sessionStorage.setItem('uname', this.joinForm.nickname);
          sessionStorage.setItem('status', 'create');
        }
      });
    }
  },
  created() {
  },
}
</script>

<style scoped="scoped">
.whole-box {
  height: 100vh;
  margin: 0;
  padding: 0;
}

.contain {
  width: 60%;
  min-width: 500px;
  max-width: 900px;
  height: 55%;
  min-height: 400px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0,
    0 0 6px #f0f0f0;
}

.big-box {
  width: 70%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 30%;
  transform: translateX(0%);
  transition: all 1s;
}

.big-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btitle {
  font-size: 2em;
  font-weight: bold;
  color: rgb(57, 167, 176);
}

.bform {
  width: 100%;
  height: 40%;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.bform .errTips {
  display: block;
  width: 50%;
  text-align: left;
  color: red;
  font-size: 0.7em;
  margin-left: 1em;
}

.bform input {
  width: 50%;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 10px;
  padding-left: 2em;
  background-color: #f0f0f0;
  font-size: 20px;
}

.bbutton {
  width: 20%;
  height: 40px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: rgb(57, 167, 176);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}

.small-box {
  width: 30%;
  height: 100%;
  background: linear-gradient(135deg, rgb(57, 167, 176), rgb(56, 183, 145));
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(0%);
  transition: all 1s;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}

.small-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.stitle {
  width: 70%;
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
}

.scontent {
  font-size: 0.9em;

  color: #fff;
  text-align: center;
  padding: 2em 1em;
  line-height: 1.7em;
}

.sbutton {
  width: 60%;
  font-weight: bold;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 1.0em;
  cursor: pointer;
}

.big-box.active {
  left: 0;
  transition: all 0.5s;
}

.small-box.active {
  left: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  transform: translateX(-100%);
  transition: all 1s;
}
</style>
