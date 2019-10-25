<template>
    <home-index>
        <template>
            <div class="section_datalist"  v-if="isTestengineer__systemNumber">
                <div class="show_box divNumber toplist" @click="goTestStandardIndex()">
                    <div><img src="../../../assets/img/Testengineer/index/standard.png" alt=""><span>试验标准</span></div>
                    <div class="number"><countup :start-val="0" :end-val="Testengineer__systemNumber.num5" :duration="1" class="text_number_terxt"></countup><span>份</span></div>
                </div>
                <div class="show_box divNumber toplist" @click="goTestComplete()">
                    <div><img src="../../../assets/img/Testengineer/index/complete.png" alt=""><span>已完成试验任务</span></div>
                    <div class="number"><countup :start-val="0" :end-val="Testengineer__systemNumber.num1" :duration="1" class="text_number_terxt"></countup><span>个</span></div>
                </div>
                <div class="show_box divNumber toplist" @click="goTestUnComplete()">
                    <div><img src="../../../assets/img/Testengineer/index/unComplete.png" alt=""><span>未完成试验任务</span></div>
                    <div class="number"><countup :start-val="0" :end-val="Testengineer__systemNumber.num2" :duration="1" class="text_number_terxt"></countup><span>个</span></div>
                </div>
                <div class="show_box divNumber toplist" @click="goMalfunction()">
                    <div><img src="../../../assets/img/equipment/index/malfunction.png" alt=""><span>报警日志</span></div>
                    <div class="number"><countup :start-val="0" :end-val="Testengineer__systemNumber.num7" :duration="1" class="text_number_terxt"></countup><span>份</span></div>
                </div>
                <div class="show_box divNumber toplist" @click="goTestMethods()">
                    <div><img src="../../../assets/img/Testengineer/index/methods.png" alt=""><span>试验方法</span></div>
                    <div class="number"><countup :start-val="0" :end-val="Testengineer__systemNumber.num6" :duration="1" class="text_number_terxt"></countup><span>份</span></div>
                </div>
                 <div class="show_box divNumber toplist" @click="goWatchManage()">
                    <div><img src="../../../assets/img/Testengineer/index/watch.png" alt=""><span>值班天数</span></div>
                    <div class="number"><countup :start-val="0" :end-val="Testengineer__systemNumber.num4" :duration="1" class="text_number_terxt"></countup><span>天</span></div>
                </div>
                <div class="show_box divNumber toplist" @click="goTeatTheImport()">
                    <div><img src="../../../assets/img/Testengineer/index/theImport.png" alt=""><span>试验方法导入贡献数</span></div>
                    <div class="number"><countup :start-val="0" :end-val="Testengineer__systemNumber.num8" :duration="1" class="text_number_terxt"></countup><span>份</span></div>
                </div>
                <div class="show_box divNumber toplist" @click="goTestCultivate()">
                    <div><img src="../../../assets/img/Testengineer/index/cultivate.png" alt=""><span>已培养人数</span></div>
                    <div class="number"><countup :start-val="0" :end-val="Testengineer__systemNumber.num3" :duration="1" class="text_number_terxt"></countup><span>个</span></div>
                </div>
                <!-- <div class="show_box divNumber toplist" @click="goAllocationMaterial()">
                    <div><img src="../../../assets/img/Testengineer/index/workingHours.png" alt=""><span>试验工时统计</span></div>
                    <div class="number"><countup :start-val="0" :end-val="Testengineer__systemNumber.num1" :duration="1" class="text_number_terxt"></countup><span>h</span></div>
                </div> -->
            </div>
        </template>
    </home-index>
</template>
<script>
import homeIndex from '../../../components/homeIndex'
import { Countup} from 'vux'
export default {
    name:'TestengineerIndex',
    components:{Countup, homeIndex},
    data(){
        return{
            isTestengineer__systemNumber: false ,
            Testengineer__systemNumber: {}
        }
    },
    methods:{
        goTestStandardIndex(){
            this.$router.push({name:'TestStandardIndex'})
        },
        goTestComplete(){
            this.$router.push({name:'TestComplete'})
        },
        goTestUnComplete(){
            this.$router.push({name:'TestUnComplete'})
        },
        goMalfunction(){
            this.$router.push({name:'Malfunction'})
        },
        goTestMethods(){
            this.$router.push({name:'TestMethods'})
        },
        goWatchManage(){
            this.$router.push({name:'WatchManage'})
        },
        goTeatTheImport(){
            this.$router.push({name:'TeatTheImport'})
        },
        goTestCultivate(){
            this.$router.push({name:'TestCultivate'})
        },
        getTestengineer__systemNumber(){
            this.$http.get(this.$conf.env.getTestengineer__systemNumber).then( res =>{
                this.Testengineer__systemNumber = res.data;
                this.isTestengineer__systemNumber = true;
                this.$vux.loading.hide()
            }).catch(err =>{
                this.$vux.loading.hide()
                this.isTestengineer__systemNumber = true;
                this.Testengineer__systemNumber = {"num1": 0,"num2": 0,"num3": 0}
                this.$vux.toast.text(err.response?err.response.data:'服务器错误')
            })
        }
    },
    computed:{
    },
    mounted(){
        this.$emit('setIndexHeaderTitle',{flag:true,title: '您好，试验工程师!'})
        this.getTestengineer__systemNumber()
    },
    destroyed(){
        this.$emit('setHeaderShow', {blod:false,title:''})
    }
}
</script>
<style lang="scss" scoped>
.Project_TestengineerIndex{
  
}
</style>