<template>
    <div class="ApplyMeasuring body_main">
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
            <ul class="equipmentInfo equipmentFrom">
                <li class="vux-1px-b">
                    <span>计量开始时间</span>
                    <span>{{equipmentDetailData.start_time}}</span>
                </li>
                <li class="vux-1px-b">
                    <span>计量开始时间</span>
                    <span>{{equipmentDetailData.end_time}}</span>
                </li>
                <li class="textarea ">
                    <h3>计量原因</h3>
                    <textarea name="" id="" v-model="equipmentDetailData.cause" placeholder="请输入计量原因"></textarea>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:'ApplyMeasuring',
    data(){
        return{
            startTime:'',
            startEnd: '',
            equipmentDetailData:{}
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title: '申请计量'});
        this.getGauger_meteringDetail();
    },
    methods:{
        goMeasureFlow(){
            this.$router.push({name:'measureFlow'})
        },
        getGauger_meteringDetail(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getGauger_meteringDetail + this.$route.query.projectID + '/').then(res =>{
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
.ApplyMeasuring{
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
                padding-right: .3rem;
                
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .textarea{
                flex-direction: column;
                height: auto!important;
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