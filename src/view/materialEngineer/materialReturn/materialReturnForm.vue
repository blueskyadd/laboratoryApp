<template>
    <div class="MaterialReturnForm body_main">
        <div class="from">
            <ul class="equipmentInfo margin_bottom">
                <li @click="goMeasureFlow()" class="vux-1px-b">
                    <span >设备名称</span>
                    <span>{{equipmentDetailData.name}}</span>
                </li>
                <li @click="goMeasureFlow()" >
                    <span>设备编号</span>
                    <span>{{equipmentDetailData.num}}</span>
                </li>
            </ul>
            <ul class="equipmentFrom">
                <li class="vux-1px-b" v-for="item in equipmentDetailData.servicetools" :key="item.id">
                    <span>{{item.name}}</span>
                    <input type="number" v-model="item.record_num"  placeholder="请输入归还数量">
                </li>
            </ul>
        </div>
        <x-button type="primary"  v-show="isHidebutton" @click.native="$route.query.flag?setMaterialEngineer_testback():setMaterialEngineer_maintainback()">确定</x-button>
    </div>
</template>
<script>
import {XButton } from "vux";
export default {
    name:'MaterialReturnForm', 
    components: {XButton },
    data(){
        return{
            equipmentDetailData:{},
            isHidebutton:true,//键盘弹出时，底部按钮隐藏
            innerHeight:window.innerHeight,//监听页面高度变化所用参数
            heightChange:window.innerHeight
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title: '物料归还'});
        this.$route.query.flag ?  this.getMaterialEngineer_testbackDetail(): this.getMaterialEngineer_maintainbackDetail();
        //监听页面高度变化
        const that = this
        window.onresize =()  =>{
            return (()=>{
                this.innerHeight = window.innerHeight
            })()
        }
    },
    watch: {
      innerHeight(newval,oldval){
          if(this.heightChange != newval){
              this.isHidebutton = false
          }else{
              this.isHidebutton = true
          }
      },
    },
    methods:{
        goMeasureFlow(){
            this.$router.push({name:'measureFlow'})
        },
        getMaterialEngineer_testbackDetail(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getMaterialEngineer_testbackDetail + this.$route.query.projectID + '/').then(res =>{
                res.data.num = res.data.experiment_num;
                res.data.servicetools = res.data.boms;
                this.equipmentDetailData = res.data;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            }) 
        },
        getMaterialEngineer_maintainbackDetail(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getMaterialEngineer_maintainbackDetail + this.$route.query.projectID + '/').then(res =>{
                this.equipmentDetailData = res.data;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            }) 
        },
        setMaterialEngineer_testback(){
            if(!this.VerificationData()) return;
           this.$vux.loading.show();
            this.$http.put(this.$conf.env.setMaterialEngineer_maintainback + this.$route.query.projectID + '/',{'experiment_boms':this.VerificationData()}).then(res =>{
                if(res.status == '200'){
                    this.$vux.toast.text('提交成功');     
                    setTimeout(()=>{
                        this.getMaterialEngineer_maintainbackDetail();
                    },100)
                }else{
                    this.$vux.toast.text('提交失败');           
                }
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            }) 
        },
        setMaterialEngineer_maintainback(){
            if(!this.VerificationData()) return;
           this.$vux.loading.show();
            this.$http.put(this.$conf.env.setMaterialEngineer_maintainback + this.$route.query.projectID + '/',{'servicetools':this.VerificationData()}).then(res =>{
                if(res.status == '200'){
                    this.$vux.toast.text('提交成功');     
                    setTimeout(()=>{
                        this.getMaterialEngineer_maintainbackDetail();
                    },100)
                }else{
                    this.$vux.toast.text('提交失败');           
                }
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            }) 
        },
        VerificationData(){
            var arr = [];
            if(this.equipmentDetailData.servicetools.length){
                this.equipmentDetailData.servicetools.forEach( Element =>{
                    var params = {
                        "record_num":Element.record_num,
                        "id": Element.id
                    }
                    if(Element.record_num){
                        arr.push(params)
                    }
                })
                if(arr.length){
                    return arr;
                }else{
                    this.$vux.toast.text('您一个数量也没有输入呢'); 
                    return false;
                }
            }else{
                this.$vux.toast.text('没有需要归还的物料'); 
                return false;
            }
            
            
        }
    }
}
</script>
<style lang="scss" >
.MaterialReturnForm{
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
                span:last-child{
                    max-width: 5rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #07A695;
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
                    width: 4.8rem;
                    text-align: right;
                }
            }
        }
    }
   

}
</style>