<template>
    <div class="MaterialAffirmDetail body_main">
        <div class="MaterialAffirmDetail_main">
            <ul>
                <li v-for="(item, index) in equipmentList" :key="index"><span>{{item.name}}：</span><span>{{item.value}}</span></li>
            </ul>
        </div>
        <footer>
            <button class="weui-btn_warn" @click="setMaterialEngineer_verify(0)">缺少样件</button>
            <x-button type="primary" @click.native="setMaterialEngineer_verify(2)">确认</x-button>
        </footer>
    </div>
</template>
<script>
export default {
    name:'MaterialAffirmDetail',
    data(){
        return{
            equipmentDetailData:{},
            equipmentList:[]
        }
    },
    mounted(){
       
        this.getMaterialEngineer_verifyDetail()
    },
    methods:{
        getMaterialEngineer_verifyDetail(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getMaterialEngineer_verifyDetail + this.$route.query.projectID + '/').then(res =>{
                this.$emit('setHeaderShow', {blod:true,title:res.data.name});
                if(res.data.sample_json){
                    var arr = []
                    for(var i in res.data.sample_json){
                        var params = {
                            'name': i, 
                            'value':res.data.sample_json[i]
                        }
                        this.equipmentList.push(params)
                    }
                }
                this.equipmentDetailData = res.data;
                this.$vux.loading.hide();
            }).catch(err =>{
                console.log(err)
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            }) 
        },
        setMaterialEngineer_verify(data){
            this.$vux.loading.show();
            this.$http.put(this.$conf.env.setMaterialEngineer_verify + this.$route.query.projectID + '/',{'status':data}).then(res =>{
                if(res.status == '200'){
                    this.$vux.toast.text('审核成功');     
                    setTimeout(()=>{
                        this.$router.back();
                    },100)
                }else{
                    this.$vux.toast.text('审核失败');           
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
<style lang="scss" scoped>
.MaterialAffirmDetail{
    background: #fff;
    padding-top: .19rem;
    overflow: hidden;
    .MaterialAffirmDetail_main{
        height: calc(100% - 1.6rem);
        overflow-y: scroll;
        ul{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding-left: .33rem;
            li{
                padding: .15rem;
                display: flex;
                span{
                    display: block;
                    font-size: .28rem;
                    font-family:SimHei;
                    font-weight:400;
                    color:rgba(7,166,149,1)
                }
                span:last-child{
                    color: #666666;
                    flex: 1;
                    text-align: left;
                }
            }
        }
    }
    .MaterialAffirmDetail_main::-webkit-scrollbar{
        display: none;
    }
    footer{
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 1.6rem;
        button{
            display: block;
        }
        .weui-btn_primary{
            width: auto!important;
            padding:  0 .98rem;
            margin: 0;
        }
    }
    
}
</style>