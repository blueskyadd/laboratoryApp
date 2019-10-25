<template>
    <div class="ExceptionDclare body_main">
        <div class="from">
            <ul class="equipmentInfo margin_bottom">
                <li @click="goMeasureFlow()" class="vux-1px-b">
                    <span >设备名称</span>
                    <span>盐雾试验箱</span>
                </li>
                <li @click="goMeasureFlow()" class="vux-1px-b">
                    <span>设备编号</span>
                    <span>H18425Y143</span>
                </li>
                <li @click="goMeasureFlow()" >
                    <span>设备所属实验室</span>
                    <span>H18425Y143</span>
                </li>
            </ul>
            <ul class="equipmentFrom">
                <li class="uploadImg margin_bottom">
                    <div class="ImgLink">
                        <div class="Img" v-for="(item, index) in upLoadImhList" :key="index">
                            <i><img @click.stop="deleteImg(index)" src="../../../assets/img/equipment/ExceptionDclare/deleteImgButtom.png" alt=""></i>
                            <img class="previewer-demo-img" :src="item.src" :data-src="item.src" alt="" lazy="loaded" @click="showImg(index)">
                        </div>
                        <div class="uploadButton" @click="upLoadImg"></div>
                    </div>
                    
                </li>
                <li class="textarea ">
                    <h3>故障现象</h3>
                    <textarea name="" id="" placeholder="编辑故障现象"></textarea>
                </li>
            </ul>
        </div>
        <x-button type="primary">保存</x-button>
        <!-- //大图展 -->
        <div v-transfer-dom >
            <previewer :list="upLoadImhList" ref="previewer" :options="options"></previewer>
        </div>
    </div>
</template>
<script>
import {XButton ,Previewer, TransferDom,} from "vux";
export default {
    name:'ExceptionDclare',
    directives: {TransferDom},
    components: {XButton, Previewer },
    data(){
        return{
            options: {
                getThumbBoundsFn (index) {
                let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
                let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                let rect = thumbnail.getBoundingClientRect()
                return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
                }
            },
            upLoadImhList:[{
                src:'http://img4.imgtn.bdimg.com/it/u=1688026885,2773767715&fm=26&gp=0.jpg'
            },
            {
                src:'http://img4.imgtn.bdimg.com/it/u=1688026885,2773767715&fm=26&gp=0.jpg'
            },
            {
                src:'http://img4.imgtn.bdimg.com/it/u=1688026885,2773767715&fm=26&gp=0.jpg'
            }]
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title: '异常申报'})
    },
    methods:{
        goMeasureFlow(){
            this.$router.push({name:'measureFlow'})
        },
        upLoadImg(){

        },
        showImg(index){
            this.$refs.previewer.show(index)
        },
        deleteImg(index){
            this.upLoadImhList.splice(index, 1);
        }
    }
}
</script>
<style lang="scss" >
.ExceptionDclare{
    overflow: hidden;
    .from{
        height: calc(100% - 1.5rem);
        overflow: scroll;
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
            .uploadImg{
                padding: .4rem .3rem .2rem;
                background: #fff;
                .ImgLink{
                    display: flex;
                    flex-wrap: wrap;
                    .Img{
                        width: 1.28rem;
                        height: 1.28rem;
                        border: 1px dotted #65c8be;
                        margin-right: .2rem;
                        margin-bottom: .2rem;
                        position: relative;
                        i{
                            display: block;
                            background: #fff;
                            border-radius: 50%;
                            width: .3rem;
                            height: .3rem;
                            position: absolute;
                            top: -.1rem;
                            right: -.1rem;
                            img{
                                display: block;
                                width: 100%;
                                height: 100%;

                            }
                        }
                        img{
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                .uploadButton{
                    height: 1.28rem;
                    width: 1.28rem;
                    background: url('../../../assets/img/equipment/ExceptionDclare/uploadButton.png') 0 0 /100% 100%;
                }
            }
            .textarea{
                flex-direction: column;
                background: #fff;
                font-size: .28rem;
                font-family:simhei;
                font-weight:400;
                color:rgba(51,51,51,1);
                align-items: flex-start;
                padding:.2rem .3rem .2rem .3rem;
                h3{
                    text-align: left;
                }
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
     .from::-webkit-scrollbar{
             display: none;
         }
   

}
</style>