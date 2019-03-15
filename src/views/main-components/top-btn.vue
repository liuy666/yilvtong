<style>
    #top_btn .bigMargin{
        margin-left: 2%;
    }
    #top_btn .smallMargin{
        margin-left: 0.5%;
    }
    #top_btn .ivu-btn{
        background-color: #fff;
    }
</style>
<template>
    <div id="top_btn">
        <p style="display:inline-block;">
            <Button v-for="(item,index) in btnList"
                    v-if="!item.isHidden"
                    :key="index"
                    shape="circle"
                    :class="index==0?'bigMargin':'smallMargin'" @click="topBtnEvent(item)">
                <Icon v-if="item.type==1" type="ios-refresh-empty" />
                <!-- type 1为刷新 2为新增 3为修改 4为删除 5为查看 6为自定义 -->
                <Icon v-if="item.type==2" type="ios-plus-empty" />
                <Icon v-if="item.type==3" type="ios-compose-outline" />
                <Icon v-if="item.type==4" type="ios-trash-outline" />
                <Icon v-if="item.type==5" type="ios-search" />
                <Icon v-if="item.type==6" :type="item.icon" />
                <!-- 自定义7新增/8修改/9删除/10查看/11自定义 -->
                <Icon v-if="item.type==7" type="ios-plus-empty" />
                <Icon v-if="item.type==8" type="ios-compose-outline" />
                <Icon v-if="item.type==9" type="ios-trash-outline" />
                <Icon v-if="item.type==10" type="ios-search" />
                <Icon v-if="item.type==11" :type="item.icon" />
                <!-- 自定义12新增/13修改/14查看/15自定义/99导入 -->
                <Icon v-if="item.type==12" type="ios-plus-empty" />
                <Icon v-if="item.type==13" type="ios-compose-outline" />
                <Icon v-if="item.type==14" type="ios-search" />
                <Icon v-if="item.type==15" type="android-person-add" />
                <Icon v-if="item.type==16" type="social-windows" />
                <Icon v-if="item.type==17" :type="item.icon" />
                <Icon v-if="item.type==99" type="clipboard" />
                {{ item.btnlabel }}
            </Button>
        </p>

        <common-dialog
            :modal="modal"
            :info-name="delInfoName"
            :modal-loading="modal_loading"
            :content-type="dialogContentType"
            :dialog-title="dialogTitle"
            :form-datas="dialogFormDatas"
            :rule-datas="dialogRuleDatas"
            :dialog-form-item-list="dialogFormItemList"
            :dialog-message="message"
            @changeModal="changeModal"
        ></common-dialog>
    </div>
