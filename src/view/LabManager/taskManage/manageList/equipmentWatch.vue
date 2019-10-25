<template>
    <div class="EquipmentWatch body_main">
        <Search  @searchList='searchList'/>
        <main-list @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li @click="goEquipmentMeasureDetail(item)" v-for="(item, index) in Labmanage_ondutyList" :key="index">
                    <div class="firstChild ststusTextTrue">
                        <span class="projectNumber">{{item.job_num}}</span>
                    </div>
                    <div class="twoChild equilpmentName"><span>姓名：{{item.name}}</span></div>
                    <div  class="Time thereChild"><i></i><span class="time_end time_overTime"><p style="width:3.3rem" class="overTime">申请时间：{{item.create_time}}</p></span><span class="name"><img src="../../../../assets/img/LabManager/managementIssue/headerImg.png" alt=""><p class="nameLoad">{{item.department}}</p></span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../../components/search'; 
import mainList from '../../../../components/mainList'
export default {
    name:'EquipmentWatch',
    components:{Search, mainList},
    data(){
        return{
            isStatus: false,
            Labmanage_ondutyList:[]
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'值班审核'});
        this.getLabmanage_ondutyList(1,'',12)
    },
    methods:{
        goEquipmentMeasureDetail(data){
            this.$router.push({path:'/LabManager/EquipmentWatchDetail',query:{flag:'5',projectID:data.id}})
        },
        getLabmanage_ondutyList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getLabmanage_ondutyList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getLabmanage_ondutyList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.Labmanage_ondutyList = pagenumber == 1 ? res.data.results: this.Labmanage_ondutyList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.Labmanage_ondutyList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getLabmanage_ondutyList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getLabmanage_ondutyList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.Labmanage_ondutyList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.EquipmentWatch{
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
       .thereChild{
           margin-top: 0;
       }
   }
}
</style>