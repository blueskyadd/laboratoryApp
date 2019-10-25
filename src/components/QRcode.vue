<template>
    <div class="qrcode body_main" id="qrcode">
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
        setTimeout(()=>{
            this.startRecognize()
        },100)
    },
    destroyed(){
        this.$store.commit('closeScan')
    },
    methods:{
        startRecognize(){
           let that = this
            // if (!window.plus) return
            that.$store.commit('changescan', new plus.barcode.Barcode('qrcode'))
            that.$store.commit('changeonmarked',onmarked)
            that.$store.commit('staticScan')
            barcode.setStyle({
                background:'#8f9494',
                height:"100%"
            });
            function onmarked(type, result, file) {
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
                    type = '其它' + type
                    break
                }
                // 获得code
                result = result.replace(/\n/g, '')
                // that.codeUrl = result
                var getUrl = ''
                for( var i =0; i<6; i++){
                    getUrl += result.split('/')[i] + '/'
                }
                that.$http.put(result,{'equipment':this.$route.query.equipmentID}).then(res =>{
                    this.$vux.toast.text('扫码维修成功');
                    this.$router.back();
                }).catch(err =>{
                     this.$vux.toast.text(err.response?err.response.data:'扫码失败');
                     this.$router.back();
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.qrcode{
  background: #8f9494;
}
</style>