<template>
    <div class="AllocationMaterialDetail body_main">
        <div class="from">
            <ul class="equipmentInfo margin_bottom">
                <li @click="goMeasureFlow()" class="vux-1px-b">
                    <span >设备名称</span>
                    <span>{{equipmentDetailData.name}}</span>
                </li>
                <li @click="goMeasureFlow()" >
                    <span>设备编号</span>
                    <span>{{equipmentDetailData.experiment_num}}</span>
                </li>
            </ul>
            <div class="table_scroll">
                <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
                    <thead>
                        <tr style="background-color: #eee">
                            <th>物料名称</th>
                            <th>数量</th>
                            <th>归还</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in equipmentDetailData.boms" :key="item.id">
                            <td>{{item.name}}</td>
                            <td>{{item.num}}</td>
                            <td><check-icon :value.sync="item.is_return"></check-icon></td>
                        </tr>
                        <tr v-show="equipmentDetailData.boms.length == 0"><td colspan="3">暂无数据</td></tr>
                    </tbody>
                </x-table>
            </div>
            
        </div>
        <x-button type="primary" @click.native="$route.query.flag?setMaterialEngineer_testallot():setMaterialEngineer_maintainallot()">分配</x-button>
    </div>
</template>
<script>
import {XButton ,XTable, CheckIcon} from "vux";
export default {
    name:'AllocationMaterialDetail', 
    components: {XButton,XTable, CheckIcon},
    data(){
        return{
            equipmentDetailData: {}
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title: '物料归还'});
        if(this.$route.query.flag){
            this.getMaterialEngineer_testallotDetail();
        }else{
            this.getMaterialEngineer_maintainallotDetail();
        }
        
    },
    methods:{
        goMeasureFlow(){
            this.$router.push({name:'measureFlow'})
        },
        getMaterialEngineer_testallotDetail(){
          this.$vux.loading.show();
            this.$http.get(this.$conf.env.getMaterialEngineer_testallotDetail + this.$route.query.projectID + '/').then(res =>{
                this.equipmentDetailData = res.data;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })  
        },
        setMaterialEngineer_testallot(){
            var arr = [];
            if(this.equipmentDetailData.boms.length){
                this.equipmentDetailData.boms.forEach(Element =>{
                    var params = {
                        "is_return":Element.is_return?true:false,
                        "id":Element.id
                    }
                    if(params.is_return){
                        arr.push(params)
                    }   
                })
            }
            this.$vux.loading.show();
            this.$http.put(this.$conf.env.setMaterialEngineer_testallot + this.$route.query.projectID + '/',{'experiment_boms':arr}).then(res =>{
                if(res.status == '200'){
                    this.$vux.toast.text('分配成功');     
                    setTimeout(()=>{
                        this.setMaterialEngineer_testallot();
                    },100)
                }else{
                    this.$vux.toast.text('分配失败');           
                }
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        getMaterialEngineer_maintainallotDetail(){
          this.$vux.loading.show();
            this.$http.get(this.$conf.env.getMaterialEngineer_maintainallotDetail + this.$route.query.projectID + '/').then(res =>{
                res.data.experiment_num = res.data.num;
                res.data.boms = res.data.servicetools;
                this.equipmentDetailData = res.data;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })  
        },
        setMaterialEngineer_maintainallot(){
            var arr = [];
            if(this.equipmentDetailData.boms.length){
                this.equipmentDetailData.boms.forEach(Element =>{
                    var params = {
                        "is_return":Element.is_return?true:false,
                        "id":Element.id
                    }
                    if(params.is_return){
                        arr.push(params)
                    }
                })
            }
            this.$vux.loading.show();
            this.$http.put(this.$conf.env.setMaterialEngineer_maintainallot + this.$route.query.projectID + '/',{'servicetools':arr}).then(res =>{
                if(res.status == '200'){
                    this.$vux.toast.text('分配成功');     
                    setTimeout(()=>{
                        this.getMaterialEngineer_maintainallotDetail();
                    },100)
                }else{
                    this.$vux.toast.text('分配失败');           
                }
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        }
    }
}
</script>
<style lang="scss" >
.AllocationMaterialDetail{
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
        .table_scroll{
            height: calc(100% - 1.88rem);
            overflow-y: scroll;
            table{
                font-size: .22rem;
            }
        }
    }
}
</style>