<template>
    <div class="EquipmentFrockApply body_main">
        <Search  @searchList='searchList'/>
        <main-list @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li @click="goEquipmentReportDetail(item)"  v-for="(item, index) in Labmanage_frockapplyList" :key="index">
                    <div class="firstChild ststusTextTrue">
                        <span>工装名称：{{item.name}}</span>
                    </div>
                    <div class="twoChild headerImg"><i></i><span class="time_end time_overTime"><p class="overTime">申请时间：{{item.create_time}}</p></span><span class="name"><img src="../../../../assets/img/LabManager/managementIssue/headerImg.png" alt=""><p class="nameLoad">{{item.user}}</p></span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../../components/search'; 
import mainList from '../../../../components/mainList'
export default {
    name:'EquipmentFrockApply',
    components:{Search, mainList},
    data(){
        return{
            Labmanage_frockapplyList: [],
            searchText:'',
            islistData: false,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'工装审核'});
        this.getLabmanage_frockapplyList(1,'',12);
    },
    methods:{
        goEquipmentReportDetail(data){
            this.$router.push({path:'/LabManager/EquipmentFrockApplyDetail',query:{flag:'7',projectID: data.id}})
        },
        getLabmanage_frockapplyList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getLabmanage_frockapplyList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getLabmanage_frockapplyList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.Labmanage_frockapplyList = pagenumber == 1 ? res.data.results: this.Labmanage_frockapplyList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.Labmanage_frockapplyList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getLabmanage_frockapplyList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getLabmanage_frockapplyList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.Labmanage_frockapplyList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.EquipmentFrockApply{
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