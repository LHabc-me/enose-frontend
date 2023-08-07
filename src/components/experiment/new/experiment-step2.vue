<template>
  <div class="h-100" style="padding: 70px">
    <VRow class="h-100">
      <VCol :cols="6">
        <div class="h-100">
          <div class="pa-10">
            <VRow v-for="(item, index) in algorithms"
                  :key="index"
                  md="4">

              <div class="text-h3 flex-grow-1 text-center d-flex align-center justify-center"
                   :class="{'bg-primary' : item.name === algorithmSelected}" style="height: 150px">
                {{ item.name }}
              </div>

            </VRow>
          </div>
        </div>
      </VCol>
      <VCol :cols="6">
        <div class="h-100">
          <div class="h-25 mx-auto text-center d-flex align-center justify-center"
               style="font-family: 方正卡通简体,serif; font-size:3rem">
            第二步：选择算法
          </div>
          <div class="h-75 pa-10">
            <VSelect label="选择算法"
                     :items="algorithms.map(item => item.name)"
                     variant="outlined"
                     color="primary"
                     v-model="algorithmSelected">
            </VSelect>
            <div class="h-100 border-md rounded-lg">
              参数设置
            </div>
          </div>
        </div>
      </VCol>
    </VRow>
  </div>
</template>
<script setup>
import {useNewExperiment} from "@/store/modules/new-experiment";
import {ref, watch} from "vue";

const algorithms = ref([
  {id: 1, name: '算法1', description: '算法1描述'},
  {id: 2, name: '算法2', description: '算法2描述'},
  {id: 3, name: '算法3', description: '算法3描述'}])
const experiment = useNewExperiment()
const algorithmSelected = ref(null)
watch(algorithmSelected, (newVal) => {
  experiment.algorithm = newVal
})
</script>
