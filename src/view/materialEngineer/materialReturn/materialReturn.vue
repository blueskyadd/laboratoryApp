<template>
    <div class="materialReturn body_main">
        <Search  @searchList='searchList' ref="searchList"/>
        <div class="swiper_box">
            <tab :line-width=2 active-color='#07A695' custom-bar-width="1.8rem" v-model="index">
                <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
            </tab>
            <swiper v-model="index" :show-dots="false">
                <swiper-item >
                    <main-list   @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
                        <template>
                            <li  @click="goMaterialReturnForm(testbackList, true)" v-for="(testbackList, number) in MaterialEngineer_testbackList" :key="number">
                                <div class="firstChild ststusTextTrue">
                                    <span  class="projectNumber">{{testbackList.experiment_num}}</span>
                                </div>
                                <div class="twoChild equilpmentName"><span>试验名称：{{testbackList.name}}</span></div>
                                <div  class="Time thereChild"><i></i><span class="time_end">试验性质：{{testbackList.project_type}}</span><span class="name"><img src="../../../assets/img/LabManager/managementIssue/headerImg.png" alt=""><p>{{testbackList.engineer}}</p></span><span class="location"><img src="../../../assets/img/LabManager/managementIssue/location.png" alt=""><p>{{testbackList.room}}</p></span></div>
                            </li>
                        </template>
                    </main-list>
                </swiper-item>
                <swiper-item >
                    <main-list  @loadmore='loadmore' ref="mainListIndex"  :islistData='islistDataIndex'>
                        <template>
                            <li @click="goMaterialReturnForm(maintainbackList,false)" v-for="maintainbackList in MaterialEngineer_maintainbackList" :key="maintainbackList.id">
                                <div class="firstChild ststusTextTrue">
                                    <span  class="projectNumber">{{maintainbackList.num}}</span>
                                </div>
                                <div class="twoChild equilpmentName"><span>设备名称：{{maintainbackList.name}}</span></div>
                                <div  class="Time thereChild"><span class="name"><img src="../../../assets/img/LabManager/managementIssue/headerImg.png" alt=""><p  class="nameLoad">{{maintainbackList.applicant}}</p></span><span class="location"><img src="../../../assets/img/LabManager/managementIssue/location.png" alt=""><p>{{maintainbackList.room}}</p></span></div>
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
    name:'materialReturn',
    components:{Search, mainList, Tab, TabItem, Swiper, SwiperItem},
    data(){
        return{
            isStatus: false,
            list2: list(),
            index: 0,
            demo2: '试验物料',
            islistDataIndex: false,
            searchTextIndex: '',
            searchText:'',
            islistData: false,
            MaterialEngineer_testbackList:[],
            MaterialEngineer_maintainbackList:[]
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'物料归还'});
        this.getMaterialEngineer_testbackList(1,'',12);
        this.getMaterialEngineer_maintainbackList(1,'',12);
    },
    methods:{
        goMaterialReturnForm(data, flag){
            this.$router.push({name:'MaterialReturnForm',query:{projectID : data.id,flag:flag}})
        },
        getMaterialEngineer_testbackList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getMaterialEngineer_testbackList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getMaterialEngineer_testbackList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.MaterialEngineer_testbackList = pagenumber == 1 ? res.data.results: this.MaterialEngineer_testbackList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                    res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.MaterialEngineer_testbackList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        getMaterialEngineer_maintainbackList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getMaterialEngineer_maintainbackList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getMaterialEngineer_maintainbackList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.MaterialEngineer_maintainbackList = pagenumber == 1 ? res.data.results: this.MaterialEngineer_maintainbackList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                    res.data.next ?this.$refs.mainListIndex.scrollpullupStatus(false):this.$refs.mainListIndex.scrollpullupStatus(true);
                }
                this.islistDataIndex = this.MaterialEngineer_maintainbackList.length>0?false:true;
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
                this.getMaterialEngineer_testbackList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
            }else{
                this.getMaterialEngineer_maintainbackList(pagenumber,this.searchTextIndex,12, ()=>{success();},()=>{ error();});
            }
        },
        //搜索
        searchList(searchtest){
            if(this.index == 0 ){
                this.searchText = searchtest;
                this.getMaterialEngineer_testbackList(1,searchtest,500,()=>{},()=>{},(data)=>{
                    this.MaterialEngineer_testbackList = data;

                })
            }else{
                this.searchTextIndex = searchtest
                this.getMaterialEngineer_maintainbackList(1,searchtest,500,()=>{},()=>{},(data)=>{
                    this.MaterialEngineer_maintainbackList = data;

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
.materialReturn{
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