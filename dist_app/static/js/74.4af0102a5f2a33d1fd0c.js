webpackJsonp([74],{b01h:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("odqc"),i=a("Znkm"),s=a("fBcm"),n=a("b+jt"),o=(r.a,i.a,s.a,n.a,{name:"equipmentManagementDetail",components:{Tab:r.a,TabItem:i.a,Swiper:s.a,SwiperItem:n.a},data:function(){return{list2:["保养记录","维修记录","计量记录"],demo2:"美食",index:0,equipmentDetail:{},Labmanage_upkeeprecord:[],Labmanage_maintainrecord:[],Labmanage_meterecord:[],isMoreupkeeprecord:!0,MoreupkeeprecordNumber:!0,isMoremaintainrecord:!0,MoremaintainrecordNumber:1,isMoremeterecord:!0,MoremeterecordNumber:1,page_size:14}},mounted:function(){this.getLabmanage_equipmentDetail(),this.getLabmanage_upkeeprecord(),this.getLabmanage_maintainrecord(),this.getLabmanage_meterecord()},methods:{getLabmanage_equipmentDetail:function(){var e=this;this.$vux.loading.show(),this.$http.get(this.$conf.env.getLabmanage_equipmentDetail+this.$route.query.equipmentID+"/").then(function(t){e.$emit("setHeaderShow",{blod:!0,title:t.data.name}),e.equipmentDetail=t.data,e.$vux.loading.hide()}).catch(function(t){e.$vux.loading.hide(),e.$vux.toast.text(t.response?t.response.data:"服务器错误","top")})},getMoreupkeeprecord:function(e){e.target.scrollHeight-e.target.offsetHeight<e.target.scrollTop+20&&this.isMoreupkeeprecord&&(this.isMoreupkeeprecord=!1,this.MoreupkeeprecordNumber+=1,this.getLabmanage_upkeeprecord())},getLabmanage_upkeeprecord:function(){var e=this;this.$http.get(1==this.MoreupkeeprecordNumber?this.$conf.env.getLabmanage_upkeeprecord+this.$route.query.equipmentID+"&page_size="+this.page_size:this.$conf.env.getLabmanage_upkeeprecord+this.$route.query.equipmentID+"&p="+this.MoreupkeeprecordNumber+"&page_size="+this.page_size).then(function(t){e.Labmanage_upkeeprecord=1==e.MoreupkeeprecordNumber?t.data.results:e.Labmanage_upkeeprecord.concat(t.data.results),e.isMoreupkeeprecord=!!t.data.next}).catch(function(t){e.isMoreupkeeprecord=!1,e.$vux.toast.text(t.response?t.response.data:"服务器错误","top")})},getMoremaintainrecord:function(e){e.target.scrollHeight-e.target.offsetHeight<e.target.scrollTop+20&&this.isMoremaintainrecord&&(this.isMoremaintainrecord=!1,this.MoremaintainrecordNumber+=1,this.getLabmanage_maintainrecord())},getLabmanage_maintainrecord:function(){var e=this;this.$http.get(1==this.MoremaintainrecordNumber?this.$conf.env.getLabmanage_maintainrecord+this.$route.query.equipmentID+"&page_size="+this.page_size:this.$conf.env.getLabmanage_maintainrecord+this.$route.query.equipmentID+"&page_size="+this.page_size+"&p="+this.MoremaintainrecordNumber).then(function(t){e.Labmanage_maintainrecord=1==e.MoremaintainrecordNumber?t.data.results:e.Labmanage_maintainrecord.concat(t.data.results),e.isMoremaintainrecord=!!t.data.next}).catch(function(t){e.isMoremaintainrecord=!1,e.$vux.toast.text(t.response?t.response.data:"服务器错误","top")})},getMoremeterecord:function(e){e.target.scrollHeight-e.target.offsetHeight<e.target.scrollTop+20&&this.isMoremeterecord&&(this.isMoremeterecord=!1,this.MoremeterecordNumber+=1,this.getLabmanage_meterecord())},getLabmanage_meterecord:function(){var e=this;this.$http.get(1==this.MoremeterecordNumber?this.$conf.env.getLabmanage_meterecord+this.$route.query.equipmentID+"&page_size="+this.page_size:this.$conf.env.getLabmanage_meterecord+this.$route.query.equipmentID+"&page_size="+this.page_size+"&p="+this.MoremeterecordNumber).then(function(t){e.Labmanage_meterecord=1==e.MoremeterecordNumber?t.data.results:e.Labmanage_meterecord.concat(t.data.results),e.isMoremeterecord=!!t.data.next}).catch(function(t){e.isMoremeterecord=!1,e.$vux.toast.text(t.response?t.response.data:"服务器错误","top")})},onScrollBottom:function(){console.log("加载")}}}),c={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"equipmentManagementDetail body_main"},[r("div",{staticClass:"equipmentManagementDetail_title margin_bottom margin_top"},[r("div",{staticClass:"vux-1px-b"},[r("span",[e._v(e._s(e.equipmentDetail.num))])]),e._v(" "),r("div",[r("span",[r("img",{attrs:{src:a("j+G4"),alt:""}}),r("p",[e._v(e._s(e.equipmentDetail.device_keeper))])]),r("span",[r("img",{attrs:{src:a("3BUj"),alt:""}}),r("p",[e._v(e._s(e.equipmentDetail.room))])])])]),e._v(" "),r("div",{staticClass:"equipmentManagementDetail_main"},[r("tab",{attrs:{"line-width":2,"active-color":"#08A795","custom-bar-width":"1.8rem"},model:{value:e.index,callback:function(t){e.index=t},expression:"index"}},e._l(e.list2,function(t,a){return r("tab-item",{key:a,staticClass:"vux-center",attrs:{selected:e.demo2===t},on:{click:function(a){e.demo2=t}}},[e._v(e._s(t))])}),1),e._v(" "),r("swiper",{attrs:{"show-dots":!1},model:{value:e.index,callback:function(t){e.index=t},expression:"index"}},e._l(e.list2,function(t,a){return r("swiper-item",{key:a},[r("div",{staticClass:"tab-swiper vux-center"},[r("div",{staticClass:"swiper_title"},[r("span",[e._v(e._s(t))]),r("span",{staticClass:"vux-1px-b"})]),e._v(" "),0==a?r("div",{staticClass:"swiper_flow"},[r("ul",{on:{scroll:e.getMoreupkeeprecord}},e._l(e.Labmanage_upkeeprecord,function(t,a){return r("li",{key:t.id},[r("div",{staticClass:"flow_end flow_list"},[r("span",[e._v("成")]),e._v(" "),r("span",[e._v(e._s(t.report_time))]),e._v(" "),r("span",{staticClass:"showText"},[e._v("负责人："+e._s(t.device_keeper))])]),e._v(" "),r("span",{staticClass:"flow_border vux-1px-l"}),e._v(" "),r("div",{staticClass:"flow_start flow_list"},[r("span",[e._v("养")]),e._v(" "),r("span",[e._v(e._s(t.start_time))])]),e._v(" "),r("span",{directives:[{name:"show",rawName:"v-show",value:a<e.Labmanage_upkeeprecord.length-1,expression:"index < Labmanage_upkeeprecord.length - 1"}],staticClass:"flow_border vux-1px-l"})])}),0)]):e._e(),e._v(" "),1==a?r("div",{staticClass:"swiper_flow"},[r("ul",{on:{scroll:e.getMoremaintainrecord}},e._l(e.Labmanage_maintainrecord,function(t,a){return r("li",{key:t.id},[r("div",{staticClass:"flow_end flow_list"},[r("span",[e._v("成")]),e._v(" "),r("span",[e._v(e._s(t.report_time))]),e._v(" "),r("span",{staticClass:"showText"},[e._v("负责人："+e._s(t.applicant))]),e._v(" "),r("a",{attrs:{download:"w3logo",href:t.report}},[e._v("查看")])]),e._v(" "),r("span",{staticClass:"flow_border vux-1px-l"}),e._v(" "),r("div",{staticClass:"flow_start flow_list"},[r("span",[e._v("修")]),e._v(" "),r("span",[e._v(e._s(t.start_time))])]),e._v(" "),r("span",{directives:[{name:"show",rawName:"v-show",value:a<e.Labmanage_maintainrecord.length-1,expression:"index < Labmanage_maintainrecord.length-1"}],staticClass:"flow_border vux-1px-l"})])}),0)]):e._e(),e._v(" "),2==a?r("div",{staticClass:"swiper_flow"},[r("ul",{on:{scroll:e.getMoremeterecord}},e._l(e.Labmanage_meterecord,function(t,a){return r("li",{key:t.id},[r("div",{staticClass:"flow_end flow_list"},[r("span",[e._v("量")]),e._v(" "),r("span",[e._v(e._s(t.report_time))]),e._v(" "),r("span",{staticClass:"showText"},[e._v("委托公司："+e._s(t.nominee_company))]),e._v(" "),r("a",{attrs:{download:"w3logo",href:t.report}},[e._v("查看")])]),e._v(" "),r("span",{directives:[{name:"show",rawName:"v-show",value:a<e.Labmanage_meterecord.length-1,expression:"index < Labmanage_meterecord.length-1"}],staticClass:"flow_border vux-1px-l"})])}),0)]):e._e()])])}),1)],1)])},staticRenderFns:[]};var m=a("VU/8")(o,c,!1,function(e){a("tl7a")},null,null);t.default=m.exports},tl7a:function(e,t){}});
//# sourceMappingURL=74.4af0102a5f2a33d1fd0c.js.map