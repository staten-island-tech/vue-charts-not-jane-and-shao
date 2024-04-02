<template>
    <div id="loadingBox" v-if="gameInfo.state == 'start'">    <h1>{{ game }}</h1>
 <p v-for="player in gameInfo.players">{{ player.name }}</p>
 <form>
    <!-- v-if="gameInfo.aop + 2 >= gameInfo.peopleNeeded && role == 'host'" -->
   <button v-if="role == 'host' && gameInfo.aop > 0"   @click.prevent="$emit('startGame')">start</button>
   
</form>
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

<style  scoped>
#loadingBox{
    background-color: rgb(155, 235, 135);
    border: 1px solid black;
    display: flex;  
    justify-content: center;
    flex-direction: column;
    align-items: center;
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