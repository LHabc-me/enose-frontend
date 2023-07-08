import {defineStore} from 'pinia'

export const useUser = defineStore('user', {
  state: () => ({
    id: '',
    name: '',
    email: '',
    isLogin: false,

    /**@type {''|'guest'|'user'|'author'|'admin'}*/
    type: '',
  }),
  getters: {},
  actions: {},
  persist: {
    enabled: true,
    strategies: [{
      key: 'user',
      storage: localStorage,
    }],
  }
})
