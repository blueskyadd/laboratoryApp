<template>
    <home-index>
        <template>
            <div class="section_datalist gauger_gaugerIndex" v-if="isCenterMeasurement">
                <div class="show_box divNumber toplist" @click="goOverdueEquilpment()">
                    <div><img src="../../../assets/img/LabManager/index/task.png" alt=""><span>已过计量期设备数</span></div>
                    <div class="number"><countup :start-val="0" :end-val="CenterMeasurement.num1" :duration="1" class="text_number_terxt"></countup><span>台</span></div>
                </div>
                <div class="show_box divNumber toplist" @click="goPrincipalEquipment()">
                    <div><img src="../../../assets/img/LabManager/index/task.png" alt=""><span>负责计量设备数</span></div>
                    <div class="number"><countup :start-val="0" :end-val="CenterMeasurement.num2" :duration="1" class="text_number_terxt"></countup><span>台</span></div>
                </div>
                <div class="show_box divNumber toplist moreText" @click="goOnMeasurementEquipment()">
                    <div><img src="../../../assets/img/LabManager/index/task.png" alt=""><span>30天未计量设备asd数</span></div>
                    <div  class="number"><countup :start-val="0" :end-val="CenterMeasurement.num3" :duration="1" class="text_number_terxt"></countup><span>台</span></div>
                </div>
                <div class="show_box toplist img_text" @click="goCenterMeasurement()"><img src="../../../assets/img/LabManager/index/manage.png" alt=""><span>计量中设备进度</span></div>
                
                <!-- <div class="show_box toplist img_text information" @click="goQRcodeIndex()"><img src="../../../assets/img/equipment/index/scan.png" alt=""><span>扫一扫</span></div> -->
            </div>
        </template>
    </home-index>
</template>
<script>
import homeIndex from '../../../components/homeIndex'
import { Countup} from 'vux'
export default {
    name:'gaugerIndex',
    components:{Countup, homeIndex},
    data(){
        return{
            isCenterMeasurement: false ,
            CenterMeasurement: {}
        }
    },

    methods:{
        goQRcodeIndex(){
            this.$router.push({name:'QRcodeIndex'})
        },
        goOverdueEquilpment(){
            this.$router.push({name:'overdueEquilpment'})
        },
        goPrincipalEquipment(){
            this.$router.push({name:'principalEquipment'})
        },
        goOnMeasurementEquipment(){
            this.$router.push({name:'noMeasurementEquipment'})
        },
        goCenterMeasurement(){
            this.$router.push({name:'centerMeasurement'})
        },
        /**@name 审核个数 */
        getGauger_systemNumber(){
            this.$http.get(this.$conf.env.getGauger_systemNumber).then( res =>{
                this.CenterMeasurement = res.data;
                this.isCenterMeasurement = true;
                this.$vux.loading.hide()
            }).catch(err =>{
                this.$vux.loading.hide()
                this.isCenterMeasurement = true;
                this.CenterMeasurement = {"num1": 0,"num2": 0,"num3": 0}
                this.$vux.toast.text(err.response?err.response.data:'服务器错误')
            })
        }
    },
    computed:{
    },
    mounted(){
        this.$emit('setIndexHeaderTitle',{flag:true,title: '您好，试验设备计量员!'})
        this.getGauger_systemNumber();
    },
    destroyed(){
        this.$emit('setHeaderShow', {blod:false,title:''})
    }
}
</script>
<style lang="scss">
.gauger_gaugerIndex{
    .moreText{
        div:first-child{
            // align-items: flex-start!important;
            margin-bottom: .14rem!important;
            span{
                text-align: left;
            }
        }
        .number{
            height: .8rem!important;
            margin-bottom: 0!important;
        }
    }
}
</style>