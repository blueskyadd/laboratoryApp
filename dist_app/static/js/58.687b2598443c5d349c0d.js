webpackJsonp([58],{bOw2:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=a("7biW"),e=a("Q6Ck"),n=(i.a,e.a,{name:"ProjectManager",components:{Search:i.a,mainList:e.a},data:function(){return{myproductList:[],islistData:!1}},mounted:function(){this.$emit("setHeaderShow",{blod:!0,title:"负责产品"}),this.getProductManager_myproductList("")},methods:{getProductManager_myproductList:function(t,s){var a=this;this.$vux.loading.show(),this.$http.get(this.$conf.env.getProductManager_myproductList+"?search="+t).then(function(i){a.myproductList=i.data,t&&s(i.data),a.$refs.mainList.scrollpullupStatus(!0),a.islistData=!(a.myproductList.length>0),a.$vux.loading.hide()}).catch(function(t){console.log(t),a.$vux.loading.hide(),a.$refs.mainList.scrollpullupStatus(!0),a.$vux.toast.text(t.response?t.response.data:"服务器错误","top")})},searchList:function(t){var s=this;this.getProductManager_myproductList(t,function(t){s.myproductList=t})}}}),r={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"ProjectManager body_main"},[a("Search",{on:{searchList:t.searchList}}),t._v(" "),a("main-list",{ref:"mainList",attrs:{islistData:t.islistData}},[t._l(t.myproductList,function(s,i){return a("li",{key:i},[a("div",{staticClass:"firstChild ststusTextTrue"},[a("span",{staticClass:"projectNumber rightStatus"},[t._v(t._s(s.number))]),t._v(" "),"进行"==s.status?a("span",{staticClass:"normal ststusText"},[a("i"),t._v("进行")]):a("span",{staticClass:"maintain ststusText"},[a("i"),t._v(t._s(s.status))])]),t._v(" "),a("div",{staticClass:"twoChild equilpmentName"},[a("span",[t._v("产品名称："+t._s(s.name))])]),t._v(" "),a("div",{staticClass:"twoChild"},[a("i"),a("span",[t._v("创建事件："+t._s(s.create_time))])])])})],2)],1)},staticRenderFns:[]};var c=a("VU/8")(n,r,!1,function(t){a("jbcm")},null,null);s.default=c.exports},jbcm:function(t,s){}});
//# sourceMappingURL=58.687b2598443c5d349c0d.js.map