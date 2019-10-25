<template>
    <div class="TestInventory body_main">
        <Search  @searchList='searchList'/>
        <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li @click="goTestReportDetail(item)"  v-for="(item, index) in TestManager_finishprojectList" :key="index" >
                    <div class="firstChild ststusTextTrue">
                        <span class="projectNumber rightStatus">{{item.number}}</span>
                        <span class="normal ststusText" v-if="item.status == '合格'"><i></i>合格</span>
                        <span class="maintain ststusText" v-else><i></i>{{item.status}}</span>
                    </div>
                    <div class="twoChild equilpmentName">
                        <span>项目名称：{{item.name}}</span>
                        <span class="right_natrue">项目性质：<i>{{item.project_type}}</i></span>
                    </div>
                    <div class="twoChild source"><i></i><span>计量创建时间：{{item.create_time}}</span><span class="right_natrue source">报告来源：<i>{{item.source}}</i></span></div>
                    <div  class="Time thereChild"><i></i><span class="time_end time_overTime">预计完成时间：{{item.report_time}}</span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../components/search'; 
import mainList from '../../../components/mainList'
export default {
    name:'TestInventory',
    components:{Search, mainList},
    data(){
        return{
            TestManager_finishprojectList: [],
            searchText:'',
            islistData: false,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'测试项目'});
        this.getTestManager_finishprojectList(1,'',12);
    },
    methods:{
        goTestReportDetail(item){
            this.$router.push({name:'TestReportDetail',query:{projectID:item.id}})
        },
        getTestManager_finishprojectList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getTestManager_finishprojectList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getTestManager_finishprojectList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.TestManager_finishprojectList = pagenumber == 1 ? res.data.results: this.TestManager_finishprojectList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.TestManager_finishprojectList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getTestManager_finishprojectList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getTestManager_finishprojectList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.TestManager_finishprojectList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.TestInventory{
   .personnelManagement_list{
       li{
           height: auto!important;
           padding-top: .26rem!important;
       }
       .equilpmentName{
           justify-content: space-between;
           span:first-child{
               max-width: 4rem;
                display: block;
           }
           span:last-child{
               flex: inherit!important;
               i{
                   margin-right: 0;
               }
           }
       }
       .source{
           span:last-child{
                display: flex;
                justify-content: flex-end;
                i{
                    width: auto;
                    height: auto;
                    border-radius: inherit;
                    background: #fff;
                    margin-right: 0;
                }
           }
       }
   }
}
</style>