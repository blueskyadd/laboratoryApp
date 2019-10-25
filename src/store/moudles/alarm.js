const state = {
    equipmentDetail:{}
  }
  const mutations = {
    changeDetail(state, data) {
      state.equipmentDetail = data
    },
  }
  export default {
    state,
    mutations
  }
  