<template>
  <div class="pa-10">
    <VProgressLinear class="w-75"
                     color="primary"
                     :striped="true"
                     height="25"
                     v-model="progressDegree">
      {{ `已完成${progressDegree}%` }}
    </VProgressLinear>
    <div id="experiment-step3-chart" class="mx-auto" style="width: 1200px;height: 500px"></div>
    <div class="w-50 mx-auto">
      <VBtn :block="true" color="primary" :disabled="progressDegree < 100"
            @click="experiment.currentStep++">查看结果
      </VBtn>
    </div>
  </div>
</template>
<script setup>
import * as echarts from 'echarts';
import {onMounted, ref} from "vue";
import {useNewExperiment} from "@/store/modules/new-experiment";

const experiment = useNewExperiment()
const progressDegree = ref(0);


function transformData(data) {
  const result = []
  const keys = Object.keys(data[0]).filter(key => key.startsWith('AI'))
  for (let i = 0; i < keys.length; i++) {
    result.push([])
  }
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    for (let j = 0; j < keys.length; j++) {
      result[j].push(item[keys[j]])
    }
  }
  return result
}

onMounted(() => {
  const chart = echarts.init(document.getElementById('experiment-step3-chart'));
  const option = {
    series: transformData(experiment.dataJSON).map(item => {
      return {
        data: item,
        type: 'line',
        smooth: true
      }
    }),
    xAxis: {
      type: 'category',
      data: experiment.dataJSON.map(item => item['Index'])
    },
    yAxis: {}
  };

  chart.setOption(option);
  const interval = setInterval(() => {
    const increment = parseInt((Math.random() * 30).toFixed(0))
    if (progressDegree.value + increment >= 100) {
      progressDegree.value = 100
      clearInterval(interval)
    } else {
      progressDegree.value += increment
    }
  }, 1000)
});
</script>
