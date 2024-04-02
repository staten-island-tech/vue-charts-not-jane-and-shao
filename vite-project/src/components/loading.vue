<template>
  <div id="loadingContainer" :class="game" v-if="gameInfo.state === 'start'">
    <div id="mainContent">
      <div id="coolBox">
      <h2 class="game-title">{{ game }}</h2>
      <h2>A SITHS Data-Based Game</h2>
      <p class="room-code">Room Code: {{ gameInfo.code }}</p>
    </div>
    <button id="startButton" v-if="role === 'host' && gameInfo.aop > 0" @click.prevent="$emit('startGame')">Start</button>
    </div>
    <div id="sidebar">
      <h3>Players:</h3>
      <div class="players-list">
        <div v-for="player in gameInfo.players" :key="player.id" class="player-item">
          {{ player.name }}
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { info } from '@/reactive';

defineProps({
  gameInfo: Object,
  role: String,
  game: String
})
info.audio.muted = true
info.audio = new Audio(`https://epsilon.vgmsite.com/soundtracks/portal/udjkwzrqhw/14.%20Still%20Alive%20%28Radio%20Mix%29.mp3`)
info.audio.play()
info.audio.loop = true
</script>

<style scoped>

#coolBox{
  border: 2px black solid;
  border-radius: 5px;
background-color: rgba(255,255,255,0.75);
color: black;
padding: 5%;

text-align: center;
}

#loadingContainer {
  position: absolute;
  border: 2px black solid;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;
  display: flex;
  justify-content: space-between;
  height: calc(100vh - 15px);
  background-image: url(https://livingnewdeal.org/wp-content/uploads/2014/07/Staten-Island-Technical-HS.jpg);
}



#mainContent {
  width: 85%;
  justify-self: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-image: radial-gradient(rgba(182,187,196,.95  ), rgba(182,187,196,.85));
  /* background-color: rgba(182, 187, 196,0.85); */
}

#sidebar {
  border: 2px black solid;
  border-left: 5px black solid;
  width: 15%;
  padding: 20px;
  background-color: #525CEB;
}

.game-title {
  font-size: 65px;
  margin-bottom: 0px;
  margin-top: 0px;
  color: #525CEB;
  -webkit-text-stroke: .01px black;
}

.room-code {
  font-size: 25px;
  margin-top: 0px;
  margin-bottom: 0px;
  color: #000000;
}

.players-list {
  width: 100%;
  margin-top: 20px;
}

.player-item {
  margin-bottom: 5px;
  color: ffffff;
}

button{
  margin-top: 5%;
  display: inline-block;
  outline: none;
  cursor: pointer;
  border-radius: 0;
  font: 'DoTGothic16';
  font-family: 'DotGothic16', sans-serif
  }

  #startButton{
    height: 10%;
    width: auto;
    font-size: 30px;
  }
</style>