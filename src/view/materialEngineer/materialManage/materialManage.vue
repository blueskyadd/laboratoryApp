<template>
    <div class="MaterialManage body_main">
        <Search  @searchList='searchList'/>
        <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li @click="goProposerMaterial(item)" v-for="(item, index) in MaterialEngineer_materielList" :key="index">
                    <div class="firstChild ststusTextTrue">
                        <span class="projectNumber rightStatus">{{item.nateriel_num}}</span>
                        <span class="number ststusText" :style="{color:item.inventory<item.safe_inventory ? '' : '#07A695'}">{{item.inventory}}</span>
                    </div>
                    <div class="twoChild equilpmentName materialSafety"><span>物料名称：{{item.name}}</span><span class="safety">安全库存数：{{item.safe_inventory}}</span></div>
                    <div class="twoChild"><span class="unit">单位：元</span><span class="unitPrice">单价：{{item.unit_price}}</span></div>
                    <div  class="Time thereChild explain"><span class="time_end"><i></i>采购周期：{{item.purchase_cycle}}</span><span class="location materialId"><img src="../../../assets/img/LabManager/managementIssue/location.png" alt=""><p>{{item.create_time}}</p></span><span class="explain"><img src="../../../assets/img/materialEngineer/materialManage/explain.png" alt=""><p>{{item.device_type == 1?'易损件':'原件'}}</p></span></div>
                </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../components/search'; 
import mainList from '../../../components/mainList'
export default {
    name:'MaterialManage ',
    components:{Search, mainList},
    data(){
        return{
            searchText:'',
            islistData: false,
            MaterialEngineer_materielList: []
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'物料管理'});
        this.getMaterialEngineer_materielList(1,'',12);
    },
    methods:{
        goProposerMaterial(data){
            this.$router.push({name:'ProposerMaterial',query:{projectID:data.id}})
        },
        getMaterialEngineer_materielList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getMaterialEngineer_materielList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getMaterialEngineer_materielList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.MaterialEngineer_materielList = pagenumber == 1 ? res.data.results: this.MaterialEngineer_materielList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.MaterialEngineer_materielList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getMaterialEngineer_materielList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getMaterialEngineer_materielList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.MaterialEngineer_materielList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.MaterialManage{
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