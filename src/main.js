// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'

Vue.config.productionTip = false

//css样式
import './assets/style/resize.css';//样式重定义
import './assets/style/vux.scss';//vuxUI样式重定义
import './assets/style/common.scss';//全局class


//ui组件
import {ProgressBar} from 'vue-ydui/dist/lib.rem/progressbar';//加载环形图
import {CountUp} from 'vue-ydui/dist/lib.rem/countup';//动态数据
import echarts from 'echarts';//echarts
Vue.component(ProgressBar.name, ProgressBar);
Vue.component(CountUp.name, CountUp);
Vue.prototype.$echarts = echarts

//文件上传
import updataFile from './components/commentMethods/updataFile';
Vue.prototype.$updataFile  = updataFile;

//vux button 按钮
import { XButton  } from 'vux'
Vue.component('x-button', XButton)
import  { ToastPlugin, LoadingPlugin   } from 'vux'
Vue.use(ToastPlugin, {position: 'center'})
Vue.use(LoadingPlugin)

/**@name接口请求 */
import conf from "./config/index.js";
import http from "./track/http.js";

Vue.prototype.$http = http;
Vue.prototype.$conf = conf;

// vconsole
import VConsole from "vconsole";//vconsole
if (process.env.NODE_ENV === 'production') {
  new VConsole()
}


// if(!window.plus){
  Vue.prototype.$StatusbarHeight = 20;
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
// }else{
  // setTimeout(()=>{
  //   if(window.plus){
  //     var isImmersedStatusbar = plus.navigator.isImmersedStatusbar();
  //     if (isImmersedStatusbar) {
  //         var StatusbarHeight = plus.navigator.getStatusbarHeight();
  //         if (plus.device.model.toString() == 'iPhoneX') {
  //             Vue.prototype.$StatusbarHeight = StatusbarHeight + 15;
  //         } else {
  //             // if (plus.os.version < 11) {
  //             //     FastClick.attach(document.body)
  //             // }
  //             Vue.prototype.$StatusbarHeight = StatusbarHeight;
  //         }
  //     }
  //     plus.navigator.setStatusBarStyle('dark');
  //     plus.webview.currentWebview().setStyle({
  //       softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
  //     });
  //     new Vue({
  //       el: '#app',
  //       router,
  //       store,
  //       render: h => h(App)
  //     })
  //   }
  // },1000)
// }
/* eslint-disable no-new */ 



