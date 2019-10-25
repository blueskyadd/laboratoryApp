<template>
    <div class="notificationDetail body_main">
        <div class="main">
            <div class="textarea">
                <div>{{$route.params.content}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'notificationDetail',
    data(){
        return{
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'详情'});
    },  
    methods:{
    }
}
</script>
<style lang="scss" scoped>
.notificationDetail{
    background: #fff;
    .main{
        padding: .25rem .3rem 0;
        height: 100%;
        h3{
            font-size: .26rem;
            color: #07a695;
            text-align: left;
            padding-bottom: .26rem;
        }
        .textarea{
            width: 100%;
            height: 100%;
            font-size: .24rem;
            padding: .24rem;
            border-radius: .05rem;
            overflow: hidden;
            div{
                height: 100%;
                overflow-y: scroll;
                text-align: left;
            }
        }
    }
    
}
</style>