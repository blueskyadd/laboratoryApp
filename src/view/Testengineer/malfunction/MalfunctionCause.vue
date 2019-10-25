<template>
    <div class="MalfunctionCause body_main">
        <div class="from">
            <ul class="equipmentInfo margin_bottom">
                <li class="vux-1px-b" style="padding-right: 0;" id="searchTop">
                    <span >设备编号</span>
                    <search
                        @result-click="resultClick"
                        @on-change="getResult"
                        placeholder='请输入设备编号'
                        :results="results"
                        v-model="equipmentDetail.num"
                        position="absolute"
                        auto-scroll-to-top
                        top="66"
                        ref="search"></search>
                    <!-- <input type="text" placeholder="请输入设备编号"> -->
                </li>
                <li >
                    <span>设备名称</span>
                    <span>{{equipmentDetail.name}}</span>
                </li>
            </ul>
            <ul class=" equipmentInfo margin_bottom">
                <li class="changeList vux-1px-b">
                    <span>实验室</span>
                    <span>{{equipmentDetail.room}}</span>
                </li>
                <li class="changeList">
                    <span>负责人</span>
                    <span>{{equipmentDetail.device_keeper}}</span>
                </li>
            </ul>
            <ul class="equipmentInfo ">
                <li @click="goSynopsis() ">
                    <span>报警原因</span>
                    <span class="MalfunctionCauseText"><p>{{$store.state.synopsis.MalfunctionCause ||  '请编辑'}}</p><div class="weui-cell__ft"></div></span>
                    
                </li>
            </ul>
        </div>
        <x-button type="primary" v-show="isHidebutton" @click.native="createdTestengineer_alarm()">申请</x-button>
    </div>
