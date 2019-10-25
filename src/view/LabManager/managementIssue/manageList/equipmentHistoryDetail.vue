<template>
    <div class="EquipmentHistoryDetail body_main">
        <div class="EquipmentHistoryDetail_title margin_bottom margin_top">
            <div class="vux-1px-b"><span>{{$route.query.projectNum}}</span></div>
            <div><span><img src="../../../../assets/img/LabManager/managementIssue/location.png" alt=""><p>{{equipmentDetail.name}}</p></span></div>
        </div>
        <div class="tab-swiper vux-center EquipmentHistoryDetail_main">
            <div class="swiper_title">
                <span>项目详情</span><span class="vux-1px-b"></span>
            </div>
            <div class="swiper_flow" >
                <ul>
                    <li v-for="(item, index) in equipmentDetail.experiments" :key="item.id">
                        <div class="flow_end flow_list">
                            <span>{{index+1}}</span>
                            <span class="showText">{{item.experiment_num}}</span>
                            <span class="showText">试验名称：{{item.name}}</span>
                            <span class="showText">委托公司：{{equipmentDetail.company}}</span>
                        </div>
                        <span v-show="index < equipmentDetail.experiments.length - 1"  class="flow_border vux-1px-l"></span>
                    </li>
                    
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'EquipmentHistoryDetail',
    data(){
        return{
            equipmentDetail:{}
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'项目详情'});
        this.getLabmanage_finishprojectDetail()
    },
    methods:{
        getLabmanage_finishprojectDetail(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getLabmanage_finishprojectDetail + this.$route.query.projectID + '/').then(res =>{
                this.equipmentDetail = res.data;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        }
    }
}
</script>
<style lang="scss">
.EquipmentHistoryDetail{
        height: calc(100% - 1rem);
   .EquipmentHistoryDetail_title{
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
    .tab-swiper{
        background: #fff;
        height: calc(100% - 2.01rem);
        padding: .27rem .3rem 0;
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
            height: calc(100% - .72rem);
            overflow: hidden;
            ul{
                height: 100%;
                overflow-y: scroll;
                li{
                    margin-bottom: .1rem;
                    div{
                        display: flex;
                    }
                    .flow_border{
                        height: .4rem;
                        display: block;
                        margin-left: .2rem;
                    }
                    .flow_list{
                            span{
                            font-family:simhei;
                            font-weight:400;
                            color:rgba(8,167,149,1);
                            font-size: .26rem;
                            display: block;
                            text-align: left;
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
                            margin-right: .3rem;
                            width: 1.1rem;
                        }
                    }
                    .flow_end{
                        span:first-child{
                            border-color:#08A795;
                        }
                        span:last-child{
                            align-content: flex-end;
                            width: 3rem;
                        }
                        span:nth-child(3){
                            width: 38%;
                            text-align: left;
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
</style>