<template>
    <div class="TestManage body_main">
        <ul class="projectTestDome personnelManagement_list margin_top">
            <li>
                <div class="firstChild ststusTextTrue vux-1px-b ">
                    <span class="projectNumber">{{this.$route.query.projectNum}}</span>
                </div>
                <div  class="Time thereChild"><span class="name"><img src="../../../../assets/img/LabManager/managementIssue/headerImg.png" alt=""><p>{{this.$route.query.projectName}}</p></span></div>
            </li>
            <li></li>
        </ul>
        <main-list @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li v-for="(item, index) in ProjectManage_experimentList" :key="index">
                    <div class="firstChild ststusTextTrue">
                        <span class="projectNumber">{{item.experiment_num}}</span>
                        <!-- <span class="delete ststusText"><span class="edit ststusText">编辑</span>删除</span> -->
                    </div>
                    <div class="twoChild equilpmentName"><span class="projectName">项目名称：{{item.name}}</span><span class="right_natrue">项目性质：<i>{{item.project_type}}</i></span></div>
                    <div class="twoChild"><i></i><span>试验周期：{{item.cycle}}</span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import mainList from '../../../../components/mainList'
export default {
    name:'TestManage',
    components:{mainList},
    data(){
        return{
            ProjectManage_experimentList: [],
            searchText:'',
            islistData: false,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'试验管理'});
        this.getProjectManage_experimentList(1,'',12);
    },
    methods:{
        setEstablishTest(){
            this.$router.push({name:'EstablishTest'})
        },
        getProjectManage_experimentList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getProjectManage_experimentList + this.$route.query.projectID + '&search=' + searchText + '&page_size=' + page_size: this.$conf.env.getProjectManage_experimentList + this.$route.query.projectID + '&search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.ProjectManage_experimentList = pagenumber == 1 ? res.data.results: this.ProjectManage_experimentList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.ProjectManage_experimentList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getProjectManage_experimentList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
    }
}
</script>
<style lang="scss">
.TestManage{
    @import '../../../../assets/style/mainList.scss';
    .jectTestDome{
       .firstChild{
           margin-bottom: 0;
           padding-bottom: .16rem;
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
}
.TestManage>div{
    height: calc(100% - 2.3rem)!important;
}
</style>