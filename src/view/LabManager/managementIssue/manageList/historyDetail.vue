<template>
    <div class="EquipmenthistoryDetail body_main">
        <div class="main">
            <div class="textarea">
                <div>{{equipmentDetail.intro}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'EquipmenthistoryDetail',
    data(){
        return{
            equipmentDetail:{}
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'项目介绍'});
        this.getLabmanage_finishprojectDetail()
    },  
    methods:{
        getLabmanage_finishprojectDetail(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getLabmanage_finishprojectDetail + this.$route.query.projectID + '/').then(res =>{
                this.equipmentDetail = res.data;
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
.EquipmenthistoryDetail{
    background: #fff;
    .main{
        padding: .25rem .3rem 0;
        height: 100%;
        h3{
            font-size: .26rem;
            color: #07a695;
            text-align: left;
            padding-bottom: .26rem;
        }
        .textarea{
            width: 100%;
            height: 100%;
            font-size: .24rem;
            padding: .24rem;
            border-radius: .05rem;
            overflow: hidden;
            div{
                height: 100%;
                overflow-y: scroll;
                text-align: left;
            }
        }
    }
    
}
</style>