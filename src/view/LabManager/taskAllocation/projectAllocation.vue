<template>
    <div class="projectAllocation body_main">
        <popup-picker :placeholderTitle='popupObj.placeholderTitle' @changeData='setActivelyData' :disabled='disabled' :popupTitle='popupObj.popupTitle' :popupList='popupObj.popupList'  :activelyData='popupObj.activelyData'></popup-picker>
        <div class="projectAllocation_list">
            <ul>
                <li v-for="(item, index) in Labmanage_projectDetailList" :key="item" :class="index==(Labmanage_projectDetailList.length-1)?'':'vux-1px-b'" @click="goProjectSelectDetail(item)">
                    <span>{{item.name}}</span>
                    <span class="weui-cell__ft"></span>
                </li>
            </ul>
        </div>
        <x-button type="primary" @click.native="allocationLabmanage_projectLeader()">确定</x-button>
    </div>
</template>
<script>
import popupPicker from '../../../components/PopupPicker';
export default {
    name:'projectAllocation',
    components: {popupPicker},
    data(){
        return{
            popupObj:{
                placeholderTitle:'选择负责人',
                popupTitle:'项目分配',
                popupList:[],
                activelyData:[], 
            },
            Labmanage_projectDetailList:[]
        }
    },

    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'项目分配'});
        this.getLabmanage_projectDetailList();
    },
    methods:{
        goProjectSelectDetail(item){
            this.$router.push({name:'projectSelectDetail', query:{projectName:item.name,projectID:item.id}})
        },

        getLabmanage_projectDetailList(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.getLabmanage_projectDetailList + this.$route.query.projectID + '/').then(res =>{
                this.Labmanage_projectDetailList = res.data.experiments;
                this.disabled = res.data.project_leader ? true : false;
                this.popupObj.placeholderTitle = res.data.project_leader ?res.data.project_leader : '选择负责人';
                res.data.project_leader?'':this.getLabmanage_projectEngineerList();
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },

        getLabmanage_projectEngineerList(project_leader){
            this.$http.get(this.$conf.env.getLabmanage_projectEngineerList).then(res =>{
                if(res.data.length == 0) return;
                res.data.forEach(Element =>{
                    Element.value = Element.id.toString();
                })
                this.popupObj.popupList = res.data;
            }).catch(err =>{
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        },

        setActivelyData(data){
            this.popupObj.activelyData = data;
        },
        allocationLabmanage_projectLeader(){
            if(this.disabled){
                this.$vux.toast.text('该项目已分配负责人')
            }else{
                if(this.popupObj.activelyData.length){
                    this.$http.put(this.$conf.env.allocationLabmanage_projectLeader + this.$route.query.projectID + '/',{'project_leader':this.popupObj.activelyData[0]-0}).then(res =>{
                        if(res.status == '200'){
                            this.$vux.toast.text('分配成功');
                            this.$router.back();
                        }else{
                            this.$vux.toast.text('分配失败')             
                        }
                    }).catch( err =>{
                        this.$vux.toast.text(err.response?err.response.data:'服务器错误')
                    })
                }else{
                    this.$vux.toast.text('请选择项目负责人')
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.projectAllocation{
    .projectAllocation_list{
        padding-top: .1rem;
        height: calc(100% - 1.88rem);
        overflow-y: scroll;
        ul{
            padding-left: .3rem;
            background: #fff;
            li{
                height: .94rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 .3rem 0 0 ;
                span{
                    font-size: .28rem;
                        font-family:simhei;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                }
            }
        }
    }
    .projectAllocation_list::-webkit-scrollbar{
        display: none;
    }
   
}
</style>