<template>
    <div id="companyManage">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>
        <Card v-show="currentIndex === 1" class="add-min-height">
            <p slot="title" class="cardTitle">
                <span>企业信息</span>
                <topBtn :btnList="btnList" @operate="handleOperate"></topBtn>
            </p>
            <detail-form1
                :isListPage="true"
                :formDatas="formDatas"
                :formItemList="formItemList"
                @getFormData="handleQuery"
                @clearFormData="resetForm1"></detail-form1>
            <radioTable
                :colname="colnames"
                :total="total"
                :tableData="tableData"
                :isRadio="isRadio"
                :loading="isLoading"
                :pageCode="currentPage1"
                @changePage="handleChangePage"
                @selected="handleSelected"
                @changePageSize="changeSize1"></radioTable>
        </Card>
        <Card v-show="currentIndex === 2 || currentIndex === 3" class="add-min-height">
            <p slot="title" class="cardTitle">
                <span v-if="currentIndex === 2">新增企业信息</span>
                <span v-if="currentIndex === 3">修改企业信息</span>
                <topBtn :btnList="btnRefresh"></topBtn>
            </p>
            <detail-form1
                :isListPage="false"
                :formDatas="formDatasAdd"
                :ruleDatas="ruleDataAdd"
                :formItemList="formItemListAdd"
                :isClose="false"
                @getFormData="handleAdd"
                @selectedChange="showScenicCheckboxs"
                @closeCurrentPage="handleClose"></detail-form1>
                <!-- @hookSingle="hookSingle"
                @removeImage="removeImage1" -->
        </Card>
        <Card v-show="currentIndex === 4" class="add-min-height">
            <p slot="title" class="cardTitle">
                <span>查看企业</span>
                <topBtn :btnList="btnRefresh"></topBtn>
            </p>
            <table class="lookDetail">
                <tr v-for="(item,idx) in detailList" :key="idx">
                    <td>{{ item.title }}</td>
                    <td>{{ item.value }}</td>
                    <!-- <td>
                        <div v-if="!item.isPic">{{ item.value }}</div>
                        <div v-else class="logoStyle"><img :src="item.value" alt=""></div>
                    </td> -->
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <Button
                            type="primary"
                            shape="circle"
                            class="addpadding"
                            @click="handleClose">关闭</Button>
                    </td>
                </tr>
            </table>
        </Card>
        <Modal v-model="isDel" width="360">
            <p slot="header" style="color:#5db2ff;">
                <span>删除企业信息</span>
            </p>
            <div style="text-align:center">
                <img src="@/images/delete.png" />
                <p style="font-size:16px; line-height:30px;margin-top:10px;">你确定要删除该企业信息吗？</p>
            </div>
            <div slot="footer" style="text-align:center" >
            <Button
                type="primary"
                :loading="isModalLoading"
                @click="sureDel">确定</Button>
            <Button type="ghost" @click="cancelDel">取消</Button>
            </div>
        </Modal>
        <Card v-show="currentIndex === 5" class="add-min-height" >
            <p slot="title" class="cardTitle">
                <span>部门信息</span>
                <topBtn :btnList="btnList5" @operate="handleOperate5"></topBtn>
            </p>
            <detail-form1
                :isListPage="true"
                :formDatas="formDatas5"
                :formItemList="formItemList5"
                @getFormData="handleQuery5"
                @clearFormData="resetForm5"></detail-form1>
            <radioTable
                :colname="colnames5"
                :total="total5"
                :tableData="tableData5"
                :isRadio="isRadio"
                :loading="isLoading"
                :pageCode="currentPage5"
                @changePage="handleChangePage5"
                @selected="handleSelected5"
                @changePageSize="changeSize5"></radioTable>
        </Card>
        <Card v-show="currentIndex === 5.1 || currentIndex === 5.2" class="add-min-height">
            <p slot="title" class="cardTitle">
                <span v-if="currentIndex === 5.1">新增部门信息</span>
                <span v-if="currentIndex === 5.2">修改部门信息</span>
                <topBtn :btnList="btnRefresh"></topBtn>
            </p>
            <detail-form1
                :isListPage="false"
                :formDatas="addFormDatas5"
                :ruleDatas="addRuleDataAdd5"
                :formItemList="addFormItemListAdd5"
                :isClose="false"
                :needReset="false"
                @getFormData="handleAdd5"
                @closeCurrentPage="handleClose5"></detail-form1>
        </Card>
        <Card v-show="currentIndex === 5.3" class="add-min-height">
            <p slot="title" class="cardTitle">
                <span>查看部门信息</span>
                <topBtn :btnList="btnRefresh"></topBtn>
            </p>
            <table class="lookDetail">
                <tr v-for="(item,idx) in detailList" :key="idx">
                    <td>{{ item.title }}</td>
                    <td><div>{{ item.value }}</div></td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <Button
                            type="primary"
                            shape="circle"
                            class="addpadding"
                            @click="handleClose5">关闭</Button>
                    </td>
                </tr>
            </table>
        </Card>
        <Modal v-model="isDel5" width="360">
            <p slot="header" style="color:#5db2ff;">
                <span>删除部门信息</span>
            </p>
            <div style="text-align:center">
                <img src="@/images/delete.png" />
                <p style="font-size:16px; line-height:30px;margin-top:10px;">你确定要删除该部门信息吗？</p>
            </div>
            <div slot="footer" style="text-align:center" >
            <Button
                type="primary"
                :loading="isModalLoading5"
                @click="sureDel5">确定</Button>
            <Button type="ghost" @click="cancelDel5">取消</Button>
            </div>
        </Modal>
        <Card v-show="currentIndex === 6" class="add-min-height">
            <p slot="title" class="cardTitle">
                <span>员工信息</span>
                <topBtn :btnList="btnList6" @operate="handleOperate6"></topBtn>
            </p>
            <detail-form1
                :isListPage="true"
                :formDatas="formDatas6"
                :formItemList="formItemList6"
                @getFormData="handleQuery6"></detail-form1>
            <radioTable
                :colname="colnames6"
                :total="total6"
                :tableData="tableData6"
                :isRadio="isRadio"
                :loading="isLoading"
                :pageCode="currentPage6"
                @changePage="handleChangePage6"
                @selected="handleSelected6"
                @changePageSize="changeSize6"></radioTable>
        </Card>
        <Card v-show="currentIndex === 6.1 || currentIndex === 6.2" class="add-min-height">
            <p slot="title" class="cardTitle">
                <span v-if="currentIndex ===6.1">新增员工信息</span>
                <span v-if="currentIndex ===6.2">修改员工信息</span>
                <topBtn :btnList="btnRefresh"></topBtn>
            </p>
            <Form ref="addForm6" :model="addFormDatas6" inline :rules="ruledatas6">
                <fieldset v-for="(topItem,topIdx) in add_fieldsetList6" :key="topIdx" class="chunkStyle_fieldset">
                    <legend class="chunkStyle_legend">{{ topItem.title }}</legend>
                    <div class="formChunk">
                        <FormItem
                            v-for="(item,index) in topItem.config"
                            :label="item.label + '：'"
                            :prop="item.keyName"
                            :label-width="180"
                            :key="index"
                            :class="[{ 'hide': item.isHide }, 'defaultClass']">
                            <Input
                                v-if="item.type === 'input'"
                                v-model="addFormDatas6[item.keyName]"
                                :disabled="item.disabled"
                                style="width: 200px" />
                            <RadioGroup v-if="item.type === 'radiogroup'" v-model="addFormDatas6[item.keyName]">
                                <Radio
                                    v-for="(option,idx) in item.optionList"
                                    :label="option.value"
                                    :key="idx">
                                    {{ option.label }}
                                </Radio>
                            </RadioGroup>
                            <CheckboxGroup
                                v-if="item.type === 'checkgroup'"
                                v-model="addFormDatas6[item.keyName]"
                                style="display:inline-block;">
                                <Checkbox
                                    v-for="(option,idx) in item.optionList"
                                    :label="option.value"
                                    :key="idx">
                                    {{ option.label }}
                                </Checkbox>
                            </CheckboxGroup>
                            <DatePicker
                                v-if="item.type === 'date'"
                                v-model="addFormDatas6[item.keyName]"
                                :transfer="true"
                                :editable="false"
                                :start-date="item.startDate"
                                style="width: 200px">
                            </DatePicker>
                            <Input
                                v-if="item.type === 'textarea'"
                                v-model="addFormDatas6[item.keyName]"
                                type="textarea" style="width:70%;"
                                :rows="5"
                                :placeholder="item.placeholder" />
                            <Upload
                                v-if="item.type === 'upload'"
                                :action="item.action"
                                :show-upload-list="false"
                                :on-success="hook"
                                :data="item.params"
                                style="display:inline-block;">
                                <template v-if="addFormDatas6[item.keyName]">
                                    <div class="uploadStyle">
                                        <img style="width: 100%;display:block" :src="addFormDatas6[item.keyName]" alt="" />
                                        <div class="single-img-cover">
                                            <Icon type="ios-trash-outline"
                                                  @click.native="removeImage6()"></Icon>
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="uploadDefaultStyle"></div>
                                </template>
                                <Button type="primary" icon="ios-cloud-upload-outline">{{item.btnLabel}}</Button>
                            </Upload>
                            <Select
                                v-if="item.type === 'select'"
                                v-model="addFormDatas6[item.keyName]"
                                :disabled="item.disabled"
                                style="width:200px">
                                <Option
                                    v-for="(option,idx) in item.optionList"
                                    :value="option.value"
                                    :key="idx">{{ option.label }}</Option>
                            </Select>
                            <div v-if="item.type === 'tree'">
                                <Input v-model="addFormDatas6[item.keyName]" style="width: 200px" readonly />
                                <Button type="primary" @click="showTreeModal">{{ item.btnLabel }}</Button>
                                <Modal v-model="isShowTree" :mask-closable="false">
                                    <p slot="header" style="color:#5db2ff;">
                                        <span>{{ item.title }}</span>
                                    </p>
                                    <div style="overflow-y: auto;height: 250px">
                                        <Tree
                                            v-if="item.treeData.length"
                                            :data="item.treeData"
                                            :load-data="expandTree"
                                            @on-select-change="clickTreeNode">
                                        </Tree>
                                        <span v-else>暂无数据</span>
                                    </div>
                                    <div slot="footer" style="text-align:center" >
                                        <Button type="ghost" @click="closeTree">关闭</Button>
                                    </div>
                                </Modal>
                            </div>
                            <span v-show="item.desc" style="color: red;">{{ item.desc }}</span>
                        </FormItem>
                    </div>
                </fieldset>
                <FormItem style="margin-left: 140px;">
                    <Button
                        type="primary"
                        @click="submitForm6('addForm6')"
                        shape="circle"
                        class="addpadding"
                        style="margin-right: 20px;">提交</Button>
                    <Button
                        type="ghost"
                        @click="handleClose6"
                        shape="circle"
                        class="addpadding">关闭</Button>
                </FormItem>
            </Form>
        </Card>
        <Card v-show="currentIndex === 6.3" class="add-min-height">
            <p slot="title" class="cardTitle">
                <span>查看员工信息</span>
                <topBtn :btnList="btnRefresh"></topBtn>
            </p>
            <div class="wrapper" v-for="(outterItem,outterIdx) in detailGroup" :key="outterIdx">
                <div class="blueTitle">{{ outterItem.title }}</div>
                <div class="mainPart">
                    <div class="mainPart_row" v-for="(item,idx) in outterItem.detailList" :key="idx">
                        <div class="mainPart_row_key">{{ item.key }}</div>
                        <div class="mainPart_row_value">{{ item.value }}</div>
                    </div>
                </div>
            </div>
            <Button
                type="primary"
                shape="circle"
                class="addpadding"
                @click="handleClose6"
                style="margin-left: 200px;">关闭</Button>
        </Card>
        <Modal v-model="isDel6" width="360">
            <p slot="header" style="color:#5db2ff;">
                <span>删除员工信息</span>
            </p>
            <div style="text-align:center">
                <img src="@/images/delete.png" />
                <p style="font-size:16px; line-height:30px;margin-top:10px;">你确定要删除该员工信息吗？</p>
            </div>
            <div slot="footer" style="text-align:center" >
            <Button
                type="primary"
                :loading="isModalLoading6"
                @click="sureDel6">确定</Button>
            <Button type="ghost" @click="cancelDel6">取消</Button>
            </div>
        </Modal>
        <Modal
            v-model="isLoginPwd"
            title="初始化登录密码"
            :loading="loading"
            @on-ok="initPwd">
            <table class="initPassword">
                <tr>
                    <td>用户编号：</td>
                    <td>{{ userId }}</td>
                </tr>
                <tr>
                    <td>用户姓名：</td>
                    <td>{{ userName }}</td>
                </tr>
                <tr>
                    <td>初始化用户密码：</td>
                    <td>
                        <Input v-model="newPwd" style="width: 200px;" />
                        <span v-show="isValidate1" style="color:red;">*(初始化用户密码不能为空)</span>
                    </td>
                </tr>
            </table>
        </Modal>
        <Modal
            v-model="isCode"
            title="初始化认证码"
            :loading="loading"
            @on-ok="initCode">
            <table class="initPassword">
                <tr>
                    <td>用户编号：</td>
                    <td>{{ userId }}</td>
                </tr>
                <tr>
                    <td>用户姓名：</td>
                    <td>{{ userName }}</td>
                </tr>
                <tr>
                    <td>初始化认证码：</td>
                    <td>
                        <Input v-model="newCode" style="width: 200px;" />
                        <span v-show="isValidate2" style="color:red;">*(初始化认证码不能为空)</span>
                    </td>
                </tr>
            </table>
        </Modal>
        <Modal
            v-model="isTimes"
            title="登录次数初始化"
            :loading="loading"
            @on-ok="initTimes">
            <p>你确定要初始化登录次数吗？</p>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: 'company-manage',
        data () {
            const pwd = (rule, value, callback) => {
                if (this.currentIndex === 6.1) {
                    let reg = /^[0-9a-zA-Z]{8,25}$/;
                    if (value === '') {
                        callback(new Error('登录密码不能为空'));
                    } else if (!reg.test(value)) {
                        callback(new Error('登录密码由8到25位数字或字母（区分大小写）组成'));
                    } else {
                        callback();
                    }
                }
                if (this.currentIndex === 6.2) {
                    callback();
                }
            };
            const userId = (rule, value, callback) => {
                let reg = /^[a-zA-Z][0-9a-zA-Z]{1,15}$/;
                if (value === '') {
                    callback(new Error('登录账号不能为空'));
                } else if (!reg.test(value)) {
                    callback(new Error('登录账号由2到16位数字或字母（区分大小写）组成,必须以字母开头'));
                } else {
                    callback();
                }
            };
            const validateCode = (rule, value, callback) => {
                let reg = /^[0-9a-zA-Z]+$/;
                if (value === '') {
                    callback(new Error('部门代码不能为空'));
                } else if (!reg.test(value)) {
                    callback(new Error('部门代码只能由英文字母（区分大小写）和数字组成'));
                } else {
                    callback();
                }
            };
            return {
                isShowLoading: false,
                isDel: false,
                isModalLoading: false,
                isLoading: false,
                isRadio: true,
                // isQuery: false,
                currentIndex: 1,
                total: 0,
                // watchTotal: 0,
                rowData: null,
                tableData: [],
                detailList: [],
                btnList: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    },
                    {
                        type: 7,
                        btnlabel: '新增'
                    },
                    {
                        type: 8,
                        btnlabel: '修改'
                    },
                    {
                        type: 9,
                        btnlabel: '删除'
                    },
                    {
                        type: 10,
                        btnlabel: '查看'
                    }
                ],
                btnRefresh: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    }
                ],
                formDatas: {
                    flag: 1,
                    // querycomid: '',
                    querycomname: ''
                },
                formDatasAdd: {
                    szcompanyname: '',
                    companytype: '01',
                    // imgUrl: '',
                    iscenicids: [],
                    balance: 1,
                    szcompanycode: '',
                    sztel: '',
                    szfax: '',
                    szbankaccount: '',
                    szemail: '',
                    szwebsite: '',
                    szaddress: '',
                    szmemo: ''
                },
                /*
                 * 修改隐含参数
                 */
                formDatasEdit: {
                    szinfocomid: '',
                    iversion: '',
                    icompanyinfoid: '',
                    strcomtype: ''
                },
                formItemList: [
                    // {
                    //     type: 13,
                    //     keyName: 'flag',
                    //     label: '',
                    //     labelWidth: 70,
                    //     optionList: [
                    //         {
                    //             type: 1,
                    //             value: 0,
                    //             keyName: 'querycomid',
                    //             labelName: '按编号查询'
                    //         },
                    //         {
                    //             type: 1,
                    //             value: 1,
                    //             keyName: 'querycomname',
                    //             labelName: '按企业名称模糊查询'
                    //         }
                    //     ]
                    // }
                    {
                        type: 1,
                        label: '按企业名称模糊查询',
                        keyName: 'querycomname'
                    }
                ],
                ruleDataAdd: {
                    szcompanyname: [
                        {
                            required: true,
                            message: '企业名称不能为空',
                            trigger: 'blur'
                        }
                    ],
                    szcompanycode: [
                        {
                            required: true,
                            message: '企业编码不能为空',
                            trigger: 'blur'
                        }
                    ],
                    szbankaccount: [
                        {
                            required: true,
                            message: '企业组织机构代码不能为空',
                            trigger: 'blur'
                        }
                    ],
                    szaddress: [
                        {
                            required: true,
                            message: '企业地址不能为空',
                            trigger: 'blur'
                        }
                    ],
                    sztel: [
                        {
                            required: true,
                            message: '企业电话不能为空',
                            trigger: 'blur'
                        }
                    ]
                },
                formItemListAdd: [
                    {
                        type: 1,
                        keyName: 'szcompanyname',
                        label: '企业名称'
                    },
                    // {
                    //     type: '5.2',
                    //     label: '企业徽标',
                    //     keyName: 'imgUrl',
                    //     action_single: this.baseUrl + '/sys/fileUpload/v1/uploadPic',
                    //     btnLabel: '点击上传',
                    //     hasDec: '注：建议上传200x200的企业徽标图片',
                    //     isRedDec: true,
                    //     params: {
                    //         access_token: this.Cookies.get('token')
                    //     }
                    // },
                    {
                        type: 4,
                        label: '企业类别',
                        keyName: 'companytype',
                        selectEvent: true,
                        disabled: false,
                        optionList: [
                            {
                                value: '01',
                                label: '平台管理企业' // 是否结算企业
                            },
                            {
                                value: '02',
                                label: '景区企业'
                            }
                        ]
                    },
                    {
                        type: 3,
                        label: '对应服务商',
                        keyName: 'iscenicids',
                        isHidden: true,
                        optionList: []
                    },
                    {
                        type: 2,
                        label: '是否结算企业',
                        keyName: 'balance',
                        isHidden: true,
                        optionList: [
                            {
                                labelName: '是',
                                value: 1
                            },
                            {
                                labelName: '否',
                                value: 0
                            }
                        ]
                    },
                    {
                        type: 1,
                        keyName: 'szcompanycode',
                        label: '企业编码'
                    },
                    {
                        type: 1,
                        keyName: 'szbankaccount',
                        label: '企业组织机构代码'
                    },
                    {
                        type: 1,
                        keyName: 'sztel',
                        label: '企业电话'
                    },
                    {
                        type: 1,
                        keyName: 'szfax',
                        label: '企业传真'
                    },
                    // {
                    //     type: 1,
                    //     keyName: 'szbankaccount',
                    //     label: '开户行帐号'
                    // },
                    {
                        type: 1,
                        keyName: 'szemail',
                        label: '企业邮箱'
                    },
                    {
                        type: 1,
                        keyName: 'szwebsite',
                        label: '企业网站'
                    },
                    {
                        type: 1,
                        keyName: 'szaddress',
                        label: '企业地址'
                    },
                    {
                        type: 7,
                        label: '备注',
                        keyName: 'szmemo'
                    }
                ],
                colnames: [
                    {
                        title: '编号',
                        minWidth: 70,
                        render: (h, params) => {
                            return h('a', {
                                on: {
                                    click: () => {
                                        this.handleLook(params.row.icompanyinfoid);
                                    }
                                }
                            }, params.row.icompanyinfoid);
                        }
                    },
                    {
                        title: '企业编码',
                        key: 'szcompanycode',
                        minWidth: 140
                    },
                    {
                        title: '企业名称',
                        key: 'szcompanyname',
                        minWidth: 210
                    },
                    {
                        title: '类型',
                        key: 'strcompanytype',
                        minWidth: 100
                    },
                    {
                        title: '电话',
                        key: 'sztel',
                        minWidth: 110
                    },
                    {
                        title: '传真',
                        key: 'szfax',
                        minWidth: 110
                    },
                    {
                        title: '邮箱',
                        key: 'szemail',
                        minWidth: 140
                    },
                    {
                        title: '网站',
                        key: 'szwebsite',
                        minWidth: 140
                    },
                    {
                        title: '地址',
                        key: 'szaddress',
                        minWidth: 310
                    },
                    {
                        title: '操作',
                        minWidth: 80,
                        render: (h, params) => {
                            return h('a', {
                                on: {
                                    click: () => {
                                        this.gotoDepartment(params.row.icompanyinfoid);
                                        this.companyId = params.row.icompanyinfoid;
                                        this.companyType = params.row.companytype;
                                        this.depList.push(params.row.icompanyinfoid);
                                        this.companyName = params.row.szcompanyname;
                                    }
                                }
                            }, '部门管理');
                        }
                    }
                ],
                // szcompanyemblem: '', // 存储上传后的企业logo图片id
                size1: 10,
                currentPage1: 1,
                QueryBuild1: null,

                /*
                 * 部门管理子页面
                 */
                companyId: '', // 存储当前部门管理页面的企业id
                companyType: '', // 存储当前部门管理页面的企业类型
                companyName: '', // 存储当前部门管理页面的企业名称 用于新增修改部门
                depList: [], // 存储当前点击的部门id，第一项存企业id，用于查找顶级部门，遵循后进先出
                isDel5: false,
                isModalLoading5: false,
                btnList5: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    },
                    {
                        type: 7,
                        btnlabel: '新增'
                    },
                    {
                        type: 8,
                        btnlabel: '修改'
                    },
                    {
                        type: 9,
                        btnlabel: '删除'
                    },
                    {
                        type: 10,
                        btnlabel: '查看'
                    },
                    {
                        type: 11,
                        btnlabel: '上一级',
                        icon: 'reply'
                    }
                ],
                formDatas5: {
                    flag: 1,
                    // queryid: '',
                    queryMess: ''
                },
                addFormDatas5: {
                    szdeptname: '',
                    szcompanyname: '', // 这个参数仅作为新增页显示用，不作为请求参数
                    szdeptcode: '',
                    byisuse: 0,
                    bisleaf: '1',
                    selList: [],
                    szmemo: ''
                },
                addRuleDataAdd5: {
                    szdeptname: [
                        {
                            required: true,
                            message: '部门名称不能为空',
                            trigger: 'blur'
                        }
                    ],
                    szdeptcode: [
                        {
                            validator: validateCode,
                            required: true,
                            trigger: 'blur'
                        }
                    ],
                    szmemo: [
                        {
                            required: true,
                            message: '备注不能为空',
                            trigger: 'blur'
                        }
                    ],
                    selList: [
                        {
                            required: true,
                            type: 'array',
                            min: 1,
                            message: '部门岗位至少选择一个',
                            trigger: 'change'
                        }
                    ]
                },
                addFormItemListAdd5: [
                    {
                        type: 1,
                        keyName: 'szdeptname',
                        label: '部门名称'
                    },
                    {
                        type: 9,
                        keyName: 'szcompanyname',
                        label: '所属企业名称'
                    },
                    {
                        type: 1,
                        keyName: 'szdeptcode',
                        label: '部门代码',
                        hasDec: '注：部门代码由英文字母（区分大小写）和数字组成',
                        isRedDec: true
                    },
                    {
                        type: 2,
                        keyName: 'byisuse',
                        isHidden: false,
                        label: '使用状态',
                        optionList: [
                            {
                                value: 1,
                                labelName: '启用'
                            },
                            {
                                value: 0,
                                labelName: '禁用'
                            }
                        ]
                    },
                    {
                        type: 2,
                        keyName: 'bisleaf',
                        isHidden: false,
                        label: '能否含有下属部门',
                        optionList: [
                            {
                                value: '1',
                                labelName: '否'
                            },
                            {
                                value: '0',
                                labelName: '能'
                            }
                        ]
                    },
                    {
                        type: 3,
                        keyName: 'selList',
                        label: '部门所包含的岗位',
                        optionList: []
                    },
                    {
                        type: 7,
                        keyName: 'szmemo',
                        label: '备注'
                    }
                ],
                formItemList5: [
                    // {
                    //     type: 13,
                    //     keyName: 'flag',
                    //     label: '',
                    //     optionList: [
                    //         {
                    //             type: 1,
                    //             value: 0,
                    //             keyName: 'queryid',
                    //             labelName: '按部门编号'
                    //         },
                    //         {
                    //             type: 1,
                    //             value: 1,
                    //             keyName: 'queryMess',
                    //             labelName: '按部门名称模糊查询'
                    //         }
                    //     ]
                    // }
                    {
                        type: 1,
                        keyName: 'queryMess',
                        label: '按部门名称模糊查询'
                    }
                ],
                colnames5: [
                    {
                        title: '部门编号',
                        key: 'ideptid',
                        width: 100
                    },
                    {
                        title: '部门名称',
                        key: 'szdeptname',
                        minWidth: 170
                    },
                    {
                        title: '隶属关系',
                        key: 'szinnername',
                        minWidth: 120
                    },
                    {
                        title: '所在层级',
                        key: 'ilevel',
                        width: 100
                    },
                    {
                        title: '所属企业',
                        key: 'szcompanyname',
                        minWidth: 240
                    },
                    {
                        title: '使用状态',
                        width: 100,
                        render: (h, params) => {
                            return h('span', params.row.byisuse ? '启用' : '禁用');
                        }
                    },
                    // {
                    //     title: '是否删除',
                    //     width: 100,
                    //     render: (h,params) => {
                    //         return h('span',parseInt(params.row.bisdelete) ? '是' : '否');
                    //     }
                    // },
                    {
                        title: '备注',
                        key: 'szmemo',
                        minWidth: 300
                    },
                    {
                        title: '操作',
                        minWidth: 160,
                        render: (h, params) => {
                            if (params.row.byisuse) {
                                if (params.row.bisleaf === '1') { // 没有下级部门
                                    return h('a', {
                                        on: {
                                            click: () => {
                                                this.gotoEmployee(params.row.ideptid);
                                                this.departmentId = params.row.ideptid;
                                                this.departmentName = params.row.szdeptname;
                                            }
                                        }
                                    }, '[员工信息]');
                                }
                                if (params.row.bisleaf === '0') { // 有下级部门
                                    return h('div', [
                                        h('a', {
                                            on: {
                                                click: () => {
                                                    this.depList.push(params.row.ideptid);
                                                    this.gotoNextDepartment(params.row.ideptid);
                                                }
                                            }
                                        }, '[下级部门]'),
                                        h('a', {
                                            on: {
                                                click: () => {
                                                    this.gotoEmployee(params.row.ideptid);
                                                    this.departmentId = params.row.ideptid;
                                                    this.departmentName = params.row.szdeptname;
                                                }
                                            }
                                        }, '[员工信息]')
                                    ]);
                                }
                            }
                        }
                    }
                ],
                total5: 0,
                // watchTotal5: 0,
                tableData5: [],
                rowData5: null,
                // isQuery5: false,
                initAdd5: null,
                size5: 10,
                QueryBuild5: null,
                currentPage5: 1,

                /*
                 * 员工管理子页面
                 */
                departmentId: '', // 存储当前员工管理页面的部门id
                departmentName: '', // 存储当前员工管理页面的部门名称
                formDatas6: {
                    szemployeename: ''
                },
                formItemList6: [
                    {
                        type: 1,
                        keyName: 'szemployeename',
                        label: '员工姓名'
                    }
                ],
                colnames6: [
                    {
                        title: '员工编号',
                        key: 'iemployeeid',
                        width: 100
                    },
                    {
                        title: '登录账户名',
                        key: 'empid',
                        minWidth: 170
                    },
                    {
                        title: '员工姓名',
                        key: 'szemployeename',
                        minWidth: 160
                    },
                    {
                        title: '性别',
                        width: 80,
                        render: (h, params) => {
                            return h('span', params.row.isex ? '女' : '男');
                        }
                    },
                    {
                        title: '登录方式',
                        key: 'byloginitype',
                        minWidth: 140
                    },
                    {
                        title: '是否使用本系统',
                        width: 140,
                        render: (h, params) => {
                            return h('span', params.row.bissysuser ? '允许' : '禁止');
                        }
                    },
                    {
                        title: '是否启用',
                        width: 100,
                        render: (h, params) => {
                            return h('span', params.row.byisuse ? '启用' : '不启用');
                        }
                    }
                ],
                total6: 0,
                // watchTotal6: 0,
                tableData6: [],
                detailGroup: [],
                rowData6: null,
                initAdd6: null,
                // isQuery6: false,
                isDel6: false,
                isModalLoading6: false,
                btnList6: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    },
                    {
                        type: 7,
                        btnlabel: '新增'
                    },
                    {
                        type: 8,
                        btnlabel: '修改'
                    },
                    {
                        type: 9,
                        btnlabel: '删除'
                    },
                    {
                        type: 10,
                        btnlabel: '查看'
                    },
                    {
                        type: 11,
                        btnlabel: '登录密码初始化',
                        icon: 'android-desktop'
                    },
                    {
                        type: 11,
                        btnlabel: '认证码初始化',
                        icon: 'android-open'
                    },
                    {
                        type: 11,
                        btnlabel: '登录次数初始化',
                        icon: 'android-list'
                    },
                    {
                        type: 11,
                        btnlabel: '返回部门管理',
                        icon: 'reply'
                    }
                ],
                addFormDatas6: {
                    /* 登录信息 */
                    empid: '', // 登录账户
                    szpassword: '', // 登录密码
                    bissysuser: 1, // 是否可使用本系统
                    byloginitype: '', // 登录方式
                    byisuse: 1, // 是否启用

                    /* 基本信息 */
                    szemployeename: '', // 员工姓名
                    imgUrl: '', // 上传图片url
                    szcardid: '', // 身份证号码
                    dtbirthdate: new Date('1980-01-01'), // 出生日期
                    isex: 0, // 性别
                    szcellphone: '', // 联系电话
                    sznation: '', // 民族
                    szinnername: '', // 籍贯
                    szaccountlocation: '', // 户口所在地
                    bismarry: 0, // 婚姻状况
                    szhomeaddress: '', // 家庭住址
                    szschool: '', // 毕业学院
                    dtgraduatedate: new Date('1980-01-01'), // 毕业日期
                    educational: '', // 学历
                    major: '', // 专业

                    /* 入职信息 */
                    szcompanyname: '', // 公司
                    szdeptname: '', // 部门
                    szpost: '', // 职务
                    professional: '', // 职称
                    szemail: '', // 电子邮箱
                    dtentrydate: new Date('1980-01-01'), // 入职日期
                    ipostsids: [], // 所在岗位
                    szmemo: '' // 备注
                },
                ruledatas6: {
                    empid: [
                        { validator: userId, trigger: 'blur', required: true }
                    ],
                    szpassword: [
                        { validator: pwd, trigger: 'blur', required: true }
                    ],
                    szemployeename: [
                        { required: true, message: '员工姓名不能为空', trigger: 'blur' }
                    ],
                    szcardid: [
                        { required: true, message: '员工身份证号码不能为空', trigger: 'blur' }
                    ],
                    ipostsids: [
                        {
                            required: true,
                            type: 'array',
                            min: 1,
                            message: '员工所在岗位至少选择一个',
                            trigger: 'change'
                        }
                    ],
                    szinnername: [
                        { required: true }
                    ],
                    imgUrl: [
                        { required: true }
                    ]

                },
                add_fieldsetList6: [
                    {
                        title: '登录信息',
                        config: [
                            {
                                type: 'input',
                                label: '登录账户名',
                                keyName: 'empid',
                                desc: '* 注：由2到16位数字或字母（不分大小写）组成,必须以字母开头',
                                disabled: false
                            },
                            {
                                type: 'input',
                                label: '登录密码',
                                keyName: 'szpassword',
                                desc: '* 注：由8到25位数字或字母（不分大小写）组成',
                                isHide: false
                            },
                            {
                                type: 'radiogroup',
                                label: '是否可使用本系统',
                                keyName: 'bissysuser',
                                optionList: [
                                    {
                                        value: 0,
                                        label: '禁止'
                                    },
                                    {
                                        value: 1,
                                        label: '允许'
                                    }
                                ]
                            },
                            {
                                type: 'select',
                                label: '登录方式',
                                keyName: 'byloginitype',
                                optionList: []
                            },
                            {
                                type: 'radiogroup',
                                label: '是否启用',
                                keyName: 'byisuse',
                                optionList: [
                                    {
                                        value: 0,
                                        label: '不启用'
                                    },
                                    {
                                        value: 1,
                                        label: '启用'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: '基本信息',
                        config: [
                            {
                                type: 'input',
                                label: '员工姓名',
                                keyName: 'szemployeename'
                            },
                            {
                                type: 'input',
                                label: '身份证号码',
                                keyName: 'szcardid'
                            },
                            {
                                type: 'date',
                                label: '出生日期',
                                keyName: 'dtbirthdate',
                                startDate: new Date('1960-01-01')
                            },
                            {
                                type: 'radiogroup',
                                label: '性别',
                                keyName: 'isex',
                                optionList: [
                                    {
                                        value: 0,
                                        label: '男'
                                    },
                                    {
                                        value: 1,
                                        label: '女'
                                    }
                                ]
                            },
                            {
                                type: 'input',
                                label: '联系电话',
                                keyName: 'szcellphone'
                            },
                            {
                                type: 'select',
                                label: '民族',
                                keyName: 'sznation',
                                optionList: []
                            },
                            {
                                type: 'tree',
                                label: '籍贯',
                                keyName: 'szinnername',
                                btnLabel: '选择',
                                title: '选择员工籍贯',
                                treeData: [],
                                desc: '*注：籍贯不能为空'
                            },
                            {
                                type: 'input',
                                label: '户口所在地',
                                keyName: 'szaccountlocation'
                            },
                            {
                                type: 'radiogroup',
                                label: '婚姻状况',
                                keyName: 'bismarry',
                                optionList: [
                                    {
                                        value: 0,
                                        label: '未婚'
                                    },
                                    {
                                        value: 1,
                                        label: '已婚'
                                    }
                                ]
                            },
                            {
                                type: 'input',
                                label: '家庭住址',
                                keyName: 'szhomeaddress'
                            },
                            {
                                type: 'input',
                                label: '毕业院校',
                                keyName: 'szschool'
                            },
                            {
                                type: 'date',
                                label: '毕业日期',
                                keyName: 'dtgraduatedate',
                                startDate: new Date('1960-01-01')
                            },
                            {
                                type: 'select',
                                label: '学历',
                                keyName: 'educational',
                                optionList: []
                            },
                            {
                                type: 'select',
                                label: '专业',
                                keyName: 'major',
                                optionList: []
                            },
                            {
                                type: 'upload',
                                label: '员工相片',
                                keyName: 'imgUrl',
                                action: this.baseUrl + '/sys/fileUpload/v1/uploadPic',
                                btnLabel: '点击上传',
                                desc: '*注：相片必须上传',
                                params: {
                                    access_token: this.Cookies.get('token')
                                }
                            }
                        ]
                    },
                    {
                        title: '入职信息',
                        config: [
                            {
                                type: 'input',
                                label: '企业名称',
                                keyName: 'szcompanyname',
                                disabled: true
                            },
                            {
                                type: 'input',
                                label: '部门名称',
                                keyName: 'szdeptname',
                                disabled: true
                            },
                            {
                                type: 'select',
                                label: '职务名称',
                                keyName: 'szpost',
                                optionList: []
                            },
                            {
                                type: 'select',
                                label: '职称',
                                keyName: 'professional',
                                optionList: []
                            },
                            {
                                type: 'input',
                                label: '电子邮箱',
                                keyName: 'szemail'
                            },
                            {
                                type: 'date',
                                label: '入职日期',
                                keyName: 'dtentrydate',
                                startDate: new Date('1960-01-01')
                            },
                            {
                                type: 'checkgroup',
                                label: '所在岗位',
                                keyName: 'ipostsids'
                            },
                            {
                                type: 'textarea',
                                label: '备注',
                                keyName: 'szmemo'
                            }
                        ]
                    }
                ],
                isShowTree: false,
                loginType: [],
                iborthaddress: '',
                photoupid: '',
                size6: 10,
                QueryBuild6: null,
                currentPage6: 1,
                // nativeList: [],

                /* 初始化密码相关 */
                isLoginPwd: false,
                isCode: false,
                isTimes: false,
                loading: true,
                isValidate1: false,
                isValidate2: false,
                UserId: '',
                UserName: '',
                newPwd: '',
                newCode: ''
            };
        },
        computed: {
            userId () {
                return this.UserId;
            },
            userName () {
                return this.UserName;
            }
        },
        async created () {
            let newBtn = [],
                companyType = JSON.parse(sessionStorage.getItem('companytype'));
            if (companyType === '02') {
                newBtn = this.btnList.filter(item => {
                    return item.type !== 7 && item.type !== 9;
                });
                this.btnList = newBtn;
            }

            this.isShowLoading = true;
            this.addInitDatas = this.$handle.objDeepCopy(this.formDatasAdd);
            const res = await this.$api.get(this.baseUrl + '/sys/company/v1/queryCompany', {
                page: 1,
                pageSize: this.size1
            });
            // console.log(res);
            if (!res) {
                this.isShowLoading = false;
                return;
            }

            this.tableData = res.data.items;
            this.total = res.data.totalCount;
            this.QueryBuild1 = {
                page: 1,
                pageSize: this.size1
            };
            this.currentPage1 = 1;
            this.isShowLoading = false;
        },
        methods: {
            // 企业管理-带条件查询
            handleQuery () {
                let queryParams = {
                    flag: this.formDatas.flag,
                    querycomid: this.formDatas.querycomid,
                    querycomname: this.formDatas.querycomname,
                    page: 1,
                    pageSize: this.size1
                };
                this.QueryBuild1 = {
                    ...queryParams
                };
                this.currentPage1 = 1;
                this.execQuery(queryParams);
            },
            // 企业管理-翻页查询
            handleChangePage (pageNum) {
                let queryParams = {
                    ...this.QueryBuild1
                };
                queryParams.page = pageNum;
                queryParams.pageSize = this.size1;
                this.currentPage1 = pageNum;
                this.execQuery(queryParams);
            },
            // 企业管理-执行查询
            async execQuery (queryParams) {
                this.isLoading = true;
                const res = await this.$api.get(this.baseUrl + '/sys/company/v1/queryCompany', queryParams);
                // console.log(res);
                if (!res) {
                    this.isLoading = false;
                    return;
                }

                this.tableData = res.data.items;
                this.total = res.data.totalCount;
                // if(this.isQuery) {
                //     this.watchTotal = res.data.totalCount;
                // }
                this.rowData = null;
                this.isLoading = false;
            },
            // 企业管理-选中一条数据
            handleSelected (rowData) {
                console.log(rowData);
                this.rowData = rowData;
            },
            // 企业管理-菜单功能
            async handleOperate (operateNum) {
                if (operateNum === 7) {
                    this.formItemListAdd[1].disabled = false;
                    this.formDatasAdd = this.$handle.objDeepCopy(this.addInitDatas);
                    this.currentIndex = 2;
                } else {
                    if (!this.rowData) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '请选择一条记录'
                        });
                    } else if (operateNum === 8) {
                        this.isShowLoading = true;
                        // 尝试获取图片
                        // const getEditPic = await this.$api.get(this.baseUrl + '/sys/fileUpload/v1/getImageUrlByUpid',{
                        //     upid: this.rowData.szcompanyemblem
                        // });
                        // console.log(getEditPic);
                        // if(!getEditPic) {
                        //     this.isShowLoading = false;
                        //     return;
                        // }

                        // 如果没有图片则设置为空
                        // if(getEditPic.data.upadder) {
                        //     this.formDatasAdd.imgUrl = getEditPic.data.upadder;
                        // } else {
                        //     this.formDatasAdd.imgUrl = '';
                        // }

                        // if(getEditPic.data.upid) {
                        //     this.szcompanyemblem = getEditPic.data.upid;
                        // } else {
                        //     this.szcompanyemblem = '';
                        // }

                        this.formItemListAdd[1].disabled = true;

                        // 如果是景区企业，则需要获取<所有服务商>列表和<已有服务商>列表
                        if (this.rowData.companytype === '02') {
                            const getAllProviderList = await this.$api.get(this.baseUrl + '/ticket/provider/v1/getScenicProviderByServerName', {
                                url: window.location.hostname
                            });
                            // console.log(getAllProviderList);
                            if (!getAllProviderList) {
                                this.isShowLoading = false;
                                return;
                            }

                            // 获取该企业已有的下属服务商列表
                            const getScenicListRes = await this.$api.get(this.baseUrl + '/sys/company/v1/getIscenicidsByCompanyinfoid', {
                                icompanyinfoid: this.rowData.icompanyinfoid
                            });
                            // console.log(getScenicListRes);
                            if (!getScenicListRes) {
                                this.isShowLoading = false;
                                return;
                            }

                            // 去掉所有服务商 选项
                            let filterList = getAllProviderList.data.filter(item => {
                                return item.szscenicname !== '所有服务商';
                            });

                            // 初始化修改页的多选框
                            this.formItemListAdd[2].optionList = filterList.map(item => {
                                return {
                                    value: item.iscenicid,
                                    labelName: item.szscenicname
                                };
                            });

                            // 修改页的多选框预勾选
                            this.formDatasAdd.iscenicids = getScenicListRes.data.map(item => {
                                return item.iscenicid;
                            });

                            this.formItemListAdd[2].isHidden = false;
                            this.formItemListAdd[3].isHidden = false;
                        } else {
                            this.formItemListAdd[2].isHidden = true;
                            this.formItemListAdd[3].isHidden = true;
                        }

                        // 初始化修改页的其他已有信息
                        for (let outter in this.formDatasAdd) {
                            for (let inner in this.rowData) {
                                if (outter === inner) {
                                    this.formDatasAdd[outter] = this.rowData[inner];
                                    break;
                                }
                            }
                        }
                        for (let outter in this.formDatasEdit) {
                            for (let inner in this.rowData) {
                                if (outter === inner) {
                                    this.formDatasEdit[outter] = this.rowData[inner];
                                    break;
                                }
                            }
                        }
                        this.currentIndex = 3;
                        this.isShowLoading = false;
                    } else if (operateNum === 9) {
                        this.isDel = true;
                    } else {
                        this.handleLook(this.rowData.icompanyinfoid);
                    }
                }
            },
            // 企业管理-关闭新增/修改/查看页
            handleClose () {
                this.currentIndex = 1;
            },
            // 企业管理-关闭删除确认框
            cancelDel () {
                this.isDel = false;
            },
            // 企业管理-logo上传成功后的回调钩子
            // hookSingle({res,file,fileList,status}) {
            //     if(status === 'success') {
            //         console.log(res);
            //         this.formDatasAdd.imgUrl = res.data.info.url;
            //         this.szcompanyemblem = res.data.upid;
            //     } else {
            //         this.$Modal.error({
            //             title: '温馨提示',
            //             content: '图片上传失败，请刷新重试！'
            //         });
            //     }
            // },
            // 企业管理-移除上传的图片
            // removeImage1() {
            //     this.formDatasAdd.imgUrl = '';
            //     this.szcompanyemblem = '';
            // },
            // 企业管理-查看查询
            async handleLook (queryParams) {
                this.isShowLoading = true;
                const lookRes = await this.$api.get(this.baseUrl + '/sys/company/v1/viewCompanyInfo', {
                    icompanyinfoid: queryParams
                });
                // console.log(lookRes);
                if (!lookRes) {
                    this.isShowLoading = false;
                    return;
                }

                // 尝试获取图片
                // const getPic = await this.$api.get(this.baseUrl + '/sys/fileUpload/v1/getImageUrlByUpid',{
                //     upid: this.rowData.szcompanyemblem
                // });
                // if(!getPic) {
                //     this.isShowLoading = false;
                //     return;
                // }

                // let imgSrc = '';
                let dataObj = null;
                // 如果没有图片则设置为空
                // if(getPic.data.upadder) {
                //     imgSrc = getPic.data.upadder;
                // }

                // 处理平台企业
                if (lookRes.data.company.companytype === '01') {
                    dataObj = {
                        '企业名称：': lookRes.data.company.szcompanyname,
                        // '企业徽标：': imgSrc,
                        '企业类别：': lookRes.data.company.strcomtype,
                        // '是否结算企业': lookRes.data.company.balance ? '是' : '否',
                        '企业编码：': lookRes.data.company.szcompanycode,
                        '企业组织机构代码': lookRes.data.company.szbankaccount,
                        '企业电话：': lookRes.data.company.sztel,
                        '企业传真：': lookRes.data.company.szfax,
                        '企业邮箱：': lookRes.data.company.szemail,
                        '企业网站：': lookRes.data.company.szwebsite,
                        '企业地址：': lookRes.data.company.szaddress,
                        '备注：': lookRes.data.company.szmemo
                    };
                }

                // 处理景区企业
                if (lookRes.data.company.companytype === '02') {
                    let providerList = [];
                    if (lookRes.data.iscenic) {
                        providerList = lookRes.data.iscenic.map(item => {
                            return item.szscenicname;
                        });
                    }
                    dataObj = {
                        '企业名称：': lookRes.data.company.szcompanyname,
                        // '企业徽标：': imgSrc,
                        '企业类别：': lookRes.data.company.strcomtype,
                        '是否结算企业': lookRes.data.company.balance ? '是' : '否',
                        '企业服务商：': providerList.join('，'),
                        '企业编码：': lookRes.data.company.szcompanycode,
                        '企业组织机构代码': lookRes.data.company.szbankaccount,
                        '企业电话：': lookRes.data.company.sztel,
                        '企业传真：': lookRes.data.company.szfax,
                        '企业邮箱：': lookRes.data.company.szemail,
                        '企业网站：': lookRes.data.company.szwebsite,
                        '企业地址：': lookRes.data.company.szaddress,
                        '备注：': lookRes.data.company.szmemo
                    };
                }
                let list = [];
                for (let attr in dataObj) {
                    // if(attr === '企业徽标：') {
                    //     list.push({
                    //         title: attr,
                    //         value: dataObj[attr],
                    //         isPic: true
                    //     });
                    // } else {
                    //     list.push({
                    //         title: attr,
                    //         value: dataObj[attr]
                    //     });
                    // }
                    list.push({
                        title: attr,
                        value: dataObj[attr]
                    });
                }
                this.detailList = list;
                this.currentIndex = 4;
                this.isShowLoading = false;
            },
            // 企业管理-执行删除
            async sureDel () {
                this.isModalLoading = true;
                const delRes = await this.$api.delete(this.baseUrl + '/sys/company/v1/deleteCompany', {
                    companyinfoid: this.rowData.icompanyinfoid
                });
                if (!delRes) {
                    this.isModalLoading = false;
                    this.isDel = false;
                    return;
                }

                // 重新查询
                const requeryRes = await this.$api.get(this.baseUrl + '/sys/company/v1/queryCompany', {
                    page: 1,
                    pageSize: this.size1
                });
                if (!requeryRes) {
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '企业信息已经删除成功，但重新查询时遇到异常，请手动刷新后查看'
                    });
                    return;
                }

                this.tableData = requeryRes.data.items;
                this.total = requeryRes.data.totalCount;
                // this.watchTotal = requeryRes.data.totalCount;
                // this.isQuery = false;
                this.QueryBuild1 = {
                    page: 1,
                    pageSize: this.size1
                };
                this.currentPage1 = 1;
                // this.formDatas.querycomid = '';
                this.formDatas.querycomname = '';
                // this.formDatas.flag = 0;

                this.rowData = null;
                this.isModalLoading = false;
                this.isDel = false;
                this.$Modal.success({
                    title: '操作成功',
                    content: '企业信息删除成功，欢迎使用易旅通智慧景区系统'
                });
            },
            // 企业管理-执行新增/修改
            async handleAdd () {
                if (this.formDatasAdd.szemail) {
                    let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                        email = this.formDatasAdd.szemail;
                    if (reg !== '' && !reg.test(email)) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '企业邮箱格式不正确，邮箱的基本格式为“名称@域名”，建议使用英文字母、数字、下划线！'
                        });
                        this.formDatasAdd.szemail = '';
                        return;
                    }
                }

                this.isShowLoading = true;
                // console.log(this.formDatasAdd);
                // this.watchTotal = 0;

                let bodyParams = null;
                if (this.formDatasAdd.companytype === '01') {
                    for (let attr in this.formDatasAdd) {
                        if (attr !== 'balance' && attr !== 'iscenicids') {
                            bodyParams = Object.assign({}, bodyParams, {
                                [attr]: this.formDatasAdd[attr]
                            });
                        }
                    }
                } else {
                    bodyParams = {
                        ...this.formDatasAdd
                    };
                }
                // console.log(bodyParams)

                // 新增
                if (this.currentIndex === 2) {
                    // bodyParams = {
                    //     ...bodyParams,
                    //     szcompanyemblem: this.szcompanyemblem
                    // }
                    const addRes = await this.$api.post(this.baseUrl + '/sys/company/v1/AddCompany', {}, bodyParams);
                    // console.log(addRes);
                    if (!addRes) {
                        this.isShowLoading = false;
                        return;
                    }
                }

                // 修改
                if (this.currentIndex === 3) {
                    // 加个判断，解决有时返回字段 balance 值为null的情况
                    if (this.formDatasAdd.companytype === '02') {
                        if (this.formDatasAdd.balance !== 0 && this.formDatasAdd.balance !== 1) {
                            this.$Modal.warning({
                                title: '温馨提示',
                                content: '您修改的是景区企业信息，请选择“是否为结算企业”'
                            });
                            this.isShowLoading = false;
                            return;
                        }
                    }
                    bodyParams = {
                        ...bodyParams,
                        ...this.formDatasEdit
                        // szcompanyemblem: this.szcompanyemblem
                    };
                    // console.log(bodyParams);
                    const editRes = await this.$api.put(this.baseUrl + '/sys/company/v1/editCompany', {}, bodyParams);
                    // console.log(editRes);
                    if (!editRes) {
                        this.isShowLoading = false;
                        return;
                    }
                }

                const requeryRes = await this.$api.get(this.baseUrl + '/sys/company/v1/queryCompany', {
                    page: 1,
                    pageSize: this.size1
                });
                if (!requeryRes) {
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: `企业信息已经${this.currentIndex === 2 ? '新增' : '修改'}成功，但重新查询时遇到异常，请手动刷新后查看`
                    });
                    return;
                }

                this.tableData = requeryRes.data.items;
                this.total = requeryRes.data.totalCount;
                // this.watchTotal = requeryRes.data.totalCount;
                // this.isQuery = false;
                this.QueryBuild1 = {
                    page: 1,
                    pageSize: this.size1
                };
                this.currentPage1 = 1;
                // this.formDatas.querycomid = '';
                this.formDatas.querycomname = '';
                // this.formDatas.flag = 0;
                this.rowData = null;
                this.$Modal.success({
                    title: '操作成功',
                    content: `企业信息${this.currentIndex === 2 ? '新增' : '修改'}成功，欢迎使用易旅通智慧景区系统`
                });
                this.currentIndex = 1;
                this.isShowLoading = false;
            },
            // 企业管理-选择景区平台 显示多选框
            async showScenicCheckboxs (val) {
                if (val === '01') {
                    this.formItemListAdd[2].isHidden = true;
                    this.formItemListAdd[3].isHidden = true;
                } else {
                    this.isShowLoading = true;
                    const getScenicsRes = await this.$api.get(this.baseUrl + '/ticket/provider/v1/getScenicProviderByServerName', {
                        url: window.location.hostname
                    });
                    // console.log(getScenicsRes);
                    if (!getScenicsRes) {
                        this.currentIndex = 1;
                        this.isShowLoading = false;
                        return;
                    }

                    // 去掉 所有服务商 选项
                    let filterList = getScenicsRes.data.filter(item => {
                        return item.szscenicname !== '所有服务商';
                    });
                    this.formItemListAdd[2].optionList = filterList.map(item => {
                        return {
                            value: item.iscenicid,
                            labelName: item.szscenicname
                        };
                    });
                    this.formItemListAdd[2].isHidden = false;
                    this.formItemListAdd[3].isHidden = false;
                    this.isShowLoading = false;
                }
            },
            // 企业管理-重置查询表单
            resetForm1 () {
                // this.formDatas.querycomid = '';
                this.formDatas.querycomname = '';
            },
            // 企业管理-改变最大显示数
            async changeSize1 (size) {
                this.size1 = size;
                this.handleChangePage(1);
            },

            /*
             * 部门管理相关方法
             */
            // 进入部门管理页
            async gotoDepartment (cmyId) {
                this.isShowLoading = true;
                const getDepartment = await this.$api.get(this.baseUrl + '/sys/depts/v1/queryDeptInfo', {
                    icompanyinfoid: cmyId,
                    pageSize: this.size5,
                    page: 1
                });
                if (!getDepartment) {
                    this.isShowLoading = false;
                    return;
                }
                // console.log(this.depList);
                this.tableData5 = getDepartment.data.items;
                this.total5 = getDepartment.data.totalCount;
                this.initAdd5 = this.$handle.objDeepCopy(this.addFormDatas5);
                this.QueryBuild5 = {
                    icompanyinfoid: cmyId,
                    pageSize: this.size5,
                    page: 1
                };
                this.currentPage5 = 1;
                this.currentIndex = 5;
                this.isShowLoading = false;
            },
            // 部门管理页-菜单
            handleOperate5 (operateNum) {
            // console.log(this.depList);
                if (operateNum === 11) {
                    // depList 中只有一项即企业id时，表明应退回到企业管理页面
                    if (this.depList.length === 1) {
                        this.currentIndex = 1;
                    } else if (this.depList.length === 2) { // 只有两项时应退回顶级部门，不需要参数--ideptid
                        this.rowData5 = null;
                        this.gotoDepartment(this.companyId);
                    } else { // 两项以上时应退回上一级部门，需要上一级部门参数--ideptid
                        this.gotoNextDepartment(this.depList[this.depList.length - 2]);
                    }
                    this.depList.pop();
                    // console.log(this.depList);
                } else if (operateNum === 7) {
                    this.gotoAddEdit(operateNum);
                } else {
                    if (!this.rowData5) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '请选择一条记录'
                        });
                        return;
                    }
                    if (operateNum === 8) {
                        this.gotoAddEdit(operateNum);
                        return;
                    }
                    if (operateNum === 9) {
                        this.isDel5 = true;
                        return;
                    }
                    if (operateNum === 10) {
                        this.lookDepartment(this.rowData5.ideptid);
                    }
                }
            },
            // 部门管理页-条件查询
            handleQuery5 () {
                // this.isQuery5 = true;
                // 应判断是否是子部门查询，如是，则需传入父部门的id
                let queryParams = {
                    flag: this.formDatas5.flag,
                    queryMess: this.formDatas5.queryMess,
                    queryid: this.formDatas5.queryid,
                    icompanyinfoid: this.companyId,
                    page: 1,
                    pageSize: this.size5
                };
                if (this.depList.length > 1) {
                    queryParams = {
                        ...queryParams,
                        deptId: this.depList.slice(-1)[0]
                    };
                }
                this.QueryBuild5 = {
                    ...queryParams
                };
                this.currentPage5 = 1;
                this.execQuery5(queryParams);
            },
            // 部门管理页-翻页查询（企业下属部门较少时可能用不到，还是加上此功能）
            handleChangePage5 (pageNum) {
                let queryParams = {
                    ...this.QueryBuild5
                };
                queryParams.page = pageNum;
                queryParams.pageSize = this.size5;
                this.currentPage5 = pageNum;
                this.execQuery5(queryParams);
            },
            // 部门管理页-选择一条记录
            handleSelected5 (rowData5) {
                // console.log(rowData5);
                this.rowData5 = rowData5;
            },
            // 部门管理页-执行查询
            async execQuery5 (queryParams) {
                this.isLoading = true;
                const queryRes = await this.$api.get(this.baseUrl + '/sys/depts/v1/queryDeptInfo', queryParams);
                // console.log(queryRes);
                if (!queryRes) {
                    this.isLoading = false;
                    return;
                }

                this.tableData5 = queryRes.data.items;
                this.total5 = queryRes.data.totalCount;
                // if(this.isQuery5) {
                //     this.watchTotal5 = queryRes.data.totalCount;
                // }
                this.isLoading = false;
            },
            // 进入下级部门管理页
            async gotoNextDepartment (depid) {
                this.isLoading = true;
                const nextQuery = await this.$api.get(this.baseUrl + '/sys/depts/v1/queryDeptInfo', {
                    pageSize: this.size5,
                    page: 1,
                    deptId: depid,
                    icompanyinfoid: this.companyId
                });
                // console.log(nextQuery);
                // console.log(this.depList);
                if (!nextQuery) {
                    this.isLoading = false;
                    return;
                }

                this.formDatas5.queryMess = '';
                // this.formDatas5.queryid = '';
                this.rowData5 = null;
                this.tableData5 = nextQuery.data.items;
                this.total5 = nextQuery.data.totalCount;
                this.QueryBuild5 = {
                    pageSize: this.size5,
                    page: 1,
                    deptId: depid,
                    icompanyinfoid: this.companyId
                };
                this.currentPage5 = 1;
                this.isLoading = false;
            },
            // 进入部门新增/修改页
            async gotoAddEdit (operateNum) {
                this.isShowLoading = true;
                const add5 = await this.$api.get(this.baseUrl + '/sys/depts/v1/getAllPosts', {
                    companytype: this.companyType
                });
                // console.log(add5);
                if (!add5) {
                    this.isShowLoading = false;
                    return;
                }

                this.addFormItemListAdd5[5].optionList = add5.data.map(item => {
                    return {
                        value: item.ipostsid,
                        labelName: item.szpostsname
                    };
                });

                // 新增
                if (operateNum === 7) {
                    this.addFormItemListAdd5[3].isHidden = true;
                    this.addFormItemListAdd5[4].isHidden = false;
                    this.addFormDatas5 = this.$handle.objDeepCopy(this.initAdd5);
                    this.addFormDatas5.szcompanyname = this.companyName;
                    this.currentIndex = 5.1;
                } else { // 修改
                    this.addFormItemListAdd5[3].isHidden = false;
                    this.addFormItemListAdd5[4].isHidden = true;
                    for (let outter in this.addFormDatas5) {
                        for (let inner in this.rowData5) {
                            if (outter === inner) {
                                this.addFormDatas5[outter] = this.rowData5[inner];
                                break;
                            }
                        }
                    }
                    this.addFormDatas5.selList = this.rowData5.Posts.map(item => item.ipostsid);
                    this.currentIndex = 5.2;
                }
                this.isShowLoading = false;
            },
            // 关闭部门新增/修改/查看页
            handleClose5 () {
                this.currentIndex = 5;
            },
            // 执行部门新增/修改
            async handleAdd5 () {
                this.isShowLoading = true;
                let commonParams = {
                    szdeptname: this.addFormDatas5.szdeptname,
                    szdeptcode: this.addFormDatas5.szdeptcode,
                    szmemo: this.addFormDatas5.szmemo,
                    icompanyinfoid: this.companyId
                };
                let urlParams = null,
                    bodyParams = null;

                if (this.depList.length === 1) { // 增加/修改顶级部门
                    urlParams = {
                        deptComId: this.companyId,
                        parentId: 0,
                        selListVal: this.addFormDatas5.selList.join(',')
                    };
                    bodyParams = {
                        iparentid: 0,
                        ...commonParams
                    };
                }
                if (this.depList.length > 1) { // 增加/修改子部门
                    urlParams = {
                        deptComId: this.companyId,
                        parentId: this.depList[this.depList.length - 1],
                        selListVal: this.addFormDatas5.selList.join(',')
                    };
                    bodyParams = {
                        iparentid: this.depList[this.depList.length - 1],
                        ...commonParams
                    };
                }

                if (this.currentIndex === 5.1) { // 新增
                    urlParams = {
                        ...urlParams,
                        flag: 1
                    };
                    bodyParams = {
                        ...bodyParams,
                        bisleaf: this.addFormDatas5.bisleaf
                    };
                }
                if (this.currentIndex === 5.2) { // 修改
                    urlParams = {
                        ...urlParams,
                        flag: 2
                    };
                    bodyParams = {
                        ...bodyParams,
                        byisuse: this.addFormDatas5.byisuse,
                        ideptid: this.rowData5.ideptid,
                        bisleaf: this.addFormDatas5.bisleaf
                    };
                }
                const addRes = await this.$api.post(this.baseUrl + '/sys/depts/v1/saveDeptInfo', urlParams, bodyParams);
                // console.log(addRes);
                if (!addRes) {
                    this.isShowLoading = false;
                    return;
                }

                // 重新查询-分查询顶级部门和子部门
                let reQueryParams = null;
                if (this.depList.length === 1) { // 顶级部门
                    reQueryParams = {
                        icompanyinfoid: this.companyId,
                        pageSize: this.size5,
                        page: 1
                    };
                }
                if (this.depList.length > 1) { // 子部门
                    reQueryParams = {
                        icompanyinfoid: this.companyId,
                        pageSize: this.size5,
                        page: 1,
                        deptId: this.depList[this.depList.length - 1]
                    };
                }

                // 执行重新查询
                const requeryRes = await this.$api.get(this.baseUrl + '/sys/depts/v1/queryDeptInfo', reQueryParams);
                // console.log(requeryRes);
                if (!requeryRes) {
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: `${this.currentIndex === 5.1 ? '新增' : '修改'}部门信息已经成功，但重新查询时遇到异常，请手动刷新后查看`
                    });
                    return;
                }

                this.tableData5 = requeryRes.data.items;
                this.total5 = requeryRes.data.totalCount;
                // this.watchTotal5 = requeryRes.data.totalCount;
                // this.isQuery5 = false;
                this.QueryBuild5 = {
                    ...reQueryParams
                };
                this.currentPage5 = 1;
                // this.formDatas5.flag = 0;
                // this.formDatas5.queryid = '';
                this.formDatas5.queryMess = '';
                this.rowData5 = null;
                this.$Modal.success({
                    title: '操作成功',
                    content: `${this.currentIndex === 5.1 ? '新增' : '修改'}部门信息成功，欢迎使用易旅通智慧景区系统`
                });
                this.currentIndex = 5;
                this.isShowLoading = false;
            },
            // 部门查看查询
            async lookDepartment (depid) {
                this.isShowLoading = true;

                // 获取景区信息
                const lookRes = await this.$api.get(this.baseUrl + '/sys/depts/v1/viewDeptInfo', {
                    ideptId: depid
                });
                // console.log(lookRes);
                if (!lookRes) {
                    this.isShowLoading = false;
                    return;
                }

                // 获取指定企业所有岗位列表
                const getAllPosts = await this.$api.get(this.baseUrl + '/sys/depts/v1/getAllPosts', {
                    companytype: this.companyType
                });
                // console.log(getAllPosts);
                if (!getAllPosts) {
                    this.isShowLoading = false;
                    return;
                }

                // 保存所有岗位的key-value对象数组
                let postMap = getAllPosts.data.map(item => {
                    return {
                        id: item.ipostsid,
                        name: item.szpostsname
                    };
                });

                // 指定部门已有的岗位列表，id数组
                let postList = lookRes.data.postsTabs.map(item => {
                    return item.ipostsid;
                });

                // 根据已有岗位id数组 从所有的岗位数组中找出已有的岗位列表（键值对形式）
                let realPostMap = postMap.filter(item => {
                    return this.$handle.isExist(item.id, postList);
                });

                // 获取岗位名称的数组
                let nameList = realPostMap.map(item => {
                    return item.name;
                });
                // console.log(nameList)
                let dataObj = {
                    '部门名称：': lookRes.data.esfdepttab.szdeptname,
                    '隶属关系：': lookRes.data.esfdepttab.szinnername,
                    '所属公司：': lookRes.data.companyName,
                    '部门代码：': lookRes.data.esfdepttab.szdeptcode,
                    '部门所包含的岗位：': nameList.join('，'),
                    '使用状态：': lookRes.data.esfdepttab.byisuse ? '启用' : '禁用',
                    '备注：': lookRes.data.esfdepttab.szmemo
                };
                // vue v-for遍历对象时不能保证顺序，故下面处理成数组
                let list = [];
                for (let attr in dataObj) {
                    list.push({
                        title: attr,
                        value: dataObj[attr]
                    });
                }
                this.detailList = list;
                this.currentIndex = 5.3;
                this.isShowLoading = false;
            },
            // 执行部门删除
            async sureDel5 () {
                this.isModalLoading5 = true;
                const del5 = await this.$api.delete(this.baseUrl + '/sys/depts/v1/deleteDept', {
                    deptId: this.rowData5.ideptid
                });
                // console.log(del5);
                if (!del5) {
                    this.isModalLoading5 = false;
                    this.isDel5 = false;
                    return;
                }

                let reQueryParams = null;
                if (this.depList.length === 1) { // 删除顶级部门的重新查询
                    reQueryParams = {
                        icompanyinfoid: this.companyId,
                        pageSize: this.size5,
                        page: 1
                    };
                }
                if (this.depList.length > 1) { // 删除子部门的重新查询
                    reQueryParams = {
                        icompanyinfoid: this.companyId,
                        pageSize: this.size5,
                        page: 1,
                        deptId: this.depList[this.depList.length - 1]
                    };
                }

                // 删除后重新查询
                let requeryRes = await this.$api.get(this.baseUrl + '/sys/depts/v1/queryDeptInfo', reQueryParams);
                // console.log(requeryRes);
                if (!requeryRes) {
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '部门信息已经删除成功，但重新查询时遇到异常，请手动刷新后查看'
                    });
                    return;
                }

                this.tableData5 = requeryRes.data.items;
                this.total5 = requeryRes.data.totalCount;
                // this.watchTotal5 = requeryRes.data.totalCount;
                // this.isQuery5 = false;
                this.QueryBuild5 = {
                    ...reQueryParams
                };
                this.currentPage5 = 1;
                // this.formDatas5.flag = 0;
                // this.formDatas5.queryid = '';
                this.formDatas5.queryMess = '';

                this.rowData5 = null;
                this.isDel5 = false;
                this.isModalLoading5 = false;
                this.$Modal.success({
                    title: '操作成功',
                    content: '部门信息删除成功，欢迎使用易旅通智慧景区系统'
                });
            },
            // 关闭部门删除确认框
            cancelDel5 () {
                this.isDel5 = false;
            },
            // 部门管理页-重置查询表单
            resetForm5 () {
                // this.formDatas5.queryid = '';
                this.formDatas5.queryMess = '';
            },
            // 部门管理页-改变最大显示数
            async changeSize5 (size) {
                this.size5 = size;
                this.handleChangePage5(1);
            },

            /**
             * 员工管理相关方法
             */
            // 进入员工管理页
            async gotoEmployee (depid) {
                this.isShowLoading = true;
                this.initAdd6 = this.$handle.objDeepCopy(this.addFormDatas6);
                const getEmployee = await this.$api.get(this.baseUrl + '/sys/employee/v1/employeeSearch', {
                    ideptid: depid,
                    pageSize: this.size6,
                    page: 1
                });
                // console.log(getEmployee);
                if (!getEmployee) {
                    this.isShowLoading = false;
                    return;
                }
                this.QueryBuild6 = {
                    ideptid: depid,
                    pageSize: this.size6,
                    page: 1
                };
                this.currentPage6 = 1;
                this.tableData6 = getEmployee.data.items,
                this.total6 = getEmployee.data.totalCount,
                this.currentIndex = 6;
                this.isShowLoading = false;
            },
            // 员工管理页-条件查询-条件为空时，查询所有
            handleQuery6 () {
                // this.isQuery5 = true;
                let queryParams = {
                    szemployeename: this.formDatas6.szemployeename,
                    ideptid: this.departmentId,
                    page: 1,
                    pageSize: this.size6
                };
                this.QueryBuild6 = {
                    ...queryParams
                };
                this.currentPage6 = 1;
                this.execQuery6(queryParams);
            },
            // 员工管理页-翻页查询（部门下属员工较少时可能用不到，还是加上此功能）
            handleChangePage6 (pageNum) {
                let queryParams = {
                    ...this.QueryBuild6
                };
                queryParams.page = pageNum;
                queryParams.pageSize = this.size6;
                this.currentPage6 = pageNum;
                this.execQuery6(queryParams);
            },
            // 员工管理页-选择一条记录
            handleSelected6 (rowData6) {
                // console.log(rowData6);
                this.rowData6 = rowData6;
            },
            // 员工管理页-菜单
            handleOperate6 (operateNum, icon) {
                if (operateNum === 11) {
                    if (icon === 'reply') { // 返回部门管理
                        this.currentIndex = 5;
                    } else {
                        if (!this.rowData6) {
                            this.$Modal.warning({
                                title: '温馨提示',
                                content: '请选择一条记录'
                            });
                            return;
                        }
                        if (icon === 'android-desktop') { // 登录密码初始化
                            this.UserId = this.rowData6.iemployeeid;
                            this.UserName = this.rowData6.szemployeename;
                            this.isLoginPwd = true;
                        } else if (icon === 'android-open') { // 认证码初始化
                            this.UserId = this.rowData6.iemployeeid;
                            this.UserName = this.rowData6.szemployeename;
                            this.isCode = true;
                        } else { // 登录次数初始化
                            this.isTimes = true;
                        }
                    }
                } else if (operateNum === 7) {
                    this.gotoAddEdit6(operateNum);
                } else {
                    if (!this.rowData6) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '请选择一条记录'
                        });
                        return;
                    }
                    if (operateNum === 8) {
                        this.gotoAddEdit6(operateNum);
                    } else if (operateNum === 9) {
                        this.isDel6 = true;
                    } else {
                        this.lookEmployee(this.rowData6.iemployeeid);
                    }
                }
            },
            // 执行条件查询
            async execQuery6 (queryParams) {
                this.isLoading = true;
                const res = await this.$api.get(this.baseUrl + '/sys/employee/v1/employeeSearch', queryParams);
                // console.log(res);
                if (!res) {
                    this.isShowLoading = false;
                    return;
                }

                this.tableData6 = res.data.items,
                this.total6 = res.data.totalCount,
                this.isLoading = false;
            },
            // 查看员工信息
            async lookEmployee (empid) {
                this.isShowLoading = true;

                // 获取员工信息
                const look6 = await this.$api.get(this.baseUrl + '/sys/employee/v1/employeeView', {
                    employeeid: empid
                });
                // console.log(look6);
                if (!look6) {
                    this.isShowLoading = false;
                    return;
                }

                // 获取指定员工可选的所有岗位及其他下拉列表数据
                const preLook6 = await this.$api.get(this.baseUrl + '/sys/employee/v1/preformAddEmployee', {
                    deptid: this.departmentId
                });
                // console.log(preLook6);
                if (!preLook6) {
                    this.isShowLoading = false;
                    return;
                }

                // 获取籍贯地
                let nativePlace = '';
                if (this.rowData6.iborthaddress) {
                    const getNative = await this.$api.get(this.baseUrl + '/sys/sourceRegion/v1/querySourceregionById', {
                        iregionalid: this.rowData6.iborthaddress
                    });
                    // console.log(getNative);
                    if (!getNative) {
                        this.isShowLoading = false;
                        return;
                    }
                    nativePlace = getNative.data.szinnername;
                }

                // 获取民族列表
                let nationList = preLook6.data.mzList.map(item => {
                    return {
                        value: item.pmcd,
                        label: item.pmva
                    };
                });
                // 获取专业列表
                let majorList = preLook6.data.zyList.map(item => {
                    return {
                        value: item.pmcd,
                        label: item.pmva
                    };
                });
                // 获取职称列表
                let professionalList = preLook6.data.zcList.map(item => {
                    return {
                        value: item.pmcd,
                        label: item.pmva
                    };
                });
                // 获取岗位列表
                let positionList = preLook6.data.postlist.map(item => {
                    return {
                        value: item.ipostsid,
                        label: item.szpostsname
                    };
                });
                // 获取登录类型列表
                let loginTypeList = preLook6.data.dpList.map(item => {
                    return {
                        value: item.pmcd,
                        label: item.pmva
                    };
                });
                // 获取学历列表
                let educationList = preLook6.data.xlList.map(item => {
                    return {
                        value: item.pmcd,
                        label: item.pmva
                    };
                });
                // 获取职务列表
                let jobList = preLook6.data.zwList.map(item => {
                    return {
                        value: item.pmcd,
                        label: item.pmva
                    };
                });

                let employee = look6.data.employee;

                // 实际岗位列表（id数组）
                let postIdList = look6.data.posts.map(item => {
                    return item.ipostsid;
                });

                // 根据id数组 从所有岗位列表中获取实际岗位列表（键值对形式）
                let realPostList = positionList.filter(item => {
                    return this.$handle.isExist(item.value, postIdList);
                });

                // 处理成名称数组
                let postNameList = realPostList.map(item => {
                    return item.label;
                });

                let dataObj_login = {
                        '登录账户名': employee.empid,
                        '登录方式：': loginTypeList.filter(item => item.value === employee.byloginitype)[0].label,
                        ' 是否可使用本系统：': employee.bissysuser ? '允许' : '禁止',
                        '是否启用：': employee.byisuse ? '启用' : '不启用'
                    },
                    dataObj_base = {
                        '员工姓名：': employee.szemployeename,
                        '出生日期：': employee.dtbirthdate,
                        '身份证号码：': employee.szcardid,
                        '联系电话：': employee.szcellphone,
                        '性别：': employee.isex ? '女' : '男',
                        '婚姻状况：': employee.bismarry ? '已婚' : '未婚',
                        '民族：': nationList.filter(item => item.value === employee.sznation)[0].label,
                        '籍贯：': nativePlace,
                        '户口所在地：': employee.szaccountlocation,
                        '家庭住址：': employee.szhomeaddress,
                        '毕业院校': employee.szschool,
                        '毕业日期：': employee.dtgraduatedate,
                        '学历：': educationList.filter(item => item.value === employee.educational)[0].label,
                        '专业：': majorList.filter(item => item.value === employee.major)[0].label
                    },
                    dataObj_work = {
                        '企业名称': this.companyName,
                        '部门名称': this.departmentName,
                        '职务名称': jobList.filter(item => item.value === employee.szpost)[0].label,
                        '职称：': professionalList.filter(item => item.value === employee.professional)[0].label,
                        '入职日期：': employee.dtentrydate,
                        '电子邮箱：': employee.szemail,
                        '所在岗位：': postNameList.join('，'),
                        '备注：': employee.szmemo
                    };
                let list_login = [],
                    list_base = [],
                    list_work = [],
                    list_group = [];
                for (let attr in dataObj_login) {
                    list_login.push({
                        key: attr,
                        value: dataObj_login[attr]
                    });
                }
                for (let attr in dataObj_base) {
                    list_base.push({
                        key: attr,
                        value: dataObj_base[attr]
                    });
                }
                for (let attr in dataObj_work) {
                    list_work.push({
                        key: attr,
                        value: dataObj_work[attr]
                    });
                }
                list_group = [
                    {
                        title: '登录信息',
                        detailList: list_login
                    },
                    {
                        title: '基本信息',
                        detailList: list_base
                    },
                    {
                        title: '入职信息',
                        detailList: list_work
                    }
                ];
                this.detailGroup = list_group;
                this.currentIndex = 6.3;
                this.isShowLoading = false;
            },
            // 进入新增/修改
            async gotoAddEdit6 (operateNum) {
                this.isShowLoading = true;
                const add6 = await this.$api.get(this.baseUrl + '/sys/employee/v1/preformAddEmployee', {
                    deptid: this.departmentId
                });
                // console.log(add6);
                if (!add6) {
                    this.isShowLoading = false;
                    return;
                }

                // 民族列表
                let nationList = add6.data.mzList.map(item => {
                    return {
                        value: item.pmcd,
                        label: item.pmva
                    };
                });
                // 专业列表
                let majorList = add6.data.zyList.map(item => {
                    return {
                        value: item.pmcd,
                        label: item.pmva
                    };
                });
                // 职称列表
                let professionalList = add6.data.zcList.map(item => {
                    return {
                        value: item.pmcd,
                        label: item.pmva
                    };
                });
                // 岗位列表
                let positionList = add6.data.postlist.map(item => {
                    return {
                        value: item.ipostsid,
                        label: item.szpostsname
                    };
                });
                // 登录类型列表
                let loginTypeList = add6.data.dpList.map(item => {
                    return {
                        value: item.pmcd,
                        label: item.pmva
                    };
                });
                // 学历列表
                let educationList = add6.data.xlList.map(item => {
                    return {
                        value: item.pmcd,
                        label: item.pmva
                    };
                });
                // 职务列表
                let jobList = add6.data.zwList.map(item => {
                    return {
                        value: item.pmcd,
                        label: item.pmva
                    };
                });

                // 初始化需要选择的表单
                this.add_fieldsetList6[0].config[3].optionList = loginTypeList;
                this.add_fieldsetList6[1].config[5].optionList = nationList;
                this.add_fieldsetList6[1].config[12].optionList = educationList;
                this.add_fieldsetList6[1].config[13].optionList = majorList;
                this.add_fieldsetList6[2].config[2].optionList = jobList;
                this.add_fieldsetList6[2].config[3].optionList = professionalList;
                this.add_fieldsetList6[2].config[6].optionList = positionList;

                // 初始化页面其他字段
                this.addFormDatas6 = this.$handle.objDeepCopy(this.initAdd6);
                this.loginType = loginTypeList;
                this.addFormDatas6.szcompanyname = this.companyName;
                this.addFormDatas6.szdeptname = this.departmentName;

                if (operateNum === 7) { // 新增
                    this.photoupid = '';
                    this.add_fieldsetList6[0].config[0].disabled = false;
                    this.add_fieldsetList6[0].config[1].isHide = false;
                    this.addFormDatas6.byloginitype = loginTypeList[0].value;
                    this.addFormDatas6.sznation = nationList[0].value;
                    this.addFormDatas6.educational = educationList[0].value;
                    this.addFormDatas6.major = majorList[0].value;
                    this.addFormDatas6.szpost = jobList[0].value;
                    this.addFormDatas6.professional = professionalList[0].value;
                    this.currentIndex = 6.1;
                } else { // 修改
                    // 获取员工相片
                    const getEditPic6 = await this.$api.get(this.baseUrl + '/sys/fileUpload/v1/getImageUrlByUpid', {
                        upid: this.rowData6.photoupid
                    });
                    if (!getEditPic6) {
                        this.isShowLoading = false;
                        return;
                    }

                    // 查询员工信息，获取员工岗位列表
                    const getEmployeeInfo = await this.$api.get(this.baseUrl + '/sys/employee/v1/employeeView', {
                        employeeid: this.rowData6.iemployeeid
                    });
                    // console.log(getEmployeeInfo);
                    if (!getEmployeeInfo) {
                        this.isShowLoading = false;
                        return;
                    }

                    // 获取籍贯地
                    let nativePlace = '';
                    if (this.rowData6.iborthaddress) {
                        const getNativeForUpdate = await this.$api.get(this.baseUrl + '/sys/sourceRegion/v1/querySourceregionById', {
                            iregionalid: this.rowData6.iborthaddress
                        });
                        // console.log(getNativeForUpdate);
                        if (!getNativeForUpdate) {
                            this.isShowLoading = false;
                            return;
                        }

                        nativePlace = getNativeForUpdate.data.szinnername;
                        this.iborthaddress = this.rowData6.iborthaddress;
                    }

                    this.addFormDatas6.ipostsids = getEmployeeInfo.data.posts.map(item => {
                        return item.ipostsid;
                    });

                    if (getEditPic6.data) {
                        this.addFormDatas6.imgUrl = getEditPic6.data.upadder;
                        this.photoupid = getEditPic6.data.upid;
                    } else {
                        this.addFormDatas6.imgUrl = '';
                        this.photoupid = '';
                    }

                    this.add_fieldsetList6[0].config[0].disabled = true;
                    this.add_fieldsetList6[0].config[1].isHide = true;

                    for (let outter in this.addFormDatas6) {
                        for (let inner in this.rowData6) {
                            if (outter === inner) {
                                this.addFormDatas6[outter] = this.rowData6[inner];
                            }
                        }
                    }

                    // 根据登录类型名称获取其值
                    let getloginTypeId = this.loginType.filter(item => {
                        return item.label === this.rowData6.byloginitype;
                    })[0].value;
                    this.addFormDatas6.byloginitype = getloginTypeId;
                    this.addFormDatas6.szinnername = nativePlace;
                    // console.log(this.addFormDatas6);
                    this.currentIndex = 6.2;
                }
                this.isShowLoading = false;
            },
            // 执行员工删除
            async sureDel6 () {
                this.isModalLoading6 = true;
                const del6 = await this.$api.delete(this.baseUrl + '/sys/employee/v1/deleteEmployee', {
                    employeeid: this.rowData6.iemployeeid
                });
                // console.log(del6);
                if (!del6) {
                    this.isModalLoading6 = false;
                    this.isDel6 = false;
                    return;
                }

                let requeryDelRes = await this.$api.get(this.baseUrl + '/sys/employee/v1/employeeSearch', {
                    ideptid: this.departmentId,
                    page: 1,
                    pageSize: this.size6
                });
                // console.log(requeryDelRes);
                if (!requeryDelRes) {
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '员工信息已经删除成功，但重新查询时遇到异常，请手动刷新后查看'
                    });
                    return;
                }

                this.tableData6 = requeryDelRes.data.items;
                this.total6 = requeryDelRes.data.totalCount;
                // this.watchTotal6 = requeryDelRes.data.totalCount;
                // this.isQuery6 = false;
                this.QueryBuild6 = {
                    ideptid: this.departmentId,
                    page: 1,
                    pageSize: this.size6
                };
                this.currentPage6 = 1;
                this.formDatas6.szemployeename = '';
                this.rowData6 = null;
                this.isDel6 = false;
                this.isModalLoading6 = false;
                this.$Modal.success({
                    title: '操作成功',
                    content: '员工信息删除成功，欢迎使用易旅通智慧景区系统'
                });
            },
            // 取消员工删除
            cancelDel6 () {
                this.isDel6 = false;
            },
            // 相片上传成功钩子
            hook (res, file, fileList) {
                if (res.code === 200) {
                    // console.log(res)
                    this.addFormDatas6.imgUrl = res.data.info.url;
                    this.photoupid = res.data.upid;
                } else {
                    this.$Modal.error({
                        title: '温馨提示',
                        content: '图片上传失败，请稍后重试！'
                    });
                }
            },
            // 关闭树菜单对话框
            closeTree () {
                this.isShowTree = false;
            },
            // 获取点击的树节点的数据
            async clickTreeNode (nodeArray) {
                // console.log(nodeArray)
                // this.nativeList.push(nodeArray[0].title)
                const getSzinnername = await this.$api.get(this.baseUrl + '/sys/sourceRegion/v1/querySourceregionById', {
                    iregionalid: nodeArray[0].treeId
                });
                if (!getSzinnername) {
                    this.isShowTree = false;
                    return;
                }

                this.addFormDatas6.szinnername = getSzinnername.data.szinnername;
                this.iborthaddress = nodeArray[0].treeId;
                this.isShowTree = false;
            },
            // 展开下一级树节点
            async expandTree (itemInfo, callback) {
            // console.log(itemInfo);
            // 把当前展开的节点名称存入客源地数组
            // this.nativeList.push(itemInfo.title);
                if (itemInfo.hasnext === 'true') {
                    const nextRegionRes = await this.$api.get(this.baseUrl + '/sys/sourceRegion/v1/getLowerRegion', {
                        iregionalid: itemInfo.treeId
                    });
                    const nextTreeData = nextRegionRes.data.map(item => {
                        if (item.hasnext === 'false') {
                            return {
                                title: item.szregionalname,
                                treeId: item.szregionalid
                            };
                        } else {
                            return {
                                title: item.szregionalname,
                                loading: false,
                                children: [],
                                treeId: item.szregionalid,
                                hasnext: item.hasnext
                            };
                        }
                    });
                    callback(nextTreeData);
                } else {

                }
            },
            // 显示树节点菜单
            async showTreeModal () {
                this.isShowLoading = true;
                const sourceRegionRes = await this.$api.get(this.baseUrl + '/sys/sourceRegion/v1/getLowerRegion', {
                    iregionalid: 0
                });
                this.add_fieldsetList6[1].config[6].treeData = sourceRegionRes.data.map(item => {
                    return {
                        title: item.szregionalname,
                        loading: false,
                        children: [],
                        treeId: item.szregionalid,
                        hasnext: item.hasnext
                    };
                });
                this.isShowLoading = false;
                this.isShowTree = true;
            },
            // 移除当前上传图片并重新选择上传
            removeImage6 () {
                this.addFormDatas6.imgUrl = '';
                this.photoupid = '';
            },
            // 提交员工信息新增/修改
            async submitForm6 (name) {
                let regPhone = /^(13[0-9]|14[5-9]|15[0-9]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
                if (this.addFormDatas6.szcellphone && !regPhone.test(this.addFormDatas6.szcellphone)) {
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '手机号码验证失败，请输入正确的11位手机号码'
                    });
                    this.addFormDatas6.szcellphone = '';
                    return;
                }
                if (this.addFormDatas6.szemail) {
                    let regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                        email = this.addFormDatas6.szemail;
                    if (!regEmail.test(email)) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '邮箱格式不正确，邮箱的基本格式为“名称@域名”，建议使用英文字母、数字、下划线！'
                        });
                        this.addFormDatas6.szemail = '';
                        return;
                    }
                }
                if (!this.photoupid) {
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '请上传合适大小的员工相片'
                    });
                    return;
                }
                if (!this.iborthaddress) {
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '请选择籍贯地'
                    });
                    return;
                }

                let isSuccess = true;
                this.$refs[name].validate(valid => {
                    if (!valid) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '验证失败！请根据提示完善输入信息后重试'
                        });
                        isSuccess = false;
                    }
                });
                if (isSuccess) {
                    this.isShowLoading = true;
                    // console.log(this.addFormDatas6);

                    let bodyParams = null;
                    for (let attr in this.addFormDatas6) {
                    // console.log(attr)
                        if (attr === 'dtbirthdate' || attr === 'dtgraduatedate' || attr === 'dtentrydate') {
                            this.addFormDatas6[attr] = this.$handle.formatDate(this.addFormDatas6[attr]);
                        }

                        // 员工岗位多选不作为请求体内参数
                        // 先去掉密码字段，新增时单独加上
                        if (attr !== 'ipostsids' && attr !== 'szpassword') {
                        // console.log(1)
                        // console.log(attr)
                            bodyParams = Object.assign({}, bodyParams, {
                                [attr]: this.addFormDatas6[attr]
                            });
                        // console.log(bodyParams)
                        }
                    }

                    // 通用的请求体内的参数
                    bodyParams = {
                        ...bodyParams,
                        iborthaddress: this.iborthaddress,
                        photoupid: this.photoupid,
                        icompanyinfoid: this.companyId,
                        ideptid: this.departmentId
                    };

                    // 新增
                    if (this.currentIndex === 6.1) {
                        bodyParams = {
                            ...bodyParams,
                            szpassword: this.addFormDatas6.szpassword
                        };
                        const add6Res = await this.$api.post(this.baseUrl + '/sys/employee/v1/addEmployee', {
                            ipostsids: this.addFormDatas6.ipostsids.join(',')
                        }, bodyParams);
                        // console.log(add6Res);
                        if (!add6Res) {
                            this.isShowLoading = false;
                            return;
                        }
                    }

                    // 修改
                    // 待修改bug -- 修改员工信息时是否需要传入密码，密码目前加过密，所以和新增时的不同 --已修改为不需要
                    if (this.currentIndex === 6.2) {
                        bodyParams = {
                            ...bodyParams,
                            iemployeeid: this.rowData6.iemployeeid
                        };
                        const edit6Res = await this.$api.put(this.baseUrl + '/sys/employee/v1/updateEmployee', {
                            ipostsids: this.addFormDatas6.ipostsids.join(',')
                        }, bodyParams);
                        // console.log(edit6Res);
                        if (!edit6Res) {
                            this.isShowLoading = false;
                            return;
                        }
                    }

                    // 重新查询
                    const requeryUpdateRes = await this.$api.get(this.baseUrl + '/sys/employee/v1/employeeSearch', {
                        ideptid: this.departmentId,
                        page: 1,
                        pageSize: this.size6
                    });
                    // console.log(requeryUpdateRes);
                    if (!requeryUpdateRes) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: `${this.currentIndex === 2 ? '新增' : '修改'}员工信息已经成功，但重新查询时遇到异常，请手动刷新后查看`
                        });
                        return;
                    }

                    this.tableData6 = requeryUpdateRes.data.items;
                    this.total6 = requeryUpdateRes.data.totalCount;
                    // this.watchTotal6 = requeryUpdateRes.data.totalCount;
                    // this.isQuery6 = false;
                    this.QueryBuild6 = {
                        ideptid: this.departmentId,
                        page: 1,
                        pageSize: this.size6
                    };
                    this.currentPage6 = 1;
                    this.formDatas6.szemployeename = '';

                    this.rowData6 = null;
                    this.$Modal.success({
                        title: '操作成功',
                        content: `${this.currentIndex === 6.1 ? '新增' : '修改'}员工信息成功，欢迎使用易旅通智慧景区系统`
                    });
                    this.currentIndex = 6;
                    this.isShowLoading = false;
                } else {

                }
            },
            // 关闭员工新增/修改/查看页
            handleClose6 () {
                this.currentIndex = 6;
            },
            // 员工管理-改变最大显示数
            async changeSize6 (size) {
                this.size6 = size;
                this.handleChangePage6(1);
            },
            // 初始化登录密码
            async initPwd () {
                if (this.newPwd === '') {
                    this.isValidate1 = true;
                    return;
                } else {
                    this.isValidate1 = false;
                }
                this.isShowLoading = true;
                const pwdRes = await this.$api.put(this.baseUrl + '/sys/employee/v1/initWordParams', {
                    flag: 2,
                    iemployeeid: this.rowData6.iemployeeid,
                    password: this.newPwd
                });
                // console.log(pwdRes);
                if (!pwdRes) {
                    this.isLoginPwd = false;
                    this.isShowLoading = false;
                    return;
                }

                this.isLoginPwd = false;
                this.isShowLoading = false;
                this.$Modal.success({
                    title: '温馨提示',
                    content: '初始化登录密码成功，你的新密码是：' + this.newPwd
                });
            },
            // 初始化认证码
            async initCode () {
                if (this.newCode === '') {
                    this.isValidate2 = true;
                    return;
                } else {
                    this.isValidate2 = false;
                }

                this.isShowLoading = true;
                const codeRes = await this.$api.put(this.baseUrl + '/sys/employee/v1/initWordParams', {
                    flag: 3,
                    iemployeeid: this.rowData6.iemployeeid,
                    password: this.newCode
                });
                // console.log(codeRes);
                if (!codeRes) {
                    this.isCode = false;
                    this.isShowLoading = false;
                    return;
                }

                this.isCode = false;
                this.isShowLoading = false;
                this.$Modal.success({
                    title: '温馨提示',
                    content: '初始化认证码成功，你的新认证码是：' + this.newCode
                });
            },
            // 初始化登陆次数
            async initTimes () {
                this.isShowLoading = true;
                const timesRes = await this.$api.put(this.baseUrl + '/sys/employee/v1/initWordParams', {
                    flag: 1,
                    iemployeeid: this.rowData6.iemployeeid
                });
                // console.log(timesRes);
                if (!timesRes) {
                    this.isTimes = false;
                    this.isShowLoading = false;
                    return;
                }

                this.isTimes = false;
                this.isShowLoading = false;
                this.$Modal.success({
                    title: '温馨提示',
                    content: '初始化登陆次数成功'
                });
            }
        }
    };
