<template>
<scroller lock-x scrollbar-y height="calc(100% - 1.1rem)" :bounce='Bounce' v-model="scrollerStatus" :use-pullup='true'  @on-pullup-loading="onScrollBottom" ref="scrollerBottom" >
    <div class="scroll_y">
        <ul class="personnelManagement_list">
            <slot ></slot>
            <li>
                <load-more tip="loading" v-show="isLading"></load-more>
                <divider v-show="isloadMore">没有更多了</divider>
                <divider v-show="islistData">暂无数据</divider>
            </li>
        </ul>
    </div>
</scroller>
</template>
<script>
import { Scroller, LoadMore, Divider   } from 'vux';
export default {
    components: {Scroller, LoadMore, Divider},
    props:{
        islistData:Boolean,
        isBounce:Boolean
    },
    data(){
        return{
            pageNumber:1,
            scrollerStatus: {
                pullupStatus: 'default'
            },
            isLading: false,
            isloadMore: false,
            Bounce: this.isBounce ? false: true,//由于数据量过大，这里做反向处理，isBounce为true时不显示边缘回弹效果
        }
    },
    methods:{
        goDeatil(){
            this.$emit("goDeatil");
        },
        
        onScrollBottom(){
            this.$nextTick(()=>{
            this.isLading = true;
                this.pageNumber += 1;
                var _this = this;
                this.$emit("loadmore",this.pageNumber, res =>{
                    this.scrollpullupStatus(false,false);
                },err =>{
                    this.scrollpullupStatus(true,false);
                })
            })
        },
        scrollpullupStatus(flag){
            this.isLading = false;
            this.isloadMore = flag;
            this.scrollerStatus.pullupStatus =flag? 'disabled':'default';
            this.$nextTick(() => {
                this.$refs.scrollerBottom.reset();
            })
        },
    },
    mounted(){
        this.$nextTick(() => {
            this.$refs.scrollerBottom.reset({top: 0});
           
        })
        
    },
    watch:{
        islistData(){
            if(this.islistData){
                this.scrollpullupStatus(false);
            }
        },
        isloadMore(){
            if(this.isloadMore){
                this.islistData = false;
            }
        }
    }
}
</script>
<style lang="scss">
.scroll_y{
    height: calc(100% - 1.1rem);
    overflow: hidden;
    @import '../assets/style/mainList.scss';
}

</style>