<template>
    <div class="principalEquipmentManage body_main">
        <Search  @searchList='searchList'/>
        <main-list @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li v-for="(item, index) in Equipmentengineer_manageList" :key="index">
                    <div class="firstChild ststusTextTrue">
                        <span class="projectNumber rightStatus">{{item.num}}</span>
                        <span class="normal ststusText" v-if="item.status == '正常'"><i></i>正常</span>
                        <span class="maintain ststusText" v-else><i></i>{{item.status}}</span>
                    </div>
                    <div class="twoChild equilpmentName"><span>设备名称：{{item.name}}</span></div>
                    <div class="twoChild" v-if="item.previous_upkeep_time"><i></i><span>上次保养时间：{{item.previous_upkeep_time}}</span></div>
                    <div  class="Time thereChild"><span class="time_end time_overTime" style="width:3.7rem;margin-right:0.1rem!important" v-if="item.next_upkeep_time" ><i></i><p class="overTime">预计下次保养时间：{{item.next_upkeep_time}}</p></span><span class="name"><img src="../../../assets/img/LabManager/managementIssue/headerImg.png" alt=""><p style="width:1.5rem">{{item.gauger}}</p></span><span class="location"><img src="../../../assets/img/LabManager/managementIssue/location.png" alt=""><p>{{item.room}}</p></span></div>
                </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../components/search'; 
import mainList from '../../../components/mainList'
export default {
    name:'principalEquipmentManage',
    components:{Search, mainList},
    data(){
        return{
            searchText:'',
            islistData: false,
            Equipmentengineer_manageList:[]
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'负责设备数'});
        this.getEquipmentengineer_manageList(1,'',12)
    },
    methods:{
        getEquipmentengineer_manageList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getEquipmentengineer_manageList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getEquipmentengineer_manageList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this. Equipmentengineer_manageList = pagenumber == 1 ? res.data.results: this. Equipmentengineer_manageList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this. Equipmentengineer_manageList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getEquipmentengineer_manageList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getEquipmentengineer_manageList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this. Equipmentengineer_manageList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.principalEquipmentManage{
   .personnelManagement_list{
       li{
           height: auto!important;
           padding-top: .26rem!important;
       }
       .thereChild{
           .time_end{
               margin-right: 1rem!important;;
           }
       }
   }
}
</style>