<template>
    <div class="search_box">
        <search
        @on-blur='onBlur'
        @result-click="resultClick"
        @on-change="getResult"
        :results="results"
        v-model="value"
        position="absolute"
        auto-scroll-to-top
        top="66"
        @on-focus="onFocus"
        @on-cancel="onCancel"
        ref="search"></search>
    </div>
</template>
<script>
import { Search } from 'vux';
export default {
    components: {Search},
    props:{
        results: Array,
    },
    data(){
        return{
            value: ''
        }
    },
    methods:{
        resultClick (item) {
            this.$emit('resultClick', item)
        },
        getResult (val) {
            this.$emit('searchList',val)
        },
        onFocus () {
            console.log('onFocus')
        },
        onCancel () {
            console.log('on cancel')
        },
        onBlur(){
            this.$refs.search.setBlur()
        },
        setValue(data){
            this.value = data;
            this.onBlur()
        }
    },
    mounted(){
        this.$nextTick(() => {
           var searchFixed = document.getElementsByClassName('vux-search-box')[0];
           var headerHeight  = document.getElementsByClassName('search_box')[0].offsetHeight
            searchFixed.style.top = headerHeight + this.$StatusbarHeight + 1+ 'px'
        })
         
    }
    
}
</script>
<style lang="scss" >
 .search_box{
    padding: .13rem .1rem .14rem;
    height: 1.07rem;
    display: flex;
    input{
        width: 100%;
        height: .8rem;
        line-height: .8rem;
        background:rgba(255,255,255,1);
        border:1px solid rgba(204,204,204,1);
        border-radius: .05rem;
        font-size: .3rem;
        padding: 0 .2rem;
    }
    input::placeholder{
        font-size: .3rem;
        font-family:Microsoft;
        font-weight:400;
        color:rgba(204,204,204,1);
        text-align: center;
    }
    .weui-search-bar__cancel-btn{
        display: none!important;
    }
    .weui-search-bar{
        padding: 1px ;
        height: .78rem;
        background: #ccc;
    }
    .weui-search-bar__label{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .weui-search-bar__box{
        display: flex;
    }
    .vux-search-fixed{
         backdrop-filter: none;
         left: .1rem;
         width: 97%!important;
    }
    .vux-search-box{
        top: 1.07rem;
    }
}
</style>