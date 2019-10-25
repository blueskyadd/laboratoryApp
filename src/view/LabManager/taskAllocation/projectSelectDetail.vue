<template>
    <div class="projectSelectDetail body_main">
        <div style="height: calc(100% - 1rem);">
            <popup-picker @changeData='changeMaterial' :placeholderTitle='popupMaterialObj.placeholderTitle' :popupTitle='popupMaterialObj.popupTitle' :popupList='popupMaterialObj.popupList'  :activelyData='popupMaterialObj.activelyData'></popup-picker>
            <popup-picker @changeData='changeTest' :placeholderTitle='popupTestlObj.placeholderTitle' :popupTitle='popupTestlObj.popupTitle' :popupList='popupTestlObj.popupList'  :activelyData='popupTestlObj.activelyData'></popup-picker>
        </div>
        <x-button type="primary" @click.native="allocationLabmanage_EngineerList()">确定</x-button>
    </div>
</template>
<script>
import popupPicker from '../../../components/PopupPicker';
export default {
    name:'projectSelectDetail',
    components: {popupPicker},
    data(){
        return{
            popupMaterialObj:{
                placeholderTitle:'选择人员',
                popupTitle:'物料工程师',
                popupList:[],
                activelyData:[], 
            },
             popupTestlObj:{
                placeholderTitle:'选择人员',
                popupTitle:'试验工程师',
                popupList:[],
                activelyData:[], 
            }
        }
        
    },
    mounted(){
        this.$vux.loading.show();
        this.$emit('setHeaderShow', {blod:true,title: this.$route.query.projectName});
        this.getLabmanage_projectEngineerList();
        this.getLabmanage_materialEngineerList()
    },
    methods:{
        changeMaterial(data){
            this.popupMaterialObj.activelyData = data
        },
        changeTest(data){
           this.popupTestlObj.activelyData = data
        },
        getLabmanage_projectEngineerList(){
            this.$http.get(this.$conf.env.getLabmanage_projectEngineerList).then(res =>{
                if(res.data.length == 0) return;
                res.data.forEach(Element =>{
                    Element.value = Element.id.toString();
                })
                this.popupTestlObj.popupList = res.data;
            }).catch(err =>{
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        getLabmanage_materialEngineerList(){
            this.$http.get(this.$conf.env.getLabmanage_materialEngineerList).then(res =>{
                if(res.data.length == 0) return;
                res.data.forEach(Element =>{
                    Element.value = Element.id.toString();
                })
                this.$vux.loading.hide();
                this.popupMaterialObj.popupList = res.data;
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        allocationLabmanage_EngineerList(){
            console.log(this.popupTestlObj.activelyData[0] , this.popupMaterialObj.activelyData[0])
            if(this.popupTestlObj.activelyData[0] && this.popupMaterialObj.activelyData[0]){
                    this.$http.put(this.$conf.env.allocationLabmanage_EngineerList + this.$route.query.projectID + '/',{'engineer':this.popupTestlObj.activelyData[0]-0,'material_user':this.popupMaterialObj.activelyData[0]-0}).then(res =>{
                        if(res.status == '200'){
                            this.$vux.toast.text('分配成功');
                            this.getLabmanage_projectEngineerList();
                        }else{
                            this.$vux.toast.text('分配失败')             
                        }
                    }).catch( err =>{
                        this.$vux.toast.text(err.response?err.response.data:'服务器错误')
                    })
                }else{
                    this.$vux.toast.text('请选择具体分配工程师')
                }
        }
    }
}
</script>
<style lang="scss" scoped>
.projectSelectDetail{
    
}
</style>