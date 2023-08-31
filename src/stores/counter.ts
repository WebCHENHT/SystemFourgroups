import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state() {
    return {
      token: '',
      menus: [],
      model: '',
      type: '',
      LeftArrDatas: []
    }
  },
  actions: {},
  getters: {},
  persist: {
    storage: window.sessionStorage
  }
})
