<template>
    <div class="ApplyRepair body_main">
        <div class="from">
            <ul class="equipmentInfo margin_bottom">
                <li @click="goMeasureFlow()" class="vux-1px-b">
                    <span >设备名称</span>
                    <span>{{$route.query.projectName}}</span>
                </li>
                <li @click="goMeasureFlow()" class="vux-1px-b">
                    <span>设备编号</span>
                    <span>{{$route.query.projectNumber}}</span>
                </li>
                <li @click="goMeasureFlow()" >
                    <span>设备所属实验室</span>
                    <span>{{$route.query.projectRoom}}</span>
                </li>
            </ul>
            <ul class="equipmentFrom">
                <li class="uploadImg margin_bottom">
                    <div class="ImgLink">
                        <input type="file" ref="file"  @change='updataReport' style="display:none" >
                        <div class="Img" v-for="(item, index) in upLoadImhList" :key="index">
                            <i><img @click.stop="deleteImg(index)" src="../../../../assets/img/equipment/ExceptionDclare/deleteImgButtom.png" alt=""></i>
                            <img class="previewer-demo-img" :src="item.src" :data-src="item.src" alt="" lazy="loaded" @click="showImg(index)">
                        </div>
                        <div class="uploadButton" @click="upLoadImg"></div>
                    </div>
                    
                </li>
                <li class="textarea ">
                    <h3>故障现象</h3>
                    <textarea name="" id="" max-length="800" v-model="exeqDetail.cause" placeholder="编辑故障现象(800)"></textarea>
                </li>
            </ul>
            <x-button type="primary"  v-show="isHidebutton" @click.native="createdTestengineer_exeq()">提交</x-button>
        </div>
        <!-- //大图展 -->
        <div v-transfer-dom >
            <previewer :list="upLoadImhList" ref="previewer" :options="options"></previewer>
        </div>
    </div>
</template>
<script>
import {XButton ,Previewer, TransferDom,} from "vux";
export default {
    name:'ApplyRepair',
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
            upLoadImhList:[],
            exeqDetail:{
                "exeq": this.$route.query.projectID,
                "image":'',
                "cause":''
            },
            isHidebutton:true,//键盘弹出时，底部按钮隐藏
            innerHeight:window.innerHeight,//监听页面高度变化所用参数
            heightChange:window.innerHeight
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title: '申请报修'});
        //监听页面高度变化
        const that = this
        window.onresize =()  =>{
            return (()=>{
                this.innerHeight = window.innerHeight
            })()
        }
    },
    watch: {
      innerHeight(newval,oldval){
          if(this.heightChange != newval){
              this.isHidebutton = false
          }else{
              this.isHidebutton = true
          }
      },
    },
    methods:{
        goMeasureFlow(){
            this.$router.push({name:'measureFlow'})
        },
        upLoadImg(){
            this.$refs.file.click();
        },
        showImg(index){
            this.$refs.previewer.show(index)
        },
        deleteImg(index){
            this.upLoadImhList.splice(index, 1);
        },
        updataReport(e){
            if(this.upLoadImhList.length == 1){
                this.$vux.toast.text('最多上传一张图片哦', 'top');
            }else{
                this.$updataFile.updataFile(e.target.files[0], res =>{
                    var obj={src: res.data.file}
                    this.upLoadImhList.push(obj)
                },this)
            }
        },
        createdTestengineer_exeq(){
            if(this.upLoadImhList.length == 0){
                this.$vux.toast.text('请上传故障图片');
            }else if(!this.exeqDetail.cause){
                this.$vux.toast.text('请编辑故障现象');
            }else{
                this.$vux.loading.show();
                this.exeqDetail.image = this.upLoadImhList[0].src;
                this.$http.post(this.$conf.env.createdTestengineer_exeq,this.exeqDetail).then(res =>{
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
    }
}
</script>
<style lang="scss" >
.ApplyRepair{
    overflow: hidden;
    .from{
        height: 100%;
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
            padding-bottom: .24rem;
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
                    background: url('../../../../assets/img/equipment/ExceptionDclare/uploadButton.png') 0 0 /100% 100%;
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