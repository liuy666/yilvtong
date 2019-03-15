
<template>
<div >
   <Row>
      <Card>
        <p slot="title" class="slot_title_height">
            <span class="title_span">支付渠道配置新增 </span>
            <top-title-opbtn :btnList="btnList"></top-title-opbtn>
        </p>
        <div class="detailBody">
            <div class="detailTit"></div>
            <div class="body">
              <Row :style="{borderBottom:'1px solid  #dcdee2'}">
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span :style="{paddingLeft:'100px'}">支付渠道：</span>
                     <Select v-model="select.channelCode" style="width:150px">
                        <Option v-for="item in channelPay" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span>应用场景：</span>
                    <Select v-model="select.application" style="width:150px">
                        <Option v-for="item in AppScene" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <!-- <span >{{saleInfo.tradTime}}</span> -->
                </Col>
                <!--<Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">-->
                    <!--<span>状态：</span>-->
                    <!--<Select v-model="select.state" style="width:150px">-->
                        <!--<Option v-for="item in state" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
                    <!--</Select>-->
                    <!--&lt;!&ndash; <span >{{saleInfo.buildTime}}</span> &ndash;&gt;-->
                <!--</Col>-->
            </Row>
            <Row :style="{borderBottom:'1px solid #dcdee2'}">
                   <Col span="24" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'40px'}">
                      <span :style="{fontSize:'18px',fontWeight:'600'}">机构配置信息：</span>
                  </Col>

                <detail-form1
                        ref="firstForm"
                        :formName="formName1"
                        :isListPage="true"
                        :isMixed="false"
                        :labelWidth = "20"
                        :needListReset="false"
                        :needListOK="false"
                        :formItemList="formItemList"
                        :formDatas="pars.formDatas"
                        :ruleDatas="ruleDatas1"
                        :isChoosedFiles="isChoosedFiles"
                        iStyle="width:150px"
                        @getBase64="getBase64"
                        @getFileName="getFileName"
                ></detail-form1>


              </Row>
              <Row :style="{borderBottom:'1px solid #dcdee2'}">
                  <Col span="24" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'40px'}">
                      <span :style="{fontSize:'18px',fontWeight:'600'}">对应结算账号：</span>
                  </Col>
                  <detail-form1
                          ref="secondForm"
                          :formName="formName2"
                          :isListPage="true"
                          :isMixed="false"
                          :labelWidth = "20"
                          :needListReset="false"
                          :needListOK="false"
                          :formItemList="formItemList1"
                          :formDatas="detailInfo"
                          :ruleDatas="ruleDatas2"
                          iStyle="width:150px"
                  ></detail-form1>
              </Row>
            </div>
        </div>
        <Row :style="{textAlign:'center',marginTop:'20px'}">
          <Col span="24">
            <Button type="primary" shape="circle" style="margin-right:10px;width:80px" @click="$router.back(-1)">返回</Button>
            <Button type="primary" shape="circle" style="margin-right:10px;width:80px" @click="save()">保存</Button>
          </Col>
        </Row>
      </Card>
   </Row>
</div>
</template>

