<template>
<equipment-detail ref='equipmentDetail' @setButton='setLabmanage_meteringDetail'  :isShowfooter='true'>
    <template>
        <ul>
            <li><span>设备名称：</span><span>{{equipmentDetailData.name}}</span></li>
            <li><span>设备编号：</span><span>{{equipmentDetailData.num}}</span></li>
            <li><span>计量开始时间：</span><span>{{equipmentDetailData.start_time}}</span></li>
            <li><span>计量截止时间：</span><span>{{equipmentDetailData.end_time}}</span></li>
            <li><span>计量原因：</span><span>{{equipmentDetailData.cause}}</span></li>
        </ul>
    </template>
</equipment-detail>
</template>
<script>
import equipmentDetail from './equipmentDetail'
export default {
    name:'EquipmentMeasureDetail',
    components:{equipmentDetail},
    data(){
        return{
            titleName:'',
            judgeFlage:'',
            equipmentDetailData:{}
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true, title: this.$refs.equipmentDetail.titleName})
        this.getLabmanage_meteringDetail()
    },
    methods:{
        getLabmanage_meteringDetail(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getLabmanage_meteringDetail + this.$route.query.projectID + '/').then(res =>{
                this.equipmentDetailData = res.data;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            }) 
        },
        setLabmanage_meteringDetail(flag){
            this.$vux.loading.show();
            this.$http.put(this.$conf.env.setLabmanage_meteringDetail + this.$route.query.projectID + '/',{'status':flag?2:3}).then(res =>{
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