<template>
    <div class="TestInventory body_main">
        <Search  @searchList='searchList'/>
        <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li v-for="(item, index) in TestManager_warehousepctList" :key="index">
                    <div class="firstChild ststusTextTrue">
                        <span  class="projectNumber rightStatus">{{item.nateriel_num}}</span>
                        <span class="normal ststusText" v-if="item.inventory > item.safe_inventory">{{item.inventory}}</span>
                        <span class="maintain ststusText" v-else>{{item.inventory}}</span>
                    </div>
                    <div class="twoChild equilpmentName"><span style="max-width:3.6rem">设备名称：{{item.name}}</span><span class="right_natrue" style="flex: inherit;">物料安全库存数：<i>{{item.safe_inventory}}</i></span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../components/search'; 
import mainList from '../../../components/mainList'
export default {
    name:'TestInventory',
    components:{Search, mainList},
    data(){
        return{
            TestManager_warehousepctList: [],
            searchText:'',
            islistData: false,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'物料安全库存率'});
        this.getTestManager_warehousepctList(1,'',12);
    },
    methods:{
        getTestManager_warehousepctList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getTestManager_warehousepctList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getTestManager_warehousepctList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.TestManager_warehousepctList = pagenumber == 1 ? res.data.results: this.TestManager_warehousepctList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.TestManager_warehousepctList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getTestManager_warehousepctList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getTestManager_warehousepctList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.TestManager_warehousepctList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.TestInventory{
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