<template>
    <div class="reportMeasuring body_main">
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
            <ul class="equipmentFrom equipmentInfo">
                <li class="vux-1px-b">
                    <span>下次计量时间</span>
                    <span>{{equipmentDetailData.next_upkeep_time}}</span>
                </li>
                <li >
                    <span>报告上传</span>
                    <div>
                        <span><x-button style="line-height: .5rem!important;height: auto;margin-right: .2rem;"  type="primary" mini><a :href="equipmentDetailData.report">下载</a></x-button></span>
                    </div>
                    
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { XButton } from "vux";
export default {
    name:'reportMeasuring',
    components: {XButton },
    data(){
        return{
            startTime:'',
            startEnd: '',
            equipmentDetailData:{}
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title: '申请计量'});
        this.getGauger_reportMeasuring()
    },
    methods:{
        goMeasureFlow(){
            this.$router.push({name:'measureFlow'})
        },
        getGauger_reportMeasuring(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getGauger_reportMeasuring + this.$route.query.projectID + '/').then(res =>{
                this.equipmentDetailData = res.data;
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
.reportMeasuring{
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
            }
            span{
                font-size:.28rem;
                font-family:simhei;
                font-weight:400;
            }
            div{
                display: flex;
                align-items: center;
                span{
                     max-width: 5rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
   

}
</style>