<template>
<div class="vux-cell_popuppick" >
    <popup-picker :title="popupTitle" :disabled='disabled' class="vux-1px-b"   show-name :data="popupList" v-model="actively" :columns=1 @on-show="onShowPopup" @on-hide="onHidePopup" @on-change="onChangePopup" :placeholder="placeholderTitle">
        <template slot="title">
            <span class="spantitle">
                <span style="vertical-align:middle;">{{popupTitle}}</span>
                <!-- <span class="weui-cell__ft"></span> -->
            </span>
        </template>
    </popup-picker>
</div>
    
</template>
<script>
import { PopupPicker } from 'vux'
export default {
    components: { PopupPicker },
    props:{
        placeholderTitle:String,
        popupTitle: String,
        popupList: Array,
        activelyData: Array,
        disabled: Boolean
    },
    data(){
        return{
            actively:[],
            
        }
    },
    methods:{
        onShowPopup(){
        },
        onHidePopup(){
            this.$emit('changeData',this.actively)
            console.log('隐藏',this.actively);
        },
        onChangePopup(){
            console.log('修改')
        }
    },
    mounted(){
        if(this.activelyData){
            this.actively = this.activelyData;
        }
    }
}
</script>
<style lang="scss">
.vux-cell_popuppick{
    padding-left: .3rem;
    background: #fff;
    .vux-cell-box{
        height: .88rem;
        .weui-cell{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding:0 .3rem 0 0 ;
            height: .88rem;
            .weui-cell__hd{
                display: flex;
                align-items: center;
                .spantitle{
                    font-size: .28rem;
                    font-family:simhei;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                }
            }
            .vux-popup-picker-select{
                display: flex;
                align-items: center;
                justify-content: flex-end;
                .vux-popup-picker-value, .vux-popup-picker-placeholder{
                    font-size: .28rem;
                    font-family:simhei;
                    font-weight:400;
                    color:rgba(153,153,153,1);
                }
            }
            
            
        }
        
    }
}

</style>