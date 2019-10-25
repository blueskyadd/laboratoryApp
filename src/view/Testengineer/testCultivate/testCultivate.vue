<template>
    <div class="TestCultivate body_main">
        <Search  @searchList='searchList'/>
        <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li  v-for="(item, index) in Testengineer_cultivateList" :key="index">
                    <div class="firstChild ststusTextTrue">
                        <span  class="projectNumber">{{item.job_num}}</span>
                    </div>
                    <div class="twoChild equilpmentName"><span class="projectName">试验方法名称：{{item.name}}</span><span class="right_natrue " @click="goTestMethods()"><a :href="item.resume" download="w3logo" class="underline">合作项目</a></span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../components/search'; 
import mainList from '../../../components/mainList'
export default {
    name:'TestCultivate',
    components:{Search, mainList},
    data(){
        return{
            Testengineer_cultivateList: [],
            searchText:'',
            islistData: false,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'试验方法导入贡献数'});
        this.getTestengineer_cultivateList(1,'',12);
    },
    methods:{
        getTestengineer_cultivateList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getTestengineer_cultivateList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getTestengineer_cultivateList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.Testengineer_cultivateList = pagenumber == 1 ? res.data.results: this.Testengineer_cultivateList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.Testengineer_cultivateList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getTestengineer_cultivateList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getTestengineer_cultivateList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.Testengineer_cultivateList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.TestCultivate{
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