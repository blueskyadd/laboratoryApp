webpackJsonp([49],{ouSr:function(t,e){},u9dL:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"MaterialAffirmDetail",data:function(){return{equipmentDetailData:{},equipmentList:[]}},mounted:function(){this.getMaterialEngineer_verifyDetail()},methods:{getMaterialEngineer_verifyDetail:function(){var t=this;this.$vux.loading.show(),this.$http.get(this.$conf.env.getMaterialEngineer_verifyDetail+this.$route.query.projectID+"/").then(function(e){if(t.$emit("setHeaderShow",{blod:!0,title:e.data.name}),e.data.sample_json){for(var i in e.data.sample_json){var a={name:i,value:e.data.sample_json[i]};t.equipmentList.push(a)}}t.equipmentDetailData=e.data,t.$vux.loading.hide()}).catch(function(e){console.log(e),t.$vux.loading.hide(),t.$vux.toast.text(e.response?e.response.data:"服务器错误","top")})},setMaterialEngineer_verify:function(t){var e=this;this.$vux.loading.show(),this.$http.put(this.$conf.env.setMaterialEngineer_verify+this.$route.query.projectID+"/",{status:t}).then(function(t){"200"==t.status?(e.$vux.toast.text("审核成功"),setTimeout(function(){e.$router.back()},100)):e.$vux.toast.text("审核失败"),e.$vux.loading.hide()}).catch(function(t){e.$vux.loading.hide(),e.$vux.toast.text(t.response?t.response.data:"服务器错误","top")})}}},n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"MaterialAffirmDetail body_main"},[i("div",{staticClass:"MaterialAffirmDetail_main"},[i("ul",t._l(t.equipmentList,function(e,a){return i("li",{key:a},[i("span",[t._v(t._s(e.name)+"：")]),i("span",[t._v(t._s(e.value))])])}),0)]),t._v(" "),i("footer",[i("button",{staticClass:"weui-btn_warn",on:{click:function(e){return t.setMaterialEngineer_verify(0)}}},[t._v("缺少样件")]),t._v(" "),i("x-button",{attrs:{type:"primary"},nativeOn:{click:function(e){return t.setMaterialEngineer_verify(2)}}},[t._v("确认")])],1)])},staticRenderFns:[]};var r=i("VU/8")(a,n,!1,function(t){i("ouSr")},"data-v-bfbf3204",null);e.default=r.exports}});
//# sourceMappingURL=49.ed7f7f92ee10810b28f0.js.map