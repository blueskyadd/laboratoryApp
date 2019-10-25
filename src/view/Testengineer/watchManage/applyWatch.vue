<template>
    <div class="ApplyWatch body_main">
        <div class="from">
            <ul class="equipmentInfo margin_bottom">
                <li class="vux-1px-b">
                    <i class="importantData">*</i>
                    <datetime v-model="equipmentDetail.start_time" format='YYYY-MM-DD'  placeholder='请选择值班开始时间' title="值班开始时间"></datetime>
                    <div class="weui-cell__ft"></div>
                </li>
                <li  class="vux-1px-b">
                    <i class="importantData">*</i>
                    <popup-picker title="开始时间(时分秒)" v-model="equipmentDetail.formatDemoValue" :data="dataTime" :display-format="format"></popup-picker>
                </li>
                <li  class="vux-1px-b">
                    <i class="importantData">*</i>
                    <datetime v-model="equipmentDetail.end_time" format='YYYY-MM-DD'  placeholder='请选择值班结束时间' title="值班结束时间"></datetime>
                    <div class="weui-cell__ft"></div>
                </li>
                <li >
                    <i class="importantData">*</i>
                    <popup-picker title="结束时间(时分秒)" v-model="equipmentDetail.formatDemoValueEnd" :data="dataTime" :display-format="format"></popup-picker>
                </li>
            </ul>
            <ul class="equipmentFrom equipmentInfo margin_bottom">
                <li class="changeList">
                    <i class="importantData">*</i>
                    <setpopup-picker @changeData='changeMaterial' :placeholderTitle='popupMaterialObj.placeholderTitle' :popupTitle='popupMaterialObj.popupTitle' :popupList='popupMaterialObj.popupList'  :activelyData='popupMaterialObj.activelyData'></setpopup-picker>
                </li>
                <li @click="goSynopsis()">
                    <span><i class="importantData">*</i>申请原因</span>
                    <span class="right_weui"><p>{{equipmentDetail.cause || '请编辑'}}</p><div class="weui-cell__ft"></div></span>
                </li>
            </ul>
        </div>
        <x-button type="primary" @click.native="createdTestengineer_onduty()">申请</x-button>
    </div>
</template>
<script>
import setpopupPicker from '../../../components/PopupPicker';
import VerificationData from '../../../components/commentMethods/VerificationData'
import {  Datetime,  Group, XButton,PopupPicker} from "vux";
export default {
    name:'ApplyWatch',
    components: {Datetime, Group, XButton, setpopupPicker, PopupPicker },
    data(){
        return{
            startTime:'',
            startEnd: '',
            popupMaterialObj:{
                placeholderTitle:'请选择',
                popupTitle:'值班地点',
                popupList:[],
                activelyData: [], 
            },
            format: function (value, name) {
                return `${value[0]}:${value[1]}:${value[2]}`
            },
            equipmentDetail:{
                "start_time":'',
                "formatDemoValue":[],
                "end_time":'',
                "formatDemoValueEnd":[],
                "location":'',
                "cause":''
            }
        }
    },
    computed:{
        dataTime(){
            var arr = [[],[],[]]
            for (let index = 0; index < 60; index++) {
                if(index.toString().length==1){
                    index = '0'+index
                }
                arr[2].push(index);
                arr[1].push(index);
                if(index<24){
                    arr[0].push(index)
                }
            }
            console.log(arr)
            return arr;
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title: '值班申请'});
        this.getTestengineer_roomList();//实验室列表
         /**@name 当前选择数据 */
        // this.equipmentDetail = JSON.parse(JSON.stringify(this.$store.state.watch.equipmentDetail));
        this.$nextTick(()=>{
            if( this.$store.state.watch.equipmentDetail){
               this.equipmentDetail = this.$store.state.watch.equipmentDetail;
                this.equipmentDetail.cause = this.$store.state.synopsis.ApplyWatchText; 
            }
            
        })
    },
    beforeRouteLeave (to, from, next) {
        // ...
        console.log(to.name)
        if(to.name == 'WatchManage'){
            this.$store.commit('changewatchDetail',{})
            this.$store.commit('changeSynopsisText',{name:'',flag:'4'})
        }
        next()
    },
    methods:{
        goSynopsis(){
            this.$router.push({name:'Synopsis',params:{flag:'4'}});
            this.$store.commit('changewatchDetail',this.equipmentDetail)
        },
        changeMaterial(data){
            this.equipmentDetail.location = data[0]*1
        },
        getTestengineer_roomList(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getTestengineer_roomList).then(res =>{
                if(res.data){
                    res.data.forEach( Element =>{
                        Element.value = Element.id.toString(); 
                    })
                    this.popupMaterialObj.popupList = res.data;
                    this.$nextTick(()=>{
                        if(this.$store.state.watch.equipmentDetail.location){
                            this.popupMaterialObj.activelyData[0] = this.$store.state.watch.equipmentDetail.location.toString();
                        }
                    })
                }
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.isMoremaintainrecord = false;
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        createdTestengineer_onduty(){
            if(!VerificationData.VerificationData(this.equipmentDetail,this)) return;
            this.equipmentDetail.start_time += 'T'+ this.equipmentDetail.formatDemoValue.join(':')
            this.equipmentDetail.end_time += 'T'+this.equipmentDetail.formatDemoValueEnd.join(':')
            delete this.equipmentDetail.formatDemoValue;
            delete this.equipmentDetail.formatDemoValueEnd;
            this.$vux.loading.show();
                this.$http.post(this.$conf.env.createdTestengineer_onduty,this.equipmentDetail).then(res =>{
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
</script>
<style lang="scss" >
.ApplyWatch{
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
                .vux-cell-box{
                    flex: 1;
                    .weui-cell{
                        padding: 0;
                        display: flex;
                    }
                }
                .vux-cell-box::before{
                    display: none;
                    
                }
                .vux-cell-value{
                    color: #999!important;
                }
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
                .weui-cell{
                    padding: 0 .3rem 0 0!important ;
                }
            }
            .changeList{
                padding-right: 0;
                .vux-cell_popuppick{
                    padding: 0;
                    width: 100%;
                }
            }
            .right_weui{
                display: flex;
                color: #999;
                align-items: center;
                padding-right: .02rem;
                p{
                    max-width: 4rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
   

}
</style>