</template>
<script>
import {XButton, Search } from "vux";
export default {
    name:'MalfunctionCause',
    components: {XButton, Search },
    data(){
        return{
            startTime:'',
            startEnd: '',
            results:[],
            value:'',
            equipmentDetail:{
                'name':'设备名称',
                'num':'',
                'device_keeper':'负责人',
                'room':'实验室'
            },
            isHidebutton:true,//键盘弹出时，底部按钮隐藏
            innerHeight:window.innerHeight,//监听页面高度变化所用参数
            heightChange:window.innerHeight,
            isMoremaintainrecord: true,//搜索数据上拉加载
            MoremaintainrecordNumber: 1,//搜索数据上拉加载页数
            page_size: 15,
            searchText:''
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
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title: '新增报警'});
        /**@name 监听页面高度变化 */
        const that = this;
        window.onresize =()  =>{
            return (()=>{
                this.innerHeight = window.innerHeight
            })()
        }
        /**@name 当前选择数据 */
        if(this.$store.state.alarm.equipmentDetail.id){
             this.equipmentDetail = this.$store.state.alarm.equipmentDetail;
        };
        /**@name 监听搜索数据加载 */
        var scrollBox = document.getElementsByClassName('vux-search_show')[0]
        scrollBox.addEventListener('scroll',(e)=>{
            if(e.target.scrollHeight - e.target.offsetHeight < e.target.scrollTop + 20 && this.isMoremaintainrecord){
                this.isMoremaintainrecord = false;
                this.MoremaintainrecordNumber += 1;
                this.searchTestengineer_searcheqList()
            }
        });
        var searchHeight = document.getElementsByClassName('weui-cells')[0];
        var searchTop = document.getElementById('searchTop').offsetHeight;
        var headerTop = document.getElementsByClassName('vux-header-title')[0].offsetHeight;
         searchHeight.style.top = searchTop + headerTop + this.$StatusbarHeight + 1+ 'px'
    },
    methods:{
        resultClick (item) {
            this.equipmentDetail = item;
        },
        getResult (val) {
            this.MoremaintainrecordNumber = 1;
            this.searchText = val;
            this.searchTestengineer_searcheqList();

        },
        searchTestengineer_searcheqList(){
            this.$vux.loading.show();
            this.$http.get(this.MoremaintainrecordNumber==1?this.$conf.env.searchTestengineer_searcheqList + this.searchText +'&page_size=' + this.page_size:this.$conf.env.searchTestengineer_searcheqList + this.searchText +'&page_size=' + this.page_size + '&p=' +this.MoremaintainrecordNumber).then(res =>{
                this.isMoremaintainrecord = res.data.next ? true : false;
                if(res.data.results){
                    res.data.results.forEach( Element =>{
                        Element.title = Element.name;
                        Element.value = Element.id;
                    })
                    this.results = this.MoremaintainrecordNumber == 1 ? res.data.results:this.results.concat(res.data.results);
                }
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.isMoremaintainrecord = false;
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        goMeasureFlow(){
            this.$router.push({name:'measureFlow'});
        
        },
        changeMaterial(data){
            console.log(data,1)
        },
        changeMaterialPoduct(data){
            console.log(data)
        },
        goSynopsis(){
            this.$router.push({name:'Synopsis',params:{flag:'3'}});
            this.$store.commit('changeDetail',this.equipmentDetail)
        },
        createdTestengineer_alarm(){
            console.log(this.$store.state.synopsis.MalfunctionCause)
            if(!this.equipmentDetail.id){
                this.$vux.toast.text('请先选择设备');
                
            }else if(!this.$store.state.synopsis.MalfunctionCause){
                this.$vux.toast.text('请先输入报警原因');
            }else{
                this.$vux.loading.show();
                this.$http.post(this.$conf.env.createdTestengineer_alarm,{'equipment':this.equipmentDetail.id,'cause':this.$store.state.synopsis.MalfunctionCause}).then(res =>{
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
    beforeRouteLeave (to, from, next) {
        console.log(to)
        if(to.name == 'Malfunction'){
            this.$store.commit('changeDetail',{});
            this.$store.commit('changeSynopsisText',{name:'',flag:'3'})
        }
        next()
    }
}
</script>
<style lang="scss" >
.MalfunctionCause{
    .from{
        height: calc(100% - 1.5rem);
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
                input{
                    width: 5rem;
                    text-align: right;
                }
                .weui-cells{
                    right: 0;
                    top: 1.77rem;
                }
                .vux-search-box{
                    display: flex;
                    justify-content: flex-end;
                    width: 4.7rem;
                    margin-right: .3rem;
                }
                .vux-search-fixed,.weui-search-bar__box{
                    right: 0!important;
                    display: flex;
                    justify-content: flex-end;
                    width: 4.7rem;
                    height: 100%;
                    left: auto;
                    backdrop-filter: none;
                    margin-right: .3rem;
                }
                .weui-search-bar{
                    padding: 0;
                    justify-content: flex-end;
                    width: 4.7rem;
                    .weui-search-bar__box{
                        padding-left: 0;
                        padding-right: 0;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        height: .87rem;
                        width: 4.7rem;
                        .weui-icon-search{
                            display: none;
                        }
                    }
                    .weui-icon-clear{
                        display: none;
                    }
                    .weui-search-bar__input{
                        font-size: .28rem;
                    }
                    .weui-search-bar__cancel-btn{
                        display: none!important;
                    }
                    .weui-search-bar__form{
                        background: #fff;
                    }
                    .weui-search-bar__form::after{
                        display: none;
                    }
                    .weui-search-bar__label{
                        display: none;
                    }
                }
            }
            .MalfunctionCauseText{
                display: flex;
                overflow: inherit!important;
                align-items: center;
                p{
                    max-width: 4.5rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
        .equipmentFrom{
            padding-left: .3rem;
            background: #fff;
            li{
                padding-right: .3rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                span{
                    font-size:.28rem;
                    font-family:simhei;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                }
            }
            .changeList{
                padding-right: 0;
                .vux-cell_popuppick{
                    padding: 0;
                    width: 100%;
                }
            }
        }
    }
   

}
</style>