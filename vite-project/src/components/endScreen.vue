<template>
    <div>
<p>{{ winner  }}</p>
<p>{{ winnerPoints  }}</p>
    </div>
    <button @click.prevent="window.location = `http://localhost:5173/`">Return To Login</button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
let winner = ref('')
let winnerPoints = ref(0)
const props = defineProps({
    selfNumber: Number,
    gameInfo: Object,
})
const chartCanvas = ref(null);
    onMounted(async () => {
    console.log(props.gameInfo.players)
    props.gameInfo.players.forEach(player => {
        if(player.points > winnerPoints.value){
            winnerPoints.value = player.points
            winner.value = player.name
        }
        else if(player.points == winnerPoints.value){
            winnerPoints.value = player.points
            winner.value = `${winner.value} and ${player.name}`
        }
    });
    const ctx = chartCanvas.value.getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [winner.value],
      datasets: [{
        label: 'Points',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: [winnerPoints.value],
      }],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      },
    },
  });
})
</script>

<style lang="scss" scoped>

</style>