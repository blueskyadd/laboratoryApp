<template>
    <div class="equipmentRegulation body_main">
        <Search  @searchList='searchList'/>
        <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li  v-for="(item, index) in Equipmentengineer_operationList" :key="index">
                    <div class="firstChild ststusTextTrue" >
                        <span  class="projectNumber">{{item.operation_num}}</span>
                    </div>
                    <div class="twoChild equilpmentName"><span>设备操作指导书名称：{{item.operation}}</span></div>
                    <div  class="Time thereChild"><i></i><span class="time_end  time_overTime"><p class="overTime">上传时间：{{item.operation_time}}</p></span><span class="location"><img src="../../../assets/img/equipment/failureEquipmentManage/temperature.png" alt=""><p>{{item.name}}</p></span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../components/search'; 
import mainList from '../../../components/mainList'
export default {
    name:'equipmentRegulation',
    components:{Search, mainList},
    data(){
        return{
            searchText:'',
            islistData: false,
            Equipmentengineer_operationList:[]
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'设备操作指导书'});
        this.getEquipmentengineer_operationList(1,'',12)
    },
    methods:{
        getEquipmentengineer_operationList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getEquipmentengineer_operationList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getEquipmentengineer_operationList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.Equipmentengineer_operationList = pagenumber == 1 ? res.data.results: this.Equipmentengineer_operationList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.Equipmentengineer_operationList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getEquipmentengineer_operationList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getEquipmentengineer_operationList(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.Equipmentengineer_operationList = data;

            })
        }
    }
}
</script>
<style lang="scss">
.equipmentRegulation{
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