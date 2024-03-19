<script setup>
import { ref } from 'vue'

const qAnswer = ref('')
const input = ref(null)
function receiveInput(){
  qAnswer.value = input.value.value;
  console.log(qAnswer.value)
}
</script>

<template>
  <form class="input">
    <label>please enter answer:</label>
    <input type="promptAnswer" ref="input">
    <button  @click.prevent="receiveInput()">submit</button>
  </form>
  <div v-if="qAnswer != ''">hehehehaw</div>
</template>

<style scoped>

</style>