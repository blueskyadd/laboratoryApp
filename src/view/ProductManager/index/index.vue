<template>
    <div class="project_ProjectManagerIndex body_main">
        <div class="swiperDome margin_top margin_bottom" v-if="pruductpctFlow.length">
            <swiper :options="swiperOption">
                <swiper-slide class="show_box" v-for="(slide, index) in pruductpctFlow" :key="index">
                    <span class="progressbar_title">产品{{slide.name}}</span>
                    <div class="progressbar_data">
                        <div><span>待完成</span><span></span></div>
                        <div><span>已完成</span><span></span></div>
                        <div><span>状态</span><span>{{slide.status}}</span></div>
                    </div>
                        <yd-progressbar
                            stroke-width="13"
                            stroke-color="#d0d0d0"
                            trail-color="#08a695"
                            :progress="toPoint(slide.pct)/100"
                            trail-width="13"
                        >
                        <yd-countup :endnum="toPoint(slide.pct)" :duration="1" suffix="%">{slide.pct}}</yd-countup>
                    </yd-progressbar>
                </swiper-slide>
            </swiper>
        </div>
        <div class="LabManager_inform show_box">
            <span class="LabManager_inform_title"><img src="../../../assets/img/testManage/index/newTestImg.png" alt=""></span>
            <marquee>
                <marquee-item v-for="item in asyncCount" :key="item.id" @click.native="onClick(i)" class="align-middle">
                    <i></i>
                    <p>{{item.content}}</p>
                </marquee-item>
            </marquee>
       </div>
        <div class="LabManager_myapply">
            <div class="section_datalist gauger_gaugerIndex">
                <div class="show_box toplist img_text information" @click="goProjectManager()"><img src="../../../assets/img/ProdectManager/index/project.png" alt=""><span>负责产品</span></div>
                <div class="show_box toplist img_text information" @click="goProjectSetting()"><img src="../../../assets/img/ProdectManager/index/setting.png" alt=""><span>项目配置</span></div>
                <div class="show_box toplist img_text information" @click="goProjectInfo()"><img src="../../../assets/img/ProdectManager/index/testInfo.png" alt=""><span>试验信息</span></div>
                <div class="show_box toplist img_text information" @click="goProjectSchedule()"><img src="../../../assets/img/ProdectManager/index/schedule.png" alt=""><span>项目进度</span></div>
                <div class="show_box toplist img_text information" @click="goExpenditureCost()"><img src="../../../assets/img/ProdectManager/index/cost.png" alt=""><span>支出费用</span></div>
                <div class="show_box toplist img_text information" @click="goProjectCareful()"><img src="../../../assets/img/ProdectManager/index/careful.png" alt=""><span>审批</span></div>
            </div>
        </div>
    </div>
</template>
<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import {Marquee, MarqueeItem, Countup} from 'vux'
import Swiper from 'swiper'
export default {
    name:'ProjectManagerIndex',
    components: {swiper,swiperSlide,Marquee, MarqueeItem, Countup},
    data(){
        return{
            swiperOption: {
                slidesPerView: 'auto',
                spaceBetween: 25,
                centeredSlides: true,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            },
            pruductpctFlow: [],
            isprogressbar: true,
            progress3: 0.5,
            asyncCount: 0
        }
    },
    methods:{
        goProjectManager(){
            this.$router.push({name:'ProjectManager'})
        },
        goProjectSetting(){
            this.$router.push({name:'ProjectSetting'})
        },
        goProjectInfo(){
            this.$router.push({name:'ProjectInfo'})
        },
        goProjectSchedule(){
            this.$router.push({name:'ProjectSchedule'})
        },
        goExpenditureCost(){
            this.$router.push({name:'ExpenditureCost'})
        },
        goProjectCareful(){
            this.$router.push({name:'ProjectCareful'})
        },
        toPoint(data){
          if(data){
             return (data.replace("%", "")*1).toFixed(1);
          }else{
             return  0
          }
        },
        /**@name 产品进度  */
        getProductManager_pruductpctFlow(){
            this.$vux.loading.show();
             this.$http.get(this.$conf.env.getProductManager_pruductpctFlow).then( res =>{
                this.pruductpctFlow = res.data;
                this.$vux.loading.hide()
            }).catch(err =>{
                this.$vux.loading.hide()
                this.$vux.toast.text(err.response?err.response.data:'服务器错误')
            })
        },
        /**@name 公告栏*/
        getSystem_info(){
            this.$http.get(this.$conf.env.getSystem_info).then( res =>{
                this.asyncCount = res.data.results;
                this.$vux.loading.hide()
            }).catch(err =>{
                this.$vux.loading.hide()
                this.$vux.toast.text(err.response?err.response.data:'服务器错误')
            })
        },
    },
    computed:{
    },
    mounted(){
        this.$emit('setIndexHeaderTitle',{flag:true,title: '实验室信息化管理系统'})
        this.getProductManager_pruductpctFlow();
        this.getSystem_info();
    },
    destroyed(){
        this.$emit('setHeaderShow', {blod:false,title:''})
    }
}
</script>
<style lang="scss">
.project_ProjectManagerIndex{
  .swiperDome,.swiper-container{
      height: 3.94rem;
      .swiper-wrapper{
        align-items: center;
        .swiper-slide{
            background: #fff;
            width: 4.8rem;
            height: 3.6rem;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: .2rem .3rem;
            position: relative;
        }
        .swiper-slide-active{
            height: 3.84rem;
        }
        .progressbar_title{
            font-size: .3rem;
            font-family: simhei;
            max-width: 2.4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-table;
        }
        .yd-progressbar{
            margin: .5rem 0 0 .2rem;
            width:2.58rem;
            height: 2.58rem;
            .yd-progressbar-content{
                font-size: .48rem;
                color: #08a695;
            }
        }
        .progressbar_data{
            position: absolute;
            top: .3rem;
            right: .3rem;
            div{
                display: flex;
                align-items: center;
                margin-bottom: .2rem;
                height: .24rem;
                justify-content: flex-end;
                span:first-child{
                    font-size: .24rem;
                    color: #676767;
                    text-align: right;
                }
                span:last-child{
                    font-size: .24rem;
                    margin-left: .2rem;
                    width: .67rem;
                    display: block;
                    height: .14rem;
                    background: #08a695;
                    border-radius: .07rem;
                    display: block;
                }
            }
            div:first-child{
                span:last-child{
                    background: #d0d0d0;
                }
            }
            div:last-child{
                span:last-child{
                    background: #fff;
                    height: auto;
                    margin-left: .25rem;
                    color: #08a695;
                }
            }
            
        }
      }
  }
  .LabManager_myapply{
      .toplist{
          height: 2.36rem;
          img{
              height: 1.18rem;
              width: 1.18rem;
          }
          span{
              color: #08a695!important;
          }
      }
      
  }
  .DelayAnnouncement{
        li{
            color: #d1012d;
        }
        i{
            background: #d1012d;
        }
    }
}
</style>