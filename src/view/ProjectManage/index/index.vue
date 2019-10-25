<template>
    <home-index>
        <template>
            <div class="section_datalist"  v-if="isProjectManage_systemNumber">
                <div class="show_box divNumber toplist" @click="goTestStandard()">
                    <div><img src="../../../assets/img/ProjectManager/index/testStandard.png" alt=""><span>试验标准</span></div>
                    <div class="number"><countup :start-val="0" :end-val="ProjectManage_systemNumber.num1" :duration="1" class="text_number_terxt"></countup><span>份</span></div>
                </div>
                <div class="show_box divNumber toplist" @click="goHistoryProject()">
                    <div><img src="../../../assets/img/ProjectManager/index/historyProject.png" alt=""><span>历史项目</span></div>
                    <div class="number"><countup :start-val="0" :end-val="ProjectManage_systemNumber.num3" :duration="1" class="text_number_terxt"></countup><span>项</span></div>
                </div>
                <div class="show_box divNumber toplist" @click="goAppointmentProject()">
                    <div><img src="../../../assets/img/equipment/index/principal.png" alt=""><span>预约项目</span></div>
                    <div class="number"><countup :start-val="0" :end-val="ProjectManage_systemNumber.num2" :duration="1" class="text_number_terxt"></countup><span>项</span></div>
                </div>
                <!-- <div class="show_box toplist img_text information" @click="goEstablishProject()"><img src="../../../assets/img/materialEngineer/index/materialAdd.png" alt=""><span>创建项目</span></div> -->
            </div>
        </template>
    </home-index>
</template>
<script>
import homeIndex from '../../../components/homeIndex'
import { Countup} from 'vux'
export default {
    name:'ProjectManageIndex',
    components:{Countup, homeIndex},
    data(){
        return{
            isProjectManage_systemNumber: false ,
            ProjectManage_systemNumber: {}
        }
    },

    methods:{
        goTestStandard(){
            this.$router.push({name:'TestStandard'})
        },
        goHistoryProject(){
            this.$router.push({name:'HistoryProject'})
        },
        goAppointmentProject(){
            this.$router.push({name:'AppointmentProject'})
        },
        goEstablishProject(){
            this.$router.push({name:'EstablishProject'})
        },
        getProjectManage_systemNumber(){
            this.$http.get(this.$conf.env.getProjectManage_systemNumber).then( res =>{
                this.ProjectManage_systemNumber = res.data;
                this.$nextTick(()=>{
                    this.isProjectManage_systemNumber = true;
                })
                this.$vux.loading.hide()
            }).catch(err =>{
                this.$vux.loading.hide()
                this.isProjectManage_systemNumber = true;
                this.ProjectManage_systemNumber = {num1:0,num2:0,num3:0}
                this.$vux.toast.text(err.response?err.response.data:'服务器错误')
            })
        }
    },
    computed:{
    },
    mounted(){
        this.$emit('setIndexHeaderTitle',{flag:true,title: '您好，客户经理!'})
        this.getProjectManage_systemNumber();
    },
    destroyed(){
        this.$emit('setHeaderShow', {blod:false,title:''})
    }
}
</script>
<style lang="scss" scoped>
.Project_ProjectManageIndex{
  
}
</style>