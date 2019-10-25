<template>
    <div class="WatchManage body_main">
        <Search  @searchList='searchList'/>
        <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li v-for="(item, index) in Testengineer_ondutyList" :key="index" >
                    <div class="twoChild"><span class="MalfunctionInfo watchInfo"><i></i>值班开始时间：<p class="showText">{{item.start_time}}</p></span></div>
                    <div class="twoChild"><span class="MalfunctionInfo watchInfo"><i></i>值班结束时间：<p class="showText">{{item.end_time}}</p></span></div>
                    <div  class="Time thereChild"><span class="location"><img src="../../../assets/img/LabManager/managementIssue/location.png" alt=""><p>{{item.location}}</p></span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../components/search'; 
import mainList from '../../../components/mainList'
export default {
    name:'WatchManage',
    components:{Search, mainList},
    data(){
        return{
            Testengineer_ondutyList: [],
            searchText:'',
            islistData: false,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'值班管理',isEstablish: true,isWatchManage:true});
        this.getTestengineer_ondutyList(1,'',12)
    },
    methods:{
        setEstablishTest(){
            this.$router.push({name:'ApplyWatch'})
        },
        scheduleManage(){
            this.$router.push({name:'ApplySchedule'})
        },
        getTestengineer_ondutyList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getTestengineer_ondutyList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getTestengineer_ondutyList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.Testengineer_ondutyList = pagenumber == 1 ? res.data.results: this.Testengineer_ondutyList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.Testengineer_ondutyList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getTestengineer_ondutyList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getTestengineer_ondutyList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.Testengineer_ondutyList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.WatchManage{
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