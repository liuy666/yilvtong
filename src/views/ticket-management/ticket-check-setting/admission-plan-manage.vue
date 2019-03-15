<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">入园验证预案查询</span>
                    <top-btn
                            :btnList="btnList"
                            :currentRowData="currentRowData"
                            @changeIndex="changeIndex"
                            @refreshData="refreshData"
                    ></top-btn>
                </p>
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
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">{{pageName}}入园验证预案</span>
                </p>
                <detail-form1
                    :form-datas="formData_add"
                    :form-item-list="formItemList_add"
                    :rule-datas="ruleDatas_add"
                    :is-list-page="false"
                    :is-mixed="false"
                    :is-close="isClose"
                    :label-width="labelWidth_add"
                    @getFormData="getFormData_add"
                    @closeCurrentPage="closeCurrentPage"
                    @addOrsubtractRow = "addOrsubtractRow"
                ></detail-form1>
            </Card>
            <Card v-show="currentIndex === 14">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">查看入园验证预案</span>
                </p>
                <view-del-detail
                    :formDatas="formDatas_view"
                    :formItemList="formItemList_view"
                    :label-width="labelWidth_view"
                    :is-view="true"
                    :is-show="true"
                    :is-close="isClose"
                    @closeCurrentPage="closeCurrentPage"
                ></view-del-detail>
            </Card>
        </Row>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                currentIndex: 1,
                spinShow: false,
                isClose : false,
                //列表页 按钮部分
                btnList: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    },
                    {
                        type: 12,
                        btnlabel: '新增',
                    },
                    {
                        type: 13,
                        btnlabel: '修改',
                    },
                    {
                        type: 4,
                        btnlabel: '删除',
                        dialogType: 'del',
                        url: '',
                    },
                    {
                        type: 14,
                        btnlabel: '查看',
                    }
                ],                
                //列表页 表格部分
                currentRowData: {},
                colname : [
                    {
                        title : '预案名称',
                        key : 'name',
                        align : 'center'
                    },
                    {
                        title : '步骤一',
                        key : 'step1',
                        align : 'center'
                    },
                    {
                        title : '步骤二',
                        key : 'step2',
                        align : 'center'
                    },
                    {
                        title : '步骤三',
                        key : 'step3',
                        align : 'center'
                    },
                    {
                        title : '步骤四',
                        key : 'step4',
                        align : 'center'
                    },
                    {
                        title : '步骤五',
                        key : 'step5',
                        align : 'center'
                    },
                    {
                        title : '步骤六',
                        key : 'step6',
                        align : 'center'
                    },
                    {
                        title : '步骤七',
                        key : 'step7',
                        align : 'center'
                    },
                    {
                        title : '步骤八',
                        key : 'step8',
                        align : 'center'
                    },
                    {
                        title : '步骤九',
                        key : 'step9',
                        align : 'center'
                    }
                ],
                tableData:[],
                total: 0,
                loading: false,
                single: 0,
                pars:{
                    pageNum:10,
                    pageCode:1,
                },
                urlQuery:{},
                
                //新增修改页面
                labelWidth_add : 180,
                formData_add : {},
                formItemList_add: [
                    {
                        type: 1,
                        label: '预案名称',
                        keyName: 'name'
                    },
                    {
                        type: 23,
                        label: '步骤设置',
                        keyName: 'steps',
                        wordDec:'步骤',
                        numWordArr : ['一','二','三','四','五','六','七','八','九'],
                        divList : [
                            {
                                optionList : []
                            }
                        ]
                    }
                ],
                ruleDatas_add : {
                    name: [
                        { required: true, message: '预案名称不能为空', trigger: 'blur' }
                    ]
                },
                pageName : '',
                formName : '',
                tipName : '',
                //查看页面
                labelWidth_view : 180,
                formDatas_view : {},
                formItemList_view :[
                    {
                        label : '预案名称',
                        keyName : 'name'
                    },{
                        label : '步骤一',
                        keyName : 'step1'
                    },{
                        label : '步骤二',
                        keyName : 'step2'
                    },{
                        label : '步骤三',
                        keyName : 'step3'
                    },{
                        label : '步骤四',
                        keyName : 'step4'
                    },{
                        label : '步骤五',
                        keyName : 'step5'
                    },{
                        label : '步骤六',
                        keyName : 'step6'
                    },{
                        label : '步骤七',
                        keyName : 'step7'
                    },{
                        label : '步骤八',
                        keyName : 'step8'
                    },{
                        label : '步骤九',
                        keyName : 'step9'
                    }
                ],
                formItemList_view_old : [
                    {
                        label : '预案名称',
                        keyName : 'name'
                    },{
                        label : '步骤一',
                        keyName : 'step1'
                    },{
                        label : '步骤二',
                        keyName : 'step2'
                    },{
                        label : '步骤三',
                        keyName : 'step3'
                    },{
                        label : '步骤四',
                        keyName : 'step4'
                    },{
                        label : '步骤五',
                        keyName : 'step5'
                    },{
                        label : '步骤六',
                        keyName : 'step6'
                    },{
                        label : '步骤七',
                        keyName : 'step7'
                    },{
                        label : '步骤八',
                        keyName : 'step8'
                    },{
                        label : '步骤九',
                        keyName : 'step9'
                    }
                ],
                nodeList : []
            }
        },
        methods:{
            // 点击新增修改查看按钮跳到对应页面
            async changeIndex (type) {
                if (type === 12) {
                    this.spinShow = true;
                    await this.setAddForm();
                    this.currentIndex = type
                } else if (type === 13) {
                    this.spinShow = true;
                    await this.setEditForm();
                    this.currentIndex = type
                }else if(type == 14){
                    this.spinShow = true;
                    await this.setViewForm();
                    this.currentIndex = type
                }
            },
            //表格相关
            getChooseData(row){ 
                this.currentRowData["id"] = row.id;
                this.currentRowData["name"] = 'id';
                this.btnList[3].url = this.baseUrl+'/ticket/checkSchedule/deleteSchedule?id='+row.id;
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
                this.$common.currentPageData(this.baseUrl+'/ticket/checkSchedule/queryScheduleList', this, 'get',true)
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
                this.$common.currentPageData(this.baseUrl+'/ticket/checkSchedule/queryScheduleList', this, 'get',true)
            },
            isSingle(page){
                this.single = page
            },
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pars.pageNum,
                    page: this.pars.pageCode
                };
            },
            refreshData(){
                this.currentRowData = {};
                this.pars.pageCode = this.pars.pageCode - this.single;
                this.$common.currentPageData(this.baseUrl+'/ticket/checkSchedule/queryScheduleList', this, 'get',true)
            },
            getFormData(data){ 
                this.pars.formDatas = data;
                this.pars.pageCode = 1;
                this.pars.pageNum = 10;
                this.$common.currentPageData(this.baseUrl+'/ticket/checkSchedule/queryScheduleList', this, 'get',true)
            },
            async setAddForm () {
                this.pageName = "新增";
                this.tipName = "新增";
                //await this.getNodeList();
                this.formItemList_add[1].divList = [{}];
                this.formItemList_add[1].divList[0]["optionList"] = this.nodeList;
                this.formData_add = {
                    name : '',
                    steps : [
                        {
                            step : []
                        }
                    ]
                }
                this.spinShow = false;
            },
            async setEditForm () { 
                this.pageName = "修改";
                this.tipName = "修改";
                //await this.getNodeList();
                this.formItemList_add[1].divList = [{}];
                this.formItemList_add[1].divList[0]["optionList"] = this.nodeList;
                //获取相关步骤信息， 根据步骤数steps.length 改变formItemList_add[1].divList
                this.getPlanInfo();
            },
            setViewForm () {
                this.getPlanInfo(true);
            },
            //获取节点列表
            getNodeList () {
                let _this = this;
                return new Promise((resolve,reject) => {
                    this.$http.get(this.baseUrl+'/ticket/checkSchedule/getAllNode?access_token=' + this.Cookies.get('token'))
                    .then(res => { 
                        if (res.data.code == 200) { 
                            if(res.data.data && res.data.data.length>0){
                                let options = [];
                                res.data.data.forEach(v => {
                                    let obj = {};
                                    obj["value"] = v.id;
                                    obj["label"] = v.name;
                                    options.push(obj);
                                })
                                _this.nodeList = options;
                            }else{
                                _this.nodeList = [
                                    {
                                        "value" : '',
                                        'label' : '暂无节点,请前往节点管理添加节点'
                                    }
                                ];
                            };
                            resolve()
                        } else {
                            this.$common.showMessageModal(this, res, 1);
                            reject()
                        }
                    })
                });
            },
            //根据预案id获取对应预案信息 
            getPlanInfo (isView) {
                let _this = this;
                return new Promise((resolve,reject) => {
                    this.$http.get(this.baseUrl+'/ticket/checkSchedule/getSchedule?access_token=' + this.Cookies.get('token')+'&id='+ this.currentRowData.id)
                    .then(res => { 
                        if (res.data.code == 200) { 
                            if(res.data.data.steps && res.data.data.steps.length > 0){
                                let stepArr = [], viewDataObj = {};
                                res.data.data.steps.forEach(v => {
                                    let obj = {};
                                    obj["step"] = v.nodeIds;
                                    stepArr.push(obj);
                                    
                                    viewDataObj["step"+v.index] = v.nodeNames.join(",");
                                })
                                if(isView){
                                    _this.formItemList_view = _this.formItemList_view_old.slice(0,res.data.data.steps.length+1);
                                    viewDataObj["name"] = res.data.data.name;
                                    viewDataObj["id"] = res.data.data.id;
                                    _this.formDatas_view = viewDataObj;
                                }else{
                                    _this.formData_add = {
                                        name : res.data.data.name,
                                        id : res.data.data.id,
                                        steps : stepArr
                                    }
                                    for(let i=0;i<stepArr.length-1;i++){
                                        _this.formItemList_add[1].divList.push(this.formItemList_add[1].divList[0]);
                                    }
                                }
                                _this.spinShow = false;
                            }
                            resolve()
                        } else {
                            this.$common.showMessageModal(this, res, 1);
                            reject()
                        }
                    })
                });
            },
            async getFormData_add (obj) { 
                let isEmpty = false;
                obj.steps.forEach(v => {
                    if(v.step.length == 0){
                        isEmpty = true;
                    }
                })
                if(isEmpty){
                    this.$Modal.warning({
                        title: '温馨提示您',
                        content: '步骤不能为空，请完善步骤'
                    })
                    return;
                }
                if(this.pageName == '新增'){
                    await this.$common.addNewData('/ticket/checkSchedule/updateSchedule',this,obj,'post',false)
                } else if(this.pageName == '修改'){
                    await this.$common.editData('/ticket/checkSchedule/updateSchedule', this, obj,'post',false)
                }
                this.currentRowData = {};
                this.$common.currentPageData(this.baseUrl+'/ticket/checkSchedule/queryScheduleList', this, 'get',true)
            },
            //关闭新增查看页
            closeCurrentPage() {
                this.currentIndex = 1;
            },
            //增加 或 减少步骤行
            addOrsubtractRow (num,index) { //num 1减2加
                if (num == 1) {
                    if (this.formItemList_add[1].divList.length > 1) {
                        this.formData_add["steps"].splice(index, 1);
                        this.formItemList_add[1].divList.splice(index, 1)
                    } else {
                        this.$Modal.warning({
                            title: '温馨提示您',
                            content: '至少保留一条选项'
                        })
                    }
                } else {
                    if(this.formItemList_add[1].divList.length < 9){
                        let obj = {};
                        obj["step"] = [];
                        this.formData_add["steps"].push(obj);
                        this.formItemList_add[1].divList.push(this.formItemList_add[1].divList[0]);
                    }else{
                        this.$Modal.warning({
                            title: '温馨提示您',
                            content: '最多支持9个步骤'
                        })
                    }
                    
                }
            }
        },
        created () {
            this.spinShow = true;
            this.$common.currentPageData(this.baseUrl+'/ticket/checkSchedule/queryScheduleList', this, 'get',true);
            //获取节点列表
            this.getNodeList();
        }
    }
</script>

<style scoped>

</style>
