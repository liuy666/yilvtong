
<!--<template>-->
<!--<div >-->
   <!--<Row>-->
      <!--<Card>-->
        <!--<p slot="title" class="slot_title_height">-->
            <!--<span class="title_span">支付渠道配置修改 </span>-->
            <!--<top-title-opbtn :btnList="btnList"></top-title-opbtn>-->
        <!--</p>-->
        <!--<div class="detailBody">-->
            <!--<div class="detailTit"></div>-->
            <!--<div class="body">-->
              <!--<Row :style="{borderBottom:'1px solid  #dcdee2'}">-->
                <!--<Col span="8" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">-->
                    <!--<span>支付渠道：</span>-->
                    <!--<span >{{detailInfo.payChannel}}</span>-->
                <!--</Col>-->
                <!--<Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">-->
                    <!--<span>应用场景：</span>-->
                    <!--<span >{{detailInfo.appScene}}</span>-->
                <!--</Col>-->
                <!--<Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">-->
                    <!--<span>状态：</span>-->
                    <!--<span >{{detailInfo.state}}</span>-->
                <!--</Col>-->
            <!--</Row>-->
              <!--&lt;!&ndash; 支付宝 &ndash;&gt;-->
              <!--<zhifubao v-if="this.$route.query.channelCode==='ALIPAY'" :isMofit="this.$route.name==='dueSettingModify'?true:false" @getChildInfo="getChildInfo" :info="detailInfo.zhifubao"/>-->
              <!--&lt;!&ndash; 微信 &ndash;&gt;-->
              <!--<weixin v-if="this.$route.query.channelCode==='WXPAY'" :isMofit="this.$route.name==='dueSettingModify'?true:false" @getChildInfo="getChildInfo" :info="detailInfo.weixin"/>-->
              <!--&lt;!&ndash; 微信公众号 &ndash;&gt;-->
              <!--<weixinhao v-if="this.$route.query.channelCode==='WXMPPAY'" :isMofit="this.$route.name==='dueSettingModify'?true:false" @getChildInfo="getChildInfo" :info="detailInfo.weixinhao"/>-->
              <!--&lt;!&ndash; 银联 &ndash;&gt;-->
              <!--<yinlian v-if="this.$route.query.channelCode==='UNIONPAY'" :isMofit="this.$route.name==='dueSettingModify'?true:false" @getChildInfo="getChildInfo" :info="detailInfo.yinlian"/>-->
              <!--&lt;!&ndash; 中金 &ndash;&gt;-->
              <!--<zhongjin v-if="this.$route.query.channelCode==='CPCN'" :isMofit="this.$route.name==='dueSettingModify'?true:false" @getChildInfo="getChildInfo" :info="detailInfo.zhongjin"/>-->
              <!--&lt;!&ndash; 工行 &ndash;&gt;-->
              <!--&lt;!&ndash; <gonghang v-if="this.$route.query.channelCode==='ALIPAY'" :info="detailInfo.gonghang"/> &ndash;&gt;-->
              <!--<Row :style="{borderBottom:'1px solid #dcdee2'}">-->
                  <!--<Col span="24" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'40px'}">-->
                      <!--<span :style="{fontSize:'18px',fontWeight:'600'}">对应结算账号：</span>-->
                  <!--</Col>-->
                  <!--<Col span="8" :style="{margin:'20px 0'}">-->
                      <!--<span :style="{paddingLeft:'100px'}">开户银行：</span>-->
                      <!--<Input v-model="detailInfo.bank" placeholder="" style="width: 150px" />-->
                  <!--</Col>-->
                  <!--<Col span="8" :style="{margin:'20px 0'}">-->
                      <!--<span :style="{paddingLeft:'100px'}">开户城市：</span>-->
                      <!--<Input v-model="detailInfo.city" placeholder="" style="width: 150px" />-->
                  <!--</Col>-->
                   <!--<Col span="8" :style="{margin:'20px 0'}">-->
                      <!--<span :style="{paddingLeft:'100px'}">开户支行：</span>-->
                      <!--<Input v-model="detailInfo.payBank" placeholder="" style="width: 150px" />-->
                  <!--</Col>-->
                  <!--<Col span="8" :style="{margin:'20px 0'}">-->
                      <!--<span :style="{paddingLeft:'100px'}">开户名称：</span>-->
                      <!--<Input v-model="detailInfo.name" placeholder="" style="width: 150px" />-->
                  <!--</Col>-->
                <!--<Col span="8" :style="{margin:'20px 0'}">-->
                      <!--<span :style="{paddingLeft:'100px'}">开户账号：</span>-->
                      <!--<Input v-model="detailInfo.No" placeholder="" style="width: 150px" />-->
                  <!--</Col>-->
              <!--</Row>-->
            <!--</div>-->
        <!--</div>-->
        <!--<Row :style="{textAlign:'center',marginTop:'20px'}">-->
          <!--<Col span="24">-->
            <!--<Button type="primary" shape="circle" style="margin-right:10px;width:80px" @click="$router.back(-1)">返回</Button>-->
            <!--<Button type="primary" shape="circle" style="margin-right:10px;width:80px" @click="save" >保存</Button>-->
          <!--</Col>-->
        <!--</Row>-->
      <!--</Card>-->
   <!--</Row>-->
