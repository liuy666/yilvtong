<template>
    <div>
        <Card>
            <p slot="title" style="height:32px;">
                <span style="display:inline-block;float:left;line-height:32px;">导游用户查询</span>
                <top-btn
                    :btn-list="btnList"
                    :current-row-data="currentRowData"
                    dialog-title="登录密码初始化"
                    :dialog-form-datas="dialogFormDatas"
                    :dialog-form-item-list="dialogFormItemList"
                ></top-btn>
            </p>

            <detail-form
                :formDatas="pars.formDatas"
                :formItemList="formItemList"
                :is-list-page="true"
                :is-mixed="true"
                :label-width="labelWidth"
            ></detail-form>
            
            <radio-table
                :colname="tableColumns"
                :total='total'
                :tableData="tableDatas"
                :isRadio="true"
                :pageNum="pars.pageNum"
                :pageCode="pars.pageCode"
                :loading="loading"
                @selected="getChooseData"
                @changePage="changePage"
                @changePageSize="changePageSize"
                @isSingle="isSingle"
            ></radio-table>

            <common-dialog
                :modal="modal"
                :content-type="dialogContentType"
                dialog-title="登录密码初始化"
                :form-datas="dialogFormDatas"
                :dialog-form-item-list="dialogFormItemList"
                dialog-message="您确定要初始化错误登录次数吗？"
                @changeModal="changeModal"
                @changeModalLoading="changeModalLoading"
                @refreshData="refreshData"
                :modal-loading="modal_loading"
                :is-from-btn-components="isFromBtnComponents"
                :current-data="currentRowData"
            ></common-dialog>
        </Card>
    </div>
</template>
<script>
import commonMethod from '@/libs/common.js';

