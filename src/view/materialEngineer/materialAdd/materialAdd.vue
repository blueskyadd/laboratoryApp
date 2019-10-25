<template>
    <div class="MaterialAdd body_main">
        <Search  @searchList='searchList'/>
        <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li v-for="(item, index) in MaterialEngineer_material_applicationList" :key="index">
                    <div class="firstChild ststusTextTrue">
                        <span class="projectNumber">{{item.name}}</span>
                        <span class="normal ststusText" v-if="item.status!='申请中'"><i></i>采购中</span>
                        <span class="maintain ststusText" v-else><i></i>申请中</span>
                    </div>
                    <div class="twoChild equilpmentName materialSafety"><span>采购数量：{{item.num}}</span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../components/search'; 
import mainList from '../../../components/mainList'
export default {
    name:'MaterialAdd',
    components:{Search, mainList},
    data(){
        return{
            MaterialEngineer_material_applicationList:[],
            searchText:'',
            islistData: false,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'新增物料数'});
        this.getMaterialEngineer_material_applicationList(1,'',12);
    },
    methods:{
        getMaterialEngineer_material_applicationList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getMaterialEngineer_material_applicationList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getMaterialEngineer_material_applicationList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.MaterialEngineer_material_applicationList = pagenumber == 1 ? res.data.results: this.MaterialEngineer_material_applicationList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.MaterialEngineer_material_applicationList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getMaterialEngineer_material_applicationList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getMaterialEngineer_material_applicationList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.MaterialEngineer_material_applicationList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.MaterialAdd{
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