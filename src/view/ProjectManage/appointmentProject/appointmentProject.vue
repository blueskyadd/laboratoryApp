<template>
    <div class="appointmentProject body_main">
        <Search  @searchList='searchList'/>
        <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li  v-for="(item, index) in ProjectManage_projectList" :key="index">
                    <div class="firstChild ststusTextTrue">
                        <span  class="projectNumber rightStatus" style="display:flex;">
                            <span class="projectNumber rightStatus">{{item.number}}</span>
                            <span class="underline" @click="goProjectFlow(item)"  style="padding: 0 .13rem;">预约</span>
                        </span>
                        <span class="delete ststusText" @click.stop="deleteProject(item,index)" style="padding: 0 .13rem;">删除</span>
                    </div>
                    <div class="twoChild equilpmentName"><span class="projectName">项目名称：{{item.name}}</span><span class="right_natrue">项目性质：<i>{{item.project_type}}</i></span></div>
                    <div class="twoChild"><i></i><span>项目创建时间：{{item.create_time}}</span></div>
                    <div  class="Time thereChild"><i></i><span class="time_end time_overTime">项目预约完成时间：{{item.end_time}}</span></div>
                 </li>
            </template>
        </main-list>
        <confirm v-model="isdeleteProject"  @on-confirm="onConfirm">
            <p style="text-align:center;">您确定要删除此预约项目吗?
            </p>
        </confirm>
    </div>
</template>
<script>
import Search from '../../../components/search'; 
import mainList from '../../../components/mainList';
import { Confirm  } from 'vux'
export default {
    name:'appointmentProject',
    components:{Search, mainList, Confirm },
    data(){
        return{
            ProjectManage_projectList: [],
            isdeleteProject: false,
            searchText:'',
            islistData: false,
            projectID:'',
            projectIndex:0
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'预约项目'});
        this.getProjectManage_projectList(1,'',12);
        // this.
    },
    methods:{
        goProjectFlow(item){
            this.$router.push({name:'ProjectFlow',query:{projectID:item.id,projectName:item.name,projectNum:item.number}})
        },
        deleteProject(item,index){
            this.projectID = item.id;
            this.projectIndex = index;
            this.isdeleteProject = true;
        },
        onConfirm(){
            this.$vux.loading.show();
            this.$http.delete(this.$conf.env.deleteProjectManage_project + this.projectID +'/').then( res =>{
                if(res.status == '204'){
                    this.$vux.toast.text('删除成功'); 
                    this.ProjectManage_projectList.splice(this.projectIndex,1);
                }else{
                    this.$vux.toast.text('删除失败');             
                }
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        getProjectManage_projectList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getProjectManage_projectList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getProjectManage_projectList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.ProjectManage_projectList = pagenumber == 1 ? res.data.results: this.ProjectManage_projectList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.ProjectManage_projectList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getProjectManage_projectList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getProjectManage_projectList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.ProjectManage_projectList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.appointmentProject{
   .personnelManagement_list{
       li{
           height: auto!important;
           padding-top: .26rem!important;
       }
   }
}
</style>