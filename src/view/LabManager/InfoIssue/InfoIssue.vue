<template>
    <div class="InfoIssueIndex body_main">
        <div class="main">
            <h3>信息发布：</h3>
            <div class="textarea">
                <textarea  placeholder="请编辑公告" v-model="textSynopsis" maxlength="20"></textarea>
                <div class="number">{{textSynopsis.length}}/20</div>
            </div>
            
        </div>
        <x-button type="primary" @click.native="sendLabmanage_systremMsg()">发布</x-button>
    </div>
</template>
<script>
export default {
    name: 'InfoIssueIndex',
    data(){
        return{
            titleName:'',
            textSynopsis: ''
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'信息发布'});
    },
    methods: {
        sendLabmanage_systremMsg(){
            if(!this.textSynopsis){
                this.$vux.toast.text('写点内容再发布吧'); 
            }else{
                this.$vux.loading.show();
                this.$http.post(this.$conf.env.sendLabmanage_systremMsg,{'content':this.textSynopsis}).then( res=>{
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
    },
}
</script>
<style lang="scss" scoped>
.InfoIssueIndex{
    background: #fff;
    .main{
        padding: .25rem .3rem 0;
        height: calc(100% - 1.3rem);
        h3{
            font-size: .26rem;
            color: #07a695;
            text-align: left;
            padding-bottom: .26rem;
        }
        .textarea{
            width: 100%;
            height: 3.86rem;
            font-size: .24rem;
            padding: .24rem;
            border:1px  solid rgba(205,205,205,1);
            border-radius: .05rem;
            textarea{
                border: 0;
                height: calc(100% - .24rem);
                width: 100%;
            }
            .number{
                color: #07a695;
                text-align: right;
            }
        }
    }
    
}
</style>