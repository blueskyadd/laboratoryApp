<template>
  <div class="TestManagerIndex body_main">
      <!-- 设备保养率 -->
      <div class="TestManagerIndex-equipmeny TestManagerIndex-equipmeny-maintain show_box margin_bottom">
          <div id="myChart" class="TestManagerIndex-echars" :style="{width: '100%', height: '3.44rem'}"></div>
      </div>
      <!-- 设备维修率 -->
      <div class="TestManagerIndex-equipmeny TestManagerIndex-equipmeny-service show_box margin_bottom">
          <div id="myChartTwo" class="TestManagerIndex-echars" :style="{width: '100%', height: '3.5rem'}"></div>
      </div>
      <!-- 滚动公告 -->
      <div class="LabManager_inform show_box">
            <span class="LabManager_inform_title"><img src="../../../assets/img/testManage/index/newTestImg.png" alt=""></span>
            <marquee>
                <marquee-item v-for="item in asyncCount" :key="item.id" @click.native="onClick(i)" class="align-middle">
                    <i></i>
                    <p>{{item.content}}</p>
                </marquee-item>
            </marquee>
       </div>
       <!-- 数据列表 -->
       <div class="TestManageIndex-dataList section_datalist LabManager_myapply">
           <div class="section_datalist"  v-if="isTestManager_systemNumber">
               <div class="show_box divNumber toplist activeNumber" @click="goActivelyNumber()">
                    <div><img src="../../../assets/img/testManage/index/activeNumber.png" alt=""><span>活跃人数</span></div>
                    <div class="number"><countup :start-val="0" :end-val="TestManager_systemNumber.num1" :duration="1" class="text_number_terxt"></countup><span>人</span></div>
                </div>
                <div class="show_box divNumber toplist testSum" @click="goTestProject()">
                    <div><img src="../../../assets/img/testManage/index/testSum.png" alt=""><span>试验总数</span></div>
                    <div class="number"><countup :start-val="0" :end-val="TestManager_systemNumber.num2" :duration="1" class="text_number_terxt"></countup><span>个</span></div>
                </div>
                <div class="show_box divNumber toplist" @click="goTeststandArd()">
                    <div><img src="../../../assets/img/testManage/index/standArd.png" alt=""><span>试验标准</span></div>
                    <div class="number"><countup :start-val="0" :end-val="TestManager_systemNumber.num3" :duration="1" class="text_number_terxt"></countup><span>份</span></div>
                </div>
                <div class="show_box divNumber toplist testRecord" @click="goTestRecord()">
                    <div><img src="../../../assets/img/testManage/index/testRecord.png" alt=""><span>设备档案</span></div>
                    <div class="number"><countup :start-val="0" :end-val="TestManager_systemNumber.num4" :duration="1" class="text_number_terxt"></countup><span>份</span></div>
                </div>
                <div class="show_box divNumber toplist" @click="goTestEquipment()">
                    <div><img src="../../../assets/img/testManage/index/testEquipment.png" alt=""><span style="padding-top:0;">实验室设备运行率</span></div>
                    <div class="efficient_data">
                        <div class="circle">
                            <img :style="{'transform': changeRotate(toPoint(TestManager_systemNumber.num7)/100)}" src="../../../assets/img/LabManager/index/pointer.png" alt="">
                        </div>
                            <span>{{(toPoint(TestManager_systemNumber.num7))}}%</span>
                    </div>
                </div>
                <div class="show_box divNumber toplist testEquipment" @click="goTestInventory()">
                    <div><img src="../../../assets/img/testManage/index/testEquipment.png" alt=""><span style="padding-top:0;">物料安全库存率</span></div>
                    <div class="efficient_data">
                        <div class="circle">
                            <img :style="{'transform': changeRotate(toPoint(TestManager_systemNumber.num8)/100)}" src="../../../assets/img/LabManager/index/pointer.png" alt="">
                        </div>
                            <span>{{toPoint(TestManager_systemNumber.num8)}}%</span>
                    </div>
                </div>
                <div class="show_box divNumber toplist activeNumber" @click="goTestReport()">
                    <div><img src="../../../assets/img/testManage/index/testReport.png" alt=""><span style="padding-top:0;">测试报告档案室</span></div>
                    <div class="number"><countup :start-val="0" :end-val="TestManager_systemNumber.num6" :duration="1" class="text_number_terxt"></countup><span>份</span></div>
                </div>
                <div class="show_box divNumber toplist testSum" @click="goAlarmlog()">
                    <div><img src="../../../assets/img/testManage/index/AlarmLog.png" alt=""><span>报警日志</span></div>
                    <div class="number"><countup :start-val="0" :end-val="TestManager_systemNumber.num5" :duration="1" class="text_number_terxt"></countup><span>份</span></div>
                </div>
           </div>
        </div>
  </div>
