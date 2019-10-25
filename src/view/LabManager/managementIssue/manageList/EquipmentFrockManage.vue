<template>
    <div class="EquipmentFrockManage body_main">
        <Search  @searchList='searchList'/>
        <main-list @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li   v-for="(item, index) in Labmanage_frockList" :key="index">
                    <div class="firstChild ststusTextTrue">
                        <span class="projectNumber rightStatus">{{item.nateriel_num}}</span>
                        <span class="normal ststusText" v-if="item.inventory == '正常'"><i></i>正常</span>
                        <span class="maintain ststusText" v-else><i></i>报废</span>
                    </div>
                    <div class="twoChild equilpmentName headerImg"><span class="showText">设备名称：{{item.name}}</span><span class="name"><img src="../../../../assets/img/LabManager/managementIssue/headerImg.png" alt=""><p class="nameLoad">{{item.tool_user}}</p></span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../../components/search'; 
import mainList from '../../../../components/mainList'
export default {
    name:'EquipmentFrockManage',
    components:{Search, mainList},
    data(){
        return{
            isStatus: false,
            Labmanage_frockList: [],
            searchText:'',
            islistData: false
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'工装管理'});
        this.getLabmanage_frockList(1,'',12)
    },
    methods:{
        getLabmanage_frockList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getLabmanage_frockList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getLabmanage_frockList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.Labmanage_frockList = pagenumber == 1 ? res.data.results: this.Labmanage_frockList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.Labmanage_frockList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getLabmanage_frockList(pagenumber,this.searchText,6, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getLabmanage_frockList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.Labmanage_frockList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.EquipmentFrockManage{
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
       .showText{
           width: 3rem;
           text-align: left;
       }
       .headerImg{
           display: flex;
           .name{
               display: flex;
               align-items: center;
           }
       }
   }
}
</style>