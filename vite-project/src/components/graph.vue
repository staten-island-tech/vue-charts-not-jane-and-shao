<script setup>
import { ref, onMounted, watch, defineProps } from 'vue';
import { Chart } from 'chart.js/auto';

const props = defineProps({
    guess: {
        type: Number,
        required: true
    }
});

const chartCanvas = ref(null);
let myChart = null;

onMounted(() => {
    const ctx = chartCanvas.value.getContext('2d');

    myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          datasets: [{
            data: [props.guess, 100 - props.guess],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)'
            ],
            hoverOffset: 4
          }]
        },
        options: {  
        maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: false,
              text: `Pie Chart for ${props.guess}%`
            }
        }
        }
    });
});
  
watch(() => props.guess, (newValue) => {
    if (myChart) {
        myChart.data.datasets[0].data[0] = newValue;
        myChart.data.datasets[0].data[1] = 100 - newValue;
        myChart.options.plugins.title.text = `Pie Chart for ${newValue}%`;
        myChart.update();
    }
});
</script>

<template>
    <div>
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<style scoped>
canvas{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>