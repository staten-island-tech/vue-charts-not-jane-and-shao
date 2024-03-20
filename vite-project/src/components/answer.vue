<script setup>
import { ref } from 'vue'

const qAnswer = ref('')
const input = ref(null)
function receiveInput(){
  qAnswer.value = input.value.value;
  console.log(qAnswer.value)
}

const player1Score = ref(0)
const player2Score = ref(0)

const player1votes = ref(0)
const player2votes = ref(0)

function addVote(buttonID){
    if(buttonID === player1Answer){
        player1votes += 1;
        player2AnswerV:disabled = isDisabled;
        console.log("player 1 has ", player1votes, "votes!");
    }
    else if(buttonID === player2Answer){
        player2votes += 1;
        player1AnswerV:disabled = isDisabled;
        console.log("player 2 has ", player1votes, "votes!")
    }
}
</script>

<template>
  <div>funny prompt goes here</div>
  <form class="input">
    <label>please enter answer:</label>
    <input type="promptAnswer" ref="input">
    <button  @click.prevent="receiveInput()">submit</button>
  </form>
  <br>
  <div>this is the prompt. what did you answer?</div>
  <div id="player1Answer" v-if="qAnswer != ''">{{ qAnswer }}</div>
  <button id="player1AnswerV" v-if="qAnswer != ''" :disabled="notDisabled">Vote Player 1</button>
  <div id="player2Answer" v-if="qAnswer != ''">the answer of player 2</div>
  <button id="player2AnswerV" v-if="qAnswer != ''" :disabled="notDisabled">Vote Player 2</button>
</template>

<style scoped>

</style>