<template>
    <div>
        <Row>
            <Card>
                <p slot="title" class="slot_title_height">
                    <span class="title_span">开户信息管理</span>
                </p>
                <detail-form-area
                        :form-datas="formData"
                        :form-item-list="formItemList"
                        :label-width="labelWidth"
                        :rule-datas="ruleDatas"
                        :is-list-page="false"
                        :is-mixed="false"
                        :is-close="isClose"
                        :title-list="titleList"
                        :btn-loading="btnLoading"
                        @getFormData="getFormData"
                ></detail-form-area>
            </Card>
        </Row>
        <loading v-if="spinShow"></loading>
    </div>
</template>
<script>
export default {
    data () {
        const settlementDays = (rule, value, callback) => {
            if (!this.formData.contractStartTime && !this.formData.contractEndTime) {
                callback(new Error('合约起止时间不能为空'))
            } else if (!this.formData.contractStartTime && this.formData.contractEndTime) {
                callback(new Error('合约起始时间不能为空'))
            } else if (this.formData.contractStartTime && !this.formData.contractEndTime) {
                callback(new Error('合约截止时间不能为空'))
            } else if (Date.parse(this.formData.contractStartTime) > Date.parse(this.formData.contractEndTime)) {
                callback(new Error('合约起始时间不能大于结束时间'))
            } else {
                callback();
            }
        };
        return {
            isClose : true,
            btnLoading: false,
            tipName:'开户信息保存',
            labelWidth : 200,
            titleList : [
                {
                    titleName : '企业信息'
                },{
                    titleName : '联系信息'
                },{
                    titleName : '结算信息'
                }
            ],
            formData : {
                settlementDays : 1
            },
            formItemList : [
                {
                    label : 'id',
                    keyName : "iscenicid",
                    type : 9,
                    noShow : true,
                    divIndex : 0
                },
                {
                    label : '结算系统商户账号',
                    keyName : 'applicationName',
                    type : 1,
                    divIndex : 0
                },{
                    label : '企业名称',
                    keyName : 'companyName',
                    type : 1,
                    divIndex : 0
                },{
                    label : '企业网站',
                    keyName : 'website',
                    type : 1,
                    divIndex : 0
                },{
                    label : '企业地址',
                    keyName : 'address',
                    type : 1,
                    divIndex : 0
                },{
                    label : '工商注册号',
                    keyName : 'registrationNumber',
                    type : 1,
                    divIndex : 0
                },{
                    label : '组织结构代码',
                    keyName : 'organizationCode',
                    type : 1,
                    divIndex : 0
                },{
                    label : '法人',
                    keyName : 'corporate',
                    type : 1,
                    divIndex : 0
                },{
                    label : '法人身份证',
                    keyName : 'corporateIdentity',
                    type : 1,
                    divIndex : 0
                },{
                    label : '行业类别',
                    keyName : 'providerType',
                    type : 4,
                    optionList : [],
                    divIndex : 0
                },{
                    label : '业务联系人',
                    keyName : 'businessContact',
                    type : 1,
                    divIndex : 1
                },{
                    label : '客服联系人',
                    keyName : 'customerContact',
                    type : 1,
                    divIndex : 1
                },{
                    label : '业务联系手机',
                    keyName : 'businessTel',
                    type : 1,
                    divIndex : 1
                },{
                    label : '客服联系手机',
                    keyName : 'customerTel',
                    type : 1,
                    divIndex : 1
                },{
                    label : '业务联系邮箱',
                    keyName : 'businessContactEmail',
                    type : 1,
                    divIndex : 1
                },{
                    label : '客服联系邮箱',
                    keyName : 'customerContactEmail',
                    type : 1,
                    divIndex : 1
                },{
                    label : '合约时间',
                    keyName : 'contractStartTime',
                    keyName1 : 'contractEndTime',
                    type : 11,
                    double : true,
                    divIndex : 2
                },{
                    label : '结算银行',
                    keyName : 'bankId',
                    type : 4,
                    optionList : [],
                    divIndex : 2
                },{
                    label : '开户城市',
                    keyName : 'city',
                    type : 1,
                    divIndex : 2
                },{
                    label : '开户支行',
                    keyName : 'subbranch',
                    type : 1,
                    divIndex : 2
                },{
                    label : '银行开户名',
                    keyName : 'settleBankAccountName',
                    type : 1,
                    divIndex : 2
                },{
                    label : '银行账号',
                    keyName : 'settleBankAccount',
                    type : 1,
                    divIndex : 2
                },{
                    label : '结算周期',
                    keyName : 'settlementDays',
                    type : 16,
                    textConBefore : 'T+ ',
                    textConAfter : ' 天',
                    divIndex : 2
                },{
                    label : '结算费率2',
                    keyName : 'settlementRate',
                    type : 4,
                    optionList : [],
                    divIndex : 2
                }
                
            ],
            ruleDatas : {
                applicationName: [
                    { required: true, validator: this.$reg.applicationName, trigger: 'blur' }
                ],
                companyName: [
                    { required: true, message: '企业名称不能为空', trigger: 'blur' }
                ],
                website: [
                    { validator: this.$reg.website, trigger: 'blur' }
                ],
                registrationNumber: [
                    { required: true, message: '工商注册号不能为空', trigger: 'blur' }
                ],
                organizationCode: [
                    { required: true, message: '组织结构代码不能为空', trigger: 'blur' }
                ],
                corporate: [
                    { required: true, message: '法人信息不能为空', trigger: 'blur' }
                ],
                corporateIdentity: [
                    { required: true, validator: this.$reg.IDcard, trigger: 'blur' }
                ],
                businessContact: [
                    { required: true, message: '业务联系人不能为空', trigger: 'blur' }
                ],
                businessTel: [
                    { required: true, validator: this.$reg.mobile, trigger: 'blur' }
                ],
                businessContactEmail: [
                    { required: true, validator: this.$reg.email, trigger: 'blur' }
                ],
                contractStartTime: [
                    { required: true, validator: settlementDays, trigger: 'change' }
                ],
                
                // bankId: [
                //     { required: true, message: '结算银行不能为空', trigger: 'change' }
                // ],
                city: [
                    { required: true, message: '开户城市不能为空', trigger: 'blur' }
                ],
                subbranch: [
                    { required: true, message: '开户支行不能为空', trigger: 'blur' }
                ],
                settleBankAccountName: [
                    { required: true, message: '银行开户名不能为空', trigger: 'blur' }
                ],
                settleBankAccount: [
                    { required: true, message: '银行账号不能为空', trigger: 'blur' }
                ],
                settlementDays: [
                    { required: true, validator: this.$reg.settlementDays, trigger: 'blur' }
                ],
                // settlementRate: [
                //     { required: true, message: '结算费率2不能为空', trigger: 'change' }
                // ]
            },
            formName : '',
            spinShow : true
        }
    },
    methods : {
        getFormData(obj){    //提交表单
            this.btnLoading = true;
            obj.contractStartTime = this.$common.getCurrentDate(obj.contractStartTime);
            obj.contractEndTime = this.$common.getCurrentDate(obj.contractEndTime);
            this.$set(obj, 'type', '02');
            this.$common.editData('/ticket/provider/v1/saveAccount', this, obj,'post',false)
        },
        //获取银行列表 结算费率列表
        getSelectData() {
            return new Promise((resolve,reject) => {
                this.$http.get(this.baseUrl+'/ticket/provider/v1/queryProviderCompanySelectDataInit?access_token='+this.Cookies.get('token'))
                .then(res => {
                    if(res.data.code === 200){
                        let options1= [], options2 = [], options3 = [];
                        if (res.data.data.banks) {
                            res.data.data.banks.forEach(element => {
                                let oneOption = {};
                                oneOption["value"] = element.id;
                                oneOption["label"] = element.name;
                                options1.push(oneOption);
                            });
                        }
                        if (res.data.data.rates) {
                            res.data.data.rates.forEach(element => {
                                let oneOption = {};
                                oneOption["value"] = element.id;
                                oneOption["label"] = element.memo;
                                options2.push(oneOption);
                            });
                        }
                        if (res.data.data.parameters) {
                            res.data.data.parameters.forEach(element => {
                                let oneOption = {};
                                oneOption["value"] = element.id;
                                oneOption["label"] = element.name;
                                options3.push(oneOption);
                            });
                        };
                        this.formItemList[9].optionList = options3;
                        this.formItemList[17].optionList = options1;
                        this.formItemList[23].optionList = options2;
                        resolve()
                    }else{
                        reject();
                    }
                })
            })
        },
    },
    async created () {
        await this.getSelectData();
        this.$http.get(this.baseUrl+'/ticket/provider/v1/queryCreateAccount', {
            params: {
                access_token: this.Cookies.get('token'),
                scenicidOrUsid: this.$route.params.id,
                type: '02',
            }
        }).then(res => {
            if(res.data.code === 200){
                let data = res.data.data;
                this.formData = data;
                this.formData.bankId = data.bankId || this.formItemList[17].optionList[0].value;
                this.formData.settlementRate = data.settlementRate || this.formItemList[23].optionList[0].value;
                this.formData.providerType = data.providerType || this.formItemList[9].optionList[0].value;
            } else {
                this.$common.showMessageModal(this, res, 1)
            }
            this.spinShow = false;
        })
    }
}
</script>
