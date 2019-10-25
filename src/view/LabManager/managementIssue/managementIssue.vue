<template>
    <div class="managementIssue body_main">
        <div class="managementIssue_list">
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
    name:'managementIssue',
    data(){
        return{
           listTitle:[ 
               {name:'人员管理',img: require('../../../assets/img/LabManager/managementIssue/renyuan.png'),routerName:'personnelManagement'},
               {name:'设备管理',img: require('../../../assets/img/LabManager/managementIssue/shebei.png'),routerName:'equipmentManagement'},
               {name:'试验标准',img: require('../../../assets/img/LabManager/managementIssue/shiyan.png'),routerName:'EquipmentStandard'},
               {name:'试验方法',img: require('../../../assets/img/LabManager/managementIssue/standard.png'),routerName:'EquipmentMethods'},
               {name:'历史项目',img: require('../../../assets/img/LabManager/managementIssue/lishijilu.png'),routerName:'EquipmentHistory'},
               {name:'工装管理',img: require('../../../assets/img/LabManager/managementIssue/gongzhuang.png'),routerName:'EquipmentFrockManage'},
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
.managementIssue{
    .managementIssue_list{
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
    .managementIssue_list::-webkit-scrollbar{
        display: none;
    }
   
}
</style>