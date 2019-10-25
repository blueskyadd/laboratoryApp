
<template>
<equipment-detail ref='equipmentDetail' @setButton='setLabmanage_frockapplyDetail' :isShowfooter='true'>
    <template>
        <ul>
            <li><span>设备名称：</span><span>{{equipmentDetailData.name}}</span></li>
            <li><span>申请时间：</span><span>{{equipmentDetailData.create_time}}</span></li>
            <li><span>申请原因：</span><span>{{equipmentDetailData.cause}}</span></li>
            <li><span>工装文件：</span><span><img src="../../../../assets/img/LabManager/TaskManageIndex/updataFile.png" alt=""></span></li>
            <li class="hint"><span>提示：工装文件请到电脑端查看</span></li>
        </ul>
    </template>
</equipment-detail>
</template>
<script>
import equipmentDetail from './equipmentDetail'
export default {
    name:'EquipmentFrockApplyDetail',
    components:{equipmentDetail},
    data(){
        return{
            titleName:'',
            judgeFlage:'',
            equipmentDetailData:{}
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true, title: this.$refs.equipmentDetail.titleName});
        this.getLabmanage_frockapplyDetail()
    },
    methods:{
        getLabmanage_frockapplyDetail(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getLabmanage_frockapplyDetail + this.$route.query.projectID + '/').then(res =>{
                this.equipmentDetailData = res.data;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            }) 
        },
        setLabmanage_frockapplyDetail(flag){
            this.$vux.loading.show();
            this.$http.put(this.$conf.env.setLabmanage_frockapplyDetail + this.$route.query.projectID + '/',{'status':flag?2:0}).then(res =>{
                if(res.status == '200'){
                    this.$vux.toast.text('提交成功');     
                    setTimeout(()=>{
                        this.$router.back();
                    },100)
                }else{
                    this.$vux.toast.text('提交失败');           
                }
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        }
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