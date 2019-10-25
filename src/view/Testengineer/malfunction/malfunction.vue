<template>
    <div class="Malfunction body_main">
        <Search  @searchList='searchList'/>
        <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li v-for="(item, index) in Testengineer_alarmList" :key="index">
                    <div class="firstChild ststusTextTrue">
                        <span class="projectNumber">{{item.equipment.num}}</span>
                    </div>
                    <div class="twoChild equilpmentName"><span>设备名称：{{item.equipment.name}}</span></div>
                    <div class="twoChild"><span class="MalfunctionInfo"><i></i>报警原因：<p class="showText">{{item.cause}}</p></span></div>
                    <div  class="Time thereChild"><i></i><span class="time_end time_overTime"><p class="overTime" style="width: 3.3rem;">上传时间：{{item.create_time}}</p></span><span class="name"><img src="../../../assets/img/LabManager/managementIssue/headerImg.png" alt=""><p class="nameLoad">{{item.equipment.user}}</p></span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../components/search'; 
import mainList from '../../../components/mainList'
export default {
    name:'Malfunction',
    components:{Search, mainList},
    data(){
        return{
            Testengineer_alarmList:[],
            searchText:'',
            islistData: false,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'报警日志',isEstablish:true});
        this.getTestengineer_alarmList(1,'',12);
    },
    methods:{
        setEstablishTest(){
            this.$router.push({name:'MalfunctionCause'})
        },
        getTestengineer_alarmList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getTestengineer_alarmList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getTestengineer_alarmList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.Testengineer_alarmList = pagenumber == 1 ? res.data.results: this.Testengineer_alarmList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.Testengineer_alarmList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getTestengineer_alarmList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getTestengineer_alarmList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.Testengineer_alarmList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.Malfunction{
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