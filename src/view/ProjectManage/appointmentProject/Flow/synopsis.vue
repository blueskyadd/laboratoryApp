<template>
    <div class="Synopsis body_main">
        <div class="main">
            <textarea  :placeholder="'请输入'+titleName" v-model="textSynopsis"></textarea> 
        </div>
        <x-button type="primary" v-show="isHidebutton" @click.native="Submit()">确定</x-button>
    </div>
</template>
<script>
export default {
    name: 'Synopsis',
    data(){
        return{
            titleName:'',
            textSynopsis: '',
            isHidebutton:true,//键盘弹出时，底部按钮隐藏
            innerHeight:window.innerHeight,//监听页面高度变化所用参数
            heightChange:window.innerHeight,
        }
    },
    watch: {
      innerHeight(newval,oldval){
          if(this.heightChange != newval){
              this.isHidebutton = false
          }else{
              this.isHidebutton = true
          }
      },
    },
    mounted(){
        /**@name 监听页面高度变化 */
        const that = this;
        window.onresize =()  =>{
            return (()=>{
                this.innerHeight = window.innerHeight
            })()
        }
        switch(this.$route.params.flag){
            case '1':
            this.titleName = '试验简介';
            this.textSynopsis = this.$store.state.synopsis.synopsisText;
            break;
            case '2':
            this.titleName = '项目简介';
            this.textSynopsis = this.$store.state.synopsis.projectSynopsisText;
            break;
            case '3':
            this.titleName = '报警原因';
            this.textSynopsis = this.$store.state.synopsis.MalfunctionCause; 
            break; 
            case '4':
            this.titleName = '申请原因';
            this.textSynopsis = this.$store.state.synopsis.ApplyWatchText;
            break;
        }
        this.$emit('setHeaderShow', {blod:true,title:this.titleName});
    },
    methods: {
        Submit(){
            this.$store.commit('changeSynopsisText',{name:this.textSynopsis,flag:this.$route.params.flag})
            this.$router.go(-1)
        }  
    },
}
</script>
<style lang="scss" scoped>
.Synopsis{
    background: #fff;
    .main{
        padding: .25rem .3rem 0;
        height: calc(100% - 1.3rem);
        textarea{
            width: 100%;
            height: 3.86rem;
            font-size: .24rem;
            padding: .24rem;
            border:1px  solid rgba(205,205,205,1);
            border-radius: .05rem;
        }
    }
    
}
</style>