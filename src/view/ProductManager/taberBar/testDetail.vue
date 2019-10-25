<template>
    <div class="TestDetail body_main">
       <ul>
           <li><span>申请人：</span>{{equipmentDetail.apply}}<span></span></li>
           <!-- <li><span>审批人：</span><span>审批</span></li> -->
           <li>
               <span>试验简介：</span>
               <span>{{equipmentDetail.intro}}</span>
            </li>
       </ul>
    </div>
</template>
<script>
export default {
    name:'TestDetail',
    data(){
        return{
            equipmentDetail:{}
        }
    },
    mounted(){
        this.getProductManager_exexpendDetail()
    },
    methods:{
        getProductManager_exexpendDetail(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getProductManager_exexpendDetail + this.$route.query.projectID + '/').then(res =>{
                this.equipmentDetail = res.data;
                this.$emit('setHeaderShow', {blod:true,title: res.data.name});
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            }) 
        }
    }
}
</script>
<style lang="scss" scoped>
.TestDetail{
    background: #fff;
   ul{
       display: flex;
       flex-direction: column;
       align-items: flex-start;
       padding: .34rem .3rem;
       li{
           font-size: .24rem;
           padding: .15rem 0;
            display: flex;
            span:first-child{
                color:#07A695;
            }
       }
       li:last-child{
           flex-direction: column;
           align-items: flex-start;
           span:last-child{
               padding:  .22rem;
               text-align: left;
               line-height: .4rem;
           }
       }
   }
}
</style>