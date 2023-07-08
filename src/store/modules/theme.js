import {defineStore} from 'pinia'

export const useTheme = defineStore('theme', {
  state: () => ({
    /**@type {'light'|'dark'}*/
    name: 'light',
  }),
  getters: {},
  actions: {
    changeTheme() {
      if (this.name === 'light') {
        this.name = 'dark'
      } else {
        this.name = 'light'
      }
    }
  },
  persist: {
    enabled: true,
    strategies: [{
      key: 'theme',
      storage: localStorage,
    }],
  }
})

