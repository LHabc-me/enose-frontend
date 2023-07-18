<template>
  <div class="pa-5">
    <VRow>
      <VCol cols="5"
            class="mx-auto">
        <VRadioGroup :inline="true" layout="row center-center" v-model="type">
          <VRadio label="根据设备ID查找" value="deviceid" color="primary"></VRadio>
          <VRadio label="根据设备状态查找" value="email" color="primary"></VRadio>
        </VRadioGroup>
        <VTextField color="primary"
                    variant="outlined"
                    density="comfortable"
                    label="查找设备"
                    append-inner-icon="mdi-magnify"
                    :clearable="true"
                    v-model="searchContent"></VTextField>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="8" class="mx-auto">
        <VTable>
          <thead>
          <tr class="text-center">
            <th class="text-center">ID</th>
            <th class="text-center">状态</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(device, index) in devicesView" :key="index" class="text-center">
            <td>{{ device.deviceid }}</td>
            <td>{{ device.status }}</td>
          </tr>
          </tbody>
        </VTable>
      </VCol>
    </VRow>
  </div>

</template>

<script setup>
import {computed, onMounted, ref} from 'vue'
import {get} from '@/net'
import {useMessage} from '@/store/modules/message'


const message = useMessage()
const loading = ref(false)


const devices = ref()
const type = ref('deviceid')
const searchContent = ref('')


const devicesView = computed(() => {
  if (devices.value) {
    return devices.value.filter(device => {
      return device[type.value].toString().toLowerCase().includes(searchContent.value.toLowerCase())
    })
  }
  return []
})

onMounted(() => {
  get('/api/device/all')
    .then(({data}) => {
      devices.value = data
    })
})


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
