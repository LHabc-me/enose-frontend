<template>
  <div style="height: 80vh">
    <div>
      <v-timeline direction="horizontal" line-inset="12" side="end">
        <v-timeline-item v-for="(item, index) in statuses" :key="index"
                         :dot-color="currentStatus >= index ? 'primary' : 'grey'">
          {{ item }}
        </v-timeline-item>
      </v-timeline>
    </div>
    <div class="h-100">
      <v-window class="h-100"
                :show-arrows="true"
                @update:model-value="i => currentStatus = i">
        <v-window-item class="h-100"
                       v-for="n in 4"
                       :key="n"
        >
          操作{{ n }}
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const statuses = ref(['上传数据', '选择算法', '开始实验', '实验完成'])
const currentStatus = ref(0)
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
