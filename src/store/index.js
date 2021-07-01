import Vue from 'vue'
import Vuex from 'vuex'
import { getItem , setItem } from "@/utlis/storage";

import store from '@/store/'

Vue.use(Vuex)

  const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    //当前登陆用户的登陆状态 （token 等数据）
    user: getItem(USER_KEY)
    // user: JSON.parse(window.localStorage.getItem('user'))
  },
  mutations: {
    setUser(state,data) {
        state.user = data

      //为了防止页面刷新数据丢失，我们还要把数据放到本地存储中，这里仅仅是为了持久化数据 （对象是不可以存储到本地存储中的）
      setItem(USER_KEY,state.user)
     // window.localStorage.setItem('user', JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
