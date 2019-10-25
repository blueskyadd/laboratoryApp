<template>
    <header class="index_header_important">
        <h3>{{indexHeaderTitle}}</h3>
        <div>
          <span class="setting_icon" @click="$router.push({name:'Setting'})"><img src="../assets/img/LabManager/index/setting.png" alt=""></span>
          <span class="inform_icon" @click="$router.push({name:'systematic_notification'})"><img src="../assets/img/LabManager/index/inform.png" alt=""><badge :text="System_msgnum"></badge></span>
        </div>
    </header>
</template>
<script>
import {Badge} from 'vux'
export default {
    components: { Badge  },
    props:{indexHeaderTitle:String},
    data() {
      return {
        System_msgnum:0
      }
    },
    mounted(){
      this.getSystem_msgnum()
    },
    methods:{
      getSystem_msgnum(){
            this.$http.get(this.$conf.env.getSystem_msgnum).then(res =>{
                this.$emit('setHeaderShow', {blod:true,title:res.data.name});
                this.System_msgnum = res.data.num;
            }).catch(err =>{
                console.log(err)
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
      }
    }
}
</script>
<style lang="scss" scoped>
.index_header_important{
    height: .98rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 .29rem;
    background: #fff;
    h3{
      font-size: .32rem;
      font-family:SimHei;
      font-weight:400;
      color:rgba(51,51,51,1);
    }
    div{
      display: flex;
      justify-content: flex-start;
      .setting_icon, .inform_icon{
        display: block;
        width: .36rem;
         height: .36rem;
        img{width: 100%;display: block;height: 100%;}
      }
      .inform_icon{
        width: .33rem;
        margin-left: .3rem;
        margin-right: .1rem;
        position: relative;
        span{
          position: absolute;
          top: -50%;
          right: -45%;
          background:#F20000;
        }
      }
    }
  }
</style>