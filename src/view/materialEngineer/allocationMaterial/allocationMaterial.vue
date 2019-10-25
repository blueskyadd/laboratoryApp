<template>
    <div class="AllocationMaterial body_main">
        <Search  @searchList='searchList' ref="searchList"/>
        <div class="swiper_box">
            <tab :line-width=2 active-color='#07A695' custom-bar-width="1.8rem" v-model="index">
                <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
            </tab>
            <swiper v-model="index" :show-dots="false" heigh='calc(100% - 1rem)'>
                <swiper-item > 
                    <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
                        <template>
                            <li @click="AllocationMaterialDetail(testallotList,true)"  v-for="(testallotList, number) in MaterialEngineer_testallotList" :key="number">
                                <div class="firstChild ststusTextTrue">
                                    <span class="projectNumber">{{testallotList.experiment_num}}</span>
                                </div>
                                <div class="twoChild equilpmentName"><span>试验名称：{{testallotList.name}}</span></div>
                                <div  class="Time thereChild"><i></i><span class="time_end">试验性质：{{testallotList.project_type}}</span><span class="name"><img src="../../../assets/img/LabManager/managementIssue/headerImg.png" alt=""><p>{{testallotList.engineer}}</p></span><span class="location"><img src="../../../assets/img/LabManager/managementIssue/location.png" alt=""><p>{{testallotList.room}}</p></span></div>
                            </li>
                        </template>
                    </main-list>
                </swiper-item>
                <swiper-item>
                    <main-list @loadmore='loadmore' ref="mainListIndex"  :islistData='islistDataIndex'  >
                        <template>
                            <li @click="AllocationMaterialDetail(maintainallotList,false)"  v-for="maintainallotList in MaterialEngineer_maintainallotList" :key="maintainallotList.id">
                                <div class="firstChild ststusTextTrue">
                                    <span class="projectNumber">{{maintainallotList.num}}</span>
                                </div>
                                <div class="twoChild equilpmentName"><span>设备名称：{{maintainallotList.name}}</span></div>
                                <div  class="Time thereChild"><span class="name"><img src="../../../assets/img/LabManager/managementIssue/headerImg.png" alt=""><p  class="nameLoad">{{maintainallotList.applicant}}</p></span><span class="location"><img src="../../../assets/img/LabManager/managementIssue/location.png" alt=""><p>{{maintainallotList.room}}</p></span></div>
                            </li>
                        </template>
                    </main-list>
                </swiper-item>
            </swiper>
        </div>
    </div>
</template>
<script>
import Search from '../../../components/search'; 
import mainList from '../../../components/mainList'
import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
const list = () => ['试验物料', '维修物料']
export default {
    name:'AllocationMaterial',
    components:{Search, mainList, Tab, TabItem, Swiper, SwiperItem},
    data(){
        return{
            isStatus: false,
            list2: list(),
            index: 0,
            demo2: '试验物料',
            MaterialEngineer_testallotList:[],
            searchText:'',
            islistData: false,
            MaterialEngineer_maintainallotList:[],
            islistDataIndex: false,
            searchTextIndex: '',
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'物料分配'});
        this.getMaterialEngineer_testallotList(1,'',12);
        this.getMaterialEngineer_maintainallotList(1,'',12)
    },
    methods:{
        AllocationMaterialDetail(data,flag){
            this.$router.push({name:'AllocationMaterialDetail',query:{projectID: data.id,flag:flag}})
        },
        getMaterialEngineer_testallotList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getMaterialEngineer_testallotList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getMaterialEngineer_testallotList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.MaterialEngineer_testallotList = pagenumber == 1 ? res.data.results: this.MaterialEngineer_testallotList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                    res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.MaterialEngineer_testallotList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        getMaterialEngineer_maintainallotList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getMaterialEngineer_maintainallotList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getMaterialEngineer_maintainallotList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.MaterialEngineer_maintainallotList = pagenumber == 1 ? res.data.results: this.MaterialEngineer_maintainallotList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                    res.data.next ?this.$refs.mainListIndex.scrollpullupStatus(false):this.$refs.mainListIndex.scrollpullupStatus(true);
                }
                this.islistDataIndex = this.MaterialEngineer_maintainallotList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainListIndex.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            if(this.index == 0){
                this.getMaterialEngineer_testallotList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
            }else{
                this.getMaterialEngineer_maintainallotList(pagenumber,this.searchTextIndex,12, ()=>{success();},()=>{ error();});
            }
        },
        //搜索
        searchList(searchtest){
            if(this.index == 0 ){
                this.searchText = searchtest;
                this.getMaterialEngineer_testallotList(1,searchtest,500,()=>{},()=>{},(data)=>{
                    this.MaterialEngineer_testallotList = data;

                })
            }else{
                this.searchTextIndex = searchtest
                this.getMaterialEngineer_maintainallotList(1,searchtest,500,()=>{},()=>{},(data)=>{
                    this.MaterialEngineer_maintainallotList = data;

                })
            }
            
        }
    },
    watch:{
        index(){
            if(this.index == 0){
                this.$refs.searchList.setValue(this.searchText);
            }else{
                this.$refs.searchList.setValue(this.searchTextIndex);
            }
        }
    }
}
</script>
<style lang="scss">
.AllocationMaterial{
    overflow: hidden;
    .swiper_box,.vux-slider,.vux-swiper,.vux-swiper-item{
        height: 100%!important;
    }
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
   }
}
</style>