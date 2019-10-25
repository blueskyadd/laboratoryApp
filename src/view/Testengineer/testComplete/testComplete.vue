<template>
    <div class="TestComplete body_main">
        <Search  @searchList='searchList' ref="searchList"/>
        <div class="swiper_box">
            <tab :line-width=2 active-color='#07A695' custom-bar-width="1.8rem" v-model="index">
                <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
            </tab>
            <swiper v-model="index" :show-dots="false">
                <swiper-item >
                    <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
                        <template>
                            <li  v-for="(finishexperimentList, number) in Testengineer__finishexperimentList" :key="number">
                                <div class="firstChild ststusTextTrue">
                                    <span  class="projectNumber rightStatus">{{finishexperimentList.experiment_num}}</span>
                                    <span class="normal ststusText" v-if="finishexperimentList.result == '合格'"><i></i>合格</span>
                                    <span class="maintain ststusText" v-else><i></i>{{finishexperimentList.result}}</span>
                                </div>
                                <div class="twoChild equilpmentName"><span class="projectName">项目名称：{{finishexperimentList.name}}</span><span class="right_natrue "><a :href="finishexperimentList.method"  download="试验方法" class="underline">试验方法</a></span></div>
                                <div class="twoChild"><i></i><span>试验开始时间：{{finishexperimentList.start_time}}</span></div>
                                <div  class="Time thereChild" ><i></i><span class="time_end time_overTime"><p class="overTime">试验完成时间：{{finishexperimentList.test_end_time}}</p></span><span class="right_natrue">试验类型：<i>{{finishexperimentList.project_type}}</i></span></div>
                            </li>
                        </template>
                    </main-list>
                </swiper-item>
                <swiper-item >
                    <main-list @loadmore='loadmore' ref="mainListIndex"  :islistData='islistDataIndex'>
                        <template>
                            <li @click="TestCompleteDetail(finishprojectList)"  v-for="(finishprojectList, number) in Testengineer__finishprojectList" :key="number">
                                <div class="firstChild ststusTextTrue">
                                    <span class="projectNumber">{{finishprojectList.number}}</span>
                                </div>
                                <div class="twoChild equilpmentName"><span class="projectName">项目名称：{{finishprojectList.name}}</span></div>
                                <div class="twoChild"><i></i><span>试验开始时间：{{finishprojectList.start_time}}</span></div>
                                <div  class="Time thereChild" ><i></i><span class="time_end time_overTime"><p class="overTime">试验完成时间：{{finishprojectList.report_time}}</p></span><span class="right_natrue">试验类型：<i>{{finishprojectList.project_type}}</i></span></div>
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
            Testengineer__finishexperimentList:[],
            searchText:'',
            islistData: false,
            Testengineer__finishprojectList:[],
            islistDataIndex: false,
            searchTextIndex: '',
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'完成任务'});
        this.getTestengineer__finishexperimentList(1,'',12);
        this.getTestengineer__finishprojectList(1,'',12);
    },
    methods:{
        TestCompleteDetail(data){
            this.$router.push({name:'TestCompleteDetail',query:{projectID:data.id}})
        },
        getTestengineer__finishexperimentList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getTestengineer__finishexperimentList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getTestengineer__finishexperimentList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.Testengineer__finishexperimentList = pagenumber == 1 ? res.data.results: this.Testengineer__finishexperimentList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                    res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.Testengineer__finishexperimentList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        getTestengineer__finishprojectList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getTestengineer__finishprojectList + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getTestengineer__finishprojectList + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.Testengineer__finishprojectList = pagenumber == 1 ? res.data.results: this.Testengineer__finishprojectList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                    res.data.next ?this.$refs.mainListIndex.scrollpullupStatus(false):this.$refs.mainListIndex.scrollpullupStatus(true);
                }
                this.islistDataIndex = this.Testengineer__finishprojectList.length>0?false:true;
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
                this.getTestengineer__finishexperimentList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
            }else{
                this.getTestengineer__finishprojectList(pagenumber,this.searchTextIndex,12, ()=>{success();},()=>{ error();});
            }
        },
        //搜索
        searchList(searchtest){
            if(this.index == 0 ){
                this.searchText = searchtest;
                this.getTestengineer__finishexperimentList(1,searchtest,500,()=>{},()=>{},(data)=>{
                    this.Testengineer__finishexperimentList = data;

                })
            }else{
                this.searchTextIndex = searchtest
                this.getTestengineer__finishprojectList(1,searchtest,500,()=>{},()=>{},(data)=>{
                    this.Testengineer__finishprojectList = data;

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
    .swiper_box{
        height: calc(100% - 1.1rem);
    }
    .swiper_box,.vux-slider,.vux-swiper,.vux-swiper-item{
        height: 100%!important;
    }
   .personnelManagement_list{
       li{
           height: auto!important;
           padding-top: .26rem!important;
           .time_end{
               margin-right: .38rem!important;
           }
       }
       
   }
}
</style>