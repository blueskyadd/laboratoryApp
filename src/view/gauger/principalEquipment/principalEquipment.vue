<template>
    <div class="principalEquipment body_main">
        <Search  @searchList='searchList'/>
        <main-list @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li @click="overdueEquilpmentDetail(item)"  v-for="(item, index) in Gauger_meqList" :key="index">
                    <div class="firstChild ststusTextTrue">
                        <span  class="projectNumber">{{item.num}}</span>
                        <span class="normal ststusText" v-if="item.status=='正常'"><i></i>正常</span>
                        <span class="maintain ststusText" v-else><i></i>维修中</span>
                    </div>
                    <div class="twoChild equilpmentName"><span>设备名称：{{item.name}}</span></div>
                    <div class="twoChild"><i></i><span>上次计量时间：{{item.previous_metering_time}}</span></div>
                    <div  class="Time thereChild"><i></i><span  class="time_end time_overTime" style="margin-right:0rem"><p style="width:3.5rem;margin-right:0" class="overTime"> 预计下次计量时间：{{item.next_metering_time}}</p> </span><span class="name"><img src="../../../assets/img/LabManager/managementIssue/headerImg.png" alt=""><p style="width:1.7rem;margin-right:0.1rem;">{{item.device_keeper}}</p></span><span class="location"><img src="../../../assets/img/LabManager/managementIssue/location.png" alt=""><p style="max-width:1.8rem;">{{item.room}}</p></span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../components/search'; 
import mainList from '../../../components/mainList'
export default {
    name:'principalEquipment',
    components:{Search, mainList},
    data(){
        return{
            isStatus: false,
            Gauger_meqList:[],
            searchText:'',
            islistData: false
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'负责计量设备数'});
        this.getGauger_meqList(1,'',12)
    },
    methods:{
        overdueEquilpmentDetail(data){
            this.$router.push({name:'principalEquipmentDetail',query:{name:data.name}})
        },
        getGauger_meqList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getGauger_meqList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getGauger_meqList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.Gauger_meqList = pagenumber == 1 ? res.data.results: this.Gauger_meqList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.Gauger_meqList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getGauger_meqList(pagenumber,this.searchText,6, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getGauger_meqList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.Gauger_meqList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.principalEquipment{
   .personnelManagement_list{
       li{
           height: auto!important;
           padding-top: .26rem!important;
       }
       div:first-child{
           
          
       }
   }
}
</style>