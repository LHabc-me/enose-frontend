<template>
  <div class="pa-5">
    <VRow>
      <VCol cols="5"
            class="mx-auto">
        <VRadioGroup :inline="true" layout="row center-center" v-model="type">
          <VRadio label="根据用户ID查找" value="userid" color="primary"></VRadio>
          <VRadio label="根据用户邮箱查找" value="email" color="primary"></VRadio>
          <VRadio label="根据用户名查找" value="username" color="primary"></VRadio>
        </VRadioGroup>
        <VTextField color="primary"
                    variant="outlined"
                    density="comfortable"
                    label="查找用户"
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
            <th class="text-center">邮箱</th>
            <th class="text-center">用户名</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user, index) in usersView" :key="index" class="text-center">
            <td>{{ user.userid }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.username }}</td>
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


const users = ref()
const type = ref('userid')
const searchContent = ref('')


const usersView = computed(() => {
  if (users.value) {
    return users.value.filter(user => {
      return user[type.value].toString().toLowerCase().includes(searchContent.value.toLowerCase())
    })
  }
  return []
})

onMounted(() => {
  get('/api/user/all')
    .then(({data}) => {
      users.value = data
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
