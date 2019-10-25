import Vue from 'vue'
import Vuex from 'vuex'
import routerState from './moudles/routerStart'
import QRcode from './moudles/QRcode'
import synopsis from './moudles/synopsis'
import ApplyRepair from './moudles/ApplyRepair'
import alarm from './moudles/alarm'
import watch from './moudles/watch'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{

  },
  modules:{
    routerState,
    QRcode,
    synopsis,
    ApplyRepair,
    alarm,
    watch
  },
  mutations:{

  },
  actions:{

  }


})

