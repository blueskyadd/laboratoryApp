webpackJsonp([59],{j8hQ:function(t,s){},wIIB:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("7biW"),i=e("Q6Ck"),n=(a.a,i.a,{name:"TestRecord",components:{Search:a.a,mainList:i.a},data:function(){return{TestManager_eqList:[],searchText:"",islistData:!1}},mounted:function(){this.$emit("setHeaderShow",{blod:!0,title:"设备档案"}),this.getTestManager_eqList(1,"",12)},methods:{getTestManager_eqList:function(t,s,e,a,i,n){var r=this;this.$vux.loading.show(),this.$http.get(1==t?this.$conf.env.getTestManager_eqList+"?search="+s+"&page_size="+e:this.$conf.env.getTestManager_eqList+"?search="+s+"&p="+t+"&page_size="+e).then(function(e){s?n(e.data.results):r.TestManager_eqList=1==t?e.data.results:r.TestManager_eqList.concat(e.data.results),1!=t?e.data.next?a():i():e.data.next?r.$refs.mainList.scrollpullupStatus(!1):r.$refs.mainList.scrollpullupStatus(!0),r.islistData=!(r.TestManager_eqList.length>0),r.$vux.loading.hide()}).catch(function(t){r.$vux.loading.hide(),r.$refs.mainList.scrollpullupStatus(!0),r.$vux.toast.text(t.response?t.response.data:"服务器错误","top")})},loadmore:function(t,s,e){this.getTestManager_eqList(t,this.searchText,12,function(){s()},function(){e()})},searchList:function(t){var s=this;this.searchText=t,this.getTestManager_eqList(1,t,500,function(){},function(){},function(t){s.TestManager_eqList=t})}}}),r={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"TestRecord body_main"},[a("Search",{on:{searchList:t.searchList}}),t._v(" "),a("main-list",{ref:"mainList",attrs:{islistData:t.islistData},on:{loadmore:t.loadmore}},[t._l(t.TestManager_eqList,function(s,i){return a("li",{key:i},[a("div",{staticClass:"firstChild ststusTextTrue"},[a("span",{staticClass:"projectNumber rightStatus"},[t._v(t._s(s.num))]),t._v(" "),"使用中"==s.status?a("span",{staticClass:"normal ststusText"},[a("i"),t._v("使用中")]):"维修中"==s.status?a("span",{staticClass:"maintain ststusText"},[a("i"),t._v("维修中")]):a("span",{staticClass:"idle ststusText"},[a("i"),t._v(t._s(s.status))])]),t._v(" "),a("div",{staticClass:"twoChild equilpmentName"},[a("span",[t._v("设备名称："+t._s(s.name))])]),t._v(" "),a("div",{staticClass:"Time thereChild"},[a("span",{staticClass:"name"},[a("img",{attrs:{src:e("j+G4"),alt:""}}),a("p",{staticClass:"nameLoad"},[t._v(t._s(s.device_keeper))])]),a("span",{staticClass:"location"},[a("img",{attrs:{src:e("3BUj"),alt:""}}),a("p",[t._v(t._s(s.room))])])])])})],2)],1)},staticRenderFns:[]};var c=e("VU/8")(n,r,!1,function(t){e("j8hQ")},null,null);s.default=c.exports}});
//# sourceMappingURL=59.af8aad2c2e392fa540e8.js.map