</template>
<script>
import commonDialog from './common-dialog.vue';
export default {
    name : 'topBtn',
    components : {
        commonDialog
    },
    props : {
        btnList : {
            type : Array,
            default : function () {
                return []
            }
        },
        currentRowData : { //点击按钮时获取到的参数，每一列的id值 用于路由传参
            type : Object,
            default : function () {
                return {}
            }
        },
        parentId : { //用于页面中tab下一级接参 当前parentid
            type : Number,
            default : 0
        },
        level : { //用于多级新增区分等级
            type : Number,
            default : 1
        },
        parentName : { //用于多级新增 展示上一级名称
            type : String,
            default : ''
        },
        errorCon : { //错误提示
            type : String,
            default : "请选择一条记录"
        },
        delInfoName : {
            type : String,
            default : "信息"
        },
        dialogTitle : {
            type : String,
            default : ''
        },
        dialogFormDatas : {
            type : Object,
            default: () => {
                return {};
            }
        },
        dialogRuleDatas : {
            type : Object,
            default: () => {
                return {};
            }
        },
        dialogFormItemList : {
            type : Array,
            default: () => {
                return [];
            }
        }
    },
    data () {
        return {
            currentUrl : '', //当前请求接口
            modal : false,
            modal_loading : false,
            dialogContentType : 1, //1为删除相关的内容，2为表单,3为提示信息
            message : '', //弹窗的提示语
            requestT : 'get' //接口请求方式 get put post
        }
    },
    methods : {
        topBtnEvent (btnInfo) {
            //刷新去go_refresh
            if(btnInfo.type == 1){
                this.goRefresh();
            } else if(btnInfo.type > 6 && btnInfo.type < 12) {
                if(btnInfo.icon) {
                    this.$emit('operate',btnInfo.type,btnInfo.icon);
                } else {
                    this.$emit('operate',btnInfo.type);
                }
            } else if(btnInfo.type > 11) {
                let objLength = Object.keys(this.currentRowData);
                if (!this.currentRowData.id && btnInfo.type > 12 && btnInfo.type < 99) {
                    this.$Modal.warning({
                        title: "温馨提示",
                        content: this.errorCon
                    });
                } else {
                    this.$emit('changeIndex',btnInfo.type,btnInfo.icon);
                }
            } else{
                //有弹窗标志的按钮弹窗 showDialog || 需要点击按钮发请求的立即请求 sendRequest ||  无弹窗标志的按钮跳页面 goPage
                if(btnInfo.dialogType){
                    this.showDialog(btnInfo.dialogType,btnInfo.url,btnInfo.dialogMessage,btnInfo.requestType)
                }else if(btnInfo.requestNow){
                    this.sendRequest(btnInfo.requestUrl)
                }else{
                    this.goPage(btnInfo.routerName,btnInfo.isAdd,btnInfo.hasLevel,btnInfo.belongRouterName)
                }
            }
        },
        goRefresh(){
            location.reload();
        },
        goPage(name,isAdd,hasLevel,belongRouterName){
            //除新增外 未选中某行需提示 “请选择数据”
            //新增页无上下级 跳页面无传参 || 其他(包括新增页带上下级) 跳页面有传参 currentData.id
            if(isAdd && !hasLevel){ //新增无上下级
                this.$router.push({
                    name: name,
                    params: {
                        belongRouterName: belongRouterName
                    }
                })
            }else if(isAdd && hasLevel){ //新增带上下级
                this.$router.push({
                    name: name,
                    params: {
                        belongRouterName: belongRouterName,
                        parentId : this.parentId,
                        level : this.level,
                        parentName : this.parentName
                    }
                })
            }else{ //非新增
                if (this.currentRowData.id === 'hqyatu') {
                    this.$common.showMessageModal(this, '该分组不可修改', 2);
                    return;
                };
                let objLength = Object.keys(this.currentRowData);
                if(objLength == 0 || !this.currentRowData.id) {
                    this.$Modal.warning({
                        title: "温馨提示",
                        content: this.errorCon
                    });
                }else{
                    this.$router.push({
                        name: name,
                        params: {
                            id : this.currentRowData.id,
                            name : this.currentRowData.szscenicname, //景区属性管理 需多一个景区name传参
                            belongRouterName: belongRouterName,
                            parentId : this.currentRowData.parentId,
                            ticket : this.currentRowData.ticket,
                        }
                    })
                }
            }

        },
        showDialog(dialogType,requestUrl,dialogMessage,requestType){
            this.dialogContentType = dialogType == 'del' ? 1 : dialogType == 'form' ? 2 : 0;
            if(Object.keys(this.currentRowData).length == 0){
                this.$Modal.warning({
                    title: "温馨提示",
                    content: this.errorCon
                });
                return;
            }
            this.modal = true;
            this.currentUrl = requestUrl;
            if(dialogMessage) this.message = dialogMessage;
            if(requestType) this.requestT = requestType;
        },
        changeModal(e){ //子组件通信 1为确定 0为取消
            if(e===1){
                this.modal_loading = true;
                // let data = {};
                // data[this.currentRowData['name']] = this.currentRowData['id'];
                if(this.dialogContentType == 1) { //删除调接口
                    if (this.currentUrl.indexOf('hqyatu') > -1) {
                        this.modal = false;
                        this.modal_loading = false;
                        this.$common.showMessageModal(this, '该数据不能删除！', 2);
                        return;
                    }
                    let str = this.currentUrl.indexOf("?") == -1 ? '?' : '&'; //删除请求的url除token外的其他参数在传入之前拼接好
                    this.$http.delete( this.currentUrl + str +'access_token='+this.Cookies.get('token'))
                    .then(res => {
                        this.modal_loading = false;
                        if(res.data.code === 200){
                            this.$emit('refreshData');
                            this.modal = false;
                            this.$Modal.success({
                                title: "温馨提示",
                                content: "删除成功，欢迎使用环球雅途易旅通"
                            })
                        }else{
                            this.modal = false;
                            this.modal_loading = false;
                            this.$Modal.error({
                                title: "温馨提示",
                                content: res.data.msg
                            })
                        }
                    })
                    .catch(error => {
                        this.modal_loading = false;
                        this.modal = false;
                        this.$Modal.error({
                            title: "温馨提示",
                            content: "接口异常, 请联系管理人员"
                        })
                    })
                }else{ //其他调接口
                    if(this.requestT == 'put'){
                        this.$http.put(this.currentUrl+'?access_token='+this.Cookies.get('token'))
                        .then(res => {
                            this.modal_loading = false;
                            this.$emit('refreshData');
                            this.modal = false;
                            this.$Modal.success({
                                title: "温馨提示",
                                content: "处理成功"
                            })
                        })
                    }
                }

            }else{
                 this.modal = false;
            }
        },
        sendRequest () { //立即请求

        }
    }

}
</script>

