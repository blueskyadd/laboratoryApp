<template>
    <div class="AppointmentTestTime body_main">
        <div class="from">
            <ul class="equipmentInfo margin_bottom">
                <li class="vux-1px-b">
                    <span >项目名称</span>
                    <span>类型</span>
                </li>
                <li  class="vux-1px-b">
                    <span>试验名称</span>
                    <span>类型</span>
                </li>
                <li  class="vux-1px-b">
                    <span>分配时间</span>
                    <span>类型</span>
                </li>
                <li class="vux-1px-b">
                    <span>试验负责人</span>
                    <span>类型</span>
                </li>
                 <li>
                    <span>联系方式</span>
                    <span>类型</span>
                </li>
            </ul>
            
        </div>
    </div>
</template>
<script>
export default {
    name:'AppointmentTestTime',
    data(){
        return{
            startTime:'',
            startEnd: '',
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title: '预约信息'})
        console.log(this.$store.state.synopsis.synopsisText)
    },
    methods:{
        goMeasureFlow(){
            this.$router.push({name:'measureFlow'})
        }
    }
}
</script>
<style lang="scss" >
.AppointmentTestTime{
    .from{
        height: calc(100% - 1.3rem);
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
                SPAN:last-child{
                    max-width: 5.5rem;
                    text-align: right;
                }
            }
        }
        .equipmentFrom{
            padding-left: .3rem;
            background: #fff;
            li{
                height: .87rem;
                padding-right: .3rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            span{
                font-size:.28rem;
                font-family:simhei;
                font-weight:400;
            }
            div{
                display: flex;
                align-items: center;
                span{
                     max-width: 5rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
        p{
            font-size: .22rem;
            padding-left: .28rem;
            text-align: left;
            font-family:simhei;
            padding-top: .19rem;
            font-weight:400;
            color:rgba(7,166,149,1);
        }
    }
   

}
</style>