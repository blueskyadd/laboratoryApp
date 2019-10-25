<template>
    <div class="TaskManageIndex body_main">
        <div class="TaskManageIndex_list">
            <ul>
                <li @click="goPersonnelManagement(item.routerName)" v-for="(item, index) in listTitle" :key="index" :class="index==(listTitle.length-1)?'':'vux-1px-b'">
                    <span><img :src="item.img" alt="">{{item.name}}</span>
                    <span class="weui-cell__ft_right"></span>
                </li>
            </ul>
        </div>
        
    </div>
</template>
<script>
export default {
    name:'TaskManageIndex',
    data(){
        return{
           listTitle:[ 
               {name:'报告审核',img: require('../../../assets/img/LabManager/TaskManageIndex/report.png'),routerName:'EquipmentReport'},
               {name:'计量审核',img: require('../../../assets/img/LabManager/TaskManageIndex/measure.png'),routerName:'EquipmentMeasure'},
               {name:'物料审核',img: require('../../../assets/img/LabManager/TaskManageIndex/material.png'),routerName:'EquipmentMaterial'},
               {name:'设备审核',img: require('../../../assets/img/LabManager/TaskManageIndex/equipment.png'),routerName:'EquipmentApply'},
               {name:'值班审核',img: require('../../../assets/img/LabManager/TaskManageIndex/watch.png'),routerName:'EquipmentWatch'},
               {name:'试验方法审核',img: require('../../../assets/img/LabManager/TaskManageIndex/testMethods.png'),routerName:'EquipmentTestMethods'},
               {name:'工装申请审核',img: require('../../../assets/img/LabManager/TaskManageIndex/frockApply.png'),routerName:'EquipmentFrockApply'},
            //    {name:'基础设施审核',img: require('../../../assets/img/LabManager/TaskManageIndex/infrastructure.png'),routerName:'EquipmentFrockManage'},
            ]
        }
    },

    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'管理事项'})
    },
    methods:{
        goPersonnelManagement(routerName){
            this.$router.push({name: routerName})
        },
    }
}
</script>
<style lang="scss" scoped>
.TaskManageIndex{
    .TaskManageIndex_list{
        height: 100%;
        overflow-y: scroll;
        ul{
            padding-left: .3rem;
            background: #fff;
            li{
                height: .94rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 .3rem 0 0 ;
                span{
                    img{
                        width: .37rem;
                        height: .37rem;
                        margin-right: .28rem;
                    }
                    font-size: .28rem;
                    font-family:simhei;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                }
            }
        }
    }
    .TaskManageIndex_list::-webkit-scrollbar{
        display: none;
    }
   
}
</style>