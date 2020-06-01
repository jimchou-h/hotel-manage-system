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
  getters: {
    card: state => state.personal.card
  },
  mutations: {
    setPersonal(state, personal) {
      state.personal = personal
    },
    delPersonal(state) {
      state.personal = null
    },
    setCards(state, card) {
      state.personal = Object.assign({}, state.personal, {
        card
      })
      console.log(state.personal)
    }
  }
})

export default store