export default {
    name : 'FIT-user-manage',
    data () {
        return {
            //按钮部分
            btnList : [
                {
                    type : 1,
                    btnlabel : "刷新"
                },{
                    type : 2,
                    btnlabel : "新增",
                    isAdd : true,
                    routerName : 'guide_user_reg_new'
                },
                {
                    type : 3,
                    btnlabel : "登录密码初始化",
                    dialogType : 'form'
                },
                {
                    type : 3,
                    btnlabel : "错误登录次数初始化",
                    dialogType : "message",
                    dialogMessage : '您确定要初始化错误登录次数吗？'
                }
            ],
            formDatas : {
                radiobutton : 0,
                userNum : '',
                name : '',
                emallortel : '',
                usertype : ''
            },
            //表单部分
            formItemList : [
                {
                    label : "",
                    radioValue : 1,
                    radioLabel : "按用户编号查询",
                    keyName : "userNum",
                    type : 6
                },
                {
                    label : "",
                    radioValue : 2,
                    radioLabel : "按联系人姓名查询(模糊查询)",
                    keyName : "linkmanName",
                    type : 6
                },
                {
                    label : "",
                    radioValue : 3,
                    radioLabel : "按邮箱或手机号码查询",
                    keyName : "emailOrTel",
                    type : 6
                },
                {
                    label : "选择用户类型",
                    keyName : "userType",
                    type : 4,
                    labelWidth : 110,
                    optionList:[{
                        value : 1,
                        label : "查询有效用户"
                    },{
                        value : 2,
                        label : "查询无效用户"
                    }]
                }
            ],
            labelWidth : 10,
            //表格部分
            currentRowData : {},
            tableColumns : [
                {
                    'title' : '用户编号',
                    'key' : 'userNum',
                    'align' : 'center',
                    'width' : 100
                },{
                    'title' : '用户昵称',
                    'key' : 'userName',
                    'align' : 'center',
                    'width' : 150
                },{
                    'title' : '导游姓名',
                    'key' : 'guideName',
                    'align' : 'center',
                    'width' : 100
                },{
                    'title' : '操作',
                    'key' : 'options',
                    'align' : 'center',
                    'width' : 450,
                    'render' : (h,params) => {
                        const row = params.row;
                        if(!row.options) return '';
                        return h('div',[
                            h('a',{
                                class : 'table-alink',
                                on : {
                                    click : () => {
                                        this.modal = true;
                                        this.dialogContentType = 2;
                                    }
                                }
                            },' 登录密码初始化 '),
                            h('a',{
                                class : 'table-alink',
                                on : {
                                    click : () => {
                                        this.modal = true;
                                        this.dialogMessage = '您确定要初始化错误登录次数吗？';
                                        this.dialogContentType = 0;
                                    }
                                }
                            },' 错误登录次数初始化 '),
                            h('a',{
                                class : 'table-alink',
                                on : {
                                    click : () => {
                                        this.$router.push({
                                            name: 'guide_user_check',
                                            params: {
                                                id : row.id
                                            }
                                        })
                                    }
                                }
                            },' 审核 '),
                            h('a',{
                                class : 'table-alink',
                                on : {
                                    click : () => {
                                        this.modal = true;
                                        this.dialogMessage = '您确定要快速审核此用户吗？';
                                        this.dialogContentType = 0;
                                    }
                                }
                            },' 快速审核 '),
                            h('a',{
                                class : 'table-alink',
                                on : {
                                    click : () => {
                                        this.modal = true;
                                        this.dialogMessage = '您确定要初始化指纹吗？';
                                        this.dialogContentType = 0;
                                    }
                                }
                            },' 初始化指纹 ')
                        ])
                    }
                },{
                    'title' : '用户状态',
                    'key' : 'userStatus',
                    'align' : 'center',
                    'width' : 100,
                    'render' : (h,params) => {
                        const row = params.row;
                        const text = row.userStatus == 1 ? '有效用户' : row.userStatus == 0 ? '无效用户' : '';
                    }
                },{
                    'title' : '联系人',
                    'key' : 'linkman',
                    'align' : 'center',
                    'width' : 100
                },{
                    'title' : '身份证号',
                    'key' : 'IdCard',
                    'align' : 'center',
                    'width' : 200
                },{
                    'title' : '手机号码',
                    'key' : 'phone',
                    'align' : 'center',
                    'width' : 150
                },{
                    'title' : '邮箱地址',
                    'key' : 'email',
                    'align' : 'center',
                    'width' : 200
                },{
                    'title' : '联系电话',
                    'key' : 'telphone',
                    'align' : 'center',
                    'width' : 150
                },{
                    'title' : '注册时间',
                    'key' : 'registerTime',
                    'align' : 'center',
                    'width' : 150
                },{
                    'title' : '最后一次登录时间',
                    'key' : 'lastLoginTime',
                    'align' : 'center',
                    'width' : 200
                }
            ],
            tableDatas : [{
                id:1,
                userNum : 'wrong',
                userName : '',
                guideName : '王丽',
                options : 1,
                userStatus : 1,
                linkman : 'xxx',
                IdCard : '23434533131343135',
                phone : '18602843031',
                email : 'qq.com',
                telphone : '0817-1544124',
                registerTime : '2018-05-09',
                lastLoginTime : '2018-05-10'
            },{},{}],
            tableSize : 'small',
            pars:{
                formDatas : {
                    radiobutton : 0,
                    userNum : '',
                    name : '',
                    emallortel : '',
                    usertype : ''
                },
                pageNum:10,
                pageCode:1,
            },
            total:0,
            loading: false,
            single: 0,
            //弹窗部分
            dialogFormDatas : {
                userNum : '',
                originalPWD : '666666'
            },
            dialogFormItemList:[{
                type : 9,
                label : "用户名",
                keyName : "userNum"
            },{
                type : 1,
                label : "密码",
                keyName : "originalPWD" 
            }],
            modal:false,
            dialogContentType:0,
            dialogMessage :'',
            modal_loading:false,
            isFromBtnComponents:false
        }
    },
    methods : {
        getChooseData (currentRow) { 
            if(currentRow.id){
                this.currentRowData['id'] = currentRow.id;
                this.currentRowData['name'] = 'xxid';
                this.dialogFormDatas['userNum'] = currentRow.userNum;
            }else{
                this.currentRowData = {};
            }
        },
        changePage(pageCode) {
            this.pars.pageCode = pageCode;
            this.$common.currentPageData(this.baseUrl+'/tourcard/tourcard/v1/list', this);
        },
        changePageSize(pageSize){
            this.pars.pageNum = pageSize;
            this.$common.currentPageData(this.baseUrl+'/tourcard/tourcard/v1/list', this)
        },
        getFormData(data){
            this.pars.formDatas = data;
            this.pars.pageCode = 1;
            this.pars.pageNum = 10;
            this.$common.currentPageData(this.baseUrl+'/tourcard/tourcard/v1/list', this)
        },
        clearFormData(){
            this.pars.formDatas = {}
        },
        refreshData(){
            this.pars.pageCode = this.pars.pageCode - this.single;
            this.$common.currentPageData(this.baseUrl+'/tourcard/tourcard/v1/list', this)
        },
        isSingle(page){
            this.single = page
        },
        
        changeModal(e){
            this.modal = false;
        },
        changeModalLoading(e){
            this.modal_loading = e;
        }
    },
    computed : {
        
    },
    created () {
        this.$common.currentPageData(this.baseUrl+'/tourcard/tourcard/v1/list', this);
    }
}
</script>