</template>

<script>
import {Marquee, MarqueeItem, Countup} from 'vux';
import equipmentData from '../../../components/equipment_data';
export default {
    name:'TestManagerIndex',
    components: {Marquee, MarqueeItem, Countup, equipmentData},
    
    data(){
        this.chartSettings = {
            stack: { '用户': ['访问用户'] },
            area: true,
           
            
        }
        this.chartExtend = {
            itemGap:10,
            series: {
                smooth: false
            },
            
        };
        return{
            asyncCount: [],
            operating:.5,
            chartData: {
                columns: ['日期', '访问用户'],
                rows: [
                    { '日期': '1月', '访问用户': 1393,'下单率': 0.32 },
                    { '日期': '2月', '访问用户': 3530,'下单率': 0.26 },
                    { '日期': '3月', '访问用户': 2923,'下单率': 0.76 },
                    { '日期': '4月', '访问用户': 1723,'下单率': 0.49 },
                    { '日期': '5月', '访问用户': 3792,'下单率': 0.323 },
                    { '日期': '6月', '访问用户': 4593,'下单率': 0.78 }
                ]
            },
            isTestManager_systemNumber: false ,
            TestManager_systemNumber: {}
        }
    },
    computed:{
        
    },
    mounted(){
        this.$emit('setIndexHeaderTitle',{flag:true,title: '您好，实验室经理!'});
        this.getTestManager_systemNumber();//顶部数据统计
        this.getSystem_info();//公告栏
        this.getTestManager_systemRate();//设备维修保养率
    },
    methods:{
        goActivelyNumber(){
            this.$router.push({name:'ActivelyNumber'})
        },
        goTestProject(){
            this.$router.push({name:'TestProject'})
        },
        goTeststandArd(){
            this.$router.push({name:'TeststandArd'})
        },
        goTestRecord(){
            this.$router.push({name:'TestRecord'})
        },
        goTestEquipment(){
            this.$router.push({name:'TestEquipment'})
        },
        goTestInventory(){
            this.$router.push({name:'TestInventory'})
        },
        goTestReport(){
            this.$router.push({name:'TestReport'})
        },
        goAlarmlog(){
            this.$router.push({name:'Alarmlog'})
        },
        changeRotate(operating){
            if(operating == 0){
                return 'rotate(-140deg)'
            }else if(operating == 1 ){
                return 'rotate(38deg)'
            }else{
                return 'rotate('+ (1-operating-0.1 ) * -120 + 'deg)'
            }
        },
        drawLine(ArrFrom){
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月','10月'],
                    axisLine:{
                        
                        lineStyle:{
                            color:'#999',
                        }
                    },
                    axisTick:{
                        show:false
                    }
                },
                yAxis: {
                    type: 'value',
                    interval:20,
                    splitNumber : 5,
                    min:0,
                    axisLabel:{
                       show: true,  
                        interval: 'auto',  
                        formatter: '{value} %',
                        margin:1
                    },
                    axisLine:{
                        show: false,
                        lineStyle:{
                            color:'#999',
                        }   
                    },
                    axisTick:{
                        show:false
                    },
                },
                grid:[{
                    left:35,
                    x:25,
                    y:40,
                    y2:40,
                    tooltip:{
                        show:true,
                        padding:1, 
                    },
                }],
                title:{
                    text:'实验室设备保养率',
                    padding:0,
                    textStyle:{ fontFamily: 'simhei', fontSize: 20,  fontStyle: 'normal', fontWeight: '400',},
                },
                series: [{
                    data: ArrFrom,
                    type: 'line',
                    itemStyle:{
                        normal:{
                            color:"#00A5AF",
                            lineStyle:{
                                width:1,//折线宽度
                                color:"#7ed8d5"//折线颜色
                            }
                        },
                    },
                    smooth : false,
                    symbol: 'none',
                    areaStyle: {
                        normal: {
                            color: new this.$echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#dbfae9'},
                                    {offset: 1, color: '#fff'}
                                ]
                            )
                        }
                    }
                }]
            });
        },
        drawLineTwo(ArrFrom){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChartTwo'))
                // 绘制图表
                myChart.setOption({
                    xAxis: {
                        type: 'category',
                        boundaryGap: true,
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月','10月'],
                        axisLine:{
                            lineStyle:{
                                color:'#999',
                            }
                        },
                        axisTick:{
                            show:false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        interval:20,
                        splitNumber : 5,
                        min:0,
                        axisLabel:{
                            show: true,  
                            interval: 'auto',  
                            formatter: '{value} %',
                            margin:1
                        },
                        axisLine:{
                            show: false,
                            lineStyle:{
                                color:'#999',
                            }   
                        },
                        axisTick:{
                            show:false
                        },
                    },
                    grid:[{
                        left:35,
                        x:25,
                        y:40,
                        y2:40,
                        tooltip:{
                            show:true,
                            padding:1, 
                        },
                    }],
                    title:{
                        text:'实验室设备维修率',
                        padding:0,
                        textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                            fontFamily: 'simhei',
                            fontSize: 20,
                            fontStyle: 'normal',
                            fontWeight: '400',
                        },
                    },
                    series: [{
                        data: ArrFrom,
                        type: 'line',
                        itemStyle:{
                            normal:{
                                color:"#00A5AF",
                                lineStyle:{
                                    width:1,//折线宽度
                                    color:"#7ed8d5"//折线颜色
                                }
                            },
                        },
                        smooth : false,
                        symbol: 'none',
                        areaStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#dbfae9'},
                                        {offset: 1, color: '#fff'}
                                    ]
                                )
                            }
                        }
                    }]
                });
        },
        /**@name 设备维修保养率 */
        getTestManager_systemRate(){
            this.$vux.loading.show()
            this.$http.get(this.$conf.env.getTestManager_systemRate).then( res =>{
                var maintainList = [];var upkeepList = [];
                for(var Element in res.data.maintain){
                    maintainList.push(this.toPoint(res.data.maintain[Element]))
                }
                for(var Element in res.data.upkeep){
                    upkeepList.push(this.toPoint(res.data.upkeep[Element]))
                }
                this.drawLine(maintainList);
                this.drawLineTwo(upkeepList);
                this.$vux.loading.hide()
            }).catch(err =>{
                console.log(err)
                this.$vux.loading.hide()
                this.$vux.toast.text(err.response?err.response.data:'服务器错误')
            })
        },
        toPoint(data){
          if(data){
             return (data.replace("%", "")*1).toFixed(1);
          }else{
             return  0
          }
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
        getTestManager_systemNumber(){
            this.$http.get(this.$conf.env.getTestManager_systemNumber).then( res =>{
                this.TestManager_systemNumber = res.data;
                this.isTestManager_systemNumber = true;
                this.$vux.loading.hide()
            }).catch(err =>{
                this.$vux.loading.hide()
                this.isTestManager_systemNumber = true;
                this.TestManager_systemNumber = {"num1": 0,"num2": 0,"num3": 0}
                this.$vux.toast.text(err.response?err.response.data:'服务器错误')
            })
        }
    }
}
</script>

