<template>
  <VApp>
    <VAppBar class="elevation-3">
      <template #prepend>
        <VBtn icon="mdi-menu" @click="menuBtnClick"></VBtn>
        <span>
          电子鼻实验平台
        </span>
      </template>
      <template #append>
        <VBtn :icon="theme.name === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
              @click="theme.changeTheme()">
        </VBtn>
        <VMenu transition="fade-transition">
          <template #activator="{ props }">
            <VBtn v-bind="props"
                  icon="mdi-account">
            </VBtn>
          </template>
          <VList>
            <VListItem v-for="(item, index) in user"
                       :key="index"
                       :value="index"
                       @click="item.onClick">
              <template #prepend>
                <VIcon :icon="item.icon"
                       class="me-2"></VIcon>
              </template>
              <VListItemTitle>{{ item.name }}</VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
      </template>
    </VAppBar>

    <VNavigationDrawer v-model="showMenu"
                       :temporary="true">
      <VList :mandatory="true">
        <div v-for="(list, list_index) in lists" :key="list_index">
          <VDivider v-if="list_index !== 0"/>
          <VListSubheader v-if="list.title">{{ list.title }}</VListSubheader>
          <VListItem v-for="(item, item_index) in list.items"
                     :key="item_index"
                     color="primary"
                     variant="flat"
                     :active="$route.path === item.to"
                     @click="$router.push(item.to)">
            <template #prepend>
              <VIcon :icon="item.icon"></VIcon>
            </template>
            <VListItemTitle>{{ item.text }}</VListItemTitle>
          </VListItem>
        </div>
      </VList>
    </VNavigationDrawer>
    <VMain>
      <router-view v-slot="{Component}">
        <keep-alive>
          <component :is="Component"/>
        </keep-alive>
      </router-view>
    </VMain>
  </VApp>
</template>

<script setup>
import {computed, ref} from 'vue'
import {useTheme} from '@/store/modules/theme'
import {useUser} from '@/store/modules/user'
import {useMessage} from '@/store/modules/message'
import {useRouter} from 'vue-router'

const theme = useTheme()
const router = useRouter()
const userStore = useUser()
const message = useMessage()

const showMenu = ref(false)

const user = computed(() => {
  let user = []
  if (userStore.isLogin) {
    user = [
      {
        name: '退出登录',
        icon: 'mdi-logout',
        onClick: () => {
          userStore.isLogin = false
          router.push('/user/login')
        }
      }
    ]
  } else {
    user = [{
      name: '登录',
      icon: 'mdi-login',
      onClick: () => {
        router.push('/user/login')
      }
    }]
  }
  return user
})

const lists = computed(() => {
  return [
    {
      items: [{
        text: '首页',
        icon: 'mdi-home',
        to: '/'
      }]
    },
    {
      title: '实验相关', items: [
        {
          text: '开始实验',
          icon: 'mdi-clock',
          to: '/experiment/new'
        },
        {
          text: '历史实验',
          icon: 'mdi-star-box',
          to: '/experiment/history'
        },

      ]
    },
    {
      title: '设备相关', items: [
        {
          text: '设备列表',
          icon: 'mdi-usb',
          to: '/device/list'
        },
      ]
    },
    {
      title: '用户相关', items: [
        {
          text: '用户列表',
          icon: 'mdi-account',
          to: '/user/list'
        },
      ]
    }
  ]
})


function menuBtnClick() {
  // if (!userStore.isLogin) {
  //   message.info('请先登录')
  //   return
  // }
  showMenu.value = !showMenu.value
}

</script>
