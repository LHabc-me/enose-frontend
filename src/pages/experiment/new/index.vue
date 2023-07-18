<template>
  <div style="height: 80vh">
    <div>
      <v-timeline direction="horizontal" line-inset="12" side="end">
        <v-timeline-item v-for="(item, index) in statuses" :key="index"
                         :dot-color="currentStep >= index ? 'primary' : 'grey'">
          {{ item }}
        </v-timeline-item>
      </v-timeline>
    </div>
    <div class="h-100">
      <v-window class="h-100"
                :show-arrows="true"
                @update:model-value="i => currentStep = i">
        <v-window-item class="h-100"
                       v-for="(step, index) in steps" :key="index">
          <KeepAlive>
            <component :is="step"></component>
          </KeepAlive>
        </v-window-item>
        <template v-slot:prev="{ props }">
          <v-btn color="primary"
                 @click="props.onClick"
                 v-if="currentStep === 1">
            上一步
          </v-btn>
        </template>
        <template v-slot:next="{ props }">
          <v-btn color="primary"
                 @click="props.onClick"
                 v-if="currentStep === 0 || currentStep === 1">
            下一步
          </v-btn>
        </template>
      </v-window>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import ExperimentStep1 from "@/components/experiment/new/experiment-step1.vue";
import ExperimentStep2 from "@/components/experiment/new/experiment-step2.vue";
import ExperimentStep3 from "@/components/experiment/new/experiment-step3.vue";
import ExperimentStep4 from "@/components/experiment/new/experiment-step4.vue";

const steps = [ExperimentStep1, ExperimentStep2, ExperimentStep3, ExperimentStep4]

const statuses = ref(['上传数据', '选择算法', '开始实验', '实验完成'])
const currentStep = ref(0)
</script>

<!--@formatter:off-->
<route lang="json5">
{
  meta: {
    layout: 'main',
    //requireLogin: true,
  }
}
</route>