<!--</div>   -->
<!--</template>-->

<!--<script>-->
<!--import tradState from '@/libs/tradState.js';-->
<!--import zhifubao from './dueSettingDetail_configInfo/zhifubao';-->
<!--import weixin from './dueSettingDetail_configInfo/weixin';-->
<!--import weixinhao from './dueSettingDetail_configInfo/weixinhao';-->
<!--import yinlian from './dueSettingDetail_configInfo/yinlian';-->
<!--import zhongjin from './dueSettingDetail_configInfo/zhongjin';-->
<!--import gonghang from './dueSettingDetail_configInfo/gonghang';-->
<!--export default {-->
    <!--components: {-->
        <!--zhifubao,-->
        <!--weixin,-->
        <!--weixinhao,-->
        <!--yinlian,-->
        <!--zhongjin,-->
        <!--gonghang-->
    <!--},-->
    <!--data () {-->
        <!--return {-->
            <!--token: this.Cookies.get('token'),-->
            <!--btnList: [-->
                <!--{-->
                    <!--type: 1,-->
                    <!--btnlabel: '刷新'-->
                <!--}-->
            <!--],-->
            <!--// 详情信息-->
            <!--detailInfo: {-->
                <!--payChannel: '',-->
                <!--appScene: '',-->
                <!--state: '',-->
                <!--zhifubao: {},-->
                <!--weixin: {},-->
                <!--weixinhao: {},-->
                <!--yinlian: {},-->
                <!--zhongjin: {},-->
                <!--// gonghang: {},-->
                <!--bank: '',-->
                <!--city: '',-->
                <!--payBank: '',-->
                <!--name: '',-->
                <!--No: '',-->
                <!--application: ''-->
            <!--}-->
        <!--};-->
    <!--},-->
    <!--mounted () {-->
        <!--this.getInfo();-->
    <!--},-->
    <!--methods: {-->
        <!--getChildInfo (val) {-->
        <!--},-->
        <!--async getInfo () {-->
            <!--try {-->
                <!--let res = await this.$http.get(`${this.fm}/finance/tunnel/merchantChannelConfig/${this.$route.query.id}`, {-->
                    <!--params: {-->
                        <!--access_token: this.token,-->
                        <!--marketplaceId: this.$route.query.marketplaceId,-->
                        <!--merchantId: this.$route.query.merchantId-->
                    <!--}-->
                <!--}).then(res => {-->
                    <!--return res;-->
                <!--});-->
                <!--let data = res.data;-->
                <!--if (data.return_code === 200) {-->
                    <!--let item = data.content;-->
                    <!--this.detailInfo = {-->
                        <!--payChannel: item.paymentChannel.channelName,-->
                        <!--appScene: tradState.AppScene(item.application),-->
                        <!--state: tradState.state(item.openStatus),-->
                        <!--zhifubao: item.paymentChannel.channelCode === 'ALIPAY' ? JSON.parse(item.channelMsg) : null,-->
                        <!--weixin: item.paymentChannel.channelCode === 'WXPAY' ? JSON.parse(item.channelMsg) : null,-->
                        <!--weixinhao: item.paymentChannel.channelCode === 'WXMPPAY' ? JSON.parse(item.channelMsg) : null,-->
                        <!--yinlian: item.paymentChannel.channelCode === 'UNIONPAY' ? JSON.parse(item.channelMsg) : null,-->
                        <!--zhongjin: item.paymentChannel.channelCode === 'CPCN' ? JSON.parse(item.channelMsg) : null,-->
                        <!--bank: item.bankName || '',-->
                        <!--city: item.ctiy || '',-->
                        <!--payBank: item.branch || '',-->
                        <!--name: item.accountName || '',-->
                        <!--No: item.accountNo || '',-->
                        <!--application: item.application-->
                    <!--};-->
                <!--} else {-->
                    <!--this.$Modal.warning({-->
                        <!--title: '温馨提示',-->
                        <!--content: '请求失败'-->
                    <!--});-->
                <!--}-->
            <!--} catch (err) {-->
                <!--console.log(err);-->
            <!--}-->
        <!--},-->
        <!--save () {-->
            <!--var channelMsg = '';-->
            <!--switch (this.$route.query.channelCode) {-->
                <!--case 'ALIPAY':// 支付宝-->
                    <!--channelMsg = JSON.stringify(this.detailInfo.zhifubao);-->
                    <!--break;-->
                <!--case 'WXPAY':// 微信-->
                    <!--channelMsg = JSON.stringify(this.detailInfo.weixin);-->
                    <!--break;-->
                <!--case 'WXMPPAY':// 微信公众号-->
                    <!--channelMsg = JSON.stringify(this.detailInfo.weixinhao);-->
                    <!--break;-->
                <!--case 'UNIONPAY':// 银联-->
                    <!--channelMsg = JSON.stringify(this.detailInfo.yinlian);-->
                    <!--break;-->
                <!--case 'CPCN':// 中金-->
                    <!--channelMsg = JSON.stringify(this.detailInfo.zhongjin);-->
                    <!--break;-->
                <!--default:-->
                    <!--channelMsg = '';-->
                    <!--break;-->
            <!--}-->
            <!--this.$http.post(`${this.fm}/finance/tunnel/updateMerchantChannelConfigs/${this.$route.query.id}?access_token=${this.token}&marketplaceId=${this.$route.query.marketplaceId}&merchantId=${this.$route.query.merchantId}`, {-->
                <!--accountName: this.detailInfo.name,-->
                <!--accountNo: this.detailInfo.No,-->
                <!--application: this.detailInfo.application,-->
                <!--bankName: this.detailInfo.bank,-->
                <!--branch: this.detailInfo.payBank,-->
                <!--channelCode: this.$route.query.channelCode,-->
                <!--channelMsg: channelMsg,-->
                <!--ctiy: this.detailInfo.city,-->
                <!--organizationFileName: 'C:\\hqyt\\avc.txt'-->
            <!--}).then(res => {-->
                <!--let data = res.data;-->
                <!--if (data.return_code === 200) {-->
                    <!--this.$Modal.warning({-->
                        <!--title: '温馨提示',-->
                        <!--content: '操作成功',-->
                        <!--onOk: () => {-->
                            <!--this.$router.push({-->
                                <!--name: 'dueSetting'-->
                            <!--});-->
                        <!--}-->
                    <!--});-->
                <!--} else {-->
                    <!--this.$Modal.warning({-->
                        <!--title: '温馨提示',-->
                        <!--content: '操作失败'-->
                    <!--});-->
                <!--}-->
            <!--});-->
        <!--}-->
    <!--}-->
<!--};-->
<!--</script>-->

 <!--<style lang="less" scoped>-->
