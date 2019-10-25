<template>
    <div class="Loging_index" >
        <div class="register_from" id="register_from_data">
            <div class="logo_box">
                <span class="logoImg">
                    <img src="../../assets/img/loging/logo.png" alt="">
                </span>
                <h3 class="Tims_title">TIMS</h3>
                <h3>实验室信息化管理系统</h3>
            </div>
            <div class="userName"><span><img src="../../assets/img/loging/userName.png" alt=""></span><input v-model="userName" type="text" placeholder="用户名"></div>
            <div class="password"><span><img src="../../assets/img/loging/passWord.png" alt=""></span><input v-model="passWord" type="password" placeholder="密码"></div>
            <div class="register"  @click="register">登录</div>
        </div>
        <p>忘记密码请联系管理员</p>
    </div>
</template>
<script>
import { setTimeout } from 'timers';
import filterData from '../../components/commentMethods/VerificationData'
export default {
    name: 'LogingIndex',
    data(){
        return{
            userName:'17630718222',
            passWord:'asd123456'
        }
    },
    created(){
        this.$emit('setHeaderShow', {blod:false,title:''})
        document.getElementById("app").className="add_bg"; 
        setTimeout(()=>{
            plus.navigator.setStatusBarStyle('light');
        },100)
    },
    mounted(){
        document.getElementById("app").className="add_bg"; 
    },
    destroyed(){
        document.getElementById("app").removeAttribute("class","add_bg");
        setTimeout(()=>{
            plus.navigator.setStatusBarStyle('dark');
        },100)
        this.$emit('setHeaderShow', {blod:true,title:''})
    },
    methods:{   
        register(){
             if(!this.VerificationData()) return;
            let params ={
                "username": this.userName,//手机号
                "password": this.passWord,//密码
            }
            this.$http.post(this.$conf.env.uesrRegister,params).then(res =>{
                    console.log(res)
                if(res.status == '201'){
                    localStorage.setItem('jp_token',res.data.token);//存入token值
                    localStorage.setItem('userName',res.data.name);//存放用户名
                    localStorage.setItem('userIdentity',res.data.role);
                    switch(res.data.role){
                        case 1:
                        this.$router.replace({name:'LabManagerIndex'});//管理员
                        break;
                        case 2:
                        this.$router.replace({name: 'ProjectManagerIndex'});//产品经理
                        break;
                        case 3:
                        this.$router.replace({name:'TestManagerIndex'});//实验室经理
                        break;
                        case 4:
                        this.$router.replace({name:'ProjectManageIndex'});//项目经理
                        break;
                        case 5:
                        this.$router.replace({name: 'TestengineerIndex'});//试验工程师
                        break;
                        case 6:
                        this.$router.replace({name: 'gaugerIndex'});//实验设备计量员工
                        break;
                        case 7:
                        this.$router.replace({name: 'EquipmentengineerIndex'});//试验设备工程师
                        break;
                        case 8:
                        this.$router.replace({name: 'materialEngineerIndex'});//物料管理员
                        break;
                    }
                }
            }).catch(err =>{
                if(err.response.status == '401'){
                    this.$vux.toast.text(err.response.data.message?err.response.data.message:err.response.data, 'top')
                }else if(err.response.state == '500'){
                    this.$vux.toast.text('服务器错误', 'top')
                }else{
                    this.$vux.toast.text('登陆失败，请稍候', 'top')
                }
            })
        },
        VerificationData(){
            if(!this.userName && this.passWord){
                this.$vux.toast.text('请输入您的用户名', 'top')
                return false;
            }else if(this.userName && !this.passWord){
                this.$vux.toast.text('请输入您的密码', 'top')
                return false;
            }else if(!this.userName && !this.passWord){
                this.$vux.toast.text('请输入您的用户名和密码', 'top')
            }else{
                return true;
            }
        },
    },
    beforeRouteEnter (to, from, next) {
        let isLogin = localStorage.getItem('userIdentity');
        if (!isLogin) {
            next();
        }else {
            var routerName = '';
            switch(localStorage.getItem('userIdentity')){
                case '1':
                routerName = 'LabManagerIndex';//管理员
                break;
                case '2':
                routerName =  'ProjectManagerIndex';//产品经理
                break;
                case '3':
                routerName = 'TestManagerIndex';//实验室经理
                break;
                case '4':
                routerName = 'ProjectManageIndex';//项目经理
                break;
                case '5':
                routerName =  'TestengineerIndex';//试验工程师
                break;
                case '6':
                routerName =  'gaugerIndex';//实验设备计量员工
                break;
                case '7':
                routerName =  'EquipmentengineerIndex';//试验设备工程师
                break;
                case '8':
                routerName =  'materialEngineerIndex';//物料管理员
                break;
            }
            next({name: routerName});
        }
    }
}
</script>
<style lang="scss" scoped>
body {
  background-color: rgba(7,166,149,1);
}
.Loging_index{
    height: 100%;
    background:linear-gradient(0deg,rgba(7,166,149,1) 0%,rgba(106,203,155,1) 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo_box{
        padding-top: 5%;
        margin-bottom: 6%;
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        .logoImg{
            display: block;
            width: 52%;
            margin-bottom: .55rem;
            img{
                width: 100%;
            }
        }
        .Tims_title{
            margin-bottom: .38rem;
        }
        h3{
            font-size: .52rem;
            font-family:MFYueHei;
            color: #FFFFFF;
        }
    }
    .register_from{
        width: 100%;
        // height: ;
        display: flex;
        flex-direction: column;
        align-items: center;
        .register,.userName,.password{
            width: 88%;
            height: 1rem;
            border-radius: .5rem;
            background: rgba(255,255,255,0.4);
            display: flex;
            align-items: center;
        }
        .userName,.password{
            margin-bottom: .28rem;
            padding-left: .44rem;
            span{
                width: .46rem;
                height: .48rem;
                display: block;
                img{
                    width: 100%;
                    display: block;
                }
            }
            input{
                width: calc(100% - .4rem);
                height: 80%;
                font-size: .3rem;
                padding-left: .24rem;
            }
            input:-webkit-autofill { background-color: transparent!important; }
            
        }
        .password{
            margin-bottom: .54rem;
            padding-left: .44rem;
        }
       .register{
            background: #FFFFFF;
            font-size: .52rem;
            color: #08A695;
            justify-content: center;
            font-weight:bold;
        }
    }
    p{
        font-family:SimHei;
        font-weight:400;
        color:rgba(255,255,255,1);
        font-size: .28rem;
        line-height: 1.06rem;
        float: right;
        padding-left: 3.1rem;
    }
}
</style>