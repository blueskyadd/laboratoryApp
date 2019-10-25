<template>
    <div class="TestCost body_main">
        <Search  @searchList='searchList'/>
        <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li @click="goTestCost(item)" v-for="(item, index) in exexpendList" :key="index">
                    <div class="firstChild ststusTextTrue">
                        <span class="projectNumber">{{item.experiment_num}}</span>
                    </div>
                    <div class="twoChild equilpmentName"><span>试验名称：{{item.name}}</span></div>
                    <div class="twoChild"><i></i><span>费用：{{item.expense}}</span></div>
                    <div class="rightDetaild">
                        详情
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
    name:'TestCost',
    components:{Search, mainList},
    data(){
        return{
            exexpendList:[],
            searchText:'',
            islistData: false,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'试验费用'});
        this.getProductManager_exexpendList(1,'',12);
    },
    methods:{
        goTestCost(item){
            this.$router.push({name:'TestDetail',query:{projectID:item.id}})
        },
        getProductManager_exexpendList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getProductManager_exexpendList +  this.$route.query.projectID + '&search=' + searchText + '&page_size=' + page_size: this.$conf.env.getProductManager_exexpendList + this.$route.query.projectID + '&search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.exexpendList = pagenumber == 1 ? res.data.results: this.exexpendList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.exexpendList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getProductManager_exexpendList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getProductManager_exexpendList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.exexpendList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.TestCost{
   .personnelManagement_list{
       li{
           height: auto!important;
           padding-top: .2rem!important;
           position: relative;
           padding-bottom: 0!important;
           .rightDetaild{
                position: absolute;
                height: 100%;
                width: 1.56rem;
                background: #08A795;
                display: flex;
                top: 0;
                right: 0;
                align-items: center;
                justify-content: center;
                font-size: .36rem;
                font-family:simhei;
                font-weight:400;
                color:rgba(255,255,255,1);
            }
            .twoChild{
                margin-bottom: .16rem;
            }
       }
       
   }
}
</style>