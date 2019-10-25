<template>
    <div class="TestStandard body_main">
        <Search  @searchList='searchList'/>
        <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li  v-for="(item, index) in ProjectManage_standardList" :key="index" >
                    <div class="firstChild ststusTextTrue">
                        <span  class="projectNumber">{{item.num}}</span>
                    </div>
                    <div class="twoChild equilpmentName"><span>标准名称：{{item.name}}</span></div>
                    <div class="twoChild"><i></i><span>上传单位：{{item.company}}</span></div>
                    <div  class="Time thereChild"><i></i><span class="time_end time_overTime">上传时间：{{item.create_time}}</span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../components/search'; 
import mainList from '../../../components/mainList'
export default {
    name:'TestStandard',
    components:{Search, mainList},
    data(){
        return{
            ProjectManage_standardList: [],
            searchText:'',
            islistData: false,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'试验标准'});
        this.getProjectManage_standardList(1,'',12);
    },
    methods:{
        getProjectManage_standardList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getProjectManage_standardList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getProjectManage_standardList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.ProjectManage_standardList = pagenumber == 1 ? res.data.results: this.ProjectManage_standardList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.ProjectManage_standardList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getProjectManage_standardList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getProjectManage_standardList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.ProjectManage_standardList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.TestStandard{
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