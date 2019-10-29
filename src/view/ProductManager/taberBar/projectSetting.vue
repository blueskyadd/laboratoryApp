<template>
    <div class="calendar_ProjectSetting body_main">
        <full-calendar  
            :config="config" 
            :events="events"
            ref="calendar">
        </full-calendar>
        <popup-picker  :data="popupList" :show.sync="showAddress"  @on-hide='changeTitle' style="display:none" ref="rightTitle" v-model="value1" :columns="1"></popup-picker>
  </div>
</template>
<script>
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.css';
import { PopupPicker } from 'vux'
export default {
    name:'ProjectSetting',
    components : { FullCalendar, PopupPicker },
    data(){
        return{
             config: {
                firstDay:'0',//以周日为每周的第一天
                weekends: true,//是否在日历中显示周末
                locale: 'zh-cn',//语言
                defaultView: 'month',//默认按月显示
                height: 'auto',//高度
                fixedWeekCount: true,//是否固定显示六周
                // weekMode:"liquid",//周数不定，每周的高度可变，整个日历高度不变
                allDaySlot:true,
                allDay:true,
                header: {//表头信息
                left: 'prev, next',
                center: 'title',
                right: 'hide, custom',
                },
            },
            events: [],
            fileItem:[],
            fileItemIndex: {},
            value1:[],
            showAddress: false,
            popupList:[],
            newData:'',
            projectID:''
        }
    },
    methods:{
       changeRighTitle(){
           this.showAddress = true;
       },
       changeTitle(data){
           this.$parent.isHiddenBox = false;
           this.popupList.forEach(Element =>{
               if(Element.value == this.value1[0]){
                   this.$parent.rightTitle = Element.name;
                   this.projectID = Element.id;
               }
           })
           this.getProductManager_produceDetail(this.projectID)
           
       },
       getProductManager_produceList(){
           this.$vux.loading.show();
            this.$http.get(this.$conf.env.getProductManager_produceList).then(res =>{
                if(res.data.length){
                    res.data.forEach(Element =>{
                        Element.value = Element.id.toString();
                    })
                     this.$emit('setHeaderShow', {blod:true,title:'配置项目',isRightTitle: true,rightTitle:res.data[0].name});
                     this.projectID = res.data[0].id;
                     this.changeMonth();
                }
                
                this.popupList = res.data;
                this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            }) 
       },
       changeMonth(){
           if(document.getElementsByClassName('fc-center')[0].getElementsByTagName('h2')[0].innerHTML.split(' ')[0].replace('月','').length ==2 ||  document.getElementsByClassName('fc-center')[0].getElementsByTagName('h2')[0].innerHTML.split(' ')[0].replace('月','') == '十' ){
                this.newData = document.getElementsByClassName('fc-center')[0].getElementsByTagName('h2')[0].innerHTML.split(' ')[1]+'-'+ document.getElementsByClassName('fc-center')[0].getElementsByTagName('h2')[0].innerHTML.split(' ')[0].replace('月','').replace('十一','11').replace('十二','12').replace('十','10')
            }else{
                this.newData = document.getElementsByClassName('fc-center')[0].getElementsByTagName('h2')[0].innerHTML.split(' ')[1]+'-'+ document.getElementsByClassName('fc-center')[0].getElementsByTagName('h2')[0].innerHTML.split(' ')[0].replace('月','').replace('一','01').replace('二','02').replace('三','03')
                .replace('四','04').replace('五','05').replace('六','06').replace('七','07').replace('八','08').replace('九','09')
            }
            this.getProductManager_produceDetail(this.projectID)
       },
       getProductManager_produceDetail(ID){
           this.$vux.loading.show();
            this.$http.get(this.$conf.env.getProductManager_produceDetail + ID + '&month=' + this.newData ).then(res =>{
                if(res.data.length>0){
                    res.data.forEach(Element =>{
                        Element.title = Element.name;
                        delete Element.name;
                        Element.start = Element.start_time;
                        delete Element.start_time;
                        Element.end = Element.end_time;
                        delete Element.end_time;
                        Element.color = Element.colour;
                        delete Element.colour;
                    })
                }
               this.events = res.data;
               this.$vux.loading.hide();
            }).catch(err =>{
                this.$vux.loading.hide();
                this.$vux.toast.text(err.response?err.response.data:'服务器错误', 'top');
            })
       }
    },
    mounted(){
        this.getProductManager_produceList();
        document.getElementsByClassName('fc-next-button')[0].addEventListener('click',this.changeMonth);
        document.getElementsByClassName('fc-prev-button')[0].addEventListener('click',this.changeMonth);
    }
}
</script>
<style lang="scss">
.calendar_ProjectSetting{
    .fc-header-toolbar{
        height: .8rem;
        font-size: .2rem;
        background: #fff;
        margin-bottom: 0;
        line-height: .8rem;
        position: relative;
        .fc-left{
            position: absolute;
            top: .1rem;
            width: 100%;
            display: flex;
            justify-content: center;
            .fc-state-default{
                background: transparent;
                border: 0;
                box-shadow:none;
            }
            button:first-child{
                margin-right: 1.2rem;
            }
        }
        .fc-center{
            color: #44be8d;
        }
        
    }
   .fc table{
       font-size: .22rem;
       background: #fff;
       
       th{
           background: #44be8d;
           color: #fff;
           border: 0;
           font-family: simhei;
           font-weight: 300;
           height: .6rem;
           line-height: .6rem;
       }
       
       .fc-widget-header{
            height: .6rem!important;
            border: 0;  
       }
       .fc-day-grid-event{
           border-radius: .3rem;
           padding-left: .15rem;
       }
       .fc-row{
           height: 1.7rem;
       }
   }
}
.imgInfo_listInfo_element{
    li{color: #44be8d;}
}
</style>