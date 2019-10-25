<template>
    <div class="principalEquipmentDetail body_main">
        <main-list  @loadmore='loadmore' ref="mainList"  :islistData='islistData'>
            <template>
                <li @click="goMeasureFlow(item)" v-for="(item, index) in Gauger_meteringhistoryList" :key="index">
                    <div class="left_name">
                        <span class="margin_bottom">计量时间：{{item.metering_time}}</span>
                        <span>委托公司：{{item.nominee_company}}</span>
                    </div>
                    <div class="weui-cell__ft"></div>
                </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import mainList from '../../../components/mainList'
export default {
    name:'principalEquipmentDetail',
    components:{ mainList},
    data(){
        return{
            islistData: false,
            Gauger_meteringhistoryList:[]
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title: this.$route.query.name});
        this.getGauger_meteringhistoryList(1,'',12);
    },
    methods:{
        goMeasureFlow(data){
            this.$router.push({name:'measureFlow',query:{projectName: this.$route.query.name,projectID:data.id}})
        },
        getGauger_meteringhistoryList(pagenumber,searchText,page_size, success, error){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getGauger_meteringhistoryList + '&page_size=' + page_size: this.$conf.env.getGauger_meteringhistoryList +  '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                    this.Gauger_meteringhistoryList = pagenumber == 1 ? res.data.results: this.Gauger_meteringhistoryList.concat(res.data.results); 
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.Gauger_meteringhistoryList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getGauger_meteringhistoryList(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
    }
}
</script>
<style lang="scss" >
.principalEquipmentDetail{
    ul{
        overflow: hidden;
        li{
            height: 1rem!important;
            display: flex!important;
            font-size: .24rem!important;
            background: #fff!important;
            align-items: center!important;
            justify-content: space-between!important;
            padding: 0 .3rem!important;
            flex-direction: inherit!important;
            margin-top: .2rem!important;
            .left_name{
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                span{
                    display: block;
                }
            }
        }
    }
}
.principalEquipmentDetail>div{
     height: 100%!important;
}
</style>