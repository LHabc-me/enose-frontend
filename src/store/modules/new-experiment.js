import {defineStore} from 'pinia'

export const useNewExperiment = defineStore('new-experiment', {
  state: () => ({
    data: null,
    dataJSON: [],
    algorithm: null,
    currentStep: 0,
  }),
  getters: {},
  actions: {
    reset() {
      this.data = null
      this.dataJSON = []
      this.algorithm = null
      this.currentStep = 0
    }
  },
})