<style lang='scss' scoped>
.TestManagerIndex{
    padding: .1rem;
    //设备保养率
    .TestManagerIndex-equipmeny{
        height:3.5rem;
        width: 100%;
        background: #fff;
    }
    .TestManageIndex-dataList{
        .toplist{
            width: 23.9%;
            height: 2rem;
        }
        .toplist:nth-child(3n){
            margin-right: .1rem;
        }
        .toplist:nth-child(4n){
            margin-right: 0;
        }
        .text_number_terxt{
            line-height: .5rem!important;
        }
        .activeNumber{
            .text_number_terxt{
                color: #FF226B;
            }
        }
        .testSum{
            .text_number_terxt{
                color: #CC02CA;
            }
        }
        .testRecord{
            .text_number_terxt{
                color: #17C6B8;
            }
        }
        .testRecord{
            .text_number_terxt{
                color: #17C6B8;
            }
        }
        .efficient_data{
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                height: auto;
                padding-top: .2rem;
            .circle{
                width: .84rem;
                height: .72rem;
                display: flex;
                justify-content: center;
                align-items: flex-end;
                margin-bottom: 0;
                background: url('../../../assets/img/LabManager/index/annulus.png') 0 0 / 100% 100%;
                img{
                    transform: rotate(-134deg);
                    margin-left: 0.4rem;
                    transform-origin: 0 .27rem;
                    width: .37rem;
                    height: .27rem;
                }
            }
            .text_number{
                .text_number_terxt {
                    font-family:MFShangHei;
                    color: #7901dc;
                    font-size: 1.29rem;
                    margin: 0;
                    line-height: 1.29rem;
                }
            }
            span{
                font-size: .27rem;
                color: #7e0dde;
                font-weight: 700;
                margin-top: .1rem;
                padding-top: 0;
            }
        }
    }
    .testEquipment{
        .circle{
            background: url('../../../assets/img/testManage/index/annulusGreen.png') 0 0 / 100% 100% !important;
        }
        .efficient_data{
            span{
                color: #17C6B8!important;
            }
        }
    }
}
</style>