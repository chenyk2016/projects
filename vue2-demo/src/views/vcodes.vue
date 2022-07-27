<template>
  <div class="verify-all-top">
    1
    <div class="verify-all">
      <div class="verify-one">{{msg}}</div>
      <div class="verify-one">Enter the 6-digit merchant code to redeem your voucher</div>
      <div class="verify-input">
        <div class='verify-input-div'>
          <div
            class="input-content"
            ref="inputParent"
          >
            <input
              @keydown="keydown"
              @keyup="keyup"
              @paste='paste'
              @mousewheel='mousewheel'
              @input="inputEvent"
              class="code-text"
              max='9'
              min='0'
              maxlength="1"
              data-index='0'
              v-model.trim.number="input[0]"
              type="tel"
              ref="firstinput"
            />
            <input
              class="code-text"
              max='9'
              min='0'
              maxlength="1"
              data-index='1'
              v-model.trim.number="input[1]"
              type="tel"
            />
            <input
              class="code-text"
              max='9'
              min='0'
              maxlength="1"
              data-index='2'
              v-model.trim.number="input[2]"
              type="tel"
            />
            <input
              class="code-text"
              max='9'
              min='0'
              maxlength="1"
              data-index='3'
              v-model.trim.number="input[3]"
              type="tel"
            />
            <input
              class="code-text"
              max='9'
              min='0'
              maxlength="1"
              data-index='4'
              v-model.trim.number="input[4]"
              type="tel"
            />
            <input
              class="code-text"
              max='9'
              min='0'
              maxlength="1"
              data-index='5'
              v-model.trim.number="input[5]"
              type="tel"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="verify-all-btn">
      <button
        type="warning"
        round
        class="redeem"
        @click="redeem"
      >Redeem</button>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      pasteResult: [],
    }

  },
  computed: {

  },
  mounted () {

  },
  beforeDestroy () {

  },
  methods: {

  }
}
</script>
<style scoped>
.verify-all {
  padding: 20px;
}
.verify-one {
  margin-bottom: 20px;
}
.verify-cont {
  margin: 30px 0;
  font-size: 16px;
}
.verify-input {
  position: relative;
}
.verify-input-div .input-content {
  display: flex;
  width: 100%;
}
.verify-input-div .code-text:last-child {
  margin-right: 0;
}
.verify-input-div .code-text {
  border: 1px solid #d4d4d4;
  background-color: #f7f7f7;
  text-align: center;
  width: 36px;
  height: 50px;
  border-radius: 10px;
  margin-right: 12px;
  font-size: 18px;
  flex: 1;
  outline: none;
}
.verify-time {
  margin-top: 20px;
}
.verify-time-again {
  text-align: center;
  margin-top: 60px;
}
.verify-email {
  font-weight: bold;
}
.el-button.redeem.el-button--warning.is-round {
  width: 100%;
  color: #0a183a;
}
.verify-all-btn {
  position: fixed;
  bottom: 0;
  background-color: #ffffff;
  width: 100%;
  left: 0;
  right: 0;
  padding: 20px;
}
</style>