<template>
<equipment-detail ref='equipmentDetail' @setButton='setLabmanage_testwayDetail'    :isShowfooter='true'>
    <template>
        <ul>
            <li class="methods_name"><span>试验方法名称：</span><span>{{equipmentDetailData.name}}</span></li>
            <li><span>申请时间：</span><span>{{equipmentDetailData.create_time}}</span></li>
             <li><span>试验方法：</span><span><img src="../../../../assets/img/LabManager/TaskManageIndex/updataFile.png" alt=""></span></li>
            <li class="hint"><span>提示：试验方法请到电脑端查看</span></li>
        </ul>
    </template>
</equipment-detail>
</template>
<script>
import equipmentDetail from './equipmentDetail'
export default {
    name:'EquipmentTestMethodsDetail',
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
        this.getLabmanage_testwayDetail();
    },
    methods:{
        getLabmanage_testwayDetail(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getLabmanage_testwayDetail + this.$route.query.projectID + '/').then(res =>{
                this.equipmentDetailData = res.data;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            }) 
        },
        setLabmanage_testwayDetail(flag){
            this.$vux.loading.show();
            this.$http.put(this.$conf.env.setLabmanage_testwayDetail + this.$route.query.projectID + '/',{'status':flag?2:3}).then(res =>{
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
                console.log(err)
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            }) 
        }
    }
    
}
</script>
<style lang="scss" scoped>
.methods_name{
    span{
        color: #07a685!important;
    }
}
.lookfile{
        span:last-child{
            text-decoration: underline;
        }
    }
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