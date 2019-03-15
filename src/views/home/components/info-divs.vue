<style lang="less">
   .infor-card-con , .title-img{
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center;
   }
   .infor-card-con{
        height: 120px;
        color : #ffffff;
   }
   .one-option-title{
        height: 70px;
        padding: 10px 15px 0;
   }
   .title-img{
        width: 42px;
        height: 42px;
   }
   .title-text{
        display: inline-block;
        margin-left: 10px;
        font-size: 12px;
        width: calc(~"100% - 56px");
   }
   .title-text  .title{
        font-size: 16px;
        font-weight: bold;
        width: 100%;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
   }
   .title-text  .dec{
        width:100%;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 30px;
   }
   .one-option-content{
        padding:  20px;
        overflow: hidden;
   }
   .data-left,.data-area{
       font-size: 36px;
       line-height: 60px;
   }
   .data-left{
        width: 45%;
        border-right: 1px solid rgba(255,255,255,0.4);
   }
   .data-right{
        padding-left: 40px;
        line-height: 30px;
        width: 54%;
        box-sizing: border-box;
   }
   .data-area.online{
        position: relative;
        background: url(../../../images/home/shuju.png);
        background-repeat: no-repeat;
        background-position: right;
   }
   .currentDay{
        position: absolute;
        top: 30px;
        font-size: 12px;
   }
</style>

<template>
    <Card :padding="0">
        <div class="infor-card-con" :style="infoObj.noteNum == 1 ? bg1 : infoObj.noteNum == 2 ? bg2 : infoObj.noteNum == 3 ? bg3 : bg4">
            <!-- <div class="one-option-title">
                <div class="title-img  fl" :style="infoObj.noteNum == 1 ? icon1 : infoObj.noteNum == 2 ? icon2 : infoObj.noteNum == 3 ? icon3 : icon4"></div>
                <div class="title-text">
					<span class="title">{{infoObj.titleName}}</span>
					<span class="dec">{{infoObj.titleDec}}</span>
				</div>
            </div>
            <div v-if="infoObj.isTwo" class="one-option-content">
                <div class="data-left fl">
					<span class="infoData" :title="infoObj.total">{{infoObj.total}}</span>
				</div>
                <div class="data-right fl">
					<div style="white-space:nowrap;"><span>总开户数 :  &nbsp;</span><span class="infoData" style="display: inline-block;width: 59px;" title="27">{{infoObj.total1}}</span></div>
					<div style="white-space:nowrap;"><span>总未开户数 :  &nbsp;</span><span class="infoData" style="display: inline-block;width: 45px;" title="8">{{infoObj.total2}}</span></div>
				</div>
            </div>

            <div v-else-if="!infoObj.isImg" class="one-option-content">
                <div class="data-area">
					<span class="infoData" :title="infoObj.total">{{infoObj.total}}</span>
				</div>
            </div>

            <div v-else class="one-option-content">
                <div class="data-area  online">
					<span class="infoData" :title="infoObj.total">{{infoObj.total}}</span>
					<div class="currentDay">日访问量 :  &nbsp;<span class="infoData" :title="infoObj.day">{{infoObj.day}}</span></div>
				</div>
            </div> -->
            <div class="total-num-area" style="font-size:40px;padding-left:44px;padding-top:16px;height:76px;">
                {{infoObj.total}}
            </div>
            <div class="dec-area" style="font-size:14px;padding-left:44px;">
                {{infoObj.dec}}
            </div>
        </div>
    </Card>
</template>

<script>
import countUp from './countUp.vue';

export default {
    name: 'infoDivs',
    components: {
        countUp
    },
    props: {
        infoObj : {
            type : Object
        }
    },
    data() {
        return {
            bg1: {
                backgroundImage: "url(" + require("../../../images/home/qysl.png") + ")"
            },
            bg2: {
                backgroundImage: "url(" + require("../../../images/home/jqfws.png") + ")"
            },
            bg3: {
                backgroundImage: "url(" + require("../../../images/home/fxs.png") + ")"
            },
            bg4: {
                backgroundImage: "url(" + require("../../../images/home/yhsl.png") + ")"
            },
            icon1: {
                backgroundImage: "url(" + require("../../../images/home/jingqu.png") + ")"
            },
            icon2: {
                backgroundImage: "url(" + require("../../../images/home/meiyuan.png") + ")"
            },
            icon3: {
                backgroundImage: "url(" + require("../../../images/home/yonghu.png") + ")"
            },
            icon4: {
                backgroundImage: "url(" + require("../../../images/home/dianshang.png") + ")"
            }
        }
     }
}
</script>

