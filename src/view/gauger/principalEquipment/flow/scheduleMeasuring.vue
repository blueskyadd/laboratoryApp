<template>
    <div class="scheduleMeasuring body_main">
            <ul class="equipmentInfo margin_bottom">
                <li  class="vux-1px-b">
                    <span >设备名称</span>
                    <span>{{equipmentDetailData.name}}</span>
                </li>
                <li  >
                    <span>设备编号</span>
                    <span>{{equipmentDetailData.num}}</span>
                </li>
            </ul>
            <ul class="equipmentInfo margin_bottom">
                <li  class="vux-1px-b">
                    <span >委托公司</span>
                    <span>{{equipmentDetailData.nominee_company}}</span>
                </li>
                <li  class="vux-1px-b">
                    <span>委托公司地址</span>
                    <span>{{equipmentDetailData.address}}</span>
                </li>
                 <li >
                    <span>委外负责人</span>
                    <span>{{equipmentDetailData.leader}}</span>
                </li>
            </ul>
            <ul class="equipmentInfo  ">
                <li class="phone">
                    <span>联系电话</span>
                    <span><a :href="'tel:'+equipmentDetailData.phone">{{equipmentDetailData.phone}}</a></span>
                </li>
            </ul>
    </div>
</template>
<script>
export default {
    name:'scheduleMeasuring',
    data(){
        return{
            equipmentDetailData:{}
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title: '计量进度'});
        this.getGauger_setHeaderDetail()
    },
    methods:{
        getGauger_setHeaderDetail(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getGauger_setHeaderDetail + this.$route.query.projectID + '/').then(res =>{
                this.equipmentDetailData = res.data;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            }) 
        }
    }
}
</script>
<style lang="scss" >
.scheduleMeasuring{
        .equipmentInfo{
            overflow: hidden;
            padding-left: .3rem;
            background: #fff;
        li{
            height: .87rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size:.28rem;
            font-family:simhei;
            font-weight:400;
            color:rgba(51,51,51,1);
            padding-right: .3rem;
            span:last-child{
                max-width: 5rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .phone{
            span:last-child a{
                    color: #07A695 !important;
            }
        }
    }
}
</style>