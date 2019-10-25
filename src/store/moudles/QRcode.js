const state = {
    scan:null
  }
  const mutations = {
    changescan(state, data) {
      state.scan = data
    },
    changeonmarked(state, data){
        state.scan.onmarked = data
    },
    staticScan(state){
        state.scan.start();
    },
    closeScan(state){
      
        state.scan.close();
    }
  }
  export default {
    state,
    mutations
  }
  