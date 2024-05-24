<template>
  <div class="whole-box">
    <div class="contain">
      <div class="small-box">
      <div class="scontent" style="font-size: 1.3em;">
        Room Code
      </div>
      <div class="scontent" style="font-size: 2.5em;">
        {{roomcode}}
      </div>
      <div class="join" >
        Joined People: 27
      </div>
      <div class="submit">
        Subbmitted People: 25
      </div>
      <button class="bbutton" @click="publish()" >Student Feedback</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomcode: sessionStorage.getItem('roomcode')

    }
  },
  methods: {
    publish() {
          this.$router.replace("/publish");
          sessionStorage.setItem('status', 'publish');
        }

  },
  created(){
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
  width: 50%;
  height: 55%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0,
    0 0 6px #f0f0f0;
}

.bbutton {
  width: 60%;
  height: 40px;
  position: absolute;
  left: 20%;
  top: 180%;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: rgb(182, 100, 198);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
} 

.small-box {
  width: 80%;
  height: 40%;
  background: linear-gradient(150deg, rgb(176, 120, 57), rgb(162, 56, 183));
  position: absolute;
  top: 10%;
  left: 10%;
  transform: translateX(0%);
  transition: all 1s;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  border-top-right-radius: inherit;
}


.join {
  color: rgb(176, 120, 57);
  font-size: 1.6em; 
  top: 160%;
  padding: 2.6em 0em 0em 0em;
  display: flex;
  justify-content: center;
  line-height: 1.7em;
}

.submit {
  color: rgb(176, 120, 57);
  font-size: 1.6em;
  top: 100%;
  display: flex;
  justify-content: center;
  padding: 0.2em 0em 0em 0em;
  line-height: 1.7em;
}

.scontent {
  color: #fff;
  text-align: center;
  padding: 0.4em 1em;
  line-height: 1.7em;
}

.small-box.active {
  left: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  transform: translateX(-100%);
  transition: all 1s;
}</style>
