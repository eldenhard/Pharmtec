import { defineStore } from 'pinia'

export const useActiveTabStore = defineStore('ActiveTabStore', {
  //state
  state: () => {
    return {
      activeTab: 'Applications'
    }
  }
  //actions

  //getters
})