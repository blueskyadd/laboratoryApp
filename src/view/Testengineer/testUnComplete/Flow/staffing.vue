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
        <x-button type="primary" @click.native="VerificationData()">创建</x-button>
    </div>
</template>
<script>
import popupPickerlist from '../../../../components/PopupPicker';
import {  Datetime,  Group, XButton, PopupPicker ,Swipeout, SwipeoutItem,SwipeoutButton } from "vux";
import { debuglog } from 'util';
import indexVue from '../../../loging/index.vue';
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
            overStaffingData:[],
            popupListID:[],
            Testengineer_testersDetail:{},
            isStaffingData: false,
            isPushUser: 0,
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
                this.deleteTestengineer_testers(item, index);
            }else{
                this.StaffingData.splice(index, 1);
                this.$vux.toast.text('删除成功'); 
            }
        },
        deleteTestengineer_testers(item,index){
            this.$http.delete(this.$conf.env.deletePm_project_setting_flow + item.id +'/').then( res =>{
                if(res.status == '204'){
                    this.$vux.toast.text('删除成功');     
                    this.StaffingData.splice(index,1);
                    this.overStaffingData.splice(index,1);
                     this.isStaffingData = this.StaffingData.length == 0 ? true:false;
                }else{
                    this.$vux.toast.text('删除失败');             
                }
            }).catch(err =>{
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        addPopupStaffing(data){
            console.log(this.popupListValue)
            if(data){
                var Obj ={
                    tester:this.popupListValue[0],
                    on_duty:this.popupListValue[1]
                }
                if(this.StaffingData.length>0){
                    console.log(this.StaffingData)
                    if(this.isStaffingData){
                        this.StaffingData[0] = Obj;
                        this.$set(this.StaffingData, 0, this.StaffingData[0]);
                    }else{
                        console.log()
                        this.isPushUser += 1;
                        if(this.isPushUser == 1){
                            this.StaffingData.push(Obj);
                        }else{
                            this.StaffingData[this.StaffingData.length - 1] = Obj;
                            this.$set(this.StaffingData, this.StaffingData.length - 1, this.StaffingData[this.StaffingData.length - 1]);
                        }
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
                this.overStaffingData =JSON.parse(JSON.stringify(res.data.testeres));
                this.StaffingData = res.data.testeres;
                this.isStaffingData = res.data.testeres.length == 0 ? true:false;
                this.$vux.loading.hide();
            }).catch(err =>{
                console.log(err)
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            }) 
        },
        VerificationData(){
            if( this.StaffingData.length == 0 || this.StaffingData.length == this.overStaffingData.length){
                this.$vux.toast.text('请先选择试验员', 'top');
            }else{
                 if(this.StaffingData.length == 1){
                     this.$vux.loading.show();
                     this.createdTestengineer_testers()
                 }else{
                     if(this.isPushUser == 0){
                        this.$vux.toast.text('请先选择试验员'); 
                    }else{
                        console.log(this.isRepeat(this.StaffingData,'tester'))
                        this.isRepeat(this.StaffingData,'tester')?this.createdTestengineer_testers(): this.$vux.toast.text('该试验员已在，请选择其他试验员'); 
                        
                    }
                 }
            }
        },
        isRepeat(arr) {
           let len = arr.length;
            for (let i = 0; i < len; i++) {
                for (let j = i + 1; j < len; j++) {
                    if (arr[i].tester == arr[j].tester) {
                        return false
                        len--;
                        j--;
                    }
                }   
            }
            return true;
        },
        createdTestengineer_testers(){
            console.log(this.popupListID)
            var experimentDetail = {
                "experiment":this.$route.query.projectID*1,
                "tester": '',
                "on_duty":this.StaffingData[this.StaffingData.length - 1].on_duty == '是'?true:false
            }
            console.log(this.StaffingData,this.popupList[0])
            if(this.popupList[0].length){
                this.popupList[0].forEach((Element, index) =>{
                    this.StaffingData.forEach((value,indexVue) =>{
                        if(Element == value.tester){
                            experimentDetail.tester =(this.overStaffingData.length == 1? this.popupListID[indexVue]:this.overStaffingData.length == 0) ?this.popupListID[index]: this.popupListID[this.StaffingData.length-1]
                        }
                    })
                })
            }

            console.log(experimentDetail.tester)
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
    },
    watch:{
        popupListID(){
            console.log(this.popupListID)
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
                        padding:0!important;
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