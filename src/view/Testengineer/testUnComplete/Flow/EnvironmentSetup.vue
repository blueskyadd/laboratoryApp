<template>
    <div class="EnvironmentSetup body_main ">
        <tab :line-width=2 active-color='#07A695' custom-bar-width="1.8rem" v-model="setIndex">
            <tab-item class="vux-center" :selected="listActively === item" v-for="(item, index) in listTitle" @click="listActively = item" :key="index">{{item}}</tab-item>
        </tab>
        <swiper v-model="setIndex" :show-dots="false" :prevent-default='false'>
            <swiper-item> 
                <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistDataExbom'>
                    <template>
                        <li  @click="goMaterialFlow(exbom)" v-for="(exbom, number) in Testengineer_exbomList" :key="number">
                            <div class="firstChild ststusTextTrue">
                                <span  class="projectNumber">{{exbom.nateriel_num}}</span>
                            </div>
                            <div class="twoChild equilpmentName"><span class="projectName">项目名称：{{exbom.name}}</span></div>
                            <div  class="Time thereChild explain" ><i></i><span class="time_end">试验数量：{{exbom.num}}</span><span class="explain"><img src="../../../../assets/img/materialEngineer/materialManage/explain.png" alt=""><p>{{exbom.device_type}}</p></span></div>
                            <div  class="Time thereChild" ><span style="margin-left:0" class="right_natrue"><i>备注:{{exbom.remark}}</i></span></div>
                        </li>
                    </template>
                </main-list>
            </swiper-item>
            <swiper-item > 
                <main-list :islistData='islistDataTwo'  ref="mainListTwo">
                    <template>
                        <li v-for="(exeqrequired, number) in Testengineer_exeqrequiredList" :key="number">
                            <div class="firstChild ststusTextTrue">
                                <span  class="projectNumber">{{exeqrequired.num}}</span>
                                <span class="editBox"><span class="delete ststusText" @click="goApplyRepair(exeqrequired)">故障</span><span class="edit ststusText" >正常</span></span>
                            </div>
                            <div class="twoChild equilpmentName"><span class="projectName">项目名称：{{exeqrequired.name}}</span></div>
                            <div  class="Time thereChild" ><span style="margin-left:0" class="right_natrue"><i>备注:{{exeqrequired.remark}}</i></span></div>
                        </li>
                    </template>
                </main-list>
            </swiper-item>
            <swiper-item> 
                <main-list :islistData='false'  ref="mainListThere">
                    <template>
                        <li>
                            <div class="twoChild equilpmentName"><span class="projectName lookfile">试验操作：<a class="ststusText" style="color:#07a695" :href="exeqrequiredDetail.operation" download="w3logo">查看</a></span></div>
                        </li>
                    </template>
                </main-list>
            </swiper-item>
        </swiper>
    </div>
</template>
<script>
import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
import mainList from '../../../../components/mainList'
export default {
    name:'EnvironmentSetup',
    components:{Tab, TabItem, Swiper, SwiperItem, mainList},
    data(){
        return{
            isStatus: false,
            listTitle: ['物料清单', '设备清单','试验方法'],
            setIndex: 0,
            listActively: '物料清单',
            islistData: false,
            islistDataExbom: false,
            searchText:'',
            Testengineer_exbomList:[],
            islistDataTwo:false,
            Testengineer_exeqrequiredList:[],
            exeqrequiredDetail:{}
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'实验室环境搭建管理'})
        this.listActively = this.$store.state.ApplyRepair.ApplyRepairIndex? this.$store.state.ApplyRepair.ApplyRepairIndex : '物料清单' ;
        this.getTestengineer_exbomList(1,'',12);
        this.getTestengineer_exeqrequiredList();

    },
    methods:{
        goApplyRepair(data){
            this.$router.push({name:'ApplyRepair',query:{projectID:data.id,projectName:data.name,projectNumber:data.num,projectRoom:data.room}})
        },
        getTestengineer_exbomList(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getTestengineer_exbomList + this.$route.query.projectID + '&search=' + searchText + '&page_size=' + page_size : this.$conf.env.getTestengineer_exbomList + this.$route.query.projectID + '&search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.Testengineer_exbomList = pagenumber == 1 ? res.data.results: this.Testengineer_exbomList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                    res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistDataExbom = this.Testengineer_exbomList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getTestengineer_exbomList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
        getTestengineer_exeqrequiredList(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getTestengineer_exeqrequiredList + this.$route.query.projectID).then(res =>{
               this.Testengineer_exeqrequiredList = res.data;
               this.$refs.mainListTwo.scrollpullupStatus(true);
               this.islistDataTwo = this.Testengineer_exeqrequiredList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                console.log(err)
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            }) 
        },
        getTestengineer_exeqrequiredDetail(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getTestengineer_exeqrequiredDetail + this.$route.query.projectID + '/').then(res =>{
               this.exeqrequiredDetail = res.data;
                this.$vux.loading.hide();
            }).catch(err =>{
                console.log(err)
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            }) 
        }
    },
    beforeRouteLeave (to, from, next) {
        if(to.name == 'ApplyRepair'){
            this.$store.commit('changeApplyRepairIndex',this.listTitle[1])
        }else{
            this.$store.commit('changeApplyRepairIndex',this.listTitle[0])
        }
        next();
    }
}
</script>

<style lang="scss">
.EnvironmentSetup{
    .vux-tab-wrap{
        margin-bottom: .1rem;
    }
    .vux-slider,.vux-swiper,.vux-swiper-item{
         height:100%!important;
    }
   .personnelManagement_list{
       li{
           height: auto!important;
           padding-top: .26rem!important;
           .time_end{
               margin-right: 1rem!important;
           }
           .thereChild{
               margin-top: 0;
           }
       }
   }
}
</style>