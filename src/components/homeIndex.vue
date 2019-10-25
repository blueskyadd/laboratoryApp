<template>
    <div class="LabManager_LabManagerIndex body_main">
        <div class="LabManager_data" v-if="isEquipment_data">
            <equipmentData titleName="设备运行率"  :operatingNum='Laboratory_topNumber.num1' />
            <div class="information show_box">
                <h3>设备档案</h3>
                <div class="efficient_data">
                    <div class="text_number">
                        <countup :start-val="0" :end-val="Laboratory_topNumber.num2*1" :duration="1" class="text_number_terxt"></countup>
                    </div>
                </div>
            </div>
            <equipmentData titleName="设备维修率" :operatingNum='Laboratory_topNumber.num3' />
            <equipmentData titleName="设备安全率" :operatingNum='Laboratory_topNumber.num4'/>
        </div>
        <div class="LabManager_synopsis show_box">
            <h3>实验室能力介绍</h3>
            <div class="sectionText">
                <p>{{Ability_introduce}}</p>
            </div>
            <div class="section_bgImg"></div>
        </div>
        <div class="LabManager_inform show_box">
            <span class="LabManager_inform_title"><img src="../assets/img/LabManager/index/LabManager_inform_title.png" alt=""></span>
            <marquee>
                <marquee-item v-for="item in asyncCount" :key="item.id" @click.native="onClick(i)" class="align-middle">
                    <i></i>
                    <p>{{item.content}}</p>
                </marquee-item>
            </marquee>
        </div>
        <div class="LabManager_myapply">
            <div class="LabManager_myapply_title show_box">我的工作</div>
            <slot></slot>
        </div>
    </div>
</template>
<script>
import { Countup, Marquee, MarqueeItem } from 'vux';
import equipmentData from './equipment_data';
export default {
    name:'Index',
    components:{Countup, Marquee, MarqueeItem, equipmentData},
    data(){
        return{
            operating: .5 ,
            asyncCount: [],
            isEquipment_data: false,
            Laboratory_topNumber:{},
            Ability_introduce:'',
            Labmanage_systemNumber:{},//审核个数
        }
    },
    methods:{
        goTaskAllocation(){
            this.$router.push({name:'taskAllocation'})
        },
        goManagementIssue(){
            this.$router.push({name:'managementIssue'})
        },
        /**@name获取设备运行率 */
        getLaboratory_topNumber(){
            this.$http.get(this.$conf.env.getLaboratory_topNumber).then( res =>{
                this.Laboratory_topNumber = res.data;
                this.isEquipment_data = true;
            }).catch(err =>{
                this.isEquipment_data = true;
                this.Laboratory_topNumber = {'num1':'0%','num2':'0%','num3':'0%','num4':'0%'};
                this.$vux.toast.text(err.response?err.response.data:'服务器错误')
            })
        },
        /**@name 获取实验室信息*/
        getAbilityintroduce(){
            this.$http.get(this.$conf.env.getAbilityintroduce).then(res =>{
                if(res.data.text){
                    this.Ability_introduce = res.data.text;
                }
            }).catch(err =>{
                if(err.response.status == '401'){
                    if(err.response.data.detail == 'Signature has expired.'){
                        this.$vux.toast.text('签名已过期,请重新登录')
                    }
                }else{
                    this.$vux.toast.text(err.response?err.response.data:'服务器错误')
                }
            })
        },
        /**@name 公告栏*/
        getSystem_info(){
            this.$http.get(this.$conf.env.getSystem_info).then( res =>{
                this.asyncCount = res.data.results;
                this.$vux.loading.hide()
            }).catch(err =>{
                this.$vux.loading.hide()
                this.$vux.toast.text(err.response?err.response.data:'服务器错误')
            })
        },
    },
    computed:{
        changeRotate(){
            if(this.operating == 0){
                return 'rotate(-140deg)'
            }else if(this.operating == 1 ){
                return 'rotate(38deg)'
            }else{
                return 'rotate('+ (1-this.operating-0.1 ) * -120 + 'deg)'
            }
        }
    },
    mounted(){
        this.$vux.loading.show()
        this.getAbilityintroduce();
        this.getLaboratory_topNumber();
        this.getSystem_info();//公告栏
        
    },
    destroyed(){
        this.$emit('setHeaderShow', {blod:false,title:''})
    }
}
</script>
<style lang="scss" scoped>
.LabManager_LabManagerIndex{
    padding: .1rem;
    .LabManager_synopsis{
        width: 100%;
        margin-bottom: .1rem;
        height: 3.71rem;
        background: #fff;
        display: flex;
        flex-direction: column;
        position: relative;
        align-items: center;
        h3{
            font-size: .24rem;
            font-family: Microsoft;
            font-weight:400;
            color:#111;
            width: 51.2%;
            background: url('../assets/img/LabManager/index/LabManager_index_textTitle.png') 0 0 / 100% 100%;
            line-height: .45rem;
            height: .56rem;
        }
        .sectionText{
            padding: .03rem .24rem .2rem;
            height: calc(100% - .4rem);
            overflow-y: scroll;
            p{
                font-family: simhei;
                font-size: .22rem;
                font-weight:400;
                color:rgba(100,100,100,1);
                line-height: .3rem;
                text-align: left;
            }
        }
        .section_bgImg{
            width: 2.07rem;
            height: 1.93rem;
            background: url('../assets/img/LabManager/index/LabManager_index_textBg.png') 0 0 /100% 100%;
            position: absolute;
            bottom: .02rem;
            right: .16rem;
        } 
    }
    
   

}
</style>