<!--.detailBody {-->
  <!--margin-top: 20px;-->
  <!--.body {-->
    <!--padding: 20px;-->
    <!--border: 1px solid #dcdee2;-->
    <!--border-top: 0px;-->
  <!--}-->
<!--}-->
<!--.detailTit {-->
  <!--text-indent: 30px;-->
  <!--font-size: 16px;-->
  <!--line-height: 50px;-->
  <!--color: #333;-->
  <!--border: 1px solid #dcdee2;-->
  <!--background: #f8f8f9;-->
<!--}-->
<!--.w_query {-->
  <!--padding: 30px 20px;-->
<!--}-->
<!--.table {-->
  <!--padding: 0px 20px 30px;-->
  <!--.ivu-table-cell {-->
    <!--padding: 0;-->
  <!--}-->
<!--}-->
<!--</style>-->


<template>
    <div >
        <Row>
            <Card>
                <p slot="title" class="slot_title_height">
                    <span class="title_span">支付渠道配置修改 </span>
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
                firstData:null,
                firstFlag:0,
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
            this.get();
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
                                bodyParams = { ...this.select, ...this.detailInfo, channelMsg: JSON.stringify(channelMsg) },
                                arr = [];
                            arr[0] = this.$route.query.id;
                            console.log(bodyParams);
                            this.$bApi.UpdateMerchantChannelConfigs(arr,urlParams, bodyParams)
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
            },
            async get(){
                let arr = [];
                arr[0] = this.$route.query.id;

                let params = {
                    marketplaceId: this.$route.query.marketplaceId,
                    merchantId: this.$route.query.merchantId
                };
                let res = await this.$bApi.MerchantChannelConfig(arr,params);

                if(res){
                    let item = res.content;
                    this.firstData = res.content;
                    this.select.channelCode = item.paymentChannel.channelCode;
                    this.select.application = item.application;
                    this.detailInfo.bankName = item.bankName;
                    this.detailInfo.ctiy = item.ctiy;
                    this.detailInfo.branch = item.branch;
                    this.detailInfo.accountName = item.accountName;
                    this.detailInfo.accountNo = item.accountNo;
                    let jsonObj = JSON.parse(item.channelMsg);
                    this.pars.formDatas = jsonObj;
                    // this.pars.formDatas.privatep12_path = '';
                    if('privatep12_path' in this.pars.formDatas){
                        delete this.pars.formDatas.privatep12_path;
                    }

                    if('config_path' in this.pars.formDatas){
                        delete this.pars.formDatas.config_path;
                    }

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
                                // organizationFloder: [{ required: true, message: '请选择商户私钥证书', trigger: 'blur' }]
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
                                // organizationFloder: [{ required: true, message: '请选择商户私钥证书', trigger: 'blur' }]
                            };
                            break;
                        case 'CPCN':
                            this.formItemList = [
                                { type: 1, keyName: 'institution_id', label: '机构编号', labelWidth: 170, class: 'width-1-3' },
                                { type: 15, keyName: 'organizationFloder', label: '机构提供的config文件夹', btnLabel: '上传', labelWidth: 170, class: 'width-1-3', key: 5 }
                            ];
                            this.ruleDatas1 = {
                                institution_id: [{ required: true, message: '机构编号不能为空', trigger: 'blur' }],
                                // organizationFloder: [{ required: true, message: '请选择商户私钥证书', trigger: 'blur' }]
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
                                // organizationFloder: [{ required: true, message: '请选择商户私钥证书', trigger: 'blur' }]
                            };
                            break;
                        default:
                            break;
                    }
                })();

                this.$refs.firstForm.$children[0].$parent.handleReset(this.formName1);

                if(!this.firstFlag){
                    let item = this.firstData;
                    this.select.application = item.application;
                    this.detailInfo.bankName = item.bankName;
                    this.detailInfo.ctiy = item.ctiy;
                    this.detailInfo.branch = item.branch;
                    this.detailInfo.accountName = item.accountName;
                    this.detailInfo.accountNo = item.accountNo;
                    let jsonObj = JSON.parse(item.channelMsg);
                    this.pars.formDatas = jsonObj;
                    // this.pars.formDatas.privatep12_path = '';
                    if('privatep12_path' in this.pars.formDatas){
                        delete this.pars.formDatas.privatep12_path;
                    }

                    if('config_path' in this.pars.formDatas){
                        delete this.pars.formDatas.config_path;
                    }

                    this.firstFlag++;
                }
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





