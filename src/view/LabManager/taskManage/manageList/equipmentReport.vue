<template>
    <div class="EquipmentReport body_main">
        <Search @searchList='searchList'/>
        <main-list @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li @click="goEquipmentReportDetail(item)"  v-for="(item, index) in Labmanage_projectreportList" :key="index">
                    <div class="firstChild ststusTextTrue">
                        <span class="projectNumber">{{item.number}}</span>
                    </div>
                    <div class="twoChild equilpmentName headerImg"><span class="showText">设备名称：{{item.name}}</span><span class="name"><img src="../../../../assets/img/LabManager/managementIssue/headerImg.png" alt=""><p  class="nameLoad">{{item.project_leader}}</p></span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../../components/search'; 
import mainList from '../../../../components/mainList'
export default {
    name:'EquipmentReport',
    components:{Search, mainList},
    data(){
        return{
            isStatus: false,
            Labmanage_projectreportList:[],
            searchText:'',
            islistData: false
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'报告审核'});
        this.getLabmanage_projectreportList(1,'',12);
    },
    methods:{
        goEquipmentReportDetail(item){
            this.$router.push({path:'/LabManager/EquipmentReportDetail',query:{flag:'1',projectID:item.id}})
        },
        getLabmanage_projectreportList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getLabmanage_projectreportList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getLabmanage_projectreportList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.Labmanage_projectreportList = pagenumber == 1 ? res.data.results: this.Labmanage_projectreportList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.Labmanage_projectreportList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getLabmanage_projectreportList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getLabmanage_projectreportList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.Labmanage_projectreportList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.EquipmentReport{
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