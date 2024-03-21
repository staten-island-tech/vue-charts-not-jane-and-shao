<script setup>
import { ref } from 'vue'

const qAnswer = ref('')
const input = ref(null)
function receiveInput(){
  qAnswer.value = input.value.value;
}

const player1Score = ref(0)
const player2Score = ref(0)

const player1votes = ref(0)
const player2votes = ref(0)

function addVote(buttonID){
  console.log(buttonID)
    if(buttonID === 1){
        player1votes.value += 1;
        player2AnswerV.disabled = true;
        player1AnswerV.disabled = true;
        console.log("player 1 has ", player1votes.value, "vote(s)!");
    }
    else if(buttonID === 2){
        player2votes.value += 1;
        player1AnswerV.disabled = true;
        player2AnswerV.disabled = true;
        console.log("player 2 has ", player2votes.value, "vote(s)!")
    }
    else{
      console.log("it didnt work")
    }
}

function addScore(){
  if(player1votes.value > player2votes.value){
    player1Score.value = player1votes.value * 100 
  }
  else if(player2votes.value > player1votes.value){
    player2Score.value = player2votes.value * 100 
  }
}

</script>

<template>
  <div>funny prompt goes here</div>
  <form class="input">
    <label>please enter answer:</label>
    <input type="promptAnswer" ref="input">
    <button @click.prevent="receiveInput()">submit</button>
  </form>
  <br>
  <div>this is the prompt. what did you answer?</div>
  <div id="player1Answer" v-if="qAnswer != ''">{{ qAnswer }}</div>
  <button id="player1AnswerV" v-if="qAnswer != ''" @click="addVote(1)">Vote Player 1</button>
  <div id="player2Answer" v-if="qAnswer != ''">the answer of player 2</div>
  <button id="player2AnswerV" v-if="qAnswer != ''" @click="addVote(2)">Vote Player 2</button>
</template>

<style scoped>

</style>