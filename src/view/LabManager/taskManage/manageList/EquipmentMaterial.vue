<template>
    <div class="EquipmentMaterial body_main">
        <Search  @searchList='searchList'/>
        <main-list @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li @click="goEquipmentMeasureDetail(item)"  v-for="(item, index) in Labmanage_material_application" :key="index">
                    <div class="firstChild ststusTextTrue">
                        <span class="projectNumber">物料名称：{{item.name}}</span>
                    </div>
                    <div class="twoChild equilpmentName"><span>设备数量：{{item.num}}</span></div>
                    <div  class="Time thereChild"><i></i><span class="time_end time_overTime"><p class="overTime">申请时间：{{item.create_time}}</p></span><span class="name"><img src="../../../../assets/img/LabManager/managementIssue/headerImg.png" alt=""><p class="nameLoad">{{item.user}}</p></span><span class="location"></span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../../components/search'; 
import mainList from '../../../../components/mainList'
export default {
    name:'EquipmentMaterial',
    components:{Search, mainList},
    data(){
        return{
            isStatus: false,
            searchText:'',
            islistData: false,
            Labmanage_material_application:[],

        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'物料审核'});
        this.getLabmanage_material_application(1,'',12)
    },
    methods:{
        goEquipmentMeasureDetail(data){
            this.$router.push({path:'/LabManager/EquipmentMaterialDetail',query:{flag:'3',projectID:data.id}})
        },
        getLabmanage_material_application(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getLabmanage_material_application + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getLabmanage_material_application + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.Labmanage_material_application = pagenumber == 1 ? res.data.results: this.Labmanage_material_application.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.Labmanage_material_application.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getLabmanage_material_application(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        //搜索
        searchList(searchtest){
            this.searchText = searchtest;
            this.getLabmanage_material_application(1,searchtest,500,()=>{},()=>{},(data)=>{
                this.Labmanage_material_application = data;

            })
        }
    }
}
</script>
<style lang="scss">
.EquipmentMaterial{
   .personnelManagement_list{
       li{
           height: auto!important;
           padding-top: .26rem!important;
       }
       div:first-child{
           display: flex;
           width: 100%;
           justify-content: space-between;
       }
       .thereChild{
           margin-top: 0;
       }
   }
}
</style>