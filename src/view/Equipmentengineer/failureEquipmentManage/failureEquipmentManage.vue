<template>
    <div class="failureEquipmentManage body_main">
        <Search  @searchList='searchList'/>
        <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li v-for="(item, index) in Equipmentengineer_maintainList" :key="index">
                    <div class="firstChild ststusTextTrue">
                        <span class="projectNumber rightStatus">{{item.num}}</span>
                        <span class="normal ststusText" v-if="item.status == '维修中'"><i></i>维修中</span>
                        <span class="maintain ststusText" v-else><i></i>{{item.status}}</span>
                    </div>
                    <div class="twoChild equilpmentName"><span>设备名称：{{item.name}}</span></div>
                    <div class="Time thereChild" style="justify-content: space-between!important;"><i></i><span style="margin-right:.1rem!important" class="time_end time_overTime"><p style="width:3rem;" class="overTime">上传时间：{{item.create_time}}</p></span><span class="name"><img src="../../../assets/img/LabManager/managementIssue/headerImg.png" alt=""><p>{{item.applicant}}</p></span><span class="location"><img src="../../../assets/img/LabManager/managementIssue/location.png" alt=""><p>{{item.room}}</p></span>
                        <img class="scan"  @click="goQRcodeIndex(item)" src="../../../assets/img/equipment/failureEquipmentManage/scan.png" alt="">
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
    name:'failureEquipmentManage',
    components:{Search, mainList},
    data(){
        return{
            searchText:'',
            islistData: false,
            Equipmentengineer_maintainList: []
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'故障设备管理'});
        this.getEquipmentengineer_maintainList(1,'',12)
    },
    methods:{
         goQRcodeIndex(item){
            this.$router.push({name:'QRcodeIndex',query:{equipmentID:item.id}})
        },
        getEquipmentengineer_maintainList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getEquipmentengineer_maintainList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getEquipmentengineer_maintainList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.Equipmentengineer_maintainList = pagenumber == 1 ? res.data.results: this.Equipmentengineer_maintainList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.Equipmentengineer_maintainList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getEquipmentengineer_maintainList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getEquipmentengineer_maintainList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.Equipmentengineer_maintainList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.failureEquipmentManage{
   .personnelManagement_list{
       li{
           height: auto!important;
           padding-top: .26rem!important;
       }
       .ststusTextTrue{
           height: .36rem;
       }
       .equilpmentName{
            margin-bottom: .16rem!important;
            height: .24rem;
        }
       .Time{
           display: flex;
           width: 100%;
           margin-top: 0!important;
           margin-bottom:.07rem!important;
           height: .24rem;
           .time_end{
               margin-right: .5rem!important;
           }
           .location{
               max-width: 1.5rem;
           }
       }
       
   }
}
</style>