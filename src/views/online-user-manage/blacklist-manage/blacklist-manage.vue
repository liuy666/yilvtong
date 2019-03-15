<style scoped>

</style>
<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">黑名单信息列表</span>
                    <top-btn
                            :btn-list="btnList"
                            :currentRowData="currentRowData"
                            @changeIndex="changeIndex"
                            @refreshData="refreshData"
                    ></top-btn>
                </p>
                <detail-form1
                        :is-list-page="true"
                        :is-mixed="false"
                        :label-width="80"
                        :formDatas="pars.formDatas"
                        :formItemList="formItemList_list"
                        @getFormData="getFormData"
                        @refreshData="refreshData"
                        @clearFormData="clearFormData"
                ></detail-form1>
                <radio-table
                        :colname="colname"
                        :total='total'
                        :tableData="tableData"
                        :isRadio="true"
                        :pageNum="pars.pageNum"
                        :pageCode="pars.pageCode"
                        :loading="loading"
                        @selected="getChooseData"
                        @changePage="changePage"
                        @changePageSize="changePageSize"
                        @isSingle="isSingle"
                ></radio-table>
            </Card>
            <Card v-show="currentIndex === 12 || currentIndex === 13">
                <p slot="title" class="slot_title_height">
                    <span v-if="currentIndex === 12" class="title_span">新增黑名单用户信息</span>
                    <span v-if="currentIndex === 13" class="title_span">修改黑名单用户信息</span>
                </p>
                <detail-form1
                        :form-datas="formDatas_add"
                        :form-item-list="formItemList_add"
                        :rule-datas="ruleDatas_add"
                        :is-list-page="false"
                        :is-mixed="false"
                        :is-close="isClose"
                        :label-width="labelWidth_add"
                        :btn-loading="btnLoading"
                        @getFormData="getFormData_add"
                        @closeCurrentPage="closeCurrentPage"
                ></detail-form1>
            </Card>
            <Card v-show="currentIndex === 14">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">查看黑名单用户信息</span>
                </p>
                <view-del-detail
                        :isClose = "isClose"
                        :formDatas="formDatas_view"
                        :formItemList="formItemList_view"
                        @closeCurrentPage = "closeCurrentPage"
                ></view-del-detail>
            </Card>
        </Row>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
