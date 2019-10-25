<template>
    <div class="ProjectScheduleTest body_main">
        <ul class="projectTestDome personnelManagement_list margin_top">
            <li>
                <div class="firstChild ststusTextTrue vux-1px-b ">
                    <span>{{this.$route.query.projectNum}}</span>
                </div>
                <div  class="Time thereChild"><span class="name"><img src="../../../../assets/img/LabManager/managementIssue/headerImg.png" alt=""><p class="nameLoad">项目名称：{{this.$route.query.projectName}}</p></span></div>
            </li>
            <li></li>
        </ul>
        <main-list  ref="mainList"  :islistData='islistData'>
            <template>
                <li  v-for="(item, index) in ProjectManage_planList" :key="index">
                    <div class="firstChild ststusTextTrue">
                        <span class="projectNumber rightStatus">{{item.experiment_num}}</span>
                        <span class="normal ststusText" v-if="item.status == '进行中'"><i></i>进行中</span>
                        <span class="maintain ststusText" v-else-if="item.status == '等待中'"><i></i>等待中</span>
                        <span  class="idle ststusText" v-else>{{item.status}}</span>
                    </div>
                    <div class="twoChild equilpmentName"><span>设备名称：{{item.name}}</span></div>
                    <div class="twoChild"><i></i><span>试验开始时间：{{item.start_time}}</span></div>
                    <div  class="Time thereChild"><i></i><span class="time_end time_overTime"><p class="overTime">试验截至时间：{{item.end_time}}</p></span><span class="name"><img src="../../../../assets/img/LabManager/managementIssue/headerImg.png" alt=""><p class="nameLoad">{{item.engineer}}</p></span></div>
                </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import mainList from '../../../../components/mainList'
export default {
    name:'ProjectScheduleTest',
    components:{mainList},
    data(){
        return{
            ProjectManage_planList: [],
            searchText:'',
            islistData: false,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'试验进度'});
        this.getProjectManage_planList();
    },
    methods:{
        setEstablishTest(){
            this.$router.push({name:'EstablishTest'})
        },
        getProjectManage_planList(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getProjectManage_planList + this.$route.query.projectID).then( res =>{
                this.ProjectManage_planList = res.data;
                this.$refs.mainList.scrollpullupStatus(true);
               this.islistData = this.ProjectManage_planList.length>0?false:true;
               this.$vux.loading.hide();
            }).catch(err =>{
                console.log(err)
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
    }
}
</script>
<style lang="scss">
.ProjectScheduleTest{
    @import '../../../../assets/style/mainList.scss';
   .personnelManagement_list{
       li{
           height: auto!important;
           padding-top: .26rem!important;
       }
   }
   .projectTestDome{
        height: auto;
       li{
           background: #fff!important;
           height: auto;
           .firstChild{
               padding: .2rem 0;
           }
       }
   }
//    .projectTestDome{
//        .firstChild{
//            margin-bottom: 0;
//            padding-bottom: .16rem;
//        }
//        .thereChild{
//            p{
//                max-width: 7rem!important;
//                width: 7rem!important;
//                text-align: left;
//            }
//        }
//    }
}
</style>