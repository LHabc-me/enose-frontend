<template>
  <div class="pa-10">
    <VRow style="margin-top: 40px">
      <VProgressCircular model-value="100" color="primary" class="text-center mx-auto" :size="400">
        <span class="text-h3">
          预测结果<br>
          血糖高
        </span>
      </VProgressCircular>
    </VRow>
    <VRow style="margin-top: 80px" class="w-75 mx-auto">
      <VCol :cols="6">
        <VBtn :block="true" @click="$router.push('/')">返回主页</VBtn>
      </VCol>
      <VCol :cols="6">
        <VBtn :block="true" @click="restart">再次实验</VBtn>
      </VCol>
    </VRow>
  </div>
</template>
<script setup>
import {useNewExperiment} from "@/store/modules/new-experiment";
import {useRouter} from "vue-router";

const experiment = useNewExperiment()
const router = useRouter()

function restart() {
  experiment.reset()
  router.push('/experiment/new')
}
</script>
