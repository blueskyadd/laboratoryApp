<template>
    <div class="equipmentManagement body_main">
        <Search  @searchList='searchList'/>
        <main-list @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li @click="equipmentManagementDetail(item)"  v-for="(item, index) in Labmanage_equipmentList" :key="index">
                    <div class="firstChild">
                        <span class="projectNumber rightStatus">{{item.num}}</span>
                        <span class="normal" v-if="item.status == '正常'"><i></i>正常</span>
                        <span class="maintain" v-else><i></i>维修中</span>
                    </div>
                    <div class="twoChild"><span>设备名称：</span><span>{{item.name}}</span></div>
                    <div class="thereChild"><span class="name"><img src="../../../../assets/img/LabManager/managementIssue/headerImg.png" alt=""><p class="nameLoad">{{item.device_keeper}}</p></span><span class="location"><img src="../../../../assets/img/LabManager/managementIssue/location.png" alt=""><p>{{item.room}}</p></span></div>
                </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../../components/search';
import mainList from '../../../../components/mainList'
export default {
    name:'equipmentManagement',
    components:{Search, mainList},
    data(){
        return{
            searchText:'',
            islistData: false,
            Labmanage_equipmentList:[]
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'设备管理'});
        this.getLabmanage_equipmentList(1,'',12);
    },
    methods:{
        equipmentManagementDetail(item){
            this.$router.push({name:'equipmentManagementDetail',query:{equipmentID:item.id}})
        },
        getLabmanage_equipmentList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getLabmanage_equipmentList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getLabmanage_equipmentList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.Labmanage_equipmentList = pagenumber == 1 ? res.data.results: this.Labmanage_equipmentList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.Labmanage_equipmentList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getLabmanage_equipmentList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getLabmanage_equipmentList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.Labmanage_equipmentList = data;

            })
        }
    }
}
</script>
<style lang="scss" scoped>
.equipmentManagement{
   .personnelManagement_list{
       div:first-child{
           display: flex;
           width: 100%;
           justify-content: space-between;
           span:last-child{
                font-size: .22rem;
                display: flex;
                align-items: center;
                i{
                    display: block;
                    width: .1rem;
                    height: .1rem;
                    
                    border-radius: 50%;
                    margin-right: .13rem;
                }
           }
           .normal{
                color:rgba(8,167,149,1);
                i{
                    background: #08A795;
                }
           }
           .maintain{
               color: #F21338;
               i{
                    background: #F21338;
                }
           }
       }
   }
}
</style>