<template>
    <div class="ProjectCareful body_main">
        <Search/>
        <main-list :islistData='islistData'  ref="mainList">
            <template>
                <li @click="goProjectCarefulDetail()" v-for="item in ProjectCarefulList" :key="item.id">
                    <div class="firstChild ststusTextTrue">
                        <span>元器件采购</span>
                    </div>
                    <div  class="Time thereChild"><i></i><span class="time_end time_overTime"><p class="overTime">申请时间：2018-05-22</p></span><span class="name"><img src="../../../assets/img/LabManager/managementIssue/headerImg.png" alt=""><p>刘刚</p></span><span class="location"><img src="../../../assets/img/LabManager/managementIssue/location.png" alt=""><p>实验室3</p></span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../components/search'; 
import mainList from '../../../components/mainList'
export default {
    name:'ProjectCareful',
    components:{Search, mainList},
    data(){
        return{
            isStatus: true,
            ProjectCarefulList:[],
            islistData: true,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'审批'})
        // this.$refs.mainList.scrollpullupStatus(true);
    },
    methods:{
       goProjectCarefulDetail(){
            if(this.isStatus){
                this.$router.push({name:'ProjectCarefulDetail'})
            }
        }
    }
}
</script>
<style lang="scss">
.ProjectCareful{
   .personnelManagement_list{
       li{
           height: auto!important;
           padding-top: .26rem!important;
       }
       div:first-child{
           display: flex;
           width: 100%;
           justify-content: space-between;
       }
   }
}
</style>