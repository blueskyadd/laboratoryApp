webpackJsonp([110],{"6L8w":function(t,s){},afWJ:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=e("7biW"),a=e("Q6Ck"),n=(i.a,a.a,{name:"TestInventory",components:{Search:i.a,mainList:a.a},data:function(){return{TestManager_finishprojectList:[],searchText:"",islistData:!1}},mounted:function(){this.$emit("setHeaderShow",{blod:!0,title:"测试项目"}),this.getTestManager_finishprojectList(1,"",12)},methods:{goTestReportDetail:function(t){this.$router.push({name:"TestReportDetail",query:{projectID:t.id}})},getTestManager_finishprojectList:function(t,s,e,i,a,n){var r=this;this.$vux.loading.show(),this.$http.get(1==t?this.$conf.env.getTestManager_finishprojectList+"?search="+s+"&page_size="+e:this.$conf.env.getTestManager_finishprojectList+"?search="+s+"&p="+t+"&page_size="+e).then(function(e){s?n(e.data.results):r.TestManager_finishprojectList=1==t?e.data.results:r.TestManager_finishprojectList.concat(e.data.results),1!=t?e.data.next?i():a():e.data.next?r.$refs.mainList.scrollpullupStatus(!1):r.$refs.mainList.scrollpullupStatus(!0),r.islistData=!(r.TestManager_finishprojectList.length>0),r.$vux.loading.hide()}).catch(function(t){r.$vux.loading.hide(),r.$refs.mainList.scrollpullupStatus(!0),r.$vux.toast.text(t.response?t.response.data:"服务器错误","top")})},loadmore:function(t,s,e){this.getTestManager_finishprojectList(t,this.searchText,12,function(){s()},function(){e()})},searchList:function(t){var s=this;this.searchText=t,this.getTestManager_finishprojectList(1,t,500,function(){},function(){},function(t){s.TestManager_finishprojectList=t})}}}),r={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"TestInventory body_main"},[e("Search",{on:{searchList:t.searchList}}),t._v(" "),e("main-list",{ref:"mainList",attrs:{islistData:t.islistData},on:{loadmore:t.loadmore}},[t._l(t.TestManager_finishprojectList,function(s,i){return e("li",{key:i,on:{click:function(e){return t.goTestReportDetail(s)}}},[e("div",{staticClass:"firstChild ststusTextTrue"},[e("span",{staticClass:"projectNumber rightStatus"},[t._v(t._s(s.number))]),t._v(" "),"合格"==s.status?e("span",{staticClass:"normal ststusText"},[e("i"),t._v("合格")]):e("span",{staticClass:"maintain ststusText"},[e("i"),t._v(t._s(s.status))])]),t._v(" "),e("div",{staticClass:"twoChild equilpmentName"},[e("span",[t._v("项目名称："+t._s(s.name))]),t._v(" "),e("span",{staticClass:"right_natrue"},[t._v("项目性质："),e("i",[t._v(t._s(s.project_type))])])]),t._v(" "),e("div",{staticClass:"twoChild source"},[e("i"),e("span",[t._v("计量创建时间："+t._s(s.create_time))]),e("span",{staticClass:"right_natrue source"},[t._v("报告来源："),e("i",[t._v(t._s(s.source))])])]),t._v(" "),e("div",{staticClass:"Time thereChild"},[e("i"),e("span",{staticClass:"time_end time_overTime"},[t._v("预计完成时间："+t._s(s.report_time))])])])})],2)],1)},staticRenderFns:[]};var o=e("VU/8")(n,r,!1,function(t){e("6L8w")},null,null);s.default=o.exports}});
//# sourceMappingURL=110.ebcf124fdac1a9bfc61f.js.map