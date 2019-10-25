<template>
    <div class="MaterialFlow margin_top body_main">
        <div class="measureFlow_title">
            <span>试验名称:</span>
            <span>{{equipmentDetailData.name}}</span>
        </div>
        <div class="measureFlow_list">
            <ul>
                <li class="show_box EnvironmentSetup" @click="goEnvironmentSetup()"><img src="../../../../assets/img/Testengineer/Flow/EnvironmentSetup.png" alt=""><span>试验环境搭建</span></li>
                <li class="show_box contract" @click="goStaffing()"><img src="../../../../assets/img/Testengineer/Flow/staffing.png" alt=""><span>试验员安排</span></li>
                <!-- <li class="show_box schedule" @click="goScheduleMeasuring()"><img src="../../../../assets/img/Testengineer/Flow/projectData.png" alt=""><span>上传项目数据</span></li> -->
                <li class="show_box lookReport" @click="goReportMeasuring()"><span :style="{color:equipmentDetailData.result == '不合格'?'#f10000':''}">{{equipmentDetailData.result}}</span><span>试验结果分析</span> </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:'MaterialFlow',
    data(){
        return{
            equipmentDetailData:{}
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'项目流程'});
        this.getTestengineer__myexperimentFlow()
    },
    methods:{
        goEnvironmentSetup(){
            this.$router.push({name:'EnvironmentSetup', query:{projectID : this.$route.query.projectID}})
        },
        goStaffing(){
            this.$router.push({name:'Staffing', query:{projectID : this.$route.query.projectID}});
        },
        goReportMeasuring(){
            this.$router.push({name:'reportMeasuring'});
        },
        getTestengineer__myexperimentFlow(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getTestengineer__myexperimentFlow + this.$route.query.projectID + '/').then( res =>{
                this.$vux.loading.hide();
                this.equipmentDetailData = res.data;
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            }) 
        }
    }
}
</script>
<style lang="scss" scoped>
.MaterialFlow{
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
            .EnvironmentSetup{img{width:1.74rem; height:1.12rem;margin-left: .5rem; }}
            .contract{img{width: 1.15rem; height: 1.27rem;}}
            .schedule{img{width: 1.32rem; height: .98rem;}}
            .lookReport{ img{ width: 1.16rem; height: 1.32rem;}}
           
        }
    }
}
</style>