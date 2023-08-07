<template>
  <div style="height: 80vh" class="pa-10">
    <div>
      <VTimeline direction="horizontal" line-inset="12" side="end">
        <VTimelineItem v-for="(item, index) in statuses" :key="index"
                       :dot-color="experiment.currentStep >= index ? 'primary' : 'grey'">
          {{ item }}
        </VTimelineItem>
      </VTimeline>
    </div>
    <div class="h-100">
      <VWindow class="h-100"
               :show-arrows="true"
               v-model="experiment.currentStep">
        <VWindowItem class="h-100"
                     v-for="(step, index) in steps" :key="index">
          <KeepAlive>
            <component :is="step"></component>
          </KeepAlive>
        </VWindowItem>
        <template #prev>
          <VBtn color="primary"
                @click="experiment.currentStep--"
                v-if="experiment.currentStep === 1">
            上一步
          </VBtn>
        </template>
        <template #next>
          <VBtn color="primary"
                @click="onNextClick"
                v-if="experiment.currentStep === 0 || experiment.currentStep === 1">
            下一步
          </VBtn>
        </template>
      </VWindow>
    </div>
    <VDialog v-model="dialog"
             :persistent="true"
             width="auto"
             class="position-absolute">
      <VCard>
        <VCardTitle class="text-h5">
          {{ dialogTitle }}
        </VCardTitle>
        <VCardText>{{ dialogText }}</VCardText>
        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn variant="text"
                @click="onDialogConfirm"
                color="primary">
            确定
          </VBtn>
          <VBtn variant="text"
                @click="dialog = false"
                color="error">
            取消
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<script setup>
import {ref} from "vue";
import ExperimentStep1 from "@/components/experiment/new/experiment-step1.vue";
import ExperimentStep2 from "@/components/experiment/new/experiment-step2.vue";
import ExperimentStep3 from "@/components/experiment/new/experiment-step3.vue";
import ExperimentStep4 from "@/components/experiment/new/experiment-step4.vue";
import {useNewExperiment} from "@/store/modules/new-experiment";
import {useMessage} from "@/store/modules/message";

const experiment = useNewExperiment()
const message = useMessage()

const steps = [ExperimentStep1, ExperimentStep2, ExperimentStep3, ExperimentStep4]

const statuses = ref(['上传数据', '选择算法', '开始实验', '实验完成'])

const dialog = ref(false)
const dialogTitle = ref('确定开始实验？')
const dialogText = ref('开始实验后，将无法修改实验参数。')

function onNextClick() {
  // 如果下一步是开始实验，需要先弹出确定对话框
  if (experiment.currentStep === 1) {
    dialog.value = true
    return
  }
  ++experiment.currentStep
}

function onDialogConfirm() {
  dialog.value = false
  if (experiment.algorithm && experiment.data) {
    ++experiment.currentStep
  } else {
    message.error('请先上传数据并选择算法')
  }
}
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
