<template>
    <home-index>
        <template>
            <div class="section_datalist" v-if="isMaterialEngineer_systemNumber">
                <div class="show_box divNumber toplist" @click="goMaterialManage()">
                    <div><img src="../../../assets/img/materialEngineer/index/materialManage.png" alt=""><span>物料管理</span></div>
                    <div class="number"><countup :start-val="0" :end-val="MaterialEngineer_systemNumber.num1" :duration="1" class="text_number_terxt"></countup><span>种</span></div>
                </div>
                <div class="show_box divNumber toplist" @click="goPurchaseMaterial ()">
                    <div><img src="../../../assets/img/materialEngineer/index/purchase.png" alt=""><span>需采购物料</span></div>
                    <div class="number"><countup :start-val="0" :end-val="MaterialEngineer_systemNumber.num5" :duration="1" class="text_number_terxt"></countup><span>种</span></div>
                </div>
                <div class="show_box divNumber toplist" @click="goAllocationMaterial()">
                    <div><img src="../../../assets/img/materialEngineer/index/allocation.png" alt=""><span>物料分配</span></div>
                    <div class="number"><countup :start-val="0" :end-val="MaterialEngineer_systemNumber.num2" :duration="1" class="text_number_terxt"></countup><span>种</span></div>
                </div>
                <div class="show_box toplist img_text information" @click="goMaterialAdd()"><img src="../../../assets/img/materialEngineer/index/materialAdd.png" alt=""><span>新增物料</span></div>
                <div class="show_box divNumber toplist" @click="goMaterialReturn()">
                    <div><img src="../../../assets/img/materialEngineer/index/return.png" alt=""><span>物料归还</span></div>
                    <div class="number"><countup :start-val="0" :end-val="MaterialEngineer_systemNumber.num3" :duration="1" class="text_number_terxt"></countup><span>项</span></div>
                </div>
                <div class="show_box divNumber toplist" @click="goMaterialAffirm()">
                    <div><img src="../../../assets/img/materialEngineer/index/affirm.png" alt=""><span>样件确认</span></div>
                    <div class="number"><countup :start-val="0" :end-val="MaterialEngineer_systemNumber.num4" :duration="1" class="text_number_terxt"></countup><span>项</span></div>
                </div>
            </div>
        </template>
    </home-index>
</template>
<script>
import homeIndex from '../../../components/homeIndex'
import { Countup} from 'vux'
export default {
    name:'materialEngineerIndex',
    components:{Countup, homeIndex},
    data(){
        return{
            MaterialEngineer_systemNumber:{},
            isMaterialEngineer_systemNumber:false
        }
    },
    methods:{
        goMaterialManage(){
            this.$router.push({name:'MaterialManage'})
        },
        goPurchaseMaterial(){
            this.$router.push({name:'PurchaseMaterial'})
        },
        goAllocationMaterial(){
            this.$router.push({name:'AllocationMaterial'})
        },
        goMaterialAdd(){
            this.$router.push({name:'MaterialAdd'})
        },
        goMaterialReturn(){
            this.$router.push({name:'MaterialReturn'})
        },
        goMaterialAffirm(){
            this.$router.push({name:'MaterialAffirm'})
        },
        getMaterialEngineer_systemNumber(){
            this.$http.get(this.$conf.env.getMaterialEngineer_systemNumber).then( res =>{
                this.MaterialEngineer_systemNumber = res.data;
                this.isMaterialEngineer_systemNumber = true;
                this.$vux.loading.hide()
            }).catch(err =>{
                this.$vux.loading.hide()
                this.$vux.toast.text(err.response?err.response.data:'服务器错误')
            })
        }
    },
    computed:{
    },
    mounted(){
        this.$emit('setIndexHeaderTitle',{flag:true,title: '您好，物料管理员!'});
        this.$vux.loading.show()
        this.getMaterialEngineer_systemNumber();
    },
    destroyed(){
        this.$emit('setHeaderShow', {blod:false,title:''})
    }
}
</script>
<style lang="scss" scoped>
.Project_materialEngineerIndex{
  
}
</style>