import Vue from 'vue'
import Vuex from 'vuex'
import Cache from '@/assets/global/cache'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: () => {
    const personal = Cache.get('personal', true)
    Cache.remove('personal')
    return {
      personal: personal,
    }
  },
  mutations: {
    setPersonal(state, personal) {
      state.personal = personal
    },
    delPersonal(state, personal) {
      state.personal = ""
    }
  }
})

export default store
