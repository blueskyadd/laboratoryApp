<template>
    <home-index>
        <template>
            <div class="section_datalist Equipmentengineer_EquipmentengineerIndex" v-if="isEquipmentengineer_systemNumber">
                <div class="show_box divNumber toplist" @click="goFailureEquipmentManage()">
                    <div><img src="../../../assets/img/equipment/index/malfunction.png" alt=""><span>故障</span></div>
                    <div class="number"><countup :start-val="0" :end-val="Equipmentengineer_systemNumber.num1" :duration="1" class="text_number_terxt"></countup><span>台</span></div>
                </div>
                <div class="show_box divNumber toplist" @click="goMaintainEquipmentManage()">
                    <div><img src="../../../assets/img/equipment/index/maintain.png" alt=""><span>保养</span></div>
                    <div class="number"><countup :start-val="0" :end-val="Equipmentengineer_systemNumber.num2" :duration="1" class="text_number_terxt"></countup><span>台</span></div>
                </div>
                <div class="show_box divNumber toplist moreText" @click="goPrincipalEquipmentManage()">
                    <div><img src="../../../assets/img/equipment/index/principal.png" alt=""><span>负责设备数</span></div>
                    <div  class="number"><countup :start-val="0" :end-val="Equipmentengineer_systemNumber.num3" :duration="1" class="text_number_terxt"></countup><span>台</span></div>
                </div>
                <!-- <div class="show_box divNumber toplist moreText" @click="goInfrastructure()">
                    <div><img src="../../../assets/img/equipment/index/malfunction.png" alt=""><span>基础设施管理</span></div>
                    <div  class="number"><countup :start-val="0" :end-val="Equipmentengineer_systemNumber.num7" :duration="1" class="text_number_terxt"></countup><span>份</span></div>
                </div> -->
                <div class="show_box divNumber toplist moreText" @click="goFrockManage()">
                    <div><img src="../../../assets/img/equipment/index/frock.png" alt=""><span>工装治具</span></div>
                    <div  class="number"><countup :start-val="0" :end-val="Equipmentengineer_systemNumber.num4" :duration="1" class="text_number_terxt"></countup><span>个</span></div>
                </div>
                <div class="show_box divNumber toplist moreText" @click="goGuidanceManage()">
                    <div><img src="../../../assets/img/equipment/index/guidance.png" alt=""><span>设备人员安全指导书</span></div>
                    <div  class="number"><countup :start-val="0" :end-val="Equipmentengineer_systemNumber.num5" :duration="1" class="text_number_terxt"></countup><span>册</span></div>
                </div>
                <div class="show_box divNumber toplist moreText" @click="goEquipmentRegulation()">
                    <div><img src="../../../assets/img/equipment/index/guidance.png" alt=""><span>设备操作指导书</span></div>
                    <div  class="number"><countup :start-val="0" :end-val="Equipmentengineer_systemNumber.num6" :duration="1" class="text_number_terxt"></countup><span>册</span></div>
                </div>
                <!-- <div class="show_box toplist img_text information" @click="goQRcodeIndex()"><img src="../../../assets/img/equipment/index/scan.png" alt=""><span>扫一扫</span></div> -->
            </div>
        </template>
    </home-index>
</template>
<script>
import homeIndex from '../../../components/homeIndex'
import { Countup} from 'vux'
export default {
    name:'EquipmentengineerIndex',
    components:{Countup, homeIndex},
    data(){
        return{
            isEquipmentengineer_systemNumber: false ,
            Equipmentengineer_systemNumber: {}
        }
    },

    methods:{
        goFailureEquipmentManage(){
            this.$router.push({name:'failureEquipmentManage'})
        },
        goMaintainEquipmentManage(){
            this.$router.push({name:'maintainEquipmentManage'})
        },
        goPrincipalEquipmentManage(){
            this.$router.push({name:'principalEquipmentManage'})
        },
        goInfrastructure(){
            this.$router.push({name:'infrastructure'})
        },
        goFrockManage(){
            this.$router.push({name:'frockManage'})
        },
        goGuidanceManage(){
            this.$router.push({name:'guidanceManage'})
        },
        goEquipmentRegulation(){
            this.$router.push({name:'equipmentRegulation'})
        },
        goQRcodeIndex(){
            this.$router.push({name:'QRcodeIndex'})
        },
        getEquipmentengineer_systemNumber(){
            this.$http.get(this.$conf.env.getEquipmentengineer_systemNumber).then( res =>{
                this.Equipmentengineer_systemNumber = res.data;
                this.isEquipmentengineer_systemNumber = true;
                this.$vux.loading.hide()
            }).catch(err =>{
                this.$vux.loading.hide()
                this.isEquipmentengineer_systemNumber = true;
                this.Equipmentengineer_systemNumber = {allocation:0,audit:0}
                this.$vux.toast.text(err.response?err.response.data:'服务器错误')
            })
        }
    },
    computed:{
    },
    mounted(){
        this.$emit('setIndexHeaderTitle',{flag:true,title: '您好，试验设备工程师!'})
        this.getEquipmentengineer_systemNumber()
    },
    destroyed(){
        this.$emit('setHeaderShow', {blod:false,title:''})
    }
}
</script>
<style lang="scss">
.Equipmentengineer_EquipmentengineerIndex{
    
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