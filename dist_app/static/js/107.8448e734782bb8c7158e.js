webpackJsonp([107],{TCly:function(t,e){},r0vh:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"Synopsis",data:function(){return{titleName:"",textSynopsis:"",isHidebutton:!0,innerHeight:window.innerHeight,heightChange:window.innerHeight}},watch:{innerHeight:function(t,e){this.heightChange!=t?this.isHidebutton=!1:this.isHidebutton=!0}},mounted:function(){var t=this;switch(window.onresize=function(){t.innerHeight=window.innerHeight},this.$route.params.flag){case"1":this.titleName="试验简介",this.textSynopsis=this.$store.state.synopsis.synopsisText;break;case"2":this.titleName="项目简介",this.textSynopsis=this.$store.state.synopsis.projectSynopsisText;break;case"3":this.titleName="报警原因",this.textSynopsis=this.$store.state.synopsis.MalfunctionCause;break;case"4":this.titleName="申请原因",this.textSynopsis=this.$store.state.synopsis.ApplyWatchText}this.$emit("setHeaderShow",{blod:!0,title:this.titleName})},methods:{Submit:function(){this.$store.commit("changeSynopsisText",{name:this.textSynopsis,flag:this.$route.params.flag}),this.$router.go(-1)}}},n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"Synopsis body_main"},[s("div",{staticClass:"main"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.textSynopsis,expression:"textSynopsis"}],attrs:{placeholder:"请输入"+t.titleName},domProps:{value:t.textSynopsis},on:{input:function(e){e.target.composing||(t.textSynopsis=e.target.value)}}})]),t._v(" "),s("x-button",{directives:[{name:"show",rawName:"v-show",value:t.isHidebutton,expression:"isHidebutton"}],attrs:{type:"primary"},nativeOn:{click:function(e){return t.Submit()}}},[t._v("确定")])],1)},staticRenderFns:[]};var o=s("VU/8")(i,n,!1,function(t){s("TCly")},"data-v-1d59b004",null);e.default=o.exports}});
//# sourceMappingURL=107.8448e734782bb8c7158e.js.map