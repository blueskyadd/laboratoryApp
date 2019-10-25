<template>
    <div class="ProjectCost body_main">
        <main-list ref="mainList"  :islistData='islistData'>
            <template>
                <li @click="goTestCost(item)"  v-for="(item, index) in expendDetailList" :key="index" >
                    <div class="firstChild ststusTextTrue">
                        <span class="projectNumber">{{item.number}}</span>
                    </div>
                    <div class="twoChild equilpmentName"><span>产品名称：{{item.name}}</span></div>
                    <div class="twoChild"><i></i><span>费用：{{item.expense}}</span></div>
                    <div class="rightDetaild">
                        详情
                    </div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import mainList from '../../../components/mainList'
export default {
    name:'ProjectCost',
    components:{mainList},
    data(){
        return{
            expendDetailList:[],
            searchText:'',
            islistData: false,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'项目费用'});
        this.getProductManager_expendDetail();
    },
    methods:{
        goTestCost(item){
            this.$router.push({name:'TestCost',query:{projectID: item.id}})
        },
        getProductManager_expendDetail(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getProductManager_expendDetail + this.$route.query.projectID +'/' ).then( res =>{
                this.expendDetailList =res.data.experiment_projects; 
                this.$refs.mainList.scrollpullupStatus(true);
                this.islistData = this.expendDetailList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
    }
}
</script>
<style lang="scss">
.ProjectCost{
   .personnelManagement_list{
       li{
           height: auto!important;
           padding-top: .2rem!important;
           position: relative;
           padding-bottom: 0!important;
           .rightDetaild{
                position: absolute;
                height: 100%;
                width: 1.56rem;
                background: #08A795;
                display: flex;
                top: 0;
                right: 0;
                align-items: center;
                justify-content: center;
                font-size: .36rem;
                font-family:simhei;
                font-weight:400;
                color:rgba(255,255,255,1);
            }
            .twoChild{
                margin-bottom: .16rem;
            }
       }
       
   }
}
.ProjectCost>div{
    height:100%!important;
}
</style>