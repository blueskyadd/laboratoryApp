<template>
    <div class="EquipmentHistory body_main">
        <Search  @searchList='searchList'/>
        <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li @click="EquipmentHistoryDetail(item)" v-for="(item, index) in Labmanage_finishprojectList" :key="index">
                    <div class="firstChild ststusTextTrue">
                        <span class="projectNumber rightStatus" >{{item.number}}<span class="underline" @click.stop="gotextSynopsis(item)">项目介绍</span></span>
                        <span class="normal ststusText" v-if="item.status == '完成'"><i></i>完成</span>
                        <span class="maintain ststusText" v-else><i></i>关闭</span>
                    </div>
                    <div class="twoChild equilpmentName"><span class="projectName">项目名称：{{item.name}}</span><span class="right_natrue">项目性质：<i>{{item.project_type}}</i></span></div>
                    <div class="twoChild"><i></i><span>项目创建时间：{{item.create_time}}</span></div>
                    <div  class="Time thereChild"><i></i><span class="time_end time_overTime">项目完成时间：{{item.report_time}}</span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../../components/search'; 
import mainList from '../../../../components/mainList'
export default {
    name:'EquipmentHistory',
    components:{Search, mainList},
    data(){
        return{
            Labmanage_finishprojectList: [],
            searchText:'',
            islistData: false,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'历史项目'});
        this.getLabmanage_finishprojectList(1,'',12)
    },
    methods:{
        gotextSynopsis(item){
            this.$router.push({name:'EquipmenthistoryDetail',query:{projectID:item.id}})
        },
        EquipmentHistoryDetail(item){
            this.$router.push({name:'EquipmentHistoryDetail',query:{projectID:item.id,projectNum: item.number}})
        },
        getLabmanage_finishprojectList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getLabmanage_finishprojectList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getLabmanage_finishprojectList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.Labmanage_finishprojectList = pagenumber == 1 ? res.data.results: this.Labmanage_finishprojectList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.Labmanage_finishprojectList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getLabmanage_finishprojectList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getLabmanage_finishprojectList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.Labmanage_finishprojectList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.EquipmentHistory{
   .personnelManagement_list{
       li{
           height: auto!important;
           padding-top: .26rem!important;
       }
   }
}
</style>