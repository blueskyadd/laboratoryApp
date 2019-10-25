<template>
    <div class="equipmentManagementDetail body_main">
        <div class="equipmentManagementDetail_title margin_bottom margin_top">
            <div class="vux-1px-b"><span>{{equipmentDetail.num}}</span></div>
            <div><span><img src="../../../assets/img/LabManager/managementIssue/headerImg.png" alt=""><p>{{equipmentDetail.device_keeper}}</p></span><span><img src="../../../assets/img/LabManager/managementIssue/location.png" alt=""><p>{{equipmentDetail.room}}</p></span></div>
        </div>
        <div class="equipmentManagementDetail_main">
            <tab :line-width=2 active-color='#08A795' custom-bar-width="1.8rem" v-model="index">
                <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
            </tab>
            <swiper v-model="index" :show-dots="false">
                <swiper-item v-for="(item, index) in list2" :key="index">
                    <div class="tab-swiper vux-center">
                        <div class="swiper_title">
                            <span>{{item}}</span><span class="vux-1px-b"></span>
                        </div>
                        <div class="swiper_flow" v-if="index == 0">
                            <ul @scroll="getMoreupkeeprecord">
                                <li v-for="(item, index) in Labmanage_upkeeprecord" :key="item.id">
                                    <div class="flow_end flow_list">
                                        <span>成</span>
                                        <span>{{item.report_time}}</span>
                                        <span class="showText">负责人：{{item.device_keeper}}</span>
                                        <!-- <span>查看</span> -->
                                    </div>
                                    <span class="flow_border vux-1px-l"></span>
                                    <div class="flow_start flow_list">
                                        <span>养</span>
                                        <span>{{item.start_time}}</span>
                                    </div>
                                    <span v-show="index < Labmanage_upkeeprecord.length - 1" class="flow_border vux-1px-l"></span>
                                </li>
                            </ul>
                        </div>
                        <div class="swiper_flow" v-if="index == 1">
                            <ul @scroll="getMoremaintainrecord">
                                <li v-for="(item, index) in Labmanage_maintainrecord" :key="item.id">
                                    <div class="flow_end flow_list">
                                        <span>成</span>
                                        <span>{{item.report_time}}</span> 
                                        <span class="showText">负责人：{{item.applicant}}</span>
                                        <a download="w3logo" :href="item.report">查看</a>
                                    </div>
                                    <span class="flow_border vux-1px-l"></span>
                                    <div class="flow_start flow_list">
                                        <span>修</span>
                                        <span>{{item.start_time}}</span>
                                    </div>
                                    <span v-show="index < Labmanage_maintainrecord.length-1" class="flow_border vux-1px-l"></span>
                                </li>
                            </ul>
                        </div>
                        <div class="swiper_flow" v-if="index == 2">
                            <ul @scroll="getMoremeterecord">
                                <li  v-for="(item, index) in Labmanage_meterecord" :key="item.id">
                                    <div class="flow_end flow_list">
                                        <span>量</span>
                                        <span>{{item.report_time}}</span>
                                        <span class="showText">委托公司：{{item.nominee_company}}</span>
                                        <a download="w3logo" :href="item.report">查看</a>
                                    </div>
                                    <span  v-show="index < Labmanage_meterecord.length-1" class="flow_border vux-1px-l"></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </swiper-item>
            </swiper>
        </div>
    </div>
