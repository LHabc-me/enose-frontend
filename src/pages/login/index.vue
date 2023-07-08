<template>
  <div class="pa-4 h-100"
       layout="column center-center">
    <VCard class="pa-4 pt-7"
           width="448">
      <VCardItem layout="column center-center">
        <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
          电子鼻实验平台
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">
          欢迎来到电子鼻实验平台
        </h5>
        <p class="mb-0">
          登录后开始使用
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="() => {}">
          <VRow>
            <VCol cols="12">
              <VTextField v-if="true"
                          v-model="form.email"
                          label="电子邮箱"
                          type="email"
                          :rules="[rules.required, rules.email]"
                          color="primary"
              />
              <VTextField v-model="form.password"
                          label="密码"
                          :type="isPasswordVisible ? 'text' : 'password'"
                          :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                          @click:append-inner="isPasswordVisible = !isPasswordVisible"
                          :rules="[rules.required, rules.pwdLength]"
                          color="primary"/>

              <div class="mt-1 mb-4"
                   layout="row">
                <VCheckbox self="left"
                           v-model="form.remember"
                           label="记住我"
                           color="primary"/>

                <router-link self="right"
                             class="ms-2 mb-1"
                             to="/reset-password">
                  忘记密码？点我找回
                </router-link>
              </div>

              <VBtn
                :block="true"
                type="submit"
                @click="login"
                color="primary"
                :loading="loading">
                登录
              </VBtn>
            </VCol>

            <div class="mt-5"
                 layout="row center-center">
              <span>
                没有账号？
                <router-link to="/register">注册</router-link>
                或
                <router-link to="/" @click="loginAsGuest">以游客身份登录</router-link>
              </span>
            </div>

          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="less">
</style>

<script setup>
import {onMounted, ref} from 'vue'
import {post} from '@/net'
import {useUser} from '@/store/modules/user'
import {useMessage} from '@/store/modules/message'
import {useRouter} from 'vue-router'
import {rules} from '@/utils/rules'

const message = useMessage()
const user = useUser()
const router = useRouter()

const form = ref({
  email: '',
  password: '',
  remember: false,
})
const isPasswordVisible = ref(false)
const loading = ref(false)


onMounted(() => {
  if (localStorage.getItem('remember')) {
    form.value.email = localStorage.getItem('email')
    form.value.password = localStorage.getItem('password')
    form.value.remember = true
  }
})

function login() {
  if (rules.email(form.value.email) !== true ||
    rules.pwdLength(form.value.password) !== true) {
    return
  }
  loading.value = true
  post('登录接口', {
    email: form.value.email,
    password: form.value.password
  }).then(({data}) => {
    if (data.success) {
      if (form.value.remember) {
        localStorage.setItem('remember', 'true')
        localStorage.setItem('email', form.value.email)
        localStorage.setItem('password', form.value.password)
      } else {
        localStorage.removeItem('remember')
        localStorage.removeItem('email')
        localStorage.removeItem('password')
      }

      localStorage.setItem('token', data.token)
      message.success('登录成功')
      user.isLogin = true
      router.push('/')
    } else {
      message.error('登录失败')
    }
  }).catch(() => {
    message.error('登录失败')
  }).finally(() => {
    loading.value = false
  })
}


function loginAsGuest() {
  console.log('loginAsGuest')
  user.type = 'guest'
}
</script>

<!--@formatter:off-->
<route lang="json5">
{
  meta: {
    layout: 'main',
  }
}
</route>
