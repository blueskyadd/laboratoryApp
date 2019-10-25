<template>
    <div class="maintainEquipmentManage body_main">
        <Search  @searchList='searchList'/>
        <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li  v-for="(item, index) in Equipmentengineer_upkeepList" :key="index">
                    <div class="firstChild ststusTextTrue">
                        <span class="projectNumber rightStatus">{{item.num}}</span>
                        <span class="normal ststusText" v-if="item.status == '已申请'"><i></i>已申请</span>
                        <span class="maintain ststusText" v-else-if="item.status == '等待'"><i></i>等待</span>
                        <span class="maintain ststusText" style="color:#d5e73b" v-else><i></i>{{item.status}}</span>
                    </div>
                    <div class="twoChild equilpmentName"><span>设备名称：{{item.name}}</span></div>
                    <div class="twoChild"><i></i><span>保养创建时间：{{item.start_time}}</span></div>
                    <div  class="Time thereChild"><i></i><span class="time_end time_overTime"><p class="overTime"> 预计完成时间：{{item.end_time}}</p></span><span class="name"><img src="../../../assets/img/LabManager/managementIssue/headerImg.png" alt=""><p class="nameLoad">{{item.gauger}}</p></span></div>
                </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../components/search'; 
import mainList from '../../../components/mainList';
export default {
    name:'maintainEquipmentManage',
    components:{Search, mainList},
    data(){
        return{
            Equipmentengineer_upkeepList: [],
            searchText:'',
            islistData: false,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'保养设备数'});
        this.getEquipmentengineer_upkeepList(1,'',12);
    },
    methods:{
        getEquipmentengineer_upkeepList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getEquipmentengineer_upkeepList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getEquipmentengineer_upkeepList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.Equipmentengineer_upkeepList = pagenumber == 1 ? res.data.results: this.Equipmentengineer_upkeepList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.Equipmentengineer_upkeepList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getEquipmentengineer_upkeepList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getEquipmentengineer_upkeepList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.Equipmentengineer_upkeepList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.maintainEquipmentManage{
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