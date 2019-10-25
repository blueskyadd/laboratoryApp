<template>
    <div class="noMeasurementEquipment body_main">
        <Search  @searchList='searchList'/>
        <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li  v-for="(item, index) in Gauger_meteringList" :key="index" >
                    <div class="firstChild ststusTextTrue">
                        <span class="projectNumber rightStatus" >{{item.num}}</span>
                        <span class="normal ststusText" v-if="item.status == '进行中'"><i></i>{{item.status}}</span>
                        <span class="maintain ststusText" v-else><i></i>{{item.status}}</span>
                    </div>
                    <div class="twoChild equilpmentName"><span>设备名称：{{item.name}}</span></div>
                    <div class="twoChild"><i></i><span>计量创建时间：{{item.start_time}}</span></div>
                    <div  class="Time thereChild"><i></i><span class="time_end time_overTime" style="margin-right:0"> <p class="overTime">预计完成时间：{{item.end_time}}</p></span><span class="name"><img src="../../../assets/img/LabManager/managementIssue/headerImg.png" alt=""><p style="width:2.2rem;margin-right:0.1rem;">{{item.device_keeper}}</p></span><span class="location"><img src="../../../assets/img/LabManager/managementIssue/location.png" alt=""><p style="max-width:1.8rem;">{{item.room}}</p></span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../components/search'; 
import mainList from '../../../components/mainList'
export default {
    name:'noMeasurementEquipment',
    components:{Search, mainList},
    data(){
        return{
            isStatus: false,
            Gauger_meteringList:[],
            searchText:'',
            islistData: false,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'30天未计量设备数'});
        this.getGauger_meteringList(1,'',12)
    },
    methods:{
        getGauger_meteringList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getGauger_meteringList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getGauger_meteringList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.Gauger_meteringList = pagenumber == 1 ? res.data.results: this.Gauger_meteringList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.Gauger_meteringList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getGauger_meteringList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getGauger_meteringList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.Gauger_meteringList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.noMeasurementEquipment{
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