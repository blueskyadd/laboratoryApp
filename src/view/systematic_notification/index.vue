<template>
    <div class="systematic_notification body_main">
        <main-list  @loadmore='loadmore' ref="mainList" :isBounce='true' :islistData='islistData'>
            <template>
                 <swipeout>
                    <swipeout-item transition-mode="follow" v-for="item in msgList" :key="item.id">
                        <div slot="right-menu">
                            <swipeout-button @click.native="deleteSystem_msgnum(item.id,index)" type="warn">删除</swipeout-button>
                        </div>
                        <div slot="content" class="systematic" @click="goNotificationDetail(item)">
                             <div class="twoChild equilpmentName"><span class="titlemsg"><i :style="{background:item.is_read=='未读'?'#f10000':'#07a965'}"></i>系统消息</span></div>
                             <div class="twoChild equilpmentName title"><span>{{item.title}}</span><span class="normal ststusText">{{item.create_time}}</span></div>
                            <div class="textHidden">{{item.content}}</div>
                        </div>
                    </swipeout-item>
                </swipeout>
            </template>
        </main-list>
    </div>
</template>
<script>
import mainList from '../../components/mainList';
import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
export default {
    name:'systematic_notification',
    components:{ mainList,Swipeout, SwipeoutItem, SwipeoutButton},
    data(){
        return{
            msgList: [],
            searchText:'',
            islistData: false,
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'消息通知'});
        this.getSystem_msg(1,'',12);
    },
    methods:{
        goNotificationDetail(item){
            this.$router.push({name:'notificationDetail',params:{content:item.content}});
            item.is_read = '已读';
            this.setSystem_msgnum(item.id);
        },
        setSystem_msgnum(ID){
            this.$http.put(this.$conf.env.setSystem_msgnum +ID + '/').then(res =>{})
        },
        deleteSystem_msgnum(ID,index){
            this.$http.delete(this.$conf.env.deleteSystem_msgnum +ID + '/').then(res =>{
                if(res.status == '204'){
                    this.$vux.toast.text('删除成功');     
                    this.msgList.splice(index,1)
                }else{
                    this.$vux.toast.text('删除失败');             
                }
            }).catch(err =>{
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        getSystem_msg(pagenumber,searchText,page_size, success, error,searchCallback){
            this.$vux.loading.show();
            this.$http.get( pagenumber == 1 ? this.$conf.env.getSystem_msg + '?search=' + searchText + '&page_size=' + page_size: this.$conf.env.getSystem_msg + '?search=' + searchText + '&p=' + pagenumber+ '&page_size=' + page_size).then( res =>{
                if(!searchText){
                    this.msgList = pagenumber == 1 ? res.data.results: this.msgList.concat(res.data.results); 
                }else{
                    searchCallback(res.data.results)
                }
                if(pagenumber != 1){
                    res.data.next ? success() : error();
                }else{
                     res.data.next ?this.$refs.mainList.scrollpullupStatus(false):this.$refs.mainList.scrollpullupStatus(true);
                }
                this.islistData = this.msgList.length>0?false:true;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$refs.mainList.scrollpullupStatus(true);
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },
        //加载更多
        loadmore(pagenumber,success, error){
            this.getSystem_msg(pagenumber,this.searchText,12, ()=>{success();},()=>{ error();});
        },
    }
}
</script>
<style lang="scss">
.systematic_notification{
   .personnelManagement_list{
       .vux-swipeout-item{
            height: auto!important;
        }
       .vux-swipeout-content{
           width: 100%;
           font-size: .22rem;
           height: 100%;
           .systematic{
                .equilpmentName{
                    justify-content: space-between;
                    padding-top: .2rem;
                    .titlemsg{
                        display: flex;
                        align-items: center;
                    }
                    .ststusText{
                        flex: inherit;
                    }
                }
                .title{
                    padding-top: 0;
                }
                .textHidden{
                    font-size: .24rem;
                    text-align: left;
                    text-indent: .4rem;
                    display:-webkit-box;
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2;
                    overflow:hidden; 
                    text-overflow:ellipsis;
                    font-family:simhei;
                }
            }
       }
        
   }
}
.systematic_notification>div{
    height:100%!important;
}
</style>