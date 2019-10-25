<template>
  <div id="app" :style="{paddingTop:`${$StatusbarHeight}px`}">
    <x-header class="vux-1px-b" v-if="isHeaderShow" :left-options="{backText: ''}">
      {{headerTitle}}
      <a  slot="right" class="establish schedule" v-if="isWatchManage" @click="scheduleManage()">
        <img src="../src/assets/img/header/schedule.png" alt="">
      </a>
      <a  slot="right" class="establish" v-if="isEstablish" @click="establishTest()">
        <img src="../src/assets/img/header/establish.png" alt="">
      </a>
      <a slot="right" @click="changeRighTitle()"  v-if="isRightTitle">
        <p>{{rightTitle}}</p>
        <span :class="isHiddenBox?'hiddenHeight': ''"></span>
      </a>
    </x-header>
    <index-header v-if="isIndexHeader" :indexHeaderTitle='indexHeaderTitle'>
    </index-header>
    <router-view @setHeaderShow='setHeaderShow' @setIndexHeaderTitle='setIndexHeaderTitle' ref="headerChange"/>
  </div>
</template>

<script>
import { XHeader, Badge  } from 'vux';
import indexHeader from './components/indexHeader'
import { setTimeout } from 'timers';
export default {
  name: 'App',
  components: {XHeader, Badge, indexHeader  },
  data(){
    return{
      isHeaderShow:true,
      isIndexHeader: false,
      indexHeaderTitle:'',
      headerTitle: '',
      rightTitle:'',
      isRightTitle: false,
      isHiddenBox: false,//箭头class
      isEstablish: false,//创建试验
      isWatchManage: false,//进度
    }
  },
  methods:{
    setHeaderShow(data){
      this.isIndexHeader = false;
      this.isHeaderShow = data.blod;
      this.headerTitle = data.title;
      this.isRightTitle = data.isRightTitle ? true: false;//右边自定义文字箭头class
      this.rightTitle = data.rightTitle ? data.rightTitle : '';//右边自定义文字
      this.isEstablish = data.isEstablish ? true : false;//添加按钮
      this.isWatchManage = data.isWatchManage ? true: false;//进度图标
    },  
    setIndexHeaderTitle(data){
      this.isHeaderShow = false;
      this.isIndexHeader = data.flag;
      this.indexHeaderTitle = data.title;
    },
    changeRighTitle(){
      this.isHiddenBox = true;
      this.$refs.headerChange.changeRighTitle();
    },
    establishTest(){
      this.$refs.headerChange.setEstablishTest();
    },
    scheduleManage(){
      this.$refs.headerChange.scheduleManage();
    },
    bindBack() {
        let vm = this;
        let first = null;
        plus.key.addEventListener("backbutton", () => {
            if (
              this.$route.name == "LabManagerIndex" ||
              this.$route.name == "LogingIndex"||
              this.$route.name == "gaugerIndex"||
              this.$route.name == "EquipmentengineerIndex"
            ) {
              if (!first) {
                first = new Date().getTime(); //记录第一次按下回退键的时间
                plus.nativeUI.toast("再按一次退出应用");
                setTimeout(function() {
                  //1s中后清除
                  first = null;
                }, 2000);
              } else {
                if (new Date().getTime() - first < 2000) {
                  //如果两次按下的时间小于1s，
                  plus.runtime.quit(); //那么就退出app
                }
              }
            }else if(this.$route.name == 'QRcodeIndex'){

              // this.$store.commit("changeImPage", true);
               this.$router.back(-1)
              this.$store.commit('closeScan')
            }else{
               this.$router.back(-1)
            }
        });
      },
  },
  mounted(){
    this.bindBack()
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #fff;
  height: 100%;
  overflow: hidden;
}
</style>
