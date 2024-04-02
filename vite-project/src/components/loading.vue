<template>
  <div id="loadingContainer" v-if="gameInfo.state === 'start'">
    <div id="mainContent">
      <h2 class="game-title">{{ game }}</h2>
      <p class="room-code">Room Code: {{ gameInfo.roomCode }}</p>
      <button v-if="role === 'host' && gameInfo.aop > 0" @click.prevent="$emit('startGame')">Start</button>
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
#loadingContainer {
  display: flex;
  justify-content: space-between;
}

#mainContent {
  flex: 1;
  padding: 20px;
  background-color: #f0f0f0;
}

#sidebar {
  width: 200px;
  padding: 20px;
  background-color: #e0e0e0;
}

.game-title {
  margin-bottom: 10px;
  color: #333;
}

.room-code {
  margin-bottom: 10px;
  color: #555;
}

.players-list {
  margin-top: 20px;
}

.player-item {
  margin-bottom: 5px;
  color: black;
}

button{
  display: inline-block;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  padding: 0 12px;
  line-height: 20px;
  height: 30px;
  max-height: 30px;
  background: #fff;
  font-weight: 700;
  border: 2px solid #DAE3F3;
  border-radius: 0;
  color: #272C34;
  transition-timing-function: ease-in-out;
  transition-property: box-shadow;
  transition-duration: 150ms;
  font: 'DoTGothic16';
  font-family: 'DotGothic16', sans-serif
  }
</style>