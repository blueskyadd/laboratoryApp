<template>
    <div class="information show_box" @click="goDetailBat()">
      <h3>{{titleName}}</h3>
      <div class="efficient_data">
        <div class="circle">
          <img
            :style="{'transform': changeRotate}"
            src="../assets/img/LabManager/index/pointer.png"
            alt
          />
        </div>
        <span>{{operatingNum}}</span>
      </div>
    </div>
</template>
<script>
export default {
    props:{
      titleName: String,
      operatingNum: String
    },
    data(){
        return{
            operating: 1 ,
        }
    },
    computed:{
        changeRotate(operating){
            if(this.operating == 0){
                return 'rotate(-140deg)'
            }else if(this.operating == 1 ){
                return 'rotate(38deg)'
            }else{
                return 'rotate('+ (1-this.operating-0.1 ) * -120 + 'deg)'
            }
        },
    },
    methods:{
      toPoint(){
          if(this.operatingNum){
             this.operating = this.operatingNum.replace("%", "")/100;
          }else{
             this.operating = 0
          }
        },
        goDetailBat(){
          this.$emit('goDetail')
        },
    },
    mounted(){
      this.toPoint();
    }
};
</script>
<style lang="scss">

 .LabManager_data{
        height: 2.05rem;
        margin-bottom: .1rem;
        display: flex;
        .information{
            width: 23.9%;
            height: 100%;
            margin-right: 1.45%;
            background: #fff;
            padding-top: .15rem;
            h3{
                font-family: Microsoft;
                font-size: .22rem;
                color: #333;
                margin-bottom: .15rem;
            }
            .efficient_data{
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                    flex-direction: column;
                .circle{
                    width: 1.2rem;
                    height: 1.02rem;
                    display: flex;
                    justify-content: center;
                    align-items: flex-end;
                    background: url('../assets/img/LabManager/index/annulus.png') 0 0 / 100% 100%;
                    img{
                        transform: rotate(-134deg);
                        margin-left: 0.57rem;
                        transform-origin: 0 .47rem;
                        width: .57rem;
                        height: .47rem;
                    }
                }
                .text_number{
                    .text_number_terxt {
                        font-family:MFShangHei;
                        color: #7901dc;
                        font-size: 1.29rem;
                        margin: 0;
                        line-height: 1.29rem;
                    }
                }
                span{
                    font-size: .27rem;
                    color: #7e0dde;
                    font-weight: 700;
                    margin-top: .1rem;
                }
            }
        }
        .information:last-child{
            margin: 0;
        }
    }
</style>