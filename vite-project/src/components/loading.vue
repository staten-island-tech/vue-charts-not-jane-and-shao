<template>
  <div id="loadingContainer" :class="game" v-if="gameInfo.state === 'start'">
    <div id="mainContent">
      <div id="coolBox">
      <h2 class="game-title shadows-into">{{ game }}</h2>
      <h2 id="filler">A SITHS Data-Based Game</h2>
      <p class="room-code">Room Code: {{ gameInfo.code }}</p>
    </div>
    <button id="startButton" v-if="role === 'host' && gameInfo.aop > 0" @click.prevent="$emit('startGame')">Start</button>
    </div>
    <div id="sidebar">
      <h3>Players</h3>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0px;
  font-family:fantasy;
  border-radius: 5px;
  height: 65%;
background-image: url(https://upload.wikimedia.org/wikipedia/commons/e/e5/Post-it-note-transparent.png);
background-position: center;
background-repeat:no-repeat;

color: black;
padding: 5%;

text-align: center;
}

#filler{
  margin-right: 15px;
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
  background-image: url(https://wallpapers.com/images/featured/lined-paper-background-16f0avgoxi7t0rc9.jpg);
  background-size: cover;
 background-repeat: no-repeat;
}



#mainContent {
  width: 85%;
  justify-self: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 20px;
  /* background-image: radial-gradient(rgba(182,187,196,.95  ), rgba(182,187,196,.85)); */
  /* background-color: rgba(182, 187, 196,0.85); */
}

#sidebar {
  color:#000000;
  text-align: center;
  border: 2px black solid;
  border-left: 5px black solid;
  width: 15%;
  padding: 20px;
  background-color: rgba(250,250,250,0.8);
   background-size: cover;
 background-repeat: no-repeat;
}

.shadows-into light-regular {
  font-family: "Shadows Into Light", cursive;
  font-weight: 400;
  font-style: normal;
}

.game-title {
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 45px;
  margin-bottom: 0px;
  margin-right: 15px;
  color: #525CEB;
  -webkit-text-stroke: .01px black;
}





.room-code {
  margin-right: 15px;
  font-size: 25px;
  margin-top: 0px;
  margin-bottom: 0px;
  color: #000000;
}

.players-list {
  width: 100%;
  margin-top: 20px;
  font-family: 'DotGothic16', sans-serif
}

.player-item, h3 {
  font-size: 22px;
  margin-bottom: 20px;
  color: #000000;
  font-family: 'DotGothic16', sans-serif
}



/* CSS */
.button {
  align-items: center;
  appearance: none;
  background-color: #FCFCFD;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #36395A;
  cursor: pointer;
  display: inline-flex;

margin-top: 0px;
  display: inline-block;
  outline: none;
  cursor: pointer;
  border-radius: 0;
  font: 'DoTGothic16';
  font-family: 'DotGothic16', sans-serif
}

.button:focus {
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

.button:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  transform: translateY(-2px);
}

.button:active {
  box-shadow: #D6D6E7 0 3px 7px inset;
  transform: translateY(2px);
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