<template>
    <div class="infrastructure body_main">
        <Search/>
        <main-list>
            <template>
                <li @click="overdueEquilpmentDetail()">
                    <div class="twoChild equilpmentName"><span>设备名称：东风柳汽</span></div>
                    <div class="Time thereChild"><span class="time_end"><i></i>上传时间：2018-04-23</span><span class="location"><img src="../../../assets/img/LabManager/managementIssue/location.png" alt=""><p>实验室3</p></span>
                    </div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../components/search'; 
import mainList from '../../../components/mainList'
export default {
    name:'infrastructure',
    components:{Search, mainList},
    data(){
        return{
            isStatus: true
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'基础设施管理'})
    },
    methods:{
        overdueEquilpmentDetail(){
            if(this.isStatus){
                this.$router.push({name:'ExceptionDclare'})
            }
        }
    }
}
</script>
<style lang="scss">
.infrastructure{
   .personnelManagement_list{
       li{
           height: auto!important;
           padding-top: .26rem!important;
       }
       .ststusTextTrue{
           height: .36rem;
       }
       .equilpmentName{
            margin-bottom: .16rem!important;
            height: .24rem;
        }
       .Time{
           display: flex;
           width: 100%;
           margin-top: 0!important;
           margin-bottom:.07rem!important;
           height: .24rem;
           .time_end{
               margin-right: .5rem!important;
           }
           .location{
               max-width: 1.5rem;
           }
       }
       
   }
}
</style>