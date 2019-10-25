<template>
<equipment-detail ref='equipmentDetail'  @setButton='setLabmanage_ondutyDetail'  :isShowfooter='true'>
    <template>
        <ul>
            <li><span>员工姓名：</span><span>{{equipmentDetailData.name}}</span></li>
            <li><span>员工工号：</span><span>{{equipmentDetailData.job_num}}</span></li>
            <li><span>值班开始时间：</span><span>{{equipmentDetailData.start_time}}</span></li>
            <li><span>值班结束时间：</span><span>{{equipmentDetailData.end_time}}</span></li>
            <li><span>值班地点：</span><span>{{equipmentDetailData.location}}</span></li>
            <li><span >申请原因：</span><span>{{equipmentDetailData.cause}}</span></li>
        </ul>
    </template>
</equipment-detail>
</template>
<script>
import equipmentDetail from './equipmentDetail'
export default {
    name:'EquipmentWatchDetail',
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
        this.getLabmanage_ondutyDetail()
    },
    methods:{
        getLabmanage_ondutyDetail(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getLabmanage_ondutyDetail + this.$route.query.projectID + '/').then(res =>{
                this.equipmentDetailData = res.data;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            }) 
        },
        setLabmanage_ondutyDetail(flag){
            this.$vux.loading.show();
            this.$http.put(this.$conf.env.setLabmanage_ondutyDetail + this.$route.query.projectID + '/',{'status':flag?3:2}).then(res =>{
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