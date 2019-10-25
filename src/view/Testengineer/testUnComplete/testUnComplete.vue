<template>
    <div class="TestComplete body_main">
        <Search  @searchList='searchList' ref="searchList"/>
        <div class="swiper_box">
            <tab :line-width=2 active-color='#07A695' custom-bar-width="1.8rem" v-model="index">
                <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
            </tab>
            <swiper v-model="index" :show-dots="false">
                <swiper-item >
                    <main-list   @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
                        <template>
                            <li @click="goMaterialFlow(myexperimentList)"  v-for="(myexperimentList, number) in Testengineer__myexperimentList" :key="number">
                                <div class="firstChild ststusTextTrue">
                                    <span  class="projectNumber">{{myexperimentList.experiment_num}}</span>
                                </div>
                                <div class="twoChild equilpmentName"><span class="projectName">项目名称：{{myexperimentList.name}}</span><span class="right_natrue "><a :href="myexperimentList.method" download="试验方法" class="underline">试验方法</a></span></div>
                                <div class="twoChild"><i></i><span>试验开始时间：{{myexperimentList.start_time}}</span></div>
                                <div class="twoChild"><i></i><span>试验结束时间：{{myexperimentList.start_time}}</span></div>
                                <div  class="Time thereChild" ><i></i><span class="time_end">试验周期：{{myexperimentList.cycle}}</span><span class="right_natrue">试验类型：<i>{{myexperimentList.type_}}</i></span><span class="right_natrue">值守：<i>{{myexperimentList.onduty}}</i></span></div>
                            </li>
                        </template>
                    </main-list>
                </swiper-item>
                 <swiper-item>
                    <main-list @loadmore='loadmore' ref="mainListIndex"  :islistData='islistDataIndex' >
                        <template>
                            <li @click="goTestUnCompleteDeatil(myprojectList)" v-for="(myprojectList, number) in Testengineer__myprojectList" :key="number">
                                <div class="firstChild ststusTextTrue">
                                    <span class="projectNumber">{{myprojectList.number}}</span>
                                </div>
                                <div class="twoChild equilpmentName"><span class="projectName">项目名称：{{myprojectList.name}}</span></div>
                                <div class="twoChild"><i></i><span>试验开始时间：{{myprojectList.start_time}}</span></div>
                                <div  class="Time thereChild" ><i></i><span style="margin-left:0" class="right_natrue">试验类型：<i>{{myprojectList.project_type}}</i></span></div>
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
import mainList from '../../../components/mainList';
import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
const list = () => ['试验', '项目']
export default {
    name:'TestComplete',
    components:{Search, mainList, Tab, TabItem, Swiper, SwiperItem},
    data(){
        return{
            isStatus: false,
            list2: list(),
            index: 0,
            demo2: '试验',
            Testengineer__myexperimentList:[],
            searchText:'',
            islistData: false,
            Testengineer__myprojectList:[],
            islistDataIndex: false,
            searchTextIndex: '',
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'未完成任务'});
        this.getTestengineer__myexperimentList(1,'',12);
        this.getTestengineer__myprojectList(1,'',12);
    },
    methods:{
        goTestUnCompleteDeatil(data){
            this.$router.push({name:'TestUnCompleteDeatil',query:{projectID:data.id}})
        },
        goMaterialFlow(data){
            this.$router.push({name:'MaterialFlow',query:{projectID:data.id}})
        },
        goTestMethods(){
            this.$router.push({name:'TestMethods'})
        },
        getTestengineer__myexperimentList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getTestengineer__myexperimentList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getTestengineer__myexperimentList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.Testengineer__myexperimentList = pagenumber == 1 ? res.data.results: this.Testengineer__myexperimentList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                    res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.Testengineer__myexperimentList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        getTestengineer__myprojectList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getTestengineer__myprojectList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getTestengineer__myprojectList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.Testengineer__myprojectList = pagenumber == 1 ? res.data.results: this.Testengineer__myprojectList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                    res.data.next ?this.$refs.mainListIndex.scrollpullupStatus(false):this.$refs.mainListIndex.scrollpullupStatus(true);
                }
                this.islistDataIndex = this.Testengineer__myprojectList.length>0?false:true;
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
                this.getTestengineer__myexperimentList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
            }else{
                this.getTestengineer__myprojectList(pagenumber,this.searchTextIndex,12, ()=>{success();},()=>{ error();});
            }
        },
        //搜索
        searchList(searchtest){
            if(this.index == 0 ){
                this.searchText = searchtest;
                this.getTestengineer__myexperimentList(1,searchtest,500,()=>{},()=>{},(data)=>{
                    this.Testengineer__myexperimentList = data;

                })
            }else{
                this.searchTextIndex = searchtest
                this.getTestengineer__myprojectList(1,searchtest,500,()=>{},()=>{},(data)=>{
                    this.Testengineer__myprojectList = data;

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
.TestComplete{
    overflow: hidden;
    .swiper_box,.vux-slider,.vux-swiper,.vux-swiper-item{
        height: 100%!important;
    }
    .swiper_box{
        height: calc(100% - 1.1rem);
    }
   .personnelManagement_list{
       li{
           height: auto!important;
           padding-top: .26rem!important;
           .time_end{
               margin-right: .38rem!important;
           }
           .thereChild{
               margin-top: 0;
           }
       }
       
   }
}
</style>