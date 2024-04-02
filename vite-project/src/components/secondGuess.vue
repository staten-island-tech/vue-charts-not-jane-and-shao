<template>
    <div class="container">
    <div>
<p>{{ selfNumber }}</p>
    </div>
     <div v-if="gameInfo.state == 'secondGuess' && gameInfo.excluded != selfNumber">
        <p>choose</p>
        <p>The Over Under Is {{ gameInfo.guess }}</p>
<button @click.prevent="$emit('ou','over')">Over</button>
 <button @click.prevent="$emit('ou','under')">Under</button>
     </div>
     <div v-else><p>waiting</p></div>
    </div>
</template>

<script setup>


const props = defineProps({
        selfNumber: Number,
        gameInfo: Object,
    })
</script>

<style scoped>
    .container{
  text-align: center;
  margin: 0 auto 0 autos;
  background-color: black;
    color:white;
    font: 'DoTGothic16';
    font-family: 'DotGothic16', sans-serif
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