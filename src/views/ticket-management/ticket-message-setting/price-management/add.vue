<template>
    <div>
        <Row>
            <Card>
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">{{pageName}}价格</span>
                </p>
                <detail-form1
                        :isListPage = "false"
                        :isMixed = "false"
                        :labelWidth = "220"
                        :formDatas = "formDatas"
                        :ruleDatas = "ruleDatas"
                        :formItemList = "formItemList"
                        :disabledStartDate = "disabledStartDate"
                        :disabledEndDate = "disabledEndDate"
                        @getFormData = "getFormData"
                ></detail-form1>
            </Card>
        </Row>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
    export default {
        data () {
            const validateListingprice = (rule, value, callback) => {
                const reg = /^\d+(?:\.\d{1,2})?$/;
                if (value === '') {
                    callback(new Error('挂牌价必须大于0，可保留两位小数'));
                } else if (!reg.test(value)) {
                    callback(new Error('挂牌价必须大于0，可保留两位小数'));
                } else {
                    callback();
                }
            };
            return {
                spinShow: true,
                pageName: '',
                pageName1: '',
                formDatas: {},
                ruleDatas: {
                    listingprice: [
                        { validator: validateListingprice, trigger: 'blur' }
                    ],
                },
                formItemList: [
                    {
                        type: 9,
                        label: '价格编号',
                        keyName:'icrowdkindpriceid',
                        noShow: true
                    },
                    {
                        type: 9,
                        label: '所属产品',
                        keyName:'strtickettype',
                    },
                    {
                        type: 1,
                        label: '价格代码',
                        keyName:'icrowdkindpricecode',
                        isRequired: true,
                        hasDec: '(注：建议输入1至10位由数字或者小大写英文字母组成的值)[此作为前台售票软件的快捷代码]',
                        isRedDec: true
                    },
                    {
                        type: 4,
                        label: '人群种类',
                        keyName:'icrowdkindid',
                        isRequired: true,
                        optionList: []
                    },
                    {
                        type: 4,
                        label: '业务类型',
                        keyName:'ibusinessid',
                        isRequired: true,
                        optionList: []
                    },
                    {
                        type: 11,
                        label: '价格开始至结束日期',
                        double: true,
                        keyName:'startdata',
                        keyName1:'enddata',
                        isRequired: true,
                        hasDec: '(日期格式：yyyy-mm-dd,如：2011-10-01)',
                        isRedDec: true,
                        errMsg: ''
                    },
                    {
                        type: 2,
                        label: '是否实名制',
                        keyName:'ipeoplenumrange',
                        isRequired: true,
                        optionList: [
                            {
                                value: 1,
                                labelName: '是'
                            },
                            {
                                value: 0,
                                labelName: '否'
                            },
                        ]
                    },
                    {
                        type: 2,
                        label: '是否售票登记指纹',
                        keyName:'inote1',
                        isRequired: true,
                        optionList: [
                            {
                                value: 1,
                                labelName: '是'
                            },
                            {
                                value: 0,
                                labelName: '否'
                            },
                            {
                                value: 2,
                                labelName: '登记在卡内'
                            },
                        ]
                    },
                    {
                        type: 1,
                        label: '周末挂牌价',
                        keyName:'note4',
                        isRequired: true,
                    },
                    {
                        type: 1,
                        label: '挂牌价',
                        keyName:'listingprice',
                        isRequired: true,
                    },
                    {
                        type: 1,
                        label: '实际售价',
                        keyName:'mactualsaleprice',
                        isRequired: true,
                    },
                    {
                        type: 1,
                        label: '结算价',
                        keyName:'jsprice',
                        isRequired: true,
                        hasDec: '(注：如果不输入，则与实际售价相同)',
                        isRedDec: true
                    },
                    {
                        type: 1,
                        label: '周末价',
                        keyName:'weekendprice',
                        isRequired: true,
                    },
                    {
                        type: 1,
                        label: '排序',
                        keyName:'isequence',
                    },
                    {
                        type: 2,
                        label: '是否网上销售',
                        keyName:'isnet',
                        isRequired: true,
                        optionList: [
                            {
                                value: 1,
                                labelName: '是'
                            },
                            {
                                value: 0,
                                labelName: '否'
                            },
                        ]
                    },
                    {
                        type: 2,
                        label: '是否现场销售',
                        keyName:'isscene',
                        isRequired: true,
                        optionList: [
                            {
                                value: 1,
                                labelName: '是'
                            },
                            {
                                value: 0,
                                labelName: '否'
                            },
                        ]
                    },
                    {
                        type: 2,
                        label: '是否扫码购票',
                        keyName:'isscancode',
                        isRequired: true,
                        optionList: [
                            {
                                value: 1,
                                labelName: '是'
                            },
                            {
                                value: 0,
                                labelName: '否'
                            },
                        ]
                    },
                    {
                        type: 2,
                        label: '是否旅游卡购票',
                        keyName:'note3',
                        isRequired: true,
                        optionList: [
                            {
                                value: '1',
                                labelName: '是'
                            },
                            {
                                value: '0',
                                labelName: '否'
                            },
                        ]
                    },
                    {
                        type: 2,
                        label: '最大有效期是否以价格有效期为准',
                        keyName:'inote2',
                        isRequired: true,
                        hasDec: '(使用于年卡,其它产品慎用)',
                        isRedDec: true,
                        optionList: [
                            {
                                value: 1,
                                labelName: '是'
                            },
                            {
                                value: 0,
                                labelName: '否'
                            },
                        ]
                    },
                    {
                        type: 2,
                        label: '是否允许成团人数控制',
                        keyName:'inote3',
                        isRequired: true,
                        optionList: [
                            {
                                value: 1,
                                labelName: '是'
                            },
                            {
                                value: 0,
                                labelName: '否'
                            },
                        ]
                    },
                    {
                        type: 4,
                        label: '用户级别',
                        keyName:'note1',
                        isRequired: true,
                        optionList: []
                    },
                    {
                        type: 2,
                        label: '是否启用',
                        keyName:'byisuse',
                        isRequired: true,
                        optionList: [
                            {
                                value: 1,
                                labelName: '启用'
                            },
                            {
                                value: 0,
                                labelName: '禁用'
                            },
                        ]
                    },
                    {
                        type: 1,
                        label: '语音提示',
                        keyName:'note2',
                    },
                    {
                        type: 7,
                        label: '备注',
                        keyName:'szmemo',
                    }
                ],
                disabledStartDate: [0,9999],
                disabledEndDate: [0,9999],
                status: 0
            }
        },
        methods: {
            formValidation (obj) {   //表单中自定义组件的验证
                if (new Date(obj.startdata).getTime() > new Date(obj.enddata).getTime()) {
                    this.formItemList[5].errMsg = '开始日期不能大于结束日期';
                    return
                } else {
                    this.formItemList[5].errMsg = ''
                }
                this.status = 1
            },
            getFormData (obj) {
                this.formValidation(obj);
                obj.startdata = this.$common.getCurrentDate(obj.startdata);
                obj.enddata = this.$common.getCurrentDate(obj.enddata);
                if (this.status) {
                    if(this.pageName == '新增'){
                        this.$common.addNewData('/ticket/crowdKindPrice/v1/crowdKindPriceSave?act=1', this, obj, 'post', true)
                    } else {
                        this.$common.editData('/ticket/crowdKindPrice/v1/crowdKindPriceSave?act=2', this, obj, 'post', true)
                    }
                }

            },
            setPageName () {   //新增修改页面状态初始化
                if (this.$route.name.indexOf('new') != -1) {
                    this.pageName = '新增';
                    this.pageName1 = '价格新增';
                    this.tabShowOrHide(0, true);
                    this.setAddInitData()
                } else {
                    this.pageName = '修改';
                    this.pageName1 = '价格修改';
                    this.tabShowOrHide(0, false);
                    this.setEditInitData()
                }
            },
            setAddInitData () {   //新增初始化
                this.formDatas = {
                    // itickettypeid: parseInt(this.$route.params.parentId.split('-')[0]),
                    // strtickettype: this.$route.params.parentId.split('-')[1],
                    icrowdkindpricecode: 'T03',
                    icrowdkindid: this.formItemList[3].optionList[0].value,
                    ibusinessid: this.formItemList[4].optionList[0].value,
                    note1: this.formItemList[20].optionList[0].value,
                    startdata: this.$common.getCurrentDate(),
                    enddata: this.$common.getCurrentDate('', 1),
                    ipeoplenumrange: 0,
                    inote1: 0,
                    listingprice: '',
                    mactualsaleprice: '0.0',
                    jsprice: '0.0',
                    weekendprice: '0.0',
                    isequence: 0,
                    isnet: 1,
                    isscene: 1,
                    isscancode: 0,
                    note3: '0',
                    inote3: 0,
                    byisuse: 1
                };
                this.spinShow = false
            },
            setEditInitData () {   //修改初始化
                this.$http.get(this.baseUrl+'/ticket/crowdKindPrice/v1/crowdKindPriceEditInitData',{
                    params: {
                        access_token: this.Cookies.get('token'),
                        iCrowdKindPriceid: this.$route.params.id
                    }
                }).then(res => {
                    if (res.data.code == 200) {
                        this.formDatas = res.data.data;
                        this.spinShow = false
                    } else {
                        this.$common.showMessageModal(this, res, 1);
                        this.spinShow = false
                    }
                })
            },
            tabShowOrHide (index, noShow) {    //组件显示与否
                this.formItemList[index].noShow = noShow
            },
            getInitSelect () {  //初始化下拉列表
                return new Promise((resolve,reject) => {
                    this.$http.get(this.baseUrl+'/ticket/crowdKindPrice/v1/getCrowdKindPriceSelectData', {
                        params: {
                            access_token: this.Cookies.get('token')
                        }
                    }).then(res => {
                        if (res.data.code == 200) {
                            let data = res.data.data;
                            let [a, b, c] = ['', '', ''];
                            for (let i = 0; i < this.formItemList.length; i++) {
                                switch (this.formItemList[i].keyName) {
                                    case 'icrowdkindid':
                                        a = i; break;
                                    case 'ibusinessid':
                                        b = i; break;
                                    case 'note1':
                                        c = i; break;
                                    default: break
                                }
                            }
                            data['crowdkindList'].forEach(item => {
                                this.formItemList[a].optionList.push({
                                    value: item.icrowdkindid,
                                    label: item.szcrowdkindname,
                                })
                            });
                            data['businessList'].forEach(item => {
                                this.formItemList[b].optionList.push({
                                    value: item.ibusinessid,
                                    label: item.szbusinessname,
                                })
                            });
                            data['retrieve'].forEach(item => {
                                this.formItemList[c].optionList.push({
                                    value: item.pmcd,
                                    label: item.pmva,
                                })
                            });
                            resolve()
                        } else {
                            this.$common.showMessageModal(this, res, 1);
                            this.spinShow = false;
                            reject()
                        }
                    })
                });
            }
        },
        watch: {
            '$route' () {
                this.status = 0;
                this.setPageName()
            },
            'formDatas.startdata' (val) {    //禁用日期
                let [seconds,days] = [0,0];
                seconds = Date.now() - new Date(val).getTime();
                days = Math.floor(seconds/(24*60*60*1000));
                this.disabledEndDate = [days,9999]
            }
        },
        created () {
            this.getInitSelect().then(() => {
                this.setPageName()
            })
        }
    }
</script>

<style scoped>

</style>
