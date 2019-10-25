<template>
    <div class="ProjectInfo body_main">
        <Search  @searchList='searchList'/>
        <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li @click="goProjectInfoDetail(item)" v-for="(item, index) in exfailList" :key="index" >
                    <div class="firstChild ststusTextTrue">
                        <span class="projectNumber rightStatus">{{item.experiment_num}}</span>
                        <span class="normal ststusText" v-if="item.status == '已处理'"><i></i>已处理</span>
                        <span class="maintain ststusText" v-else><i></i>{{item.status}}</span>
                    </div>
                    <div class="twoChild equilpmentName"><span>试验名称：{{item.name}}</span></div>
                    <div class="twoChild"><i></i><span>试验结果：{{item.result}}</span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../components/search'; 
import mainList from '../../../components/mainList'
export default {
    name:'ProjectInfo',
    components:{Search, mainList},
    data(){
        return{
            exfailList:[],
            searchText:'',
            islistData: false,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'试验信息'});
        this.getProductManager_exfailList(1,'',12);
    },
    methods:{
        goProjectInfoDetail(item){
            this.$router.push({name:'ProjectInfoDetail',query:{projectID:item.id}})
        },
        getProductManager_exfailList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getProductManager_exfailList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getProductManager_exfailList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.exfailList = pagenumber == 1 ? res.data.results: this.exfailList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.exfailList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getProductManager_exfailList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getProductManager_exfailList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.exfailList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.ProjectInfo{
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