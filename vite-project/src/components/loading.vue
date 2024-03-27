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
defineProps({
  gameInfo: Object,
  role: String,
  game: String
})
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