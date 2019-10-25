const state = {
    equipmentDetail:{
        "start_time":'',
        "end_time":'',
        "location":'',
        "cause":''
    }
  }
  const mutations = {
    changewatchDetail(state, data) {
      state.equipmentDetail = data
    },
    setlocation(state, data){
        state.equipmentDetail.location = data
    }
  }
  export default {
    state,
    mutations
  }
  