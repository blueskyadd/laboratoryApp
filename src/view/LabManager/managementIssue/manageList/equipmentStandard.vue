<template>
    <div class="EquipmentStandard body_main">
        <Search  @searchList='searchList'/>
        <main-list @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li  v-for="(item, index) in Labmanage_standardList" :key="index">
                    <div class="firstChild ststusTextTrue">
                        <span class="projectNumber">{{item.num}}</span>
                    </div>
                    <div class="twoChild equilpmentName"><span>标准名称：{{item.name}}</span></div>
                    <div class="twoChild"><i></i><span>上传单位：{{item.company}}</span></div>
                    <div  class="Time thereChild"><i></i><span class="time_end time_overTime"><p class="overTime">上传时间：{{item.create_time}}</p></span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../../components/search'; 
import mainList from '../../../../components/mainList'
export default {
    name:'EquipmentStandard',
    components:{Search, mainList},
    data(){
        return{
            isStatus: false,
            Labmanage_standardList:[],
            searchText:'',
            islistData: false,
        }
    },
    methods:{
        getLabmanage_standardList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getLabmanage_standardList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getLabmanage_standardList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.Labmanage_standardList = pagenumber == 1 ? res.data.results: this.Labmanage_standardList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.$vux.loading.hide();
            }).catch(err =>{
                this.islistData = false;
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getLabmanage_standardList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getLabmanage_standardList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.Labmanage_standardList = data;
                this.islistData = data.length>0?false:true;
            })
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'试验标准'})
        this.getLabmanage_standardList(1,'',12)
    }
}
</script>
<style lang="scss">
.EquipmentStandard{
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