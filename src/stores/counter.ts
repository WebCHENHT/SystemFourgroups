import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state() {
    return {
      token: '',
      menus: [],
      model: {},
      type: '',
      LeftArrDatas: [],
      TestAddid: 0,
      url: ''
    }
  },
  actions: {},
  getters: {},
  persist: {
    storage: window.sessionStorage
  }
})
