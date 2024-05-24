<template>
  <h1 style="display: inline">Question {{ ID }}</h1>
  <el-form :model="question" :rules="QuizRules" style="margin-top: 30px;">
    <el-form-item label="Question Body" prop="body">
      <el-input maxlength="100"
                placeholder="Please input the question..."
                show-word-limit
                clearable
                v-model="question.body"
                size="default"
                style="width: 90%"
      />
    </el-form-item>

    <el-form-item label="Multiple Choice">
      <el-switch v-model="question.isMultiple" />
    </el-form-item>

    <div>
      <!--单选-->
      <el-radio-group fill="#95d475" v-model="question.answer" class='radioDiv' v-if="!question.isMultiple" :key="1">
        <el-row style="flex-wrap: nowrap">
          <el-radio-button size="large" :label="0">Option A</el-radio-button>
          <el-form-item prop="option[0]" style="width: 50%; margin-left: 15px">
            <el-input maxlength="40" size="large" v-model="question.option[0]"></el-input>
          </el-form-item>
        </el-row>

        <el-row style="flex-wrap: nowrap">
          <el-radio-button size="large" :label="1">Option B</el-radio-button>
          <el-form-item prop="option[1]" style="width: 50%; margin-left: 15px">
            <el-input maxlength="40" size="large" v-model="question.option[1]"></el-input>
          </el-form-item>
        </el-row>

        <el-row style="flex-wrap: nowrap">
          <el-radio-button size="large" :label="2">Option C</el-radio-button>
          <el-form-item prop="option[2]" style="width: 50%; margin-left: 15px">
            <el-input maxlength="40" size="large" v-model="question.option[2]"></el-input>
          </el-form-item>
        </el-row>

        <el-row style="flex-wrap: nowrap">
          <el-radio-button size="large" :label="3">Option D</el-radio-button>
          <el-form-item prop="option[3]" style="width: 50%; margin-left: 15px">
            <el-input maxlength="40" size="large" v-model="question.option[3]"></el-input>
          </el-form-item>
        </el-row>

      </el-radio-group>
    </div>

    <div>
      <!--多选-->
      <el-checkbox-group fill="#95d475" v-model="question.multi_answer" size="large" class='radioDiv' v-if="question.isMultiple" :key="2">
        <el-row style="flex-wrap: nowrap">
          <el-checkbox-button  size="large" :label="0">Option A</el-checkbox-button>
          <el-form-item prop="option[0]" style="width: 50%;margin-left: 15px">
            <el-input maxlength="40" size="large" v-model="question.option[0]"></el-input>
          </el-form-item>
        </el-row>

        <el-row style="flex-wrap: nowrap">
          <el-checkbox-button  size="large" :label="1">Option B</el-checkbox-button>
          <el-form-item prop="option[1]" style="width: 50%;margin-left: 15px">
            <el-input maxlength="40" size="large"  v-model="question.option[1]"></el-input>
          </el-form-item>
        </el-row>

        <el-row style="flex-wrap: nowrap">
          <el-checkbox-button  size="large" :label="2">Option C</el-checkbox-button>
          <el-form-item prop="option[2]" style="width: 50%;margin-left: 15px">
            <el-input maxlength="40" size="large" v-model="question.option[2]"></el-input>
          </el-form-item>
        </el-row>

        <el-row style="flex-wrap: nowrap">
          <el-checkbox-button  size="large" :label="3">Option D</el-checkbox-button>
          <el-form-item prop="option[3]" style="width: 50%;margin-left: 15px">
            <el-input maxlength="40" size="large" v-model="question.option[3]"></el-input>
          </el-form-item>
        </el-row>

      </el-checkbox-group>
    </div>

    <!-- <el-form-item style="margin-top: 40px">
      <el-button type="primary" @click="onSubmit" size="large" round>Save</el-button>
    </el-form-item>
     -->
  </el-form>

</template>

<script>
export default {
  props: ['ID', 'question'],
  data () {
    return {
      // 表单的数据绑定对象
      QuizRules: {
        body: [
          { required: true, message: 'Empty question body', trigger: 'blur' }
        ],
        'option[0]': [
          { required: true, message: 'Empty option A', trigger: 'blur' }
        ],
        'option[1]': [
          { required: true, message: 'Empty option B', trigger: 'blur' }
        ],
        'option[2]': [
          { required: true, message: 'Empty option C', trigger: 'blur' }
        ],
        'option[3]': [
          { required: true, message: 'Empty option D', trigger: 'blur' }
        ],
      },
    }
  }
}
</script>

<style scoped>
.radioDiv {
  width: auto;
  text-align: left;
  display: block;
}
.radioDiv > div {
  margin-top: 30px;
}

</style>
