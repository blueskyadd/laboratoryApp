webpackJsonp([44],{lUHC:function(t,s){},vZQ7:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=e("7biW"),n=e("Q6Ck"),a=(i.a,n.a,{name:"ApplySchedule",components:{Search:i.a,mainList:n.a},data:function(){return{Testengineer_ondutyingList:[],searchText:"",islistData:!1}},mounted:function(){this.$emit("setHeaderShow",{blod:!0,title:"申请进度"}),this.getTestengineer_ondutyingList(1,"",12)},methods:{setEstablishTest:function(){this.$router.push({name:"ApplyWatch"})},scheduleManage:function(){this.$router.push({name:"ApplyWatch"})},getTestengineer_ondutyingList:function(t,s,e,i,n,a){var o=this;this.$vux.loading.show(),this.$http.get(1==t?this.$conf.env.getTestengineer_ondutyingList+"?search="+s+"&page_size="+e:this.$conf.env.getTestengineer_ondutyingList+"?search="+s+"&p="+t+"&page_size="+e).then(function(e){s?a(e.data.results):o.Testengineer_ondutyingList=1==t?e.data.results:o.Testengineer_ondutyingList.concat(e.data.results),1!=t?e.data.next?i():n():e.data.next?o.$refs.mainList.scrollpullupStatus(!1):o.$refs.mainList.scrollpullupStatus(!0),o.islistData=!(o.Testengineer_ondutyingList.length>0),o.$vux.loading.hide()}).catch(function(t){o.$vux.loading.hide(),o.$refs.mainList.scrollpullupStatus(!0),o.$vux.toast.text(t.response?t.response.data:"服务器错误","top")})},loadmore:function(t,s,e){this.getTestengineer_ondutyingList(t,this.searchText,12,function(){s()},function(){e()})},searchList:function(t){var s=this;this.searchText=t,this.getTestengineer_ondutyingList(1,t,500,function(){},function(){},function(t){s.Testengineer_ondutyingList=t})}}}),o={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"ApplySchedule body_main"},[i("Search",{on:{searchList:t.searchList}}),t._v(" "),i("main-list",{ref:"mainList",attrs:{islistData:t.islistData},on:{loadmore:t.loadmore}},[t._l(t.Testengineer_ondutyingList,function(s,n){return i("li",{key:n},[i("div",{staticClass:"twoChild firstChild ststusTextTrue",staticStyle:{"justify-content":"space-between"}},[i("span",{staticClass:"MalfunctionInfo watchInfo"},[i("i"),t._v("值班开始时间："),i("p",{staticClass:"showText"},[t._v(t._s(s.start_time))])]),t._v(" "),"审核中"==s.status?i("span",{staticClass:"normal ststusText",staticStyle:{flex:"inherit"}},[i("i"),t._v("审核中")]):i("span",{staticClass:"maintain ststusText",staticStyle:{flex:"inherit"}},[i("i"),t._v("未批准")])]),t._v(" "),i("div",{staticClass:"twoChild"},[i("span",{staticClass:"MalfunctionInfo watchInfo"},[i("i"),t._v("值班结束时间："),i("p",{staticClass:"showText"},[t._v(t._s(s.end_time))])])]),t._v(" "),i("div",{staticClass:"Time thereChild"},[i("span",{staticClass:"location"},[i("img",{attrs:{src:e("3BUj"),alt:""}}),i("p",[t._v(t._s(s.location))])])])])})],2)],1)},staticRenderFns:[]};var l=e("VU/8")(a,o,!1,function(t){e("lUHC")},null,null);s.default=l.exports}});
//# sourceMappingURL=44.a38cc4536d547fbe823c.js.map