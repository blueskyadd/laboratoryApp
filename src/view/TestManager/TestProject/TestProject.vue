<template>
    <div class="TestProject body_main">
        <Search  @searchList='searchList'/>
        <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li v-for="(item, index) in TestManager_projectList" :key="index" >
                    <div class="firstChild ststusTextTrue">
                        <span  class="projectNumber rightStatus">{{item.number}}</span>
                        <span class="normal ststusText" v-if="item.status == '进行'"><i></i>进行</span>
                        <span class="maintain ststusText" v-else><i></i>{{item.status}}</span>
                    </div>
                    <div class="twoChild equilpmentName"><span style="max-width: 4rem;">设备名称：{{item.name}}</span><span class="right_natrue">项目来源：<i>{{item.source}}</i></span></div>
                    <div  class="Time thereChild"><span class="name"><img src="../../../assets/img/LabManager/managementIssue/headerImg.png" alt=""><p style="width:6rem">{{item.project_leader}}</p></span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../components/search'; 
import mainList from '../../../components/mainList'
export default {
    name:'TestProject',
    components:{Search, mainList},
    data(){
        return{
            TestManager_projectList: [],
            searchText:'',
            islistData: false,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'试验项目'});
        this.getTestManager_projectList(1,'',12);
    },
    methods:{
        getTestManager_projectList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getTestManager_projectList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getTestManager_projectList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.TestManager_projectList = pagenumber == 1 ? res.data.results: this.TestManager_projectList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.TestManager_projectList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getTestManager_projectList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getTestManager_projectList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.TestManager_projectList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.TestProject{
   .personnelManagement_list{
       li{
           height: auto!important;
           padding-top: .26rem!important;
       }
       .equilpmentName{
           justify-content: space-between;
       }
   }
}
</style>