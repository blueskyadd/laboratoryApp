<template>
    <div class="LookProjectFile body_main">
        <!-- <div id="demo"></div> -->
        <iframe src="./test.pdf" width="100%" height="100%"></iframe>
    </div>
</template>
<script>
import Pdfh5 from "pdfh5";
export default {
    name:'LookProjectFile',
    data(){
        return{
            pdfh5: null
        }
    },
    mounted(){
        this.$emit('setHeaderShow', {blod:true,title:'项目文件'});
        this.pdfh5 = new Pdfh5("#demo", {
            pdfurl: "./test.pdf" 
        });
        //监听完成事件
        this.pdfh5.on("complete", function (status, msg, time) {
            console.log("状态：" + status + "，信息：" + msg + "，耗时：" + time + "毫秒，总页数：" + this.totalNum)
        })
    },
    destroyed(){
    },
    methods:{
    }
}
</script>
<style lang="scss" scoped>
@import "pdfh5/css/pdfh5.css";
.LookProjectFile{
  background: #fff;
}
</style>