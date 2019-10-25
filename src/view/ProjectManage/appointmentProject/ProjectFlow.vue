<template>
    <div class="ProjectFlow margin_top body_main">
        <div class="ProjectFlow_title">
            <span>项目名称:</span>
            <span>{{equipmentDetailData.name}}</span>
        </div>
        <div class="ProjectFlow_list">
            <ul>
                <li class="show_box equipment" @click="goTestManage()"><img src="../../../assets/img/ProjectManager/projectFlow/testManage.png" alt=""><span>试验管理</span></li>
                <li class="show_box schedule" @click="goProjectScheduleTest()"><img src="../../../assets/img/gauger/flow/schedule.png" alt=""><span>试验进度</span></li>
                <li class="show_box lookReport" @click="goProdectInterior()"><img src="../../../assets/img/ProjectManager/projectFlow/interior.png" alt=""><span>预约内部试验</span></li>
                <li class="show_box lookReport" @click="goLookReportDetail()"><img src="../../../assets/img/gauger/flow/lookReport.png" alt=""><span>试验报告</span></li>

            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:'ProjectFlow',
    data() {
        return {
            equipmentDetailData:{}
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'项目流程'});
        this.setProjectManage_appointinfo()
    },
    methods:{
        goTestManage(){
            this.$router.push({name:'TestManage',query:{projectID:this.$route.query.projectID,projectNum:this.$route.query.projectNum,projectName:this.$route.query.projectName}})
        },
        goProjectScheduleTest(){
            this.$router.push({name:'ProjectScheduleTest',query:{projectID:this.$route.query.projectID,projectNum:this.$route.query.projectNum,projectName:this.$route.query.projectName}});
        },
        goProdectInterior(){
            this.$router.push({name:'ProdectInterior',query:{projectID:this.$route.query.projectID}});
        },
        goLookReportDetail(){
            this.$router.push({name:'LookReportDetail',query:{projectID:this.$route.query.projectID}});
        },
        setProjectManage_appointinfo(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.setProjectManage_appointinfo + this.$route.query.projectID + '/').then(res =>{
                
                this.equipmentDetailData = res.data;
                this.$vux.loading.hide();
            }).catch(err =>{
                console.log(err)
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.ProjectFlow{
    background: #fff;
    height: calc(100% - 1.08rem);
    padding: 0 .3rem;
    overflow: hidden;
    .ProjectFlow_title{
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
    .ProjectFlow_list{
        height: calc(100% - 10%);
        overflow: scroll;
        ul{
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            padding: 1.25rem .43rem 0;
            overflow-y: scroll;
            // height: 100%;
            width: 100%;
            li{
                width: 39.4%;
                height: 2.4rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                border: 1px solid #07A695;
                justify-content: space-around;
                margin-bottom: .6rem;
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
    .ProjectFlow_list::-webkit-scrollbar{
        display: none;
    }
}
</style>