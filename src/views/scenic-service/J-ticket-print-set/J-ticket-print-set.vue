<style scoped>

</style>
<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">票务打印管理</span>
                    <top-btn
                            :btn-list="btnList"
                            :currentRowData="currentRowData"
                            @changeIndex="changeIndex"
                    ></top-btn>
                </p>
                <detail-form1
                        :formDatas="pars.formDatas"
                        :formItemList="formItemList"
                        :is-list-page="true"
                        :is-mixed="false"
                        :label-width="labelWidth"
                        @getFormData="getFormData"
                        @clearFormData="clearFormData"
                ></detail-form1>
                <radio-table
                        :colname="colname"
                        :total='total'
                        :tableData="tableData"
                        :isRadio="false"
                        :pageNum="pars.pageNum"
                        :pageCode="pars.pageCode"
                        :loading="loading"
                        @selected="getChooseData"
                        @changePage="changePage"
                        @changePageSize="changePageSize"
                        @isSingle="isSingle"
                ></radio-table>
            </Card>
            <Card v-show="currentIndex === 12">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">管理票务打印管理</span>
                </p>
                <div>
                    <detail-form1
                            :isListPage = "false"
                            :isMixed = "false"
                            :isClose = "isClose"
                            :formDatas = "formDatas1"
                            :formItemList = "formItemList1"
                            :btn-loading="btnLoading"
                            @getFormData = "getFormDataAdd"
                            @closeCurrentPage = "closeCurrentPageAdd"
                            @selectHasChanged = "selectHasChanged"
                    ></detail-form1>
                </div>
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
            tipName: '门票打印设置',
            btnLoading: false,
            //按钮部分
            btnList :[
                {
                    type : 1,
                    btnlabel : "刷新"
                },
                {
                    type : 12,
                    btnlabel : "设置打印",
                }
            ],
            //表单部分
            formItemList : [
                {
                    label : "服务商",
                    keyName : "scenicId",
                    type : 4,
                    labelWidth : 70,
                    optionList : []
                },{
                    label : "业务",
                    keyName : "ibusinessid",
                    type : 4,
                    labelWidth : 50,
                    optionList : []
                }
            ],
            labelWidth : 80,
            //表格部分
            colname: [
                {
                    title: '服务商',
                    key: 'szscenicname',
                },
                {
                    title: '业务',
                    key: 'szbusinessname',
                },
                {
                    title: '打印编号',
                    key: 'szprintno',
                },
                {
                    title: '顺序',
                    key: 'ordernum',
                }
            ],
            tableData: [],
            currentRowData:{},
            pars:{
                formDatas : {
                    scenicId: '',
                    ibusinessid: '',
                },
                pageNum:10,
                pageCode:1,
            },
            total:0,
            loading: false,
            single: 0,
            formDatas1: {},
            formItemList1: [
                {
                    label : "服务商",
                    keyName : "scenicId",
                    type : 4,
                    disabled: true,
                    optionList : []
                },
                {
                    label : "业务",
                    keyName : "ibusinessid",
                    type : 4,
                    disabled: true,
                    optionList : []
                },
                {
                    type: 21,
                    label: '打印编码组成',
                    keyName: 'printnos',
                    width: '70%',
                    height: 569,
                    colname: [
                        {
                            type: 'selection',
                            width: 120,
                            align: 'center'
                        },
                        {
                            title: '打印名称',
                            key: 'pmva',
                            align: 'center'
                        },
                        {
                            title: '顺序',
                            align: 'center',
                            render: (h, params) => {
                                return h('Input', {
                                    props: {
                                        value: params.row.pmvf
                                    },
                                    style: {
                                        width: '80px'
                                    },
                                    on: {    //render无法双向绑定，故用此方法伪双向
                                        input: (val) => {
                                            params.row.pmvf = val;
                                            this.formItemList1[2].tableData[params.index] = params.row;
                                            this.changeInput(this.formItemList1[2].tableData)
                                        }
                                    }
                                })
                            }
                        }
                    ],
                    tableData: [],
                }
            ]
        }
    },
    methods : {
        // 点击新增修改查看按钮跳到对应页面
        async changeIndex (type, usid) {
            this.spinShow = true;
            if (type === 12) {
                await this.setAddForm(type)
            }
        },
        //表格相关
        //表格相关
        getChooseData(row){
            this.currentRowData["id"] = row.iscenicid;
            this.currentRowData["name"] = 'iscenicid';
            this.currentRowData["szscenicname"] = row.szscenicname;
            this.btnList[3].url = this.baseUrl+'/ticket/provider/v1/deleteProvider?iscenicId='+row.iscenicid;
        },
        changePage(pageCode) {
            let arr = this.$store.state.page.listPagePars;
            for (let item of arr) {
                if (item.path == this.$route.path && item.index == 1) {
                    this.pars = item.pars;
                    break;
                }
            }
            this.pars.pageCode = pageCode;
            this.$common.currentPageData(this.baseUrl+'/ticket/printticket/v1/manageViewlist', this, 'get')
        },
        changePageSize(pageSize){
            let arr = this.$store.state.page.listPagePars;
            for (let item of arr) {
                if (item.path == this.$route.path && item.index == 1) {
                    this.pars = item.pars;
                    break;
                }
            }
            this.pars.pageNum = pageSize;
            this.$common.currentPageData(this.baseUrl+'/ticket/printticket/v1/manageViewlist', this, 'get')
        },
        isSingle(page){
            this.single = page
        },
        refreshUrlQuery () {
            this.urlQuery = {
                pageSize: this.pars.pageNum,
                page: this.pars.pageCode,
                scenicId : this.pars.formDatas.scenicId,
                ibusinessid : this.pars.formDatas.ibusinessid
            };
        },
        //表单相关
        getFormData(data){
            this.pars.formDatas = data;
            this.pars.pageCode = 1;
            this.pars.pageNum = 10;
            this.$common.currentPageData(this.baseUrl+'/ticket/printticket/v1/manageViewlist', this, 'get')
        },
        clearFormData(){
            this.pars.formDatas = {
                scenicId: this.formItemList[0].optionList[0].value,
                ibusinessid: this.formItemList[1].optionList[0].value,
            }
        },
        async setAddForm (type) {
            let arr = this.$store.state.page.listPagePars;
            for (let item of arr) {
                if (item.path == this.$route.path && item.index == 1) {
                    this.formDatas1 = JSON.parse(JSON.stringify(item.pars.formDatas));
                    break;
                }
            }
            this.$set(this.formDatas1, 'printnos', []);
            // let obj = JSON.parse(JSON.stringify(this.formDatas1));
            // obj.access_token = this.Cookies.get('token');
            this.$http.get(`${this.baseUrl}/ticket/printticket/v1/printManage`, {
                params: {
                    access_token: this.Cookies.get('token'),
                    scenicId: this.formDatas1.scenicId,
                    businessid: this.formDatas1.ibusinessid
                }
            }).then(res => {
                if (res.data.code === 200) {
                    let data = res.data.data;
                    data.map(item => {
                        if (item.ischecked) {
                            item._checked = true;
                            this.formDatas1.printnos.push(item)
                        }
                    });
                    this.formItemList1[2].tableData = data;
                } else {
                    this.$common.showMessageModal(this, res, 1)
                }
                this.spinShow = false;
                this.currentIndex = type
            });
        },
        //管理打印页面表单验证
        formValidation () {    //表单验证
            const reg =  /^[1-9]\d*$/;
            let arr = [];
            this.formDatas1.printnos.map(item => {
                if (!reg.test(parseInt(item.pmvf))) {
                    this.$common.showMessageModal(this, '编号顺序不能为空且须是大于0的整数', 2);
                    return 0
                } else {
                    arr.push(item)
                }
            });
            if (this.formDatas1.printnos.length === arr.length) {
                return 1
            }
        },
        async getFormDataAdd (obj) {
            if(!this.formValidation()) return;
            this.btnLoading = true;
            let [arr,data,aaa] = [[],{},''];
            obj.printnos.map(item => {
                arr.push({
                    printno: item.pmcd,
                    ordernum: item.pmvf,
                })
            });
            data = {
                id: {
                    iscenicid: obj.scenicId,
                    ibusinessid: obj.ibusinessid,
                },
                printnos: JSON.stringify(arr)
            };
            // console.log(obj.printnos)
            aaa = await this.$common.addNewData('/ticket/printticket/v1/saveprintmanage', this, data);
            if (aaa) this.$common.currentPageData(this.baseUrl+'/ticket/printticket/v1/manageViewlist', this, 'get')
        },
        //多选表格选中项一旦发生变化
        selectHasChanged (arr) {
            let table = JSON.parse(JSON.stringify(this.formItemList1[2].tableData));
            for (let obj of table) {
                obj.ischecked = false;
                obj._checked = false
            }
            if (arr.length > 0) {
                for (let item of arr) {
                    item.ischecked = true;
                    item._checked = true;
                    for (let obj of table) {
                        if (item.pmcd === obj.pmcd) {
                            obj.ischecked = true;
                            obj._checked = true
                        }
                    }
                }
            }
            this.formItemList1[2].tableData = table;
            this.formDatas1.printnos = arr;
        },
        //输入框值改变，更新选中行的数据
        changeInput (data) {
            let arr = [];
            for (let item of data) {
                if (item.ischecked) {
                    item['_checked'] = true;
                    arr.push(item)
                } else {
                    item['_checked'] = false
                }
            }
            this.formDatas1.printnos = arr;
        },
        //关闭新增修改查看页
        closeCurrentPageAdd () {
            this.currentIndex = 1
        }
    },
    async created () {
        //获取景区服务商列表
        const options = await this.$common.getScenicList(this,0);
        this.formItemList[0].optionList = options;
        this.formItemList1[0].optionList = options;
        //获取业务类型列表
        const option1 = await this.$common.getSelectItem(this.baseUrl+'/ticket/business/v1/businessSelect',this,1,'ibusinessid','szbusinessname',true);
        this.formItemList[1].optionList = option1;
        this.formItemList1[1].optionList = option1;
        this.pars.formDatas = {
            scenicId: this.formItemList[0].optionList[0].value,
            ibusinessid: this.formItemList[1].optionList[0].value,
        };
        //获取表格数据
        this.$common.currentPageData(this.baseUrl+'/ticket/printticket/v1/manageViewlist', this, 'get')
    }

}
</script>