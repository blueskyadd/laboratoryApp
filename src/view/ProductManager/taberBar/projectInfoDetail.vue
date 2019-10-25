<template>
    <div class="ProjectInfoDetail body_main">
        <div class="ProjectCarefulDetail_main">
            <h3>不合格</h3>
            <ul>
                <li><span>产品编号：</span><span>{{equipmentDetailData.product_num}}</span></li>
                <li><span>产品名称：</span><span>{{equipmentDetailData.product}}</span></li>
                <li><span>项目编号：</span><span>{{equipmentDetailData.project_num}}</span></li>
                <li><span>项目名称：</span><span>{{equipmentDetailData.project}}</span></li>
                <li><span>试验负责人：</span><span>{{equipmentDetailData.project_leader}}</span></li>
                <li><span>试验编号：</span><span>{{equipmentDetailData.experiment_num}}</span></li>
                <li><span>试验名称：</span><span>{{equipmentDetailData.name}}</span></li>
                <li><span>项目负责人：</span><span>{{equipmentDetailData.engineer}}</span></li>
            </ul>
        </div>
        <div class="infoScroll" :style="{height:!isHidebutton ?'4.4rem':''}">
            <ul class="scroll_list">
                <li v-for="item in equipmentDetailData.interflows" :key="item.id"><span>{{item.user}}：</span><span>{{item.text}}</span></li>
            </ul>
        </div>
        <footer>
            <textarea name="" id="" v-model="intro" cols="30" rows="10"></textarea>
            <span @click="setProduct_exfail()"><img src="../../../assets/img/ProdectManager/projectInfoDetail/send.png" alt=""></span>
        </footer>
    </div>
</template>
<script>
export default {
    name:'ProjectInfoDetail',
    data(){
        return{
            equipmentDetailData:{},
            intro:'',
            isHidebutton:true,//键盘弹出时，底部按钮隐藏
            innerHeight:window.innerHeight,//监听页面高度变化所用参数
            heightChange:window.innerHeight,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'试验详情'});
        this.getProductManager_exfailDetail();
        /**@name 监听页面高度变化 */
        const that = this;
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
        getProductManager_exfailDetail(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getProductManager_exfailDetail + this.$route.query.projectID + '/').then(res =>{
                this.equipmentDetailData = res.data;
                this.$nextTick(() => {
                    var container = document.getElementsByClassName('scroll_list')[0];
                    container.scrollTop = container.scrollHeight;
                })
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            }) 
        },  
        setProduct_exfail(){
            if(!this.intro){
                this.$vux.toast.text('写点内容在发送吧');
            }else{
                this.$vux.loading.show();
                this.$http.put(this.$conf.env.setProduct_exfail + this.$route.query.projectID +'/',{'intro':this.intro}).then(res =>{
                    this.intro = '';
                    this.getProductManager_exfailDetail()
                }).catch(err =>{
                    this.$vux.loading.hide();
                    this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.ProjectInfoDetail{
    background: #fff;
    padding-top: .19rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: .2rem 0 0;
    .ProjectCarefulDetail_main{
        padding: .2rem;
        margin:  0 .3rem;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 8px 4px rgba(164,185,204,0.5);
        border-radius: .04rem;
        h3{
            font-size: .28rem;
        }
        ul{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            li{
                padding: .08rem;
                display: flex;
                justify-content: space-between;
                width: 100%;
                span{
                    display: block;
                    font-size: .28rem;
                    font-family:SimHei;
                    font-weight:400;
                    color:rgba(7,166,149,1);
                }
                span:last-child{
                    color: #333;
                    flex: 1;
                    text-align: right;
                    max-width: 5rem;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
        }
    }
    .infoScroll{
        height: calc(100% - 4.7rem);
        margin: 0 .3rem;
        padding-bottom: .98rem;
        ul{
            display: flex;
            flex-direction: column;
            padding: .2rem 0;
            height: 100%;
            overflow-y: scroll;
            li{
                display: flex;
                padding: 0.1rem 0;
                display: block;
                // justify-content: abs($number: 0)

                span{
                    font-size: .24rem;
                    font-family:PingFangSC;
                    font-weight:400;
                    color:rgba(34,34,34,1);
                    color: rgba(7,166,149,1);
                    float: left;
                }
                span:last-child{
                    flex: 1;
                    text-align: left;
                    color: #333;
                }
            }
            .active{
                align-self: flex-end;
                span:first-child{
                    color: #333;
                }
                span:last-child{
                    color: rgba(7,166,149,1);
                }
            }
        }
        ul::-webkit-scrollbar{
            display: none;
        }
        
    }
    footer{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: .98rem;
        padding: .2rem .3rem;
        box-shadow:0px 4px 6px 0px #000;
        position: fixed;
        bottom:0;
        left: 0;
        width: 100%;
        background: #fff;
        textarea{
            height: .62rem;
            width: 87.6%;
            background: #C4FFEF;
            border-radius: .31rem;
            padding: .1rem .2rem;
            font-size: .24rem;
        }
        span{
            width: .6rem;
            height: .6rem;
            margin-left: .21rem;
            display: block;
            img{
                width: 100%;
                height: 100%;
                display: block;
            }
        }
    }
    
}
</style>