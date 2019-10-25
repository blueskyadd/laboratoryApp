import http from '../../track/http'
import conf from '../../config/index'
export default {
    updataFile(files,success,_this){
        _this.$vux.loading.show();
        let params = new FormData();
        params.append( "file",files)
        if(files){
            http.post(conf.env.updataFile, params, true).then( res =>{
                _this.$vux.loading.hide();
                if(res.status == '201'){
                    success(res)
                }else{
                    _this.$vux.toast.text('上传失败', 'top');
                }
                
            }).catch(err =>{
                _this.$vux.loading.hide();
                _this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
        }else{
            _this.$vux.loading.hide();
        }
        
    }
}