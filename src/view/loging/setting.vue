<template>
  <div class="Setting body_main">
    <ul class="equipmentInfo margin_bottom">
        <li class="vux-1px-b">
            <span >姓名</span>
            <span>{{settingDetail.name}}</span>
        </li>
        <li class="vux-1px-b">
            <span>工号</span>
            <span>{{settingDetail.job_num}}</span>
        </li>
        <li class="vux-1px-b">
            <span >公司名称</span>
            <span>{{settingDetail.lab}}</span>
        </li>
        <li class="vux-1px-b">
            <span>部门</span>
            <span>{{settingDetail.department}}</span>
        </li>
        <li >
            <span >职位</span>
            <span>{{settingDetail.role}}</span>
        </li>
    </ul>
    <x-button type="primary" @click.native='goOutSystem'>退出登录</x-button>
  </div>
</template>

<script>
export default {
    name:'Setting',
    data() {
        return {
            settingDetail:{}
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'设置'});
        this.setSystem_userinfo();
    },
    methods:{
        goOutSystem(){
            localStorage.removeItem('jp_token');//存入token值
            localStorage.removeItem('userName');//存放用户名
            localStorage.removeItem('userIdentity');//存放用户身份
            this.$router.replace({name:'logingindex'});
        },
        setSystem_userinfo(){
            this.$vux.loading.show();
            this.$http.get(this.$conf.env.setSystem_userinfo).then(res =>{
                this.settingDetail = res.data;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            }) 
        }
    }
}
</script>

<style lang="scss" scoped>
.Setting{
     overflow: hidden;
    
    ul{
        background: #fff;
        padding-left: .3rem;
        margin-bottom: .7rem;
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
                color: #999;
            }
        }
    }
    
}
</style>