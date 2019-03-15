<style lang="less">
    .func-one,.func-logo{
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
    }
    .func-one{
        height: 180px;
        color: #fff;
        box-sizing: border-box;
        padding: 20px;
        &.first{
            cursor: pointer;
        }
        &.second{
            height: 285px;
            color: #333;
            text-align: center;
            padding: 0 30px;
        }
    }
    
    .func-one-title{
        font-size: 18px;
        font-weight: bold;
        line-height: 30px;
    }
    .oneline{
        width: 55px;
        border-top: 1px solid #fff;
        margin: 10px 0;
    }
    .func-description{
        width: 70%;
    }
    .func-logo{
        width: 80px;
        height: 80px;
        margin: 0 auto;
    }
    .func-service-name{
        font-size: 18px;
        margin: 20px 0 15px;
    }
    .func-one.second a {
        display: inline-block;
        margin-top: 20px;
        padding-right: 15px;
        color: #54A0F8;
        background-image: url(../../../images/home/lanse.png);
        background-repeat: no-repeat;
        background-position: right center;
    }
</style>

<template>
    <div>
        <div v-if="linkObj.imgLink" class="func-one first" :style="linkObj.noteNum == 1 ? bg1 : linkObj.noteNum == 2 ? bg2 : bg3"  @click="goToLink(linkObj)" >
            <div class="func-one-title">{{linkObj.title}}</div>
            <div class="oneline"></div>
            <div class="func-description">{{linkObj.dec}}</div>
        </div>
        <div v-else class="func-one second">
            <div class="func-logo" :style="linkObj.noteNum == 1 ? icon1 : linkObj.noteNum == 2 ? icon2 : icon3"></div>
            <div class="func-service-name">{{linkObj.title}}</div>
            <div>{{linkObj.dec}}</div>
            <a :href="linkObj.url" target="_blank">访问官网</a>
        </div>
    </div>
</template>

<script>

export default {
    name: 'linkArea',
    props: {
        linkObj : {
            type : Object
        }
    },
    data() {
        return {
            bg1: {
                backgroundImage: "url(" + require("../../../images/home/dianshang1.png") + ")"
            },
            bg2: {
                backgroundImage: "url(" + require("../../../images/home/shangc.png") + ")"
            },
            bg3: {
                backgroundImage: "url(" + require("../../../images/home/shaoma.png") + ")"
            },
            icon1: {
                backgroundImage: "url(" + require("../../../images/home/huanqiuhuit.png") + ")"
            },
            icon2: {
                backgroundImage: "url(" + require("../../../images/home/frnciao.png") + ")"
            },
            icon3: {
                backgroundImage: "url(" + require("../../../images/home/jianguan.png") + ")"
            },
        }
     },
    methods : {
        goToLink (linkObj){
            if(linkObj.noteNum == 3) {
                this.$router.push({
                    name: linkObj.url
                });
            }
            else{
                if(linkObj.url == ''){
                    //this.$common.showMessageModal(this, linkObj.title+"链接未设置，请前往<a href='javascript:void(0);' >域名管理</a>设置", 2);
                    this.$Modal.warning({
                        title : '温馨提示',
                        render : (h, params) => {
                            return h('div',[
                                h('div',{
                                    class : 'ivu-modal-confirm-body-icon ivu-modal-confirm-body-icon-warning'
                                },[
                                    h('i',{
                                        class : 'ivu-icon ivu-icon-android-alert'
                                    })
                                ]),
                                h('div',{
                                    attrs : {
                                       style : 'margin-top: 6px;padding-left: 48px;padding-top: 18px'
                                    }
                                },[
                                    h('span',{},linkObj.title+"链接未设置，请前往"),
                                    h('a',{
                                        on : {
                                            click : () => {
                                                this.$Modal.remove();
                                                this.$router.push({
                                                    name: 'url-manage'
                                                });
                                            }
                                        }
                                    }," 域名管理 "),
                                    h('span',{},"设置")
                                ])
                               
                            ])
                        }
                    })
                }else{
                    window.open(linkObj.url); 
                }
            }
        }
    }
}
</script>

