<template>
    <div class="Staffing body_main">
        <div class="from">
            <ul class="equipmentInfo margin_bottom">
                <li class="vux-1px-b">
                    <span >试验名称</span>
                    <span>{{Testengineer_testersDetail.name}}</span>
                </li>
                <li >
                    <span>试验编号</span>
                    <span>{{Testengineer_testersDetail.experiment_num}}</span>
                </li>
            </ul>
            <ul class="equipmentFrom equipmentInfo margin_bottom">
                <li class="vux-1px-b">
                    <span>试验类型</span>
                    <span>{{Testengineer_testersDetail.project_type}}</span>
                </li>
                <li class="vux-1px-b">
                    <span>试验开始时间</span>
                    <span>{{Testengineer_testersDetail.start_time}}</span>
                </li>
                <li>
                    <span>试验预计结束时间</span>
                    <span>{{Testengineer_testersDetail.end_time}}</span>
                </li>
            </ul>
            <ul class="equipmentFrom equipmentInfo margin_bottom">
                <li class="changeList">
                    <popup-picker @on-hide='addPopupStaffing'  placeholder='请选择'  confirm-text='创建' title="试验员" :data="popupList" v-model="popupListValue"></popup-picker>
                </li>
            </ul>
            <swipeout >
                <swipeout-item transition-mode="follow" v-for="(item,index) in StaffingData" :key="index">
                    <div slot="right-menu">
                        <swipeout-button @click.native="deleteStaffing(item,index)" type="warn">删除</swipeout-button>
                    </div>
                    <div slot="content" :class="{'vux-1px-t': index !== 0, }" style="padding:12px;">
                        <span>{{item.tester}}</span><span>{{item.on_duty}}</span>
                    </div>
                </swipeout-item>
            </swipeout>
        </div>
        <x-button type="primary" @click.native="createdTestengineer_testers()">创建</x-button>
    </div>
</template>
<script>
import popupPickerlist from '../../../../components/PopupPicker';
import {  Datetime,  Group, XButton, PopupPicker ,Swipeout, SwipeoutItem,SwipeoutButton } from "vux";
import { debuglog } from 'util';
export default {
    name:'Staffing',
    components: {Datetime, Group, XButton, PopupPicker ,popupPickerlist, Swipeout, SwipeoutItem, SwipeoutButton},
    data(){
        return{
            startTime:'',
            startEnd: '',
            popupListValue: [],
            popupList: [[],['是','否']],
            StaffingData:[],
            popupListID:[],
            Testengineer_testersDetail:{},
            isStaffingData: false,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title: '试验员安排'});
        this.getTestengineer_testuserList();
        this.getTestengineer_testersDetail();
    },
    methods:{
        goMeasureFlow(){
            this.$router.push({name:'measureFlow'});
        },
        deleteStaffing(item, index){
            if(item.id){
                this.deleteTestengineer_testers(item);
            }else{
                this.StaffingData.splice(index, 1);
                this.$vux.toast.text('删除成功');  
            }
        },
        deleteTestengineer_testers(item){
            this.$http.delete(this.$conf.env.deletePm_project_setting_flow + item.id +'/').then( res =>{
                if(res.status == '204'){
                    this.$vux.toast.text('删除成功');     
                    this.StaffingData.splice(index,1)
                }else{
                    this.$vux.toast.text('删除失败');             
                }
            }).catch(err =>{
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        addPopupStaffing(data){
            if(data){
                var Obj ={
                    tester:this.popupListValue[0],
                    on_duty:this.popupListValue[1]
                }
                if(this.StaffingData.length>0){
                /**@name 多选 */
                //     for(var index =0;index<this.StaffingData.length;index++){
                //         if(this.StaffingData[index].tester == this.popupListValue[0]){
                //             this.StaffingData[index].on_duty = this.popupListValue[1]
                //             return false
                //         }
                //     }
                /**@name 单选 */
                console.log(this.StaffingData[0])
                if(this.isStaffingData){
                    this.StaffingData[0] = Obj;
                    this.$set(this.StaffingData, 0, this.StaffingData[0]);
                }else{
                    this.$vux.toast.text('您已经安排试验员'); 
                }
                }else{
                    this.StaffingData.unshift(Obj)
                }
            }
        },
        getTestengineer_testuserList(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getTestengineer_testuserList).then(res =>{
               if(res.data.length){
                   res.data.forEach(Element =>{
                       this.popupList[0].push(Element.name);
                       this.popupListID.push(Element.id);
                   })
               }
                this.$vux.loading.hide();
            }).catch(err =>{
                console.log(err)
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        getTestengineer_testersDetail(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getTestengineer_testersDetail + this.$route.query.projectID + '/').then(res =>{
                this.Testengineer_testersDetail = res.data;
                this.StaffingData = res.data.testeres;
                this.isStaffingData = res.data.testeres.length == 0 ? true:false;
                this.$vux.loading.hide();
            }).catch(err =>{
                console.log(err)
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            }) 
        },
        createdTestengineer_testers(){
            if( this.StaffingData.length == 0){
                this.$vux.toast.text('请先选择试验员', 'top');
            }else{
                if(!this.isStaffingData){
                    this.$vux.toast.text('您已经安排试验员'); 
                }else{
                    this.$vux.loading.show();
                    var experimentDetail = {
                        "experiment":this.$route.query.projectID,
                        "tester": '',
                        "on_duty":this.StaffingData[0].on_duty == '是'?true:false
                    }
                    if(this.popupList[0].length){
                        this.popupList[0].forEach((Element, index) =>{
                            if(Element == this.StaffingData[0].tester){
                                experimentDetail.tester = this.popupListID[index]
                            }
                        })
                    }
                    this.$http.post(this.$conf.env.createdTestengineer_testers,experimentDetail).then(res =>{
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
}
</script>
<style lang="scss" >
.Staffing{
    .from{
        height: calc(100% - 1.5rem);
        .addStaffing{
            font-size: .24rem;
            color: #07A695;
            text-decoration:underline;
            text-align: right;
            padding-top: .28rem;
            padding-right: .3rem;
        }
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
                .vux-cell-box{
                    width: 100%;
                    padding-right: .3rem;
                    .weui-cell_access{
                        display: flex;
                        justify-content: space-between;
                        width: 100%;
                        align-items: center;
                    }
                }
                
                .vux-cell_popuppick{
                    padding: 0;
                    width: 100%;
                }
            }
        }
        .vux-swipeout{
                overflow-y: scroll;
                overflow-x: hidden;
                height: calc(100% - 5.5rem);
            .vux-swipeout-item{
                font-size: .24rem;
            }
            .vux-swipeout-content{
                text-align: left;
                padding-left: .3rem;
                padding-right: .3rem;
                div{
                    display: flex;
                    padding-left: 0!important;
                    padding-right: 0!important;
                    justify-content: space-between;
                }
            }
        }
        .vux-swipeout::-webkit-scrollbar{
            display: none;
        }
    }
   

}
</style>