</script>

<style scoped lang="less">
    .defaultClass {
        width: 50%;
        margin-right: 0;
    }
    .hide {
        display: none;
    }
    .uploadDefaultStyle {
        width: 200px;
        height: 200px;
        background-color: #f5f5f5;
        border: 1px solid #ccc;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 10px;
    }
    .uploadStyle {
        line-height: 200px;
        position: relative;
        text-align: center;
        width: 200px;
        border: 1px solid #ccc;
        border-radius: 4px;
        overflow: hidden;
        padding: 2px;
        background-color: #f5f5f5;
        margin-bottom: 10px;
        .single-img-cover{
            width: 100%;
            display: none;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0,0,0,.6);
        }
        &:hover .single-img-cover{
            display: block;
            i{
                color: #fff;
                font-size: 30px;
                cursor: pointer;
                margin: 0 10px;
            }
        }
    }
    .wrapper {
        border: 1px solid #5db2ff;
        position: relative;
        margin-bottom: 30px;
        .blueTitle {
            position: absolute;
            left: 100px;
            top: -14px;
            background-color: #fff;
            padding: 0 10px;
            font-size: 15px;
            font-weight: bold;
            color: #5db2ff;
            line-height: 28px;
        }
        .mainPart {
            overflow: hidden;
            padding: 30px 0 10px 0;
            .mainPart_row {
                float: left;
                width: 50%;
                margin-bottom: 20px !important;
                line-height: 32px;
                overflow: hidden;
                .mainPart_row_key {
                    width: 200px;
                    text-align: right;
                    padding-right: 12px;
                    float: left;
                }
                .mainPart_row_value {
                    float: left;
                }
            }
        }
    }
    .initPassword tr {
        height: 35px;
        td:nth-child(odd) {
            text-align: right;
            padding-right: 15px;
        }
    }
    .logoStyle img {
        width: 100px;
    }
</style>
