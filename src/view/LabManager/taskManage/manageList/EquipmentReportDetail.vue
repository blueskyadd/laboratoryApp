<template>
<equipment-detail ref='equipmentDetail' :isShowfooter='false' >
    <template>
        <ul>
            <li><span>项目结果：</span><span>{{equipmentDetail.report_result}}</span></li>
            <li><span>项目报告：</span><span><img src="../../../../assets/img/LabManager/TaskManageIndex/updataFile.png" alt=""></span></li>
            <li class="hint"><span>提示：项目报告请到电脑端查看</span></li>
        </ul>
    </template>
</equipment-detail>
</template>
<script>
import equipmentDetail from './equipmentDetail'
export default {
    name:'EquipmentReportDetail',
    components:{equipmentDetail},
    data(){
        return{
            titleName:'',
            judgeFlage:'',
            equipmentDetail:{}
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true, title: this.$refs.equipmentDetail.titleName});
        this.getLabmanage_projectreportDetail()
    },
    methods:{
        getLabmanage_projectreportDetail(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getLabmanage_projectreportDetail + this.$route.query.projectID + '/').then(res =>{
                this.equipmentDetail = res.data;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            }) 
        },
        
    }
    
}
</script>
<style lang="scss" scoped>
span{
    img{
        width: .49rem;
        height: .44rem;
    }
}
.hint{
    span{
        color: #07a695!important;
        font-size: .24rem!important;
    }
}
</style>