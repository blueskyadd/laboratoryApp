<template>
    <div class="personnelManagement body_main">
        <Search  @searchList='searchList'/>
        <main-list @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li  v-for="(item, index) in Labmange_userList" :key="index">
                    <div class="firstChild"><span  class="projectNumber">{{item.job_num}}</span></div>
                    <div class="twoChild"><span>姓名：</span><span>{{item.name}}</span><span><img src="../../../../assets/img/LabManager/managementIssue/business_card.png" alt=""></span><span>{{item.role}}</span></div>
                </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../../components/search';
import mainList from '../../../../components/mainList'
export default {
    name:'personnelManagement',
    components:{Search, mainList},
    data(){
        return{
            Labmange_userList:[],
            searchText:'',
            islistData: false
        }
    },
    mounted(){
        
        this.$emit('setHeaderShow', {blod:true,title:'人员管理'});
        this.getLabmange_userList(1,'',12);
    },
    methods:{
        getLabmange_userList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getLabmange_userList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getLabmange_userList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.Labmange_userList = pagenumber == 1 ? res.data.results: this.Labmange_userList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.Labmange_userList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getLabmange_userList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getLabmange_userList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.Labmange_userList = data;

            })
        }
    }
}
</script>
<style lang="scss" scoped>
.personnelManagement{
   
}
</style>