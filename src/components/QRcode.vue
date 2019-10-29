<template>
    <div class="qrcode body_main" id="code">
    </div>
</template>
<script>
import { setTimeout } from 'timers';
export default {
    name:'qrcode',
    data(){
        return{
            scan:null,
            codeUrl:''
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'二维码'})
        // this.$vux.loading.show();
    },
    activated(){
        this.$vux.loading.show({
            text: '载入中.....'
        })
        const self = this
        if (window.plus) {
            self.plusReady()
        } else {
            document.addEventListener('plusready', self.plusReady, false)
        }

        document.addEventListener('DOMContentLoaded', function () {
        alert('DOMLoaded')
            self.plusReady()
        }, false)
        
        setTimeout(function () {
        self.sweep() // 扫码函数
        }, 1000)
    },
    destroyed(){ 
         if (!window.plus) return;
        //  this.scan.close();
        this.$store.commit('closeScan')
    },
    methods:{
        plusReady () {
            this.$vux.loading.hide();
            const self = this
            // 获取窗口
            self.scan = new plus.barcode.Barcode('code',{
                frameColor: "#009DE2",
                background:'#8f9494',
                scanbarColor: "#009DE2",
                height:"100%"
            })
            self.scan.onmarked = self.onmarked
        },
        // 开始扫码
        sweep () {
            const self = this
            self.scan.start()
        },
        onmarked (type, result) {
            let that = this
            var text = '未知: '

            switch (type) {
            case plus.barcode.QR:
                type = 'QR'
                break
            case plus.barcode.EAN13:
                type = 'EAN13'
                break
            case plus.barcode.EAN8:
                type = 'EAN8'
                break
            default:
                type = '其他' + type
                break
            }
            result = result.replace(/\n/g, '')
                that.$http.put(result,{'equipment':that.$route.query.equipmentID}).then(res =>{
                    plus.nativeUI.confirm("扫码维修成功", function(event) {
                        that.$router.back();
                    }, "TIMS", "确定");
                }).catch(err =>{
                    plus.nativeUI.confirm("扫码失败", function(event) {
                       that.$router.back();
                    }, "TIMS", "确定");
                })
        }
    }
}
</script>
<style lang="scss" scoped>
.qrcode{
  background: #8f9494;
}
</style>