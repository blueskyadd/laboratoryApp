<template>
    <div class="ProdectInterior body_main">
        <Search  @searchList='searchList'/>
        <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li  v-for="(item, index) in ProjectManage_appointList" :key="index" >
                    <div class="firstChild ststusTextTrue">
                        <span  class="projectNumber rightStatus" style="display:flex;">
                            <span class="projectNumber rightStatus">{{item.experiment_num}}</span>
                            <span class="underline" @click="setStatus(item)"  style="padding: 0 .13rem;">预约</span>
                        </span>
                    </div>
                    <div class="twoChild equilpmentName"><span class="projectName">项目名称：{{item.name}}</span></div>
                    <div  class="Time thereChild"><span class="time_end projectName">项目性质：{{item.type_}}</span></div>
                 </li>
            </template>
        </main-list>
        <confirm v-model="isStatus"  @on-confirm="onConfirm">
            <p style="text-align:center;">{{StatusText}}
            </p>
        </confirm>
    </div>
</template>
<script>
import Search from '../../../../components/search'; 
import mainList from '../../../../components/mainList';
import { Confirm  } from 'vux'
export default {
    name:'ProdectInterior',
    components:{Search, mainList, Confirm},
    data(){
        return{
            ProjectManage_appointList: [],
            searchText:'',
            islistData: false,
            isStatus:false,
            StatusText:'确定要预约此项目吗？',
            subscribe:'',
            projectID:''
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'内部预约试验列表'});
        this.getProjectManage_appointList(1,'',12);
    },
    methods:{
        getProjectManage_appointList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getProjectManage_appointList + this.$route.query.projectID + '&search=' + searchText + '&page_size=' + page_size: this.$conf.env.getProjectManage_appointList + this.$route.query.projectID + '&search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.ProjectManage_appointList = pagenumber == 1 ? res.data.results: this.ProjectManage_appointList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.ProjectManage_appointList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getProjectManage_appointList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getProjectManage_appointList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.ProjectManage_appointList = data;
            })
        },
        setStatus(item){
            this.isStatus = true;
            this.subscribe = item.status;
            this.projectID = item.id;
            if(item.status == 0){
                this.StatusText = '确定要预约此项目吗？';
            }else{
                this.StatusText = '此项已不可预约';
            }
        },
        onConfirm(){
            if(this.subscribe == 0){
                this.$vux.loading.show();
                this.$http.put(this.$conf.env.setProjectManage_appoint + this.projectID + '/').then(res =>{
                    if(res.status == '200'){
                        this.$vux.toast.text('预约成功');     
                        this.getProjectManage_appointList(1,this.searchText,this.ProjectManage_appointList.length);
                    }else{
                        this.$vux.toast.text('预约失败');           
                    }
                    this.$vux.loading.hide();
                }).catch(err =>{
                    console.log(err)
                    this.$vux.loading.hide();
                    this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
                }) 
            }
        }
    }
}
</script>
<style lang="scss">
.ProdectInterior{
   .personnelManagement_list{
       li{
           height: auto!important;
           padding-top: .26rem!important;
       }
   }
}
</style>