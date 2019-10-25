<template>
    <div class="EstablishProject body_main">
        <div class="from">
            <ul class="equipmentInfo margin_bottom">
                <li class="vux-1px-b">
                    <span >公司名称</span>
                    <span>盐雾试验箱</span>
                </li>
                <li >
                    <span>部门</span>
                    <span>H18425Y143</span>
                </li>
            </ul>
            <ul class="equipmentFrom equipmentInfo margin_bottom">
                <li class="vux-1px-b">
                    <span>项目编号</span>
                    <input type="text" placeholder="请输入项目编号">
                </li>
                <li class="changeList">
                    <popup-picker @changeData='changeMaterial' :placeholderTitle='popupMaterialObj.placeholderTitle' :popupTitle='popupMaterialObj.popupTitle' :popupList='popupMaterialObj.popupList'  :activelyData='popupMaterialObj.activelyData'></popup-picker>
                </li>
                <li class="changeList">
                    <popup-picker @changeData='changeMaterialPoduct' :placeholderTitle='popupMaterialProduct.placeholderTitle' :popupTitle='popupMaterialProduct.popupTitle' :popupList='popupMaterialProduct.popupList'  :activelyData='popupMaterialProduct.activelyData'></popup-picker>
                </li>
                <li class="vux-1px-b" >
                    <datetime v-model="startTime"  placeholder='请选择计量开始时间' title="计量开始时间"></datetime>
                    <div class="weui-cell__ft"></div>
                </li>
                <li >
                    <datetime v-model="startEnd"  placeholder='请选择计量截止时间' title="计量截止时间"></datetime>
                    <div class="weui-cell__ft"></div>
                </li>
            </ul>
            <ul class="equipmentInfo">
                <li @click="$router.push({name:'Synopsis',params:{flag:'2'}})">
                    <span>项目简介</span>
                    <div class="weui-cell__ft"></div>
                </li>
            </ul>
        </div>
        <x-button type="primary">创建</x-button>
    </div>
</template>
<script>
import popupPicker from '../../../components/PopupPicker';
import {  Datetime,  Group, XButton } from "vux";
export default {
    name:'EstablishProject',
    components: {Datetime, Group, XButton, popupPicker },
    data(){
        return{
            startTime:'',
            startEnd: '',
            popupMaterialObj:{
                placeholderTitle:'请选择项目类型',
                popupTitle:'项目类型',
                popupList:[],
                activelyData:[], 
            },
            popupMaterialProduct:{
                placeholderTitle:'请选择产品选择',
                popupTitle:'产品选择',
                popupList:[],
                activelyData:[], 
            },
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title: '创建项目'});
        console.log(this.$store.state.synopsis.projectSynopsisText)
    },
    methods:{
        goMeasureFlow(){
            this.$router.push({name:'measureFlow'})
        },
        changeMaterial(data){
            console.log(data,1)
        },
        changeMaterialPoduct(data){
            console.log(data)
        }
    }
}
</script>
<style lang="scss" >
.EstablishProject{
    .from{
        height: calc(100% - 1.5rem);
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
                padding-right: .3rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                span{
                    font-size:.28rem;
                    font-family:simhei;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                }
            }
            .changeList{
                padding-right: 0;
                .vux-cell_popuppick{
                    padding: 0;
                    width: 100%;
                }
            }
        }
    }
   

}
</style>