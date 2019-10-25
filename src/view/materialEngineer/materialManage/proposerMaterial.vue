<template>
    <div class="ProposerMaterial body_main">
        <div class="from">
            <ul class="equipmentInfo margin_bottom">
                <li @click="goMeasureFlow()" class="vux-1px-b">
                    <span >物料名称</span>
                    <span>{{equipmentDetailData.name}}</span>
                </li>
                <li @click="goMeasureFlow()" >
                    <span>物料编号</span>
                    <span>{{equipmentDetailData.nateriel_num}}</span>
                </li>
            </ul>
            <ul class="equipmentFrom">
                <li class="vux-1px-b">
                    <span>物料数量</span>
                    <input type="number" v-model="materiel.num" placeholder="请输入物料数量">
                </li>
                <li class="vux-1px-b">
                    <span>单位</span>
                    <span>{{equipmentDetailData.unit}}</span>
                </li>
                <li class="textarea ">
                    <h3>申请原因</h3>
                    <textarea name="" v-model="materiel.cause" id="" placeholder="请输入申请原因"></textarea>
                </li>
            </ul>
        </div>
        <x-button type="primary" @click.native="createdMaterialEngineer_materiel()">保存</x-button>
    </div>
</template>
<script>
import {XButton } from "vux";
export default {
    name:'ProposerMaterial', 
    components: {XButton },
    data(){
        return{
            equipmentDetailData: {},
            materiel:{
                'warehouse': this.$route.query.projectID,
                'num':'',
                'cause':''
            }
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title: '申请物料'});
        this.getMaterialEngineer_materielDetail();
    },
    methods:{
        goMeasureFlow(){
            this.$router.push({name:'measureFlow'})
        },
        getMaterialEngineer_materielDetail(){
           this.$vux.loading.show();
            this.$http.get(this.$conf.env.getMaterialEngineer_materielDetail + this.$route.query.projectID + '/').then(res =>{
                this.equipmentDetailData = res.data;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            }) 
        },
        createdMaterialEngineer_materiel(){
            if(!this.materiel.num){
                this.$vux.toast.text('请输入物料数量哦'); 
            }else if(!this.materiel.cause){
                this.$vux.toast.text('请输入申请原因哦'); 
            }else{
                this.$vux.loading.show();
                this.$http.post(this.$conf.env.createdMaterialEngineer_materiel,this.materiel).then(res =>{
                    if(res.status == '201'){
                        this.$vux.toast.text('提交成功');     
                        setTimeout(()=>{
                            this.$router.back();
                        },100)
                    }else{
                        this.$vux.toast.text('提交失败');           
                    }
                    this.$vux.loading.hide();
                }).catch(err =>{
                    this.$vux.loading.hide();
                    this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
                })
            }
        }
    }
}
</script>
<style lang="scss" >
.ProposerMaterial{
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
                span{
                    font-size:.28rem;
                    font-family:simhei;
                    font-weight:400;
                    color:rgba(51,51,51,1); 
                }
                input{
                    font-size: .28rem;
                    width: 5rem;
                    text-align: right;
                }
            }
            .textarea{
                height: auto;
                flex-direction: column;
                font-size: .28rem;
                font-family:simhei;
                font-weight:400;
                color:rgba(51,51,51,1);
                align-items: flex-start;
                padding:.2rem .3rem .2rem 0;
                textarea{
                    height: 4rem;
                    margin-top: .2rem;
                    width: 100%;
                    border:1px solid #ccc;
                    padding: .1rem;
                }
            }
        }
    }
   

}
</style>