const state = {
    synopsisText: '',
    projectSynopsisText: '',
    MalfunctionCause:'',//报警原因'
    ApplyWatchText:'',//申请原因
  }
  const mutations = {
    changeSynopsisText(state, data) {
      switch(data.flag){
        case '1':
        state.synopsisText = data.name;
        break;
        case '2':
        state.projectSynopsisText = data.name;
        break;
        case '3':
        state.MalfunctionCause = data.name;
        break;
        case '4':
        state.ApplyWatchText = data.name;
      }
    },
  }
  export default { 
    state,
    mutations
  }
  