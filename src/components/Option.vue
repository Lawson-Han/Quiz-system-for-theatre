<template>
  <el-button class="w-full bg-gray-200 rounded-lg p-4 transition md:text-lg md:p-6" v-html="text" style="margin-left: 0px"
    id="allowNext" @click="choose(idx)"></el-button>

</template>

<script>

export default {
  props: {
    text: String,
    idx: Number
  },
  data() {
    return {
    };
  },
  created() {
    // this.$emit("selected", false);
  },
  methods: {
    choose(idx) {
      this.$emit("answerID", idx);
    }
  }
};
</script>