</template>
<script>
import { Tab, TabItem, Swiper, SwiperItem} from 'vux';
const list = () => ['保养记录', '维修记录', '计量记录']
export default {
    name:'equipmentManagementDetail',
    components:{Tab, TabItem, Swiper, SwiperItem},
    data(){
        return{
            list2:  list(),
            demo2: '美食',
            index: 0,
            equipmentDetail:{},
            Labmanage_upkeeprecord:[],//保养记录列表
            Labmanage_maintainrecord:[],//维修记录列表
            Labmanage_meterecord:[],//计量记录列表
            isMoreupkeeprecord: true,//保养
            MoreupkeeprecordNumber: true,//保养
            isMoremaintainrecord: true,//维修
            MoremaintainrecordNumber: 1,//维修
            isMoremeterecord: true,//计量
            MoremeterecordNumber:1,//计量
            page_size: 14
        }
    },
    mounted(){
        this.getLabmanage_equipmentDetail();
        this.getLabmanage_upkeeprecord();
        this.getLabmanage_maintainrecord();
        this.getLabmanage_meterecord();
    },
    methods:{
        getLabmanage_equipmentDetail(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getLabmanage_equipmentDetail + this.$route.query.equipmentID + '/').then(res =>{
                this.$emit('setHeaderShow', {blod:true,title: res.data.name});
                this.equipmentDetail = res.data;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        
        /**@name 保养记录列表 */
        getMoreupkeeprecord(e){
            if(e.target.scrollHeight - e.target.offsetHeight < e.target.scrollTop + 20 && this.isMoreupkeeprecord){
                this.isMoreupkeeprecord = false;
                this.MoreupkeeprecordNumber += 1;
                this.getLabmanage_upkeeprecord();
            }
        },
        getLabmanage_upkeeprecord(){
            this.$http.get(this.MoreupkeeprecordNumber == 1 ? this.$conf.env.getLabmanage_upkeeprecord + this.$route.query.equipmentID + '&page_size=' + this.page_size :this.$conf.env.getLabmanage_upkeeprecord + this.$route.query.equipmentID + '&p=' +  this.MoreupkeeprecordNumber + '&page_size=' + this.page_size).then(res =>{
                this.Labmanage_upkeeprecord = this.MoreupkeeprecordNumber == 1 ? res.data.results:this.Labmanage_upkeeprecord.concat(res.data.results);
                this.isMoreupkeeprecord = res.data.next ? true : false;
            }).catch(err =>{
                this.isMoreupkeeprecord = false;
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        /**@name 维修记录列表 */
        getMoremaintainrecord(e){
            if(e.target.scrollHeight - e.target.offsetHeight < e.target.scrollTop + 20 && this.isMoremaintainrecord){
                this.isMoremaintainrecord = false;
                this.MoremaintainrecordNumber += 1;
                this.getLabmanage_maintainrecord();
            }
        },
        getLabmanage_maintainrecord(){
            this.$http.get(this.MoremaintainrecordNumber == 1 ? this.$conf.env.getLabmanage_maintainrecord + this.$route.query.equipmentID + '&page_size=' + this.page_size :this.$conf.env.getLabmanage_maintainrecord + this.$route.query.equipmentID + '&page_size=' + this.page_size+ '&p=' +this.MoremaintainrecordNumber ).then(res =>{
                this.Labmanage_maintainrecord = this.MoremaintainrecordNumber == 1 ? res.data.results:this.Labmanage_maintainrecord.concat(res.data.results);
                this.isMoremaintainrecord = res.data.next ? true : false;
            }).catch(err =>{
                this.isMoremaintainrecord = false;
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        /**@name计量记录列表 */
        getMoremeterecord(e){
            if(e.target.scrollHeight - e.target.offsetHeight < e.target.scrollTop + 20 && this.isMoremeterecord){
                this.isMoremeterecord = false;
                this.MoremeterecordNumber += 1;
                this.getLabmanage_meterecord();
            }
        },
        getLabmanage_meterecord(){
            this.$http.get(this.MoremeterecordNumber == 1 ? this.$conf.env.getLabmanage_meterecord + this.$route.query.equipmentID  + '&page_size=' + this.page_size : this.$conf.env.getLabmanage_meterecord + this.$route.query.equipmentID  + '&page_size=' + this.page_size + '&p=' +this.MoremeterecordNumber).then(res =>{
                this.Labmanage_meterecord = this.MoremeterecordNumber == 1 ? res.data.results:this.Labmanage_meterecord.concat(res.data.results);
                this.isMoremeterecord = res.data.next ? true : false;
            }).catch(err =>{
                this.isMoremeterecord = false;
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        onScrollBottom(){
            console.log('加载')
        }
    }
}
</script>
<style lang="scss">
.equipmentManagementDetail{
        height: calc(100% - 1.08rem);
        overflow: hidden;
   .equipmentManagementDetail_title{
       padding-left: .28rem;
       background: #fff;
       div:first-child{
            height: .72rem;
            line-height: .72rem;
            font-size: .36rem;
            font-family:simhei;
            font-weight:400;
            color:rgba(8,167,149,1);
            text-align: left;
            span{
                max-width: 95%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display: block;
            }
       }
       div:last-child{
            font-size: .24rem;
             color: #999999;
             font-family: simhei;
             display: flex;
             flex-direction: column;
             justify-content: space-around;
             width: 100%;
             height: 1.09rem;
             span{
                 display: flex;
                 align-items: center;
                 img{
                     margin-right: .1rem;
                 }
                 p{
                     max-width: 7rem;
                     overflow: hidden;
                     white-space: nowrap;
                     text-overflow: ellipsis;
                     text-align: left;
                 }
             }
             span:first-child{
                 img{
                     width: .24rem;
                     height: .24rem;
                 }
             }
             span:nth-child(2){
                 img{
                     width: .17rem;
                     height: .21rem;
                 }
             }
       }
   }
   .equipmentManagementDetail_main{
       height: calc(100% - 2.02rem);
       .vux-tab-wrap{
            margin-bottom: .1rem;
            padding-top: .8rem;
            .vux-tab-item{
                color: #737373;
            }
       }
       .vux-tab-container, .vux-tab{
           height: .8rem;
       }
       .vux-slider{
           background: #fff;
           height: calc(100% - .9rem);
           padding: .27rem .3rem 0;
           .vux-swiper{
               height: 100%!important;
               .tab-swiper{
                   height: 100%;
                    .swiper_title{
                        height: .22rem;
                        margin-bottom: .52rem;
                        display: flex;
                        span{
                            font-size: .24rem;
                            font-family:simhei;
                            font-weight:400;
                            color:rgba(153,153,153,1);
                        }
                        span:last-child{
                            flex: 1;
                            margin-bottom: .09rem;
                            margin-left: .17rem;
                        }
                    }
                     .swiper_flow{
                         height: calc(100% - .6rem);
                         overflow: hidden;
                        ul{
                            height: 100%;
                            overflow-y: scroll;
                            li{
                                div{
                                    display: flex;
                                }
                                .flow_border{
                                    height: .4rem;
                                    display: block;
                                    margin-left: .2rem;
                                }
                                .flow_list{
                                    span,a{
                                        font-family:simhei;
                                        font-weight:400;
                                        color:rgba(8,167,149,1);
                                        font-size: .26rem;
                                        display: block;
                                    }
                                    span:first-child{
                                        font-size: .24rem;
                                        width: .4rem;
                                        height: .4rem;
                                        justify-content: center;
                                        align-items: center;
                                        display: flex;
                                        border-radius: 50%;
                                        overflow: hidden;
                                        border: 1px solid;
                                        margin-right: .3rem;
                                    }
                                    span:nth-child(2){
                                        margin-right: .65rem;
                                    }
                                }
                                .flow_end{
                                    span:first-child{
                                        border-color:#08A795;
                                    }
                                    span:last-child{
                                        align-content: flex-end;
                                    }
                                    span:nth-child(3){
                                        text-align: left;
                                        width: 45%;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                        display: block;
                                        margin-right: .24rem;
                                    }
                                    
                                }
                                .flow_start{
                                    span:first-child{
                                        border-color:#999999;
                                        color: #999;
                                    }
                                    span{
                                        color: #999;
                                    }
                                }
                            }
                        }
                    }
               }
                
               
           }
           
       }
   }
}
</style>