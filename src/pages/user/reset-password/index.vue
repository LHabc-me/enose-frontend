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
          重置密码
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
              <VTextField
                v-model="form.password"
                label="新密码"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
                :rules="[rules.required, rules.pwdLength]"
                color="primary"
              />
              <VTextField
                v-model="form['repeat-password']"
                label="重复密码"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
                :rules="[rules.required, rules.samePwd(form.password)]"
                color="primary"
              />
              <VTextField
                v-model="form['verification-code']"
                label="验证码"
                type="text"
                :rules="[rules.required]"
                color="primary"
              >
                <template #append-inner>
                  <VBtn class="h-75"
                        :disabled="resendVerificationCodeInterval !== 0"
                        @click="resendVerificationCode"
                        variant="flat"
                        color="primary">
                    {{ '发送' + resendInterval }}
                  </VBtn>
                </template>
              </VTextField>

              <div class="mt-1 mb-4"
                   layout="row">
                <VCheckbox self="left"
                           v-model="form.remember"
                           label="记住我"
                           color="primary"
                />
                <span self="right">
                <router-link self="right"
                             to="/user/login"
                             class="mr-2">
                  登录
                </router-link>
                <router-link self="right"
                             to="/user/register">
                  注册
                </router-link>
              </span>
              </div>

              <VBtn :block="true"
                    type="submit"
                    @click="resetpwd"
                    color="primary"
                    :loading="loading"
              >
                重置密码
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="less">
</style>

<script setup>
import {computed, ref} from "vue";
import {get, post} from "@/net";
import {useMessage} from "@/store/modules/message";
import {useRouter} from "vue-router";
import {useUser} from "@/store/modules/user";
import {rules} from "@/utils/rules";

const message = useMessage()
const router = useRouter()
const user = useUser()

const form = ref({
  email: '',
  password: '',
  "repeat-password": '',
  "verification-code": '',
  remember: false,
})
const isPasswordVisible = ref(false)
const resendVerificationCodeInterval = ref(0)
const resendInterval = computed(() => resendVerificationCodeInterval.value > 0 ? `(${resendVerificationCodeInterval.value})` : '')


function resendVerificationCode() {
  if (rules.email(form.value.email) !== true) {
    message.error('无效的电子邮箱')
    return
  }
  resendVerificationCodeInterval.value = 60
  const interval = setInterval(() => {
    resendVerificationCodeInterval.value--
    if (resendVerificationCodeInterval.value === 0) {
      clearInterval(interval)
    }
  }, 1000)

  post('/api/user/verification-code', {
    email: form.value.email,
  }).then(({data}) => {
    console.log(data)
    if (data.success) {
      message.success('验证码已发送')
    } else {
      message.error('验证码发送失败')
    }
  })
}


const loading = ref(false)

function resetpwd() {
  if (rules.email(form.value.email) !== true ||
    rules.pwdLength(form.value.password) !== true ||
    rules.pwdLength(form.value['repeat-password']) !== true ||
    rules.samePwd(form.value['repeat-password'])(form.value.password) !== true ||
    !form.value['verification-code']) {
    return
  }
  if (form.value.password !== form.value['repeat-password']) {
    return
  }
  loading.value = true

  post('/api/user/reset-password', {
    email: form.value.email,
    password: form.value.password,
    "verification-code": form.value['verification-code'],
  }).then(({data}) => {
    if (data.success) {
      message.success('重置密码成功')
      router.push('/login')
    } else {
      message.error('重置密码失败')
    }
  }).catch(() => {
    message.error('重置密码失败')
  }).finally(() => {
    loading.value = false
  })
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
