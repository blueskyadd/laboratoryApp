<template>
    <div class="EquipmentReportDetail body_main">
        <div class="EquipmentReportDetail_main">
            <slot></slot>
        </div>
        <footer v-if="isShow">
            <button class="weui-btn_warn"  @click="setButton(false)">不同意</button>
            <x-button type="primary" @click.native="setButton(true)">同意</x-button>
        </footer>
    </div>
</template>
<script>
export default {
    name:'EquipmentReportDetail',
    props:{
        isShowfooter: Boolean
    },
    data(){
        return{
            titleName:'',
            judgeFlage:'',
            isShow: this.isShowfooter ? true: false
        }
    },
    mounted(){
        switch(this.$route.query.flag){
            case '1':
            this.titleName = '申请报告';
            break;
            case '2':
            this.titleName = '申请计量';
            break;
            case '3':
            this.titleName = '申请物料';
            break;
            case '4':
            this.titleName = '申请设备';
            break;
            case '5':
            this.titleName = '申请值班';
            break;
            case '6':
            this.titleName = '申请试验方法';
            break;
            case '7':
            this.titleName = '申请工装';
            break;
        }
    },
    methods:{
        setButton(flag){
            this.$emit('setButton',flag)
        }
    }
}
</script>
<style lang="scss" scoped>
.EquipmentReportDetail{
    background: #fff;
    padding-top: .19rem;
    overflow: hidden;
    .EquipmentReportDetail_main{
        height: calc(100% - 1.6rem);
        overflow-y: scroll;
        ul{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding-left: .33rem;
            li{
                padding: .15rem;
                display: flex;
                span{
                    display: block;
                    font-size: .28rem;
                    font-family:SimHei;
                    font-weight:400;
                    color:rgba(7,166,149,1)
                }
                span:last-child{
                    color: #666666;
                    flex: 1;
                    text-align: left;
                }
            }
        }
    }
    .EquipmentReportDetail_main::-webkit-scrollbar{
        display: none;
    }
    footer{
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 1.6rem;
        button{
            display: block;
        }
        .weui-btn_primary{
            width: auto!important;
            padding:  0 .98rem;
            margin: 0;
        }
    }
    
}
</style>