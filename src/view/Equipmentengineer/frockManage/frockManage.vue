<template>
    <div class="frockManage body_main">
        <Search  @searchList='searchList'/>
        <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li v-for="(item, index) in Equipmentengineer_frockList" :key="index" >
                    <div class="firstChild ststusTextTrue">
                        <span class="projectNumber">{{item.nateriel_num}}</span>
                    </div>
                    <div class="twoChild equilpmentName"><span>工装名称：{{item.name}}</span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../components/search'; 
import mainList from '../../../components/mainList'
export default {
    name:'frockManage',
    components:{Search, mainList},
    data(){
        return{
            Equipmentengineer_frockList: [],
            searchText:'',
            islistData: false,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'试验工装数'});
        this.getEquipmentengineer_frockList(1,'',12)
    },
    methods:{
        getEquipmentengineer_frockList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getEquipmentengineer_frockList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getEquipmentengineer_frockList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.Equipmentengineer_frockList = pagenumber == 1 ? res.data.results: this.Equipmentengineer_frockList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.Equipmentengineer_frockList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getEquipmentengineer_frockList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getEquipmentengineer_frockList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.Equipmentengineer_frockList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.frockManage{
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