export default {
    data(){
        return{
            searchCount: 1,
            currentIndex: 1,
            spinShow: true,
            isClose : false,
            total:0,
            loading: false,
            btnLoading: false,
            single: 0,
            tipName: '',
            //按钮部分
            btnList :[
                {
                    type : 1,
                    btnlabel : "刷新"
                },
                {
                    type : 12,
                    btnlabel : "新增",
                },
                {
                    type : 13,
                    btnlabel : "修改",
                },
                {
                    type : 4,
                    btnlabel : "删除",
                    dialogType : 'del',
                    url: ''
                },
                {
                    type : 14,
                    btnlabel : "查看",
                }
            ],
            //表单部分
            formItemList_list : [
                {
                    label : "用户名称",
                    keyName : "usid",
                    type : 1
                }
            ],
            labelWidth:80,
            //表格部分
            colname: [
                {
                    title: '用户名称',
                    key: 'usid',
                },
                {
                    title: '加入黑名单时间',
                    key: 'datemake',
                },
                {
                    title: '加入黑名单理由',
                    key: 'note',
                }
            ],
            tableData: [],
            currentRowData:{},
            pars:{
                formDatas : {
                    usid: ''
                },
                pageNum: 10,
                pageCode: 1,
            },
            urlQuery:{},
            //新增修改页面
            labelWidth_add : 140,
            formDatas_add : {},
            formItemList_add: [
                {
                    type: 1,
                    label: '用户名称',
                    keyName: 'usid',
                    disabled: false
                },
                {
                    type: 7,
                    label: '加入黑名单理由',
                    keyName: 'note'
                }
            ],
            ruleDatas_add: {
                usid: [
                    { required: true, message: '用户名称不能为空', trigger: 'blur' }
                ],
                note: [
                    { required: true, message: '加入黑名单理由不能为空', trigger: 'blur' }
                ]
            },
            formDatas_view: {},
            formItemList_view: [
                {
                    label: '用户名称',
                    keyName: 'usid'
                },
                {
                    label: '加入黑名单理由',
                    keyName: 'note'
                },
                {
                    label: '加入黑名单时间',
                    keyName: 'datemake'
                },
            ],
        }
    },
    methods:{
        // 点击新增修改查看按钮跳到对应页面
        changeIndex (type) {
            this.spinShow = true;
            if (type === 12) {
                this.tipName = '黑名单新增';
                this.setAddForm(type)
            } else if (type === 13) {
                this.tipName = '黑名单修改';
                this.setEditForm(type)
            } else if(type > 13){
                this.setViewForm(type)
            }
        },
        getChooseData (row) {
            this.currentRowData['id'] = row.usid;
            this.currentRowData['name'] = 'usid';
            this.currentRowData['note'] = row.note;
            this.currentRowData['datemake'] = row.datemake;
            this.btnList[3].url = `${this.baseUrl}/ec/backCustom/v1/deleteBackCustom?usid=${row.usid}`;
        },
        changePage(pageCode) {
            let arr = this.$store.state.page.listPagePars;
            for (let item of arr) {
                if (item.path == this.$route.path && item.index == 1) {
                    this.pars = item.pars;
                    break;
                }
            }
            this.currentRowData = {};
            this.pars.pageCode = pageCode;
            this.$common.currentPageData(this.baseUrl+'/ec/backCustom/v1/backcustomViewList', this, 'get')
        },
        changePageSize(pageSize){
            let arr = this.$store.state.page.listPagePars;
            for (let item of arr) {
                if (item.path == this.$route.path && item.index == 1) {
                    this.pars = item.pars;
                    break;
                }
            }
            this.currentRowData = {};
            this.pars.pageNum = pageSize;
            this.$common.currentPageData(this.baseUrl+'/ec/backCustom/v1/backcustomViewList', this, 'get')
        },
        getFormData(data){
            this.pars.formDatas = data;
            this.pars.pageCode = 1;
            this.pars.pageNum = 10;
            this.$common.currentPageData(this.baseUrl+'/ec/backCustom/v1/backcustomViewList', this, 'get')
        },
        refreshUrlQuery () {
            this.urlQuery = {
                pageSize: this.pars.pageNum,
                page: this.pars.pageCode,
                usid: this.pars.formDatas.usid
            };
        },
        clearFormData(){
            this.pars.formDatas = {}
        },
        refreshData(){
            this.pars.pageCode = this.pars.pageCode - this.single;
            this.$common.currentPageData(this.baseUrl+'/ec/backCustom/v1/backcustomViewList', this, 'get')
        },
        isSingle(page){
            this.single = page
        },
        setAddForm (type) {
            this.formItemList_add[0].disabled = false;
            this.formDatas_add = {};
            this.spinShow = false;
            this.currentIndex = type
        },
        setEditForm (type) {
            this.formItemList_add[0].disabled = true;
            this.formDatas_add = {
                usid: this.currentRowData.id,
                note: this.currentRowData.note,
                datemake: this.currentRowData.datemake
            };
            this.spinShow = false;
            this.currentIndex = type
        },
        setViewForm (type) {
            this.formDatas_view = {
                usid: this.currentRowData.id,
                note: this.currentRowData.note,
                datemake: this.currentRowData.datemake
            };
            this.spinShow = false;
            this.currentIndex = type
        },
        async getFormData_add (obj) {
            this.btnLoading = true;
            let aaa = '';
            if(this.currentIndex === 12){
                aaa = await this.$common.addNewData(`/ec/backCustom/v1/saveBackcustom?flag=1&${this.QS.stringify(obj)}`, this, {}, 'post', true)
            } else if (this.currentIndex === 13){
                aaa = await this.$common.editData(`/ec/backCustom/v1/saveBackcustom?flag=2&${this.QS.stringify(obj)}`, this, {}, 'post', true)
            }
            this.currentRowData = {};
            if (aaa) {
                this.$common.currentPageData(this.baseUrl+'/ec/backCustom/v1/backcustomViewList', this, 'get')
            }
        },
        //关闭新增查看页
        closeCurrentPage() {
            this.currentIndex = 1;
        }
    },
    created () {
        this.$common.currentPageData(this.baseUrl+'/ec/backCustom/v1/backcustomViewList', this, 'get')
    }

}
</script>