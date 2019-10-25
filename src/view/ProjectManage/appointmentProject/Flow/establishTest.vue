<template>
    <div class="EstablishTest body_main">
        <div class="from">
            <ul class="equipmentInfo margin_bottom">
                <li class="vux-1px-b">
                    <span >试验名称</span>
                    <input type="text" placeholder="请输入试验名称">
                </li>
                <li  class="vux-1px-b">
                    <span>试验编号</span>
                    <input type="text" placeholder="请输入试验编号">
                </li>
                <li  class="vux-1px-b">
                    <span>试验类型</span>
                    <span>类型</span>
                </li>
                <li  >
                    <span>试验周期</span>
                    <input type="text" placeholder="请输入试验周期">
                </li>
            </ul>
            <ul class="equipmentFrom">
                <li @click="$router.push({name:'Synopsis',params:{flag:'1'}})">
                    <span>试验简介</span>
                    <div>
                        <div class="weui-cell__ft"></div>
                    </div>
                </li>
            </ul>
            <p>提示：试验方法、试验样件、试验设备请去电脑端填写！</p>
        </div>
        <x-button type="primary">创建</x-button>
    </div>
</template>
<script>
import { XButton } from "vux";
export default {
    name:'EstablishTest',
    components: { XButton },
    data(){
        return{
            startTime:'',
            startEnd: '',
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title: '创建试验'})
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
.EstablishTest{
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
                input{
                    width: 5.5rem;
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