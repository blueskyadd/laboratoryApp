<template>
    <home-index>
        <template>
            <div class="section_datalist" v-if="isLabmanage_systemNumber">
                <div class="show_box divNumber toplist" @click="goTaskAllocation()">
                    <div><img src="../../../assets/img/LabManager/index/task.png" alt=""><span>任务分配</span></div>
                    <div class="number"><countup :start-val="0" :end-val="Labmanage_systemNumber.allocation" :duration="1" class="text_number_terxt"></countup><span>份</span></div>
                </div>
                <div class="show_box toplist img_text" @click="goManagementIssue()"><img src="../../../assets/img/LabManager/index/manage.png" alt=""><span>管理事项</span></div>
                <div class="show_box divNumber toplist">
                    <div><img src="../../../assets/img/LabManager/index/task.png" alt=""><span>任务审核</span></div>
                    <div class="number" @click="goTaskManageIndex()"><countup :start-val="0" :end-val="Labmanage_systemNumber.audit" :duration="1" class="text_number_terxt"></countup><span>台</span></div>
                </div>
                <div class="show_box toplist img_text information" @click="goInfoIssueIndex()"><img src="../../../assets/img/LabManager/index/information.png" alt=""><span>信息发布</span></div>
            </div>
        </template>
    </home-index>
</template>
<script>
import homeIndex from '../../../components/homeIndex'
import { Countup} from 'vux'
export default {
    name:'LabManagerIndex',
    components:{Countup, homeIndex},
    data(){
        return{
            Labmanage_systemNumber:{},
            isLabmanage_systemNumber:false
        }
    },

    methods:{
        goTaskAllocation(){
            this.$router.push({name:'taskAllocation'})
        },
        goManagementIssue(){
            this.$router.push({name:'managementIssue'})
        },
        goTaskManageIndex(){
            this.$router.push({name:'TaskManageIndex'})
        },
        goInfoIssueIndex(){
            this.$router.push({name:'InfoIssueIndex'})
        },
        /**@name 审核个数 */
        getLabmanage_systemNumber(){
            this.$http.get(this.$conf.env.getLabmanage_systemNumber).then( res =>{
                this.Labmanage_systemNumber = res.data;
                this.isLabmanage_systemNumber = true;
                this.$vux.loading.hide()
            }).catch(err =>{
                this.$vux.loading.hide()
                this.isLabmanage_systemNumber = true;
                this.Labmanage_systemNumber = {allocation:0,audit:0}
                this.$vux.toast.text(err.response?err.response.data:'服务器错误')
            })
        }
    },
    computed:{
        
    },
    mounted(){
        this.$emit('setIndexHeaderTitle',{flag:true,title: '您好，实验室管理员!'})
        this.$vux.loading.show()
        this.getLabmanage_systemNumber();//审核个数
    },
    destroyed(){
        this.$emit('setHeaderShow', {blod:false,title:''})
    }
}
</script>
<style lang="scss" scoped>
.LabManager_LabManagerIndex{
  
}
</style>