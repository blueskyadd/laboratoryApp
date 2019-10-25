<template>
    <div class="EquipmentMeasure body_main">
        <Search  @searchList='searchList'/>
        <main-list @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li @click="goEquipmentMeasureDetail(item)"  v-for="(item, index) in Labmanage_meteringList" :key="index">
                    <div class="firstChild ststusTextTrue">
                        <span class="projectNumber">{{item.num}}</span>
                    </div>
                    <div class="twoChild equilpmentName"><span>设备名称：{{item.num}}</span></div>
                    <div class="twoChild"><i></i><span>计量创建时间：{{item.start_time}}</span></div>
                    <div  class="Time thereChild"><i></i><span class="time_end time_overTime"><p class="overTime">预计完成时间：{{item.end_time}}</p></span><span class="name"><img src="../../../../assets/img/LabManager/managementIssue/headerImg.png" alt=""><p>{{item.applicant}}</p></span><span class="location"><img src="../../../../assets/img/LabManager/managementIssue/location.png" alt=""><p>{{item.room}}</p></span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../../components/search'; 
import mainList from '../../../../components/mainList'
export default {
    name:'EquipmentMeasure',
    components:{Search, mainList},
    data(){
        return{
            isStatus: false,
            Labmanage_meteringList:[],
            searchText:'',
            islistData: false,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'计量审核'});
        this.getLabmanage_meteringList(1,'',12);
    },
    methods:{
        goEquipmentMeasureDetail(item){
            this.$router.push({path:'/LabManager/EquipmentMeasureDetail',query:{flag:'2',projectID: item.id}})
        },
        getLabmanage_meteringList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getLabmanage_meteringList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getLabmanage_meteringList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.Labmanage_meteringList = pagenumber == 1 ? res.data.results: this.Labmanage_meteringList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.Labmanage_meteringList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getLabmanage_meteringList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getLabmanage_meteringList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.Labmanage_meteringList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.EquipmentMeasure{
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