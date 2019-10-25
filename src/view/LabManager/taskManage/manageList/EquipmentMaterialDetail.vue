
<template>
<equipment-detail ref='equipmentDetail' @setButton='setLabmanage_material_applicationDetail' :isShowfooter='true'>
    <template>
        <ul>
            <li><span>物料编号：</span><span>{{equipmentDetailData.nateriel_num}}</span></li>
            <li><span>物料名称：</span><span>{{equipmentDetailData.name}}</span></li>
            <li><span>物料数量：</span><span>{{equipmentDetailData.num}}</span></li>
            <li><span>物料单位：</span><span>{{equipmentDetailData.unit}}</span></li>
            <li><span>申请时间：</span><span>{{equipmentDetailData.create_time}}</span></li>
            <li><span>申请原因：</span><span>{{equipmentDetailData.cause}}</span></li>
        </ul>
    </template>
</equipment-detail>
</template>
<script>
import equipmentDetail from './equipmentDetail'
export default {
    name:'EquipmentMaterialDetail',
    components:{equipmentDetail},
    data(){
        return{
            // titleName:'',
            judgeFlage:'',
            equipmentDetailData:{}
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true, title: this.$refs.equipmentDetail.titleName});
        this.getLabmanage_material_applicationDetail();
    },
    methods:{
        getLabmanage_material_applicationDetail(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getLabmanage_material_applicationDetail + this.$route.query.projectID + '/').then(res =>{
                this.equipmentDetailData = res.data;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            }) 
        },
        setLabmanage_material_applicationDetail(flag){
            this.$vux.loading.show();
            this.$http.put(this.$conf.env.setLabmanage_material_applicationDetail + this.$route.query.projectID + '/',{'status':flag?2:0}).then(res =>{
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

</style>