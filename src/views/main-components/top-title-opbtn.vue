<template>
    <div>
        <p style="display:inline-block;">
            <Button v-for="(item,index) in btnList" 
                    :key="index" 
                    type="ghost" 
                    shape="circle" 
                    :class="index==0?'bigMargin':'smallMargin'" 
                    @click="btnEvent(item)"
                    >
                <Icon v-if="item.type==1" type="ios-refresh-empty" /> <!-- type 1为刷新 2为新增 3为修改 4为删除 5为查看 6为自定义 -->
                <Icon v-if="item.type==2" type="ios-plus-empty" />
                <Icon v-if="item.type==3" type="ios-compose-outline" />
                <Icon v-if="item.type==4" type="ios-trash-outline" />
                <Icon v-if="item.type==5" type="ios-search" />
                <Icon v-if="item.type==6" :type="item.icon" />
                {{ item.btnlabel }}
            </Button>
        </p>

        <common-dialog
            :modal="modal"
            info-name="信息信息"
            :content-type="dialogContentType"
            :form-datas="dialogFormDatas"
            :rule-datas="dialogRuleDatas"
            :dialog-form-item-list="dialogFormItemList"
        ></common-dialog>
    </div>
</template>

<script>
import commonDialog from './common-dialog.vue';
export default {
    name : 'topTitleOpbtn',
    components : {
        commonDialog
    },
    props : {
        btnList : {
            type : Array,
            required : true
        },
        currentRowData : {
            type : Object,
            default : function () {
                return {}
            }
        },
        currentLevel : { //用于页面中tab下一级接参，当前级别数 或者 当前parentid
            type : String,
            default : '0'
        },
        errorCon : {
            type : String,
            default : "请选择一条记录"
        },
        arguName : {
            type : String,
            default : "currentData"
        },
        infoName : {
            type : String,
            default : '信息'
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
            modal : false,
            modal_loading : false,
            dialogContentType : 1 //1为删除相关的内容，2为表单
        }
    },
    methods : {
        btnEvent (item) {
            // if(item.type == 1){
            //     this.go_Refresh();
            // }else if(item.type == 4){
            //     this.delDialog();
            // }else{
            //     this.goToPage(item.routerName,item.isAdd,item.param);
            // }
            if(item.showDialog){
                this.delOrFormDialog(item.showDialog);
            }else{
                if(item.type == 1){
                    this.go_Refresh();
                }else{
                    this.goToPage(item.routerName,item.isAdd,item.param);
                }
            }
        },
        delOrFormDialog (dialogType) {
            this.dialogContentType = dialogType == 'del' ? 1 : dialogType == 'form' ? 2 : 0;
            if(Object.keys(this.currentRowData).length == 0){
                this.$Modal.error({
                    title: "温馨提示",
                    content: this.errorCon
                });
                return;
            }
            this.modal = true;
        },
        go_Refresh(){
            location.reload();
        },
        goToPage (name,isAdd,param) {
            if(Object.keys(this.currentRowData).length > 0 || isAdd){
                if (isAdd) {
                    if(param){ //新增页带参数的处理  用于新增本级 新增下级之类的情况 比如客源地管理
                        let argu = {};
                        argu[param] = parseInt(this.currentLevel);
                        this.$router.push({
                            name: name,
                            params : argu
                        })
                    }else{
                        this.$router.push({
                            name: name
                        })
                    }
                } else {
                    let paramObj = {
                        paramName : this.arguName,
                        paramValue : this.currentRowData
                    }
                    this.$store.commit('setParams', paramObj);

                    this.$router.push({
                        name: name
                        //params: argu
                    })
                }
            }else{
                this.$Modal.error({
                    title: "温馨提示",
                    content: this.errorCon
                });
            }
        }
    }
}
</script>

<style scoped lang="less">
    .bigMargin{
        margin-left: 2%;
    }
    .smallMargin{
        margin-left: 0.5%;
    }
</style>