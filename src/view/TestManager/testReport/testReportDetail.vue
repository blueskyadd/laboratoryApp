<template>
    <div class="TestReportDetail body_main">
        <main-list  :islistData='islistData'  ref="mainList">
            <template>
                <li v-for="item in equipmentDetailData.experiments" :key="item.id">
                    <div class="firstChild ststusTextTrue">
                        <span>H18423Y143</span>
                        <span class="normal ststusText" v-if="item.result == '合格'"><i></i>合格</span>
                        <span class="maintain ststusText" v-else><i></i>{{item.result}}</span>
                    </div>
                    <div class="twoChild equilpmentName"><span>试验名称：{{item.name}}</span></div>
                    <div  class="Time thereChild"><span class="name"><img src="../../../assets/img/LabManager/managementIssue/headerImg.png" alt=""><p style="width:6rem">{{item.engineer}}</p></span></div>
                 </li>
            </template>
        </main-list>
        <a download="w3logo" :href="equipmentDetailData.report"><x-button type="primary" >查看项目文件</x-button></a> 
    </div>
</template>
<script>
import mainList from '../../../components/mainList'
export default {
    name:'TestReportDetail',
    components:{ mainList},
    data(){
        return{
            equipmentDetailData:{},
            islistData: false
        }
    },
    mounted(){
        this.getTestManager_finishprojectDetail();
    },
    methods:{
        getTestManager_finishprojectDetail(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getTestManager_finishprojectDetail + this.$route.query.projectID + '/').then(res =>{
               this.$emit('setHeaderShow', {blod:true,title:  res.data.name});
               this.equipmentDetailData = res.data;
               this.$refs.mainList.scrollpullupStatus(true);
               this.islistData = this.equipmentDetailData.experiments.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            }) 
        },
    }
}
</script>
<style lang="scss">
.TestReportDetail{
    overflow: hidden;
    .swiper_box{
        height: calc(100% - 1.1rem);
    }
   .personnelManagement_list{
       height: calc(100% - 2.4rem);
       overflow: scroll;
    //    overflow-anchor: 
       li{
           height: auto!important;
           padding-top: .26rem!important;
       }
   }
   .personnelManagement_list::-webkit-scrollbar{
       display: none;
   }
}
</style>