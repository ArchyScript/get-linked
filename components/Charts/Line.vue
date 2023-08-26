<template>
  <div class="w-full h-full">
    <canvas ref="chartCanvas" class="w-full h-full"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Chart, LineController, CategoryScale } from 'chart.js';

Chart.register(LineController, CategoryScale);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    fill?: boolean;
  }[];
}

const props = defineProps<{
  chartData: ChartData;
  chartOptions?: any;
}>()

const chartCanvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (chartCanvas.value) {
    const ctx = chartCanvas.value.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: props.chartData,
        options: props.chartOptions || {},
      });
    }
  } 
});
</script>