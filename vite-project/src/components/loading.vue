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
info.audio = new Audio(`https://vgmtreasurechest.com/soundtracks/omori-original-soundtrack-2020/jcyjvzwmpa/15.%20Tussle%20Among%20Trees.mp3`)
info.audio.play()
info.audio.loop = true
</script>

<style  scoped>
#loadingBox{
    background-color: skyblue;
    border: 1px solid black;
    display: flex;  
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
</style>