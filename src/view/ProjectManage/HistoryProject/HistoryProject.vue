<template>
    <div class="HistoryProject body_main">
        <Search  @searchList='searchList'/>
        <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li @click="HistoryProjectDetail(item)"  v-for="(item, index) in ProjectManage_historyList" :key="index" >
                    <div class="firstChild ststusTextTrue">
                        <span  class="projectNumber rightStatus" style="display:flex;">
                            <span  class="projectNumber rightStatus">{{item.number }}</span>
                            <span class="underline">项目介绍</span>
                        </span>
                        <span class="normal ststusText" v-if="item.status==='完成'"><i></i>完成</span>
                        <span class="maintain ststusText" v-else><i></i>{{item.status}}</span>
                    </div>
                    <div class="twoChild equilpmentName"><span class="projectName">项目名称：{{item.name}}</span><span class="right_natrue">项目性质：<i>{{item.project_type}}</i></span></div>
                    <div class="twoChild"><i></i><span>项目创建时间：{{item.create_time}}</span></div>
                    <div  class="Time thereChild"><i></i><span class="time_end time_overTime">项目完成时间：{{item.report_time}}</span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../components/search'; 
import mainList from '../../../components/mainList'
export default {
    name:'HistoryProject',
    components:{Search, mainList},
    data(){
        return{
            ProjectManage_historyList: [],
            searchText:'',
            islistData: false,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'历史项目'});
        this.getProjectManage_historyList(1,'',12);
    },
    methods:{
        HistoryProjectDetail(item){
            this.$router.push({name:'HistoryProjectDetail',query:{projectID:item.id}})
        },
        getProjectManage_historyList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getProjectManage_historyList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getProjectManage_historyList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.ProjectManage_historyList = pagenumber == 1 ? res.data.results: this.ProjectManage_historyList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.ProjectManage_historyList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getProjectManage_historyList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getProjectManage_historyList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.ProjectManage_historyList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.HistoryProject{
   .personnelManagement_list{
       li{
           height: auto!important;
           padding-top: .26rem!important;
       }
   }
}
</style>