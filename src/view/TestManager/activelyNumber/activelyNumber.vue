<template>
    <div class="ActivelyNumber body_main">
        <Search  @searchList='searchList'/>
        <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li  v-for="(item, index) in TestManager_userList" :key="index">
                    <div class="firstChild"><span class="projectNumber">{{item.job_num}}</span></div>
                    <div class="twoChild equilpmentName">
                        <span>姓名：{{item.name}}</span>
                        <span class="ActivelyNumber"><img src="../../../assets/img/LabManager/managementIssue/business_card.png" alt=""><span>{{item.role}}</span></span>
                    </div>
                </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../components/search';
import mainList from '../../../components/mainList'
export default {
    name:'ActivelyNumber',
    components:{Search, mainList},
    data(){
        return{
            TestManager_userList:[],
            searchText:'',
            islistData: false,

        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'活跃管理'});
        this.getTestManager_userList(1,'',12);
    },
    methods:{
        getTestManager_userList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getTestManager_userList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getTestManager_userList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.TestManager_userList = pagenumber == 1 ? res.data.results: this.TestManager_userList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.TestManager_userList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getTestManager_userList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getTestManager_userList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.TestManager_userList = data;

            })
        }
    }
}
</script>
<style lang="scss" scoped>
.ActivelyNumber{
    .equilpmentName{
        justify-content: space-between;
        .ActivelyNumber{
            display: flex;
            align-items: center;
        }
    }
   
}
</style>