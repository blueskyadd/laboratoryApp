<template>
    <div class="ProjectSchedule body_main">
        <div class="progressList"  v-for="item in projectpctFlow" :key="item.id">
            <div class="ProjectSchedule_title">
                <div class="leftDom">
                    <div class="name_title"><span>{{item.name}}</span><span>{{item.project_leader}}</span></div>
                    <x-progress :percent="toPoint(item.pct)" :show-cancel="false"></x-progress>
                </div>
                <span class="unfold" @click="item.isHiddenBox = !item.isHiddenBox" :class="item.isHiddenBox?'hiddenHeight': ''"></span>
            </div>
            <div class="experiment_project" :class="!item.isHiddenBox?'experiment_project_height':''">
                    <h3>试验列表</h3>
                    <ul>
                        <li v-for="value in item.experiment_project" :key="value.id" class="vux-1px-b">
                            <div class="ProjectSchedule_title">
                                <div class="leftDom">
                                    <div class="name_title"><span>{{value.name}}</span><span>{{value.project_leader}}</span></div>
                                    <x-progress :percent="toPoint(value.pct)" :show-cancel="false"></x-progress>
                                </div>
                                <span class="status" :style="{color:value.status=='正常'?'#07a695':'#f10000'}">{{value.status}}</span>
                            </div>
                        </li>
                        <li  class="noStatus" v-if="!item.isexperiment_project"><span >暂无数据</span></li>
                    </ul>
                </div>
        </div>
        
        <popup-picker  :data="popupList" :show.sync="showAddress"  @on-hide='changeTitle' style="display:none" ref="rightTitle" v-model="value1" :columns="1"></popup-picker>
    </div>
</template>
<script>
import { PopupPicker,XProgress } from 'vux'
export default {
    name:'ProjectSchedule',
    components:{PopupPicker,XProgress},
    data(){
        return{
            value1:[],
            showAddress: false,
            Schedule: 71,
            popupList:[],
            projectpctFlow: []
        }
    },
    mounted(){
        this.getProductManager_produceList();
    },
    methods:{
        changeRighTitle(){
           this.showAddress = true;
       },
       toPoint(data){
          if(data){
             return parseInt(data.replace("%", "")*1);
          }else{
             return  0
          }
        },
       changeTitle(data){
           this.$parent.isHiddenBox = false;
           this.popupList.forEach(Element =>{
               if(Element.value == this.value1[0]){
                   this.$parent.rightTitle = Element.name;
                   this.projectID = Element.id;
               }
           })
           this.getProductManager_projectpctFlow(this.projectID)
       },
       getProductManager_produceList(){
           this.$vux.loading.show();
            this.$http.get(this.$conf.env.getProductManager_produceList).then(res =>{
                if(res.data.length){
                    res.data.forEach(Element =>{
                        Element.value = Element.id.toString();
                    })
                     this.$emit('setHeaderShow', {blod:true,title:'试验信息',isRightTitle: true,rightTitle:res.data[0].name});
                     this.projectID = res.data[0].id;
                }
                this.getProductManager_projectpctFlow(this.projectID)
                this.popupList = res.data;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            }) 
       },
       getProductManager_projectpctFlow(ID){
            this.$http.get(this.$conf.env.getProductManager_projectpctFlow + ID ).then(res =>{
                if (res.data.length > 0) {
                    res.data.forEach((Element, index) => {
                        Element.isHiddenBox = false;
                    this.$http.get(this.$conf.env.getProductManager_expctList + Element.id).then(item => {
                            Element.experiment_project = item.data ? item.data : [];
                            Element.isexperiment_project = item.data.length? true:false;
                        }) .catch(err => {
                            Element.experiment_project = [];
                             Element.isexperiment_project = false;
                        this.$message({ message: err.response ? err.response.data : "服务器错误", type: "warning"});
                        });
                    });
                } else {
                }
                this.projectpctFlow = res.data;
                console.log(this.projectpctFlow)
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            }) 
       },
    }
}
</script>
<style lang="scss">
.ProjectSchedule{
    
    .progressList{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: .15rem;
        margin-bottom: .24rem;
    }
    .ProjectSchedule_title{
        display: flex;
        // flex-direction: column;
       
        width: 100%;
        background:rgba(255,255,255,1);
        height: 1.1rem;
        // border-radius: .2rem;
        padding: 0.2rem .37rem 0 .27rem;
        justify-content: space-between;
        // box-shadow:0px 1px 71px 0px rgba(0, 0, 0, 0.19);
        
        .leftDom{
            display: flex;
             flex-direction: column;
             flex: 1;
             
            .name_title{
                display: flex;
                justify-content: space-between;
                font-size: .26rem;
                font-family:simhei;
                font-weight:400;
                color:rgba(51,51,51,1);
                margin-bottom: .16rem;
                width: 95%;
                span:last-child{
                    color:#898989;
                    font-family: MFShangHei;
                }
            }
            .weui-progress{
                width: 95%!important;
            }
            .yd-progressbar{
                height: .07rem;
                display: flex;
                border-radius: .04rem;
                overflow: hidden;
            }
        }
        .status{
            display: flex;
            align-items: center;
            font-size: .22rem;
        }
        .unfold{
                width: .15rem;
                height: .15rem;
                margin-left: .17rem;
                display: block;
                border-bottom: 1px solid #07a695;
                border-left: 1px solid #07a695;
                -webkit-transform: rotate(-45deg);
                transform: rotate(-45deg);
                margin-bottom: .04rem;
                -webkit-transition: all .2s;
                transition: all .2s;
                margin-top: .4rem;
        }
        .hiddenHeight {
            transform: rotate(-135deg);
        }
        
    }
    .experiment_project{
        width: 100%;
        transition: all .2s;
        h3{
            font-size: .22rem;
            width: 100%;
            background: #07a695;
            color: #fff;
            display: block;
            height: .5rem;
            line-height: .5rem;
        }
        li{
            .ProjectSchedule_title{
                height: 1.1rem;
            }
        }
        .noStatus{
            height: .8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
            span{
                width: 100%;
                font-size: .24rem;
            }
        }
    }
    .experiment_project_height{
        height: 0;
        overflow: hidden;
    }
}
</style>