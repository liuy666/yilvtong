<style lang="less">
    .system-list, .app-list{
        color: #666666;
        margin-top: -10px;
        margin-bottom: 10px;
    }
    .system-list li, .app-list li{
        float: left;
        width: 49.5%;
        margin-top: 20px;
        position: relative;
    }
    .system-list li > img{
        float: left;
    }
    .system-list .system-content{
        margin-left: 10px;   
        width: calc(~"100% - 36px");
        overflow: hidden;
    }
    .system-list li > div, .app-list .app-content > div{
        display: inline-block;
    }
    .system-list .system-content span {
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        &.sys-name{
            max-width: 150px;
        }
        &.sys-des{
            max-width: 50px;
        }
    }
    .system-list .download-btn{
        /*margin-top: 8px; */
        padding: 2px 12px;
        background: #fff;
        border: 1px solid #B5B5B5;
        outline: none;
        cursor: pointer;
    }
    .download-btn:hover{
        background: #43B2FF;
        color: #ffffff;
        border: 1px solid #5DB2FF;
    }
    .app-list .app-content{
        display: inline-block;
        cursor: pointer;
        width: 100%;
        position: relative;
    }
    .app-list .app-content > img{
        position: absolute;
        top: 3px;
    }
    .app-info-contanier{
        margin-left: 45px;
    }
    .app-list li .saoma-area, .system-list li .saoma-area{
        width: 134px;
        height: 152px;
        position: absolute;
        left: -7px;
        top: -148px;
        z-index: 10;
        padding: 20px;
        text-align: center;
        box-sizing: border-box;
        /* background: url(./images/home/code_kuang.png) no-repeat center center; */
        background-image: url(../../../images/home/code_kuang.png);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
        pointer-events: none;
    }
    .app-name{
        font-size: 16px;
        color: #333333;
    }
    .app-name:hover{
        color : #5db2ff;
    }
    .new-download-area{
        position: relative;
        padding: 20px;
    }
    .new-download-area > img{
        width: 26px;
        height: 26px;
        position: absolute;
    }
    .new-download-area .download-btn{
        padding: 2px 12px;
        background: #fff;
        border: 1px solid #B5B5B5;
        outline: none;
        cursor: pointer;
        margin-left: 36px;;
    }
    .new-download-area .download-btn:hover{
        background: #43B2FF;
        color: #ffffff;
        border: 1px solid #43B2FF;
    }
    .new-download-area .saoma-area{
        width: 134px;
        height: 152px;
        position: absolute;
        left: 50px;
        top: -148px;
        z-index: 10;
        padding: 20px;
        text-align: center;
        box-sizing: border-box;
        /* background: url(./images/home/code_kuang.png) no-repeat center center; */
        background-image: url(../../../images/home/code_kuang.png);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
        pointer-events: none;
    }
</style>

<template>
    <div v-if="isNew">
        <div class="new-download-area">
            <img :src="downObj.iconNum == 1 ? icon1 : downObj.iconNum == 2 ? icon2 : downObj.iconNum == 3 ? icon3 : icon4">
            <div style="white-space:nowrap;margin-left:36px;display:inline-block;line-height:26px;min-width:155px;">
                <span class="sys-name" :title="downObj.systemName">{{downObj.systemName}}</span> <span class="sys-des" :title="downObj.versionNum">{{downObj.versionNum}}</span>
            </div>
            <button class="download-btn" @click="doDownload(downObj.packageName)" @mouseover="smAreaShow_sys(downObj.isSM)" @mouseout="smAreaHide_sys(downObj.isSM)">下载</button>
            <div v-if="downObj.isSM" class="saoma-area" v-show="scjSM" >
                <img style="width: 85px;height: 85px;" src="../../../images/home/scj.png" />
                <div>扫码立即下载</div>
            </div>
        </div>
    </div>
    <div v-else>
        <ul v-if="isSystem" class="system-list">
            <li v-for="(item,index) in downLoadList" :key="index">
                <img :src="item.iconNum == 1 ? icon1 : item.iconNum == 2 ? icon2 : item.iconNum == 3 ? icon3 : icon4">
                <div class="system-content">
                    <div style="white-space:nowrap;">
                        <span class="sys-name" :title="item.systemName">{{item.systemName}}</span> <span class="sys-des" :title="item.versionNum">{{item.versionNum}}</span>
                    </div>
                    <button class="download-btn" @click="doDownload(item.packageName)" @mouseover="smAreaShow_sys(item.isSM)" @mouseout="smAreaHide_sys(item.isSM)">下载</button>
                </div>
                <div v-if="item.isSM" class="saoma-area" v-show="scjSM" >
                    <img style="width: 85px;height: 85px;" src="../../../images/home/scj.png" />
                    <div>扫码立即下载</div>
                </div>
            </li>
            <div style="clear: both;"></div>
        </ul>
        <ul v-if="!isSystem && downLoadList.length>0" class="app-list">
            <li v-for="(item,index) in downLoadList" :key="index">
                <div class="app-content" @mouseover="smAreaShow(index)" @mouseout="smAreaHide(index)">
                    <img :src="item.appImgNum==1 ? appImg1 : item.appImgNum == 2 ? appImg2 : appImg3">
                    <div class="app-info-contanier">
                        <div class="app-name" >{{item.appName}}</div>
                        <span class="sys-des" style="font-size:12px;overflow: hidden;white-space: nowrap;">{{item.appDec}}</span>
                    </div>
                </div>
                <div class="saoma-area" v-show="appSM[index]">
                    <img style="width: 85px;height: 85px;" :src="item.appImgNum==1 ? appSM1 : item.appImgNum == 2 ? appSM2 : appSM3">
                    <div>扫码立即下载</div>
                </div>
            </li>
            <div style="clear: both;"></div>
        </ul>
    </div>
</template>

<script>

export default {
    name: 'downloadArea',
    props: {
        isNew : {
            type : Boolean
        },
        isSystem : {
            type : Boolean
        },
        downLoadList : {
            type : Array
        },
        downObj : {
            type : Object
        }
        
    },
    data() {
        return {
            scjSM : false,
            appSM : [false, false, false],
            icon1 : require("../../../images/home/soupao.png"),
            icon2 : require("../../../images/home/zhaji.png"),
            icon3 : require("../../../images/home/zizhu.png"),
            icon4 : require("../../../images/home/shouji.png"),
            appImg1 : require("../../../images/home/ylb.png"),
            appImg2 : require("../../../images/home/zhihui.png"),
            appImg3 : require("../../../images/home/huanqiu.png"),
            appSM1 : require("../../../images/home/ma1.png"),
            appSM2 : require("../../../images/home/ma2.png"),
            appSM3 : require("../../../images/home/ma3.png"),
        }
     },
    methods : {
        doDownload (packageName) {
            if(packageName!=""){
                window.open(this.baseUrl+'/sys/homePage/v1/download?access_token='+this.Cookies.get('token')+'&fileName='+packageName);
            }
        },
        smAreaShow_sys (isSM) {
            if(isSM) this.scjSM = true;
        },
        smAreaHide_sys (isSM) {
            if(isSM) this.scjSM = false;
        },
        smAreaShow (index) {
            this.appSM.splice(index,1,true);
        },
        smAreaHide (index) {
            this.appSM.splice(index,1,false);
        }

    }
}
</script>

