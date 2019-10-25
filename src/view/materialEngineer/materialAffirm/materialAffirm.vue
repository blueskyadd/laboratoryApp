<template>
    <div class="MaterialAffirm body_main">
        <Search  @searchList='searchList'/>
        <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li @click="goMaterialAffirmDetail(item)"  v-for="(item, index) in MaterialEngineer_verifyList" :key="index">
                    <div class="firstChild ststusTextTrue">
                        <span class="projectNumber">{{item.name}}</span>
                    </div>
                    <div class="twoChild equilpmentName"><span class="projectName">客户公司：{{item.company}}</span></div>
                    <div  class="Time thereChild"><span class="time_end">实验性质：<p style="color:#07a695">{{item.project_type}}</p> </span><span class="name"><img src="../../../assets/img/LabManager/managementIssue/headerImg.png" alt=""><p>{{item.user}}</p></span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../components/search'; 
import mainList from '../../../components/mainList'
export default {
    name:'MaterialAffirm',
    components:{Search, mainList},
    data(){
        return{
            isStatus: false,
            MaterialEngineer_verifyList:[],
            searchText:'',
            islistData: false,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'样件确认'});
        this.getMaterialEngineer_verifyList(1,'',12);
    },
    methods:{
        goMaterialAffirmDetail(data){
            this.$router.push({name:'MaterialAffirmDetail',query:{projectID:data.id}})
        },
        getMaterialEngineer_verifyList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getMaterialEngineer_verifyList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getMaterialEngineer_verifyList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.MaterialEngineer_verifyList = pagenumber == 1 ? res.data.results: this.MaterialEngineer_verifyList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.MaterialEngineer_verifyList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getMaterialEngineer_verifyList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getMaterialEngineer_verifyList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.MaterialEngineer_verifyList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.MaterialAffirm{
   .personnelManagement_list{
       li{
           height: auto!important;
           padding-top: .26rem!important;
       }
       .thereChild{
           margin-top: 0;
       }
   }
}
</style>