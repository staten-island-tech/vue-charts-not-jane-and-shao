<template>
    <div class="container">
      <div class="winner-info">
        <h2>Your winner is: {{ winner }}</h2>
        <p>Points: {{ winnerPoints }}</p>
      </div>
      <div class="chart-container">
        <canvas ref="chartCanvas" class="chart"></canvas>
      </div>
      <button @click.prevent="returnToLobby" class="return-button">Return To Lobby</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { defineProps } from 'vue';
  import { Chart } from 'chart.js/auto';
  
  const props = defineProps({
    gameInfo: Object,
  });
  
  const chartCanvas = ref(null);
  let winner = ref('');
  let winnerPoints = ref(0);
  
  const returnToLobby = () => {
    window.location = `http://localhost:5173/`;
  };
  
  onMounted(async () => {
    props.gameInfo.players.forEach(player => {
      if (player.points > winnerPoints.value) {
        winnerPoints.value = player.points;
        winner.value = player.name;
      } else if (player.points === winnerPoints.value) {
        winner.value += ` and ${player.name}`;
      }
    });
  
    // Create chart
    const ctx = chartCanvas.value.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: props.gameInfo.players.map(player => player.name),
        datasets: [{
          label: 'Points',
          backgroundColor: 'rgba(253, 255, 255, 1)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1,
          data: props.gameInfo.players.map(player => player.points),
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  });
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 15px);
  }
  
  .winner-info {
    margin-bottom: 20px;
    text-align: center;
  }
  
  .chart-container {
    height: 730px;
    width: 100%;
    max-width: 600px;
    margin-bottom: 20px;
  }
  
  .return-button {
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    transform: translateY(-100px)
  }
  
  .return-button:hover {
    background-color: #0056b3;
  }
  </style>