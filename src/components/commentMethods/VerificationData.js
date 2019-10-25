import  { ToastPlugin } from 'vux'
export default{
    VerificationData(data,_this){
        for(var i in data){
            if(typeof data[i] != 'boolean' && !data[i] ){
                _this.$vux.toast.text('*为必填项哦', 'top')
                return false
            }
        }
        return true;
    }  
}