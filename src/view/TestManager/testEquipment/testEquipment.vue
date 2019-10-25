<template>
    <div class="TestEquipment body_main">
        <Search  @searchList='searchList'/>
        <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li @click="goTestEquipmentDetail(item)"  v-for="(item, index) in TestManager_eqpctList" :key="index">
                    <div class="firstChild ststusTextTrue">
                        <span class="projectNumber rightStatus">{{item.num}}</span>
                        <span class="normal ststusText" v-if="item.status == '使用中'"><i></i>使用中</span>
                        <span class="maintain ststusText" v-else-if="item.status == '维修'"><i></i>维修中</span>
                        <span class="idle ststusText" v-else><i></i>{{item.status}}</span>
                    </div>
                    <div class="twoChild equilpmentName"><span>设备名称：{{item.name}}</span></div>
                    <div  class="Time thereChild"><span class="name"><img src="../../../assets/img/LabManager/managementIssue/headerImg.png" alt=""><p class="nameLoad">{{item.device_keeper}}</p></span><span class="location"><img src="../../../assets/img/LabManager/managementIssue/location.png" alt=""><p>{{item.room}}</p></span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../components/search'; 
import mainList from '../../../components/mainList'
export default {
    name:'TestEquipment',
    components:{Search, mainList},
    data(){
        return{
            TestManager_eqpctList: [],
            searchText:'',
            islistData: false,

        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'实验室设备运行率'});
        this.getTestManager_eqpctList(1,'',12)
    },
    methods:{
        goTestEquipmentDetail(item){
            this.$router.push({name:'TestEquipmentDetail',query:{equipmentID:item.id}})
        },
        getTestManager_eqpctList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getTestManager_eqpctList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getTestManager_eqpctList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.TestManager_eqpctList = pagenumber == 1 ? res.data.results: this.TestManager_eqpctList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.TestManager_eqpctList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getTestManager_eqpctList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getTestManager_eqpctList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.TestManager_eqpctList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.TestEquipment{
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