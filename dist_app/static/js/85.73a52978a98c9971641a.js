webpackJsonp([85],{"7NA7":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("7biW"),n=e("Q6Ck"),i=(s.a,n.a,{name:"taskAllocation",components:{Search:s.a,mainList:n.a},data:function(){return{Labmanage_project:[],results:[],searchText:"",islistData:!1}},mounted:function(){this.$emit("setHeaderShow",{blod:!0,title:"任务分配"}),this.getLabmanage_project(1,"",12)},methods:{goProjectAllocation:function(t){this.$router.push({path:"/LabManager/projectAllocation",query:{projectID:t.id}})},getLabmanage_project:function(t,a,e,s,n,i){var o=this;this.$vux.loading.show(),this.$http.get(1==t?this.$conf.env.getLabmanage_project+"?search="+a+"&page_size="+e:this.$conf.env.getLabmanage_project+"?search="+a+"&p="+t+"&page_size="+e).then(function(e){a?i(e.data.results):o.Labmanage_project=1==t?e.data.results:o.Labmanage_project.concat(e.data.results),1!=t?e.data.next?s():n():e.data.next?o.$refs.mainList.scrollpullupStatus(!1):o.$refs.mainList.scrollpullupStatus(!0),o.islistData=!(o.Labmanage_project.length>0),o.$vux.loading.hide()}).catch(function(t){o.$vux.loading.hide(),o.$refs.mainList.scrollpullupStatus(!0),o.$vux.toast.text(t.response?t.response.data:"服务器错误","top")})},loadmore:function(t,a,e){this.getLabmanage_project(t,this.searchText,12,function(){a()},function(){e()})},searchList:function(t){var a=this;this.searchText=t,this.getLabmanage_project(1,t,500,function(){},function(){},function(t){a.Labmanage_project=t})}}}),o={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"taskAllocation body_main"},[e("Search",{attrs:{results:t.results},on:{searchList:t.searchList,resultClick:t.goProjectAllocation,"update:results":function(a){t.results=a}}}),t._v(" "),e("main-list",{ref:"mainList",attrs:{islistData:t.islistData},on:{loadmore:t.loadmore}},[t._l(t.Labmanage_project,function(a,s){return e("li",{key:s,on:{click:function(e){return t.goProjectAllocation(a)}}},[e("div",{staticClass:"firstChild"},[e("span",{staticClass:"projectNumber"},[t._v(t._s(a.number))])]),t._v(" "),e("div",{staticClass:"twoChild"},[e("span",[t._v("项目名称：")]),e("span",[t._v(t._s(a.name))])])])})],2)],1)},staticRenderFns:[]};var r=e("VU/8")(i,o,!1,function(t){e("oVzJ")},"data-v-3e5accfe",null);a.default=r.exports},oVzJ:function(t,a){}});
//# sourceMappingURL=85.73a52978a98c9971641a.js.map