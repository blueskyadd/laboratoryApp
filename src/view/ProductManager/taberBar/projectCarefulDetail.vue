<template>
    <div class="ProjectCarefulDetail body_main">
        <div class="ProjectCarefulDetail_main">
            <ul>
                <li><span>主题：</span><span>PCBA和机构更改</span></li>
                <li><span>申请人：</span><span>张磊</span></li>
                <li><span>所属部门：</span><span>研发部</span></li>
                <li><span>申请日期：</span><span>2018.07.05</span></li>
                <li><span>申请原因：</span><span>回回零回回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！零误差较大！误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！零误差较大！</span></li>
                <li><span >备注：</span><span>回零误差回回回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！零误差较大！回回零回回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！零误差较大！回回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！零误差较大！回回零误差较大！回回回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！零误差较大！回回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！零误差较大！回回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！零误差较大！零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！零误差较大！误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！回零误差较大！零误差较大！较大！</span></li>
            </ul>
        </div>
        <footer>
            <button class="weui-btn_warn">不同意</button>
            <x-button type="primary">同意</x-button>
        </footer>
    </div>
</template>
<script>
export default {
    name:'ProjectCarefulDetail',
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'审批详情'})
    },
}
</script>
<style lang="scss" scoped>
.ProjectCarefulDetail{
    background: #fff;
    padding-top: .19rem;
    overflow: hidden;
    .ProjectCarefulDetail_main{
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
    .ProjectCarefulDetail_main::-webkit-scrollbar{
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