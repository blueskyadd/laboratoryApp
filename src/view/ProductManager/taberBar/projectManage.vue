<template>
    <div class="ProjectManager body_main">
        <Search @searchList='searchList'/>
        <main-list  ref="mainList"  :islistData='islistData'>
            <template>
                <li v-for="(item, index) in myproductList" :key="index">
                    <div class="firstChild ststusTextTrue">
                        <span class="projectNumber rightStatus">{{item.number}}</span>
                        <span class="normal ststusText" v-if="item.status == '进行'"><i></i>进行</span>
                        <span class="maintain ststusText" v-else><i></i>{{item.status}}</span>
                    </div>
                    <div class="twoChild equilpmentName"><span>产品名称：{{item.name}}</span></div>
                    <div class="twoChild"><i></i><span>创建事件：{{item.create_time}}</span></div>
                 </li>
            </template>
        </main-list>
    </div>
</template>
<script>
import Search from '../../../components/search'; 
import mainList from '../../../components/mainList'
export default {
    name:'ProjectManager',
    components:{Search, mainList},
    data(){
        return{
            myproductList: [],
            islistData: false,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'负责产品'});
        this.getProductManager_myproductList('');
    },
    methods:{
        getProductManager_myproductList(searchText,searchCollback){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getProductManager_myproductList +'?search=' + searchText).then( res =>{
                this.myproductList = res.data;
                if(searchText){searchCollback(res.data)}
                this.$refs.mainList.scrollpullupStatus(true);
               this.islistData = this.myproductList.length>0?false:true;
               this.$vux.loading.hide();
            }).catch(err =>{
                console.log(err)
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //搜索
        searchList(searchtest){
            this.getProductManager_myproductList(searchtest,(data)=>{
                this.myproductList = data;
            })
        }
    }
}
</script>
<style lang="scss">
.ProjectManager{
   .personnelManagement_list{
       li{
           height: auto!important;
           padding-top: .26rem!important;
       }
       div:first-child{
           display: flex;
           width: 100%;
           justify-content: space-between;
       }
   }
}
</style>