<script>
import publicMethod from '@/libs/publicMethod.js';
import tradState from '@/libs/tradState.js';
export default {
    data () {
        return {
            isChoosedFiles: '未选择',
            formName1: 'myFormName',
            formName2: 'myFormName',
            token: this.Cookies.get('token'),
            btnList: [
                {
                    type: 1,
                    btnlabel: '刷新'
                }
            ],
            select: {
                channelCode: 'ALIPAY',
                application: 'ALL'
                // state: ''
            },
            channelPay: [
                // {
                //     value: '',
                //     label: ' 全部'
                // },
                {
                    value: 'ALIPAY',
                    label: ' 支付宝'
                },
                {
                    value: 'WXPAY',
                    label: ' 微信支付 '
                },
                {
                    value: 'WXMPPAY',
                    label: ' 微信公众号支付'
                },
                {
                    value: 'CPCN',
                    label: ' 中金支付'
                },
                {
                    value: 'UNIONPAY',
                    label: '银联'
                }
            ],
            AppScene: [
                {
                    value: 'ALL',
                    label: '不限'
                },
                {
                    value: 'B2B',
                    label: '企业网银'
                },
                {
                    value: 'B2C',
                    label: '个人网银'
                },
                {
                    value: 'QPAY',
                    label: '快捷支付'
                }
            ],
            state: [
                {
                    value: '',
                    label: ' 全部'
                },
                {
                    value: 'OPENED',
                    label: ' 已开通'
                },
                {
                    value: 'NONACTIVEED',
                    label: ' 未开通 '
                }
            ],
            // 详情信息
            detailInfo: {
                // payChannel: '',
                // appScene: '',
                // state: '',
                // zhifubao: {},
                // weixin: {
                //     merchant_id: '',
                //     app_id: '',
                //     key: '',
                //     pwd: '',
                //     privatep12_path: ''
                // },
                // weixinhao: {},
                // yinlian: {},
                // zhongjin: {},
                // gonghang: {},
                bankName: '',
                ctiy: '',
                branch: '',
                accountName: '',
                accountNo: ''
                // application: ''
            },
            pars: {
                formDatas: {
                }
            },
            formItemList: [
                {
                    type: 1,
                    keyName: 'partner',
                    label: 'partner',
                    labelWidth: 170,
                    class: 'width-1-3',
                    key: 1
                },
                {
                    type: 1,
                    keyName: 'app_id',
                    label: '应用id',
                    labelWidth: 170,
                    class: 'width-1-3',
                    key: 2
                },
                {
                    type: 1,
                    keyName: 'privatekey',
                    label: '私钥',
                    labelWidth: 170,
                    class: 'width-1-3',
                    key: 3
                },
                {
                    type: 1,
                    keyName: 'openrsa2Privatekey',
                    label: 'rsa2签名私钥',
                    labelWidth: 170,
                    class: 'width-1-3',
                    key: 4
                },
                // {
                //     type: 15,
                //     keyName: 'organizationFloder',
                //     label: '商户私钥证书',
                //     btnLabel: '上传',
                //     labelWidth: 170,
                //     class: 'width-1-3',
                //     key: 5
                // }

            ],
            formItemList1: [
                {
                    type: 1,
                    keyName: 'bankName',
                    label: '开户银行',
                    labelWidth: 170,
                    class: 'width-1-3'
                },
                {
                    type: 1,
                    keyName: 'ctiy',
                    label: '开户城市',
                    labelWidth: 170,
                    class: 'width-1-3'
                },
                {
                    type: 1,
                    keyName: 'branch',
                    label: '开户支行',
                    labelWidth: 170,
                    class: 'width-1-3'
                },
                {
                    type: 1,
                    keyName: 'accountName',
                    label: '开户名称',
                    labelWidth: 170,
                    class: 'width-1-3'
                },
                {
                    type: 1,
                    keyName: 'accountNo',
                    label: '开户账号',
                    labelWidth: 170,
                    class: 'width-1-3'
                }
            ],
            ruleDatas1: {
                partner: [
                    { required: true, message: 'partner不能为空', trigger: 'blur' }
                ],
                app_id: [
                    { required: true, message: '应用id不能为空', trigger: 'blur' }
                ],
                privatekey: [
                    { required: true, message: '私钥不能为空', trigger: 'blur' }
                ],
                openrsa2Privatekey: [
                    { required: true, message: 'rsa2签名私钥不能为空', trigger: 'blur' }
                ],
                // organizationFloder: [
                //     { required: true, message: '请选择商户私钥证书', trigger: 'blur' }
                // ]
            },
            ruleDatas2: {
                bankName: [
                    { required: true, message: '开户银行不能为空', trigger: 'blur' }
                ],
                ctiy: [
                    { required: true, message: '开户城市不能为空', trigger: 'blur' }
                ],
                branch: [
                    { required: true, message: '开户支行不能为空', trigger: 'blur' }
                ],
                accountName: [
                    { required: true, message: '开户名称不能为空', trigger: 'blur' }
                ],
                accountNo: [
                    { required: true, message: '开户账号不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    mounted () {
    // this.getInfo();
    },
    methods: {
        save () {
            let returnA = this.$refs.firstForm.$children[0].$parent.handleSubmit(this.formName1),
                returnB = this.$refs.secondForm.$children[0].$parent.handleSubmit(this.formName2);

            Promise.all([returnA, returnB])
                .then((res) => {
                    if (res[0] && res[1]) {
                        let { marketplaceId, merchantId } = this.$route.query,
                            //     let {marketplaceId, merchantId} = {marketplaceId:1, merchantId:16},
                            urlParams = { marketplaceId: marketplaceId, merchantId: merchantId },
                            channelMsg = { ...this.pars.formDatas },
                            bodyParams = { ...this.select, ...this.detailInfo, channelMsg: JSON.stringify(channelMsg) };
                        this.$bApi.MerchantConfig(urlParams, bodyParams)
                            .then((res) => {
                                if (res && res.return_code === 'SUCCESS') {
                                    this.$router.back(-1);
                                }
                            });
                    }
                });
        },
        getBase64 (file) {
            if (file) {
                this.isChoosedFiles = '已选择';
                this.pars.formDatas.organizationFloder = file;
            }
        },
        getFileName (name) {
            if (name) {
                this.pars.formDatas.organizationFileName = name;
            }
        }

    // finance/tunnel/refundsObject/400?access_token=23138e4a-b44a-4a4f-9d8e-3ab345c4753c&marketplaceId=1&merchantId=1&pageSize=10
    },
    watch: {
        async 'select.channelCode' (val) {
            this.isChoosedFiles = '未选择';
            this.pars.formDatas = {};
            this.$refs.secondForm.$children[0].$parent.handleReset(this.formName2);
            await (() => {
                switch (val) {
                    case 'ALIPAY':
                        this.formItemList = [
                            { type: 1, keyName: 'partner', label: 'partner', labelWidth: 170, class: 'width-1-3' },
                            { type: 1, keyName: 'app_id', label: '应用id', labelWidth: 170, class: 'width-1-3' },
                            { type: 1, keyName: 'privatekey', label: '私钥', labelWidth: 170, class: 'width-1-3' },
                            { type: 1, keyName: 'openrsa2Privatekey', label: 'rsa2签名私钥', labelWidth: 170, class: 'width-1-3' },
                        ];
                        this.ruleDatas1 = {
                            partner: [{ required: true, message: 'partner不能为空', trigger: 'blur' }],
                            app_id: [{ required: true, message: '应用id不能为空', trigger: 'blur' }],
                            privatekey: [{ required: true, message: '私钥不能为空', trigger: 'blur' }],
                            openrsa2Privatekey: [{ required: true, message: 'rsa2签名私钥不能为空', trigger: 'blur' }],
                        };
                        break;
                    case 'WXPAY':
                        this.formItemList = [
                            { type: 1, keyName: 'merchant_id', label: '商户号', labelWidth: 170, class: 'width-1-3' },
                            { type: 1, keyName: 'app_id', label: '应用id', labelWidth: 170, class: 'width-1-3' },
                            { type: 1, keyName: 'key', label: '签名key值', labelWidth: 170, class: 'width-1-3' },
                            { type: 1, keyName: 'pwd', label: '密码', labelWidth: 170, class: 'width-1-3' },
                            { type: 15, keyName: 'organizationFloder', label: '商户私钥证书', btnLabel: '上传', labelWidth: 170, class: 'width-1-3', key: 5 }
                        ];
                        this.ruleDatas1 = {
                            merchant_id: [{ required: true, message: '商户号不能为空', trigger: 'blur' }],
                            app_id: [{ required: true, message: '应用id不能为空', trigger: 'blur' }],
                            key: [{ required: true, message: '签名key值不能为空', trigger: 'blur' }],
                            pwd: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
                            organizationFloder: [{ required: true, message: '请选择商户私钥证书', trigger: 'blur' }]
                        };
                        break;
                    case 'WXMPPAY':
                        this.formItemList = [
                            { type: 1, keyName: 'merchant_id', label: '商户号', labelWidth: 170, class: 'width-1-3' },
                            { type: 1, keyName: 'app_id', label: '应用id', labelWidth: 170, class: 'width-1-3' },
                            { type: 1, keyName: 'app_secret', label: 'appSecret', labelWidth: 170, class: 'width-1-3' },
                            { type: 1, keyName: 'key', label: '签名key值', labelWidth: 170, class: 'width-1-3' },
                            { type: 1, keyName: 'pwd', label: '密码', labelWidth: 170, class: 'width-1-3' },
                            { type: 15, keyName: 'organizationFloder', label: '商户私钥证书', btnLabel: '上传', labelWidth: 170, class: 'width-1-3', key: 5 }
                        ];
                        this.ruleDatas1 = {
                            merchant_id: [{ required: true, message: '商户号不能为空', trigger: 'blur' }],
                            app_id: [{ required: true, message: '应用id不能为空', trigger: 'blur' }],
                            app_secret: [{ required: true, message: 'app_secret不能为空', trigger: 'blur' }],
                            key: [{ required: true, message: '签名key值不能为空', trigger: 'blur' }],
                            pwd: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
                            organizationFloder: [{ required: true, message: '请选择商户私钥证书', trigger: 'blur' }]
                        };
                        break;
                    case 'CPCN':
                        this.formItemList = [
                            { type: 1, keyName: 'institution_id', label: '机构编号', labelWidth: 170, class: 'width-1-3' },
                            { type: 15, keyName: 'organizationFloder', label: '机构提供的config文件夹', btnLabel: '上传', labelWidth: 170, class: 'width-1-3', key: 5 }
                        ];
                        this.ruleDatas1 = {
                            institution_id: [{ required: true, message: '机构编号不能为空', trigger: 'blur' }],
                            organizationFloder: [{ required: true, message: '请选择机构提供的config文件夹', trigger: 'blur' }]
                        };
                        break;
                    case 'UNIONPAY':
                        this.formItemList = [
                            { type: 1, keyName: 'merchant_id', label: '商户号', labelWidth: 170, class: 'width-1-3' },
                            { type: 1, keyName: 'private_pwd', label: '商户私钥证书密码', labelWidth: 170, class: 'width-1-3' },
                            { type: 15, keyName: 'organizationFloder', label: '商户私钥证书', btnLabel: '上传', labelWidth: 170, class: 'width-1-3', key: 5 }
                        ];
                        this.ruleDatas1 = {
                            merchant_id: [{ required: true, message: '商户号不能为空', trigger: 'blur' }],
                            private_pwd: [{ required: true, message: '商户私钥证书密码不能为空', trigger: 'blur' }],
                            organizationFloder: [{ required: true, message: '请选择商户私钥证书', trigger: 'blur' }]
                        };
                        break;
                    default:
                        break;
                }
            })();

            this.$refs.firstForm.$children[0].$parent.handleReset(this.formName1);
        }
    }
};
</script>

 <style lang="less" scoped>
.detailBody {
  margin-top: 20px;
  .body {
    padding: 20px;
    border: 1px solid #dcdee2;
    border-top: 0px;
  }
}
.detailTit {
  text-indent: 30px;
  font-size: 16px;
  line-height: 50px;
  color: #333;
  border: 1px solid #dcdee2;
  background: #f8f8f9;
}
.w_query {
  padding: 30px 20px;
}
.table {
  padding: 0px 20px 30px;
  .ivu-table-cell {
    padding: 0;
  }
}
</style>


