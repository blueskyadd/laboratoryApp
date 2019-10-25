<template>
    <div class="taskAllocation body_main">
        <Search @searchList='searchList' @resultClick="goProjectAllocation" :results.sync='results'/>
        <main-list @loadmore='loadmore' ref="mainList" :islistData='islistData'>
            <template>
                <li @click="goProjectAllocation(item)" v-for="(item, index) in Labmanage_project" :key="index">
                    <div class="firstChild"><span class="projectNumber">{{item.number}}</span></div>
                    <div class="twoChild"><span>项目名称：</span><span>{{item.name}}</span></div>
                </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../components/search';
import mainList from '../../../components/mainList'
export default {
    name:'taskAllocation',
    components:{Search, mainList},
    data(){
        return{
            Labmanage_project:[],
            results:[],
            searchText:'',
            islistData:false
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'任务分配'});
        
        this.getLabmanage_project(1,'',12);
    },
    methods:{
        goProjectAllocation(data){
            this.$router.push({path:'/LabManager/projectAllocation', query:{projectID: data.id}});
        },
        /**@name 数据加载
         * pagenumber:加载页数；
         * searchText: 搜索文字；
         * page_size: 每页加载数据条数默认6，搜索时page_size = 当前页面数据总和；
         * success: 上拉加载时请求到数据的成功回调，判断是否继续加载；
         * error: 上拉加载时请求到数据的失败回调，判断是否继续加载；
         */
        getLabmanage_project(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getLabmanage_project + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getLabmanage_project + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.Labmanage_project = pagenumber == 1 ? res.data.results: this.Labmanage_project.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.Labmanage_project.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getLabmanage_project(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getLabmanage_project(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.Labmanage_project = data;

            })
        }
    }
}
</script>
<style lang="scss" scoped>
.taskAllocation{
}
</style>