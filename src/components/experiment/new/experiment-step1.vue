<template>
  <div class="h-100" layout="row center-center" style="padding: 70px">
    <div class="h-100 w-50">
      <div v-if="experiment.dataJSON.length !== 0">
        <VVirtualScroll :height="500" :items="experiment.dataJSON">
          <template v-slot:default="{ item }">
            <pre> {{ item }} </pre>
          </template>
        </VVirtualScroll>
      </div>
      <div v-else class="text-center h-100 d-flex align-center justify-center">
        在此预览文件<br>
        (暂未上传)
      </div>
    </div>
    <div class="h-100 w-50">
      <div class="h-25 mx-auto text-center d-flex align-center justify-center"
        style="font-family: 方正卡通简体,serif; font-size:3rem">
        第一步：上传实验数据<br>
      </div>
      <div class="h-75 pa-10">
        <div class="h-100 border-dashed rounded-xl" style="border: #a0a0a0 solid 2px;" layout="column spread-center"
          @drop.prevent="drop" @dragleave.prevent="" @dragenter.prevent="" @dragover.prevent="">
          <p>
            上传实验数据，支持的文件格式有：Excel
          </p>
          <VBtn color="primary" class="mx-auto w-75 rounded-xl" size="x-large" @click="uploadDataInput.click()">
            上传文件
          </VBtn>
          <input ref="uploadDataInput" type="file" class="d-none"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            @change="onuploadDataInputChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNewExperiment } from "@/store/modules/new-experiment";
import { ref } from "vue";
import * as XLSX from "xlsx";
import { useMessage } from "@/store/modules/message";

const experiment = useNewExperiment()
const message = useMessage()

const uploadDataInput = ref(null)

function uploadFile(file) {
  experiment.data = file
  const fileReader = new FileReader()
  fileReader.onload = (ev) => {
    try {
      const data = ev.target.result
      const workbook = XLSX.read(data, {
        type: 'binary'
      })
      const wsname = workbook.SheetNames[0] //取第一张表
      experiment.dataJSON = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]) //生成json表格内容
    } catch {
      message.error('不支持的文件格式')
    }
  }
  fileReader.readAsBinaryString(file)
}

function onuploadDataInputChange(event) {
  const file = event.target.files[0]
  uploadFile(file)
}


function drop(e) {
  const file = e.dataTransfer.files[0]
  uploadFile(file)
}
</script>
