<template>
    <div class="measureFlow margin_top body_main">
        <div class="measureFlow_title">
            <span>设备名称:</span>
            <span>{{$route.query.projectName}}</span>
        </div>
        <div class="measureFlow_list">
            <ul>
                <li class="show_box equipment" @click="goApplyMeasuring()"><img src="../../../assets/img/gauger/flow/equipment.png" alt=""><span>申请计量</span></li>
                <li class="show_box contract" ><img src="../../../assets/img/gauger/flow/contract.png" alt=""><span>合同签署</span></li>
                <li class="show_box schedule" @click="goScheduleMeasuring()"><img src="../../../assets/img/gauger/flow/schedule.png" alt=""><span>计量进度</span></li>
                <li class="show_box lookReport" @click="goReportMeasuring()"><img src="../../../assets/img/gauger/flow/lookReport.png" alt=""><span>计量报告</span></li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:'measureFlow',
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'计量流程'});
        
    },
    methods:{
        goApplyMeasuring(){
            this.$router.push({name:'ApplyMeasuring',query:{projectID:this.$route.query.projectID}})
        },
        goScheduleMeasuring(){
            this.$router.push({name:'scheduleMeasuring',query:{projectID:this.$route.query.projectID}});
        },
        goReportMeasuring(){
            this.$router.push({name:'reportMeasuring',query:{projectID:this.$route.query.projectID}});
        },
        getGauger_meteringDetail(){

        }
    }
}
</script>
<style lang="scss" scoped>
.measureFlow{
    background: #fff;
    height: calc(100% - 1.08rem);
    padding: 0 .3rem;
    overflow: hidden;
    .measureFlow_title{
        display: flex;
        align-items: center;
        margin-top: .76rem;
        span{
            font-size: .28rem;
            font-family:Microsoft;
            font-weight:400;
            color:rgba(51,51,51,1);
            display: block;
        }
        span:last-child{
            color: #07A695;
            margin-left: .23rem;
        }
    }
    .measureFlow_list{
        ul{
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            padding: .25rem .43rem 0;
            overflow-y: scroll;
            height: 100%;
            width: 100%;
            li{
                width: 39.4%;
                margin-top: .69rem;
                height: 2.4rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                border: 1px solid #07A695;
                justify-content: space-around;
                span{
                    font-size: .28rem;
                    color: #07A695;
                    font-family: Microsoft;
                }
            }
            .equipment{img{width:1.23rem; height:1.24rem;}}
            .contract{img{width: 1.19rem; height: 1.26rem;}}
            .schedule{img{width: .93rem; height: 1.23rem;}}
            .lookReport{ img{ width: 1.16rem; height: 1.32rem;}}
           
        }
    }
}
</style>