webpackJsonp([55],{BnOQ:function(a,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=i("7biW"),s=i("Q6Ck"),n=(e.a,s.a,{name:"EquipmentMaterial",components:{Search:e.a,mainList:s.a},data:function(){return{isStatus:!1,searchText:"",islistData:!1,Labmanage_material_application:[]}},mounted:function(){this.$emit("setHeaderShow",{blod:!0,title:"物料审核"}),this.getLabmanage_material_application(1,"",12)},methods:{goEquipmentMeasureDetail:function(a){this.$router.push({path:"/LabManager/EquipmentMaterialDetail",query:{flag:"3",projectID:a.id}})},getLabmanage_material_application:function(a,t,i,e,s,n){var l=this;this.$vux.loading.show(),this.$http.get(1==a?this.$conf.env.getLabmanage_material_application+"?search="+t+"&page_size="+i:this.$conf.env.getLabmanage_material_application+"?search="+t+"&p="+a+"&page_size="+i).then(function(i){t?n(i.data.results):l.Labmanage_material_application=1==a?i.data.results:l.Labmanage_material_application.concat(i.data.results),1!=a?i.data.next?e():s():i.data.next?l.$refs.mainList.scrollpullupStatus(!1):l.$refs.mainList.scrollpullupStatus(!0),l.islistData=!(l.Labmanage_material_application.length>0),l.$vux.loading.hide()}).catch(function(a){l.$vux.loading.hide(),l.$refs.mainList.scrollpullupStatus(!0),l.$vux.toast.text(a.response?a.response.data:"服务器错误","top")})},loadmore:function(a,t,i){this.getLabmanage_material_application(a,this.searchText,12,function(){t()},function(){i()})},searchList:function(a){var t=this;this.searchText=a,this.getLabmanage_material_application(1,a,500,function(){},function(){},function(a){t.Labmanage_material_application=a})}}}),l={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"EquipmentMaterial body_main"},[e("Search",{on:{searchList:a.searchList}}),a._v(" "),e("main-list",{ref:"mainList",attrs:{islistData:a.islistData},on:{loadmore:a.loadmore}},[a._l(a.Labmanage_material_application,function(t,s){return e("li",{key:s,on:{click:function(i){return a.goEquipmentMeasureDetail(t)}}},[e("div",{staticClass:"firstChild ststusTextTrue"},[e("span",{staticClass:"projectNumber"},[a._v("物料名称："+a._s(t.name))])]),a._v(" "),e("div",{staticClass:"twoChild equilpmentName"},[e("span",[a._v("设备数量："+a._s(t.num))])]),a._v(" "),e("div",{staticClass:"Time thereChild"},[e("i"),e("span",{staticClass:"time_end time_overTime"},[e("p",{staticClass:"overTime"},[a._v("申请时间："+a._s(t.create_time))])]),e("span",{staticClass:"name"},[e("img",{attrs:{src:i("j+G4"),alt:""}}),e("p",{staticClass:"nameLoad"},[a._v(a._s(t.user))])]),e("span",{staticClass:"location"})])])})],2)],1)},staticRenderFns:[]};var r=i("VU/8")(n,l,!1,function(a){i("GrQT")},null,null);t.default=r.exports},GrQT:function(a,t){}});
//# sourceMappingURL=55.192e4774a8511cf79233.js.map