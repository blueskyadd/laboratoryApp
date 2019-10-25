<template>
    <div class="guidanceManage body_main">
        <Search  @searchList='searchList'/>
        <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li  v-for="(item, index) in Equipmentengineer_safetyList" :key="index" >
                    <div class="firstChild ststusTextTrue">
                        <span class="projectNumber">{{item.safety_num}}</span>
                    </div>
                    <div class="twoChild equilpmentName"><span>设备人员安全指导书名称：{{item.safety}}</span></div>
                    <div  class="Time thereChild"><i></i><span class="time_end time_overTime"><p class="overTime"> 上传时间：{{item.safety_time}}</p></span><span class="location"><img src="../../../assets/img/equipment/failureEquipmentManage/temperature.png" alt=""><p class="nameLoad">{{item.name}}</p></span></div>
                 </li>
            </template> 
        </main-list>
    </div>
</template>
<script>
import Search from '../../../components/search'; 
import mainList from '../../../components/mainList'
export default {
    name:'guidanceManage',
    components:{Search, mainList},
    data(){
        return{
            Equipmentengineer_safetyList: [],
            searchText:'',
            islistData: false,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'设备人员安全指导书'});
        this.getEquipmentengineer_safetyList(1,'',12)
    },
    methods:{
        getEquipmentengineer_safetyList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getEquipmentengineer_safetyList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getEquipmentengineer_safetyList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.Equipmentengineer_safetyList = pagenumber == 1 ? res.data.results: this.Equipmentengineer_safetyList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.Equipmentengineer_safetyList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getEquipmentengineer_safetyList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getEquipmentengineer_safetyList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.Equipmentengineer_safetyList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.guidanceManage{
   .personnelManagement_list{
       li{
           height: auto!important;
           padding-top: .26rem!important;
       }
       .thereChild{
           .time_end{
               margin-right: 1rem!important;
           }
       }
   }
}
</style>