<style lang="less">
    .one-link-option {
        position : relative;
        height : 105px;
        padding : 20px 30px;
        cursor: pointer;
    }
    // .one-link-option:hover{
    //     background: #f4faff;
    // }
    .one-link-option img {
        position : absolute;
        width : 65px;
        height : 65px;
    }
    .one-link-option-content {
        margin-left : 80px;
    }
    .link-title-name {
        font-size: 16px;
        color: #000000;
        line-height: 36px;
        white-space: nowrap;
    }
    .link-des {
        font-size: 14px;
        color: #666666;
    }
</style>

<template>
    <div>    
        <div v-if="linkObj.imgLink" class="one-link-option"  @click="goToLink(linkObj)">
            <img :src="linkObj.noteNum==1 ? icon1 : linkObj.noteNum == 2 ? icon2 : icon3">
            <div class="one-link-option-content">
                <div class="link-title-name" >{{linkObj.title}}</div>
                <span class="link-des" style="font-size:12px;overflow: hidden;white-space: nowrap;">{{linkObj.dec}}</span>
            </div>
        </div>
        <div v-else class="one-link-option">
            <a :href="linkObj.url" target="_blank">
                <img :src="linkObj.noteNum==1 ? icon11 : linkObj.noteNum == 2 ? icon22 : linkObj.noteNum == 3 ? icon33 : icon44 ">
                <div class="one-link-option-content">
                    <div class="link-title-name" >{{linkObj.title}}</div>
                    <span class="link-des" style="font-size:12px;overflow: hidden;white-space: nowrap;">{{linkObj.dec}}</span>
                </div>
            </a>
        </div>
    </div>
</template>

<script>

export default {
    name: 'linkAreaNew',
    props: {
        linkObj: {
            type: Object
        }
    },
    data () {
        return {
            icon1: require('../../../images/home/pc.png'),
            icon2: require('../../../images/home/moblie.png'),
            icon3: require('../../../images/home/scan.png'),
            icon11: require('../../../images/home/huanqiuhuit.png'),
            icon22: require('../../../images/home/jianguan.png'),
            icon33: require('../../../images/home/frnciao.png'),
            icon44: require('../../../images/home/cwj.png')
        };
    },
    methods: {
        goToLink (linkObj) {
            if (linkObj.noteNum == 3) {
                this.$router.push({
                    name: linkObj.url
                });
            } else {
                if (linkObj.url == '') {
                    // this.$common.showMessageModal(this, linkObj.title+"链接未设置，请前往<a href='javascript:void(0);' >域名管理</a>设置", 2);
                    this.$Modal.warning({
                        title: '温馨提示',
                        render: (h, params) => {
                            return h('div', [
                                h('div', {
                                    class: 'ivu-modal-confirm-body-icon ivu-modal-confirm-body-icon-warning'
                                }, [
                                    h('i', {
                                        class: 'ivu-icon ivu-icon-android-alert'
                                    })
                                ]),
                                h('div', {
                                    attrs: {
                                        style: 'margin-top: 6px;padding-left: 48px;padding-top: 18px'
                                    }
                                }, [
                                    h('span', {}, linkObj.title + '链接未设置')
                                    /*h('a',{
                                        on : {
                                            click : () => {
                                                this.$Modal.remove();
                                                this.$router.push({
                                                    name: 'url-manage'
                                                });
                                            }
                                        }
                                    }," 域名管理 "),
                                    h('span',{},"设置") */
                                ])

                            ]);
                        }
                    });
                } else{
                    window.open('http://' + linkObj.url);
                }
            }
        }

    }
};
</script>

