<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">对账单下载</span>
                    <top-btn
                            :btnList="btnList"
                    ></top-btn>
                </p>
                <Tabs value="byDay" v-model="byWhat">
                    <TabPane label="按日下载" name="byDay">
                        <detail-form1
                                :btnLoading = "btnLoading"
                                :key = "'byDay'"
                                :mFlag = "true"
                                :okWords = "'开始下载'"
                                :isNeedClose = "true"
                                :needReset = "true"
                                :isListPage = "false"
                                :isMixed = "false"
                                :formDatas = "pars.formDatas"
                                :labelWidth = "0"
                                :formItemList = "formItemList"
                                :disabledStartDate="disabledStartDate"
                                :disabledEndDate="disabledEndDate"
                                :disabledEnd="disabledEnd"
                                @clearFormData = "clearFormData"
                                @getFormData = "downLoad"
                                @setFastDay = "setFastDay"
                        ></detail-form1>
                        <!--:ruleDatas = "ruleDatas"-->
                    </TabPane>
                    <TabPane label="按月下载" name="byMonth">
                        <detail-form1
                                :btnLoading = "btnLoading"
                                :key = "'byMonth'"
                                :mFlag = "true"
                                :okWords = "'开始下载'"
                                :isNeedClose = "true"
                                :needReset = "true"
                                :isListPage = "false"
                                :isMixed = "false"
                                :formDatas = "pars.formDatas1"
                                :labelWidth = "0"
                                :formItemList = "formItemList1"
                                :disabledStartDate="disabledStartDate1"
                                :disabledEndDate="disabledEndDate1"
                                :disabledEnd="disabledEnd1"
                                @clearFormData = "clearFormData"
                                @getFormData = "downLoad"
                        ></detail-form1>
                    </TabPane>
                </Tabs>
            </Card>
        </Row>
        <img :src="downloadurl" />
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
    export default {
        name: "downloadingOfBills",
        data(){
            let today = this.$common.getCurrentDate();
            let totalList =  this.$$totalList;
            return{
                downloadurl: '',
                byWhat: 'byDay',
                btnList: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    }
                ],
                currentIndex: 1,
                spinShow: false,
                formItemList: [
                    {
                        type: 11,
                        label: '账单日期',
                        double: true,
                        keyName: 'fromDate',
                        keyName1: 'toDate',
                        class: 'float_option_50',
                        isShowSixOptions: true,
                    }
                ],
                formItemList1: [
                    {
                        type: 11,
                        label: '账单月份',
                        dateType: 'month',
                        double: true,
                        keyName: 'fromDate',
                        keyName1: 'toDate',
                        class: 'float_option_50',
                    }
                ],
                isClose: false,
                btnLoading: false,
                pars: {
                    formDatas: {
                        fromDate : today,
                        toDate : today,
                    },
                    formDatas1: {
                        fromDate : today,
                        toDate : today,
                    },
                },
                disabledStartDate: [9999,0],
                disabledEndDate: [9999,0],
                disabledEnd: 0,
                disabledStartDate1: [9999,0],
                disabledEndDate1: [9999,0],
                disabledEnd1: 0,
            }
        },
        mounted(){
            this.getParams();
        },
        methods:{
            downLoad(){
                this.btnLoading = true;
                let byWhat = this.byWhat,
                     obj = {},
                     Common = this.$common;
                switch(byWhat){
                    case 'byDay':
                        obj = this.pars.formDatas;
                        break;
                    case 'byMonth':
                        obj = this.pars.formDatas1;
                        let toDate = obj.toDate,
                             arr = Common.getCurrentDate1(toDate,-4);
                             obj.toDate = arr[0];
                        break;
                    default:
                        break;
                }

                    let params = {
                        ...obj
                    },
                    httpObj = '';
                for (let key in params){
                    if(key === 'fromDate' || key === 'toDate'){
                        params[key] = Common.getCurrentDate(params[key]);
                    }
                }
                Common.emptyObj(params);

                httpObj = this.$bApi.get.Downloading0fBills(params);
                httpObj.newPromise.then((res)=>{
                    if(!res){
                        // Common.showMessageModal(this,res.msg,2);
                        return;
                    }
                    // console.log(res);
                    // let zip = new this.$jszip();
                    // zip.file("manifest.csv", res);
                    // // let img = zip.folder("images");
                    // zip.generateAsync({type:"blob",})
                    //     .then((content)=>{
                    //         // see FileSaver.js
                    //         this.$fileSaver.saveAs(content, "example.zip");
                    //     });
                    Common.downloadGZIP(params,httpObj.downloadURI);
                }).finally(()=>{
                    this.btnLoading = false;
                });
            },
            getParams(){
                let params = {type:'1'};
                return this.$bApi.get.SettleMerchantId(params)
                    .then((response)=>{
                        this.pars.formDatas.marketplaceId = response.platformId;
                        this.pars.formDatas.merchantId = response.merchantId;
                        // this.pars.formDatas.marketplaceId = 1;
                        // this.pars.formDatas.merchantId = 1;
                        this.pars.formDatas1.marketplaceId = response.platformId;
                        this.pars.formDatas1.merchantId = response.merchantId;
                        // this.pars.formDatas1.marketplaceId = 1;
                        // this.pars.formDatas1.merchantId = 1;
                    })
                    .finally(()=>{
                        this.spinShow = false;
                    })
            },
            clearFormData () {
                let today = this.$common.getCurrentDate();
                let byWhat = this.byWhat;
                switch(byWhat){
                    case 'byDay':
                        this.pars.formDatas.toDate = today;
                        this.pars.formDatas.fromDate = today;
                        break;
                    case 'byMonth':
                        this.pars.formDatas1.toDate = today;
                        this.pars.formDatas1.fromDate = today;
                        break;
                    default:
                        break;
                }
            },
            setFastDay (day) {  //近多少多少天
                let today = this.$common.getCurrentDate();
                this.pars.formDatas.toDate = this.$common.getCurrentDate();
                this.pars.formDatas.fromDate = this.$common.getCurrentDate();

                switch(day){
                    case -1:
                        this.pars.formDatas.toDate = this.$common.getCurrentDate(this.pars.formDatas.toDate,day);
                        this.pars.formDatas.fromDate = this.$common.getCurrentDate(this.pars.formDatas.fromDate,day);
                        break;
                    case -2:
                        let arr = this.$common.getCurrentDate1(today,day);
                        this.pars.formDatas.toDate = arr[0];
                        this.pars.formDatas.fromDate = arr[1];
                        break;
                    case -3:
                        let Arr = this.$common.getCurrentDate1(today,day);
                        this.pars.formDatas.toDate = Arr[0];
                        this.pars.formDatas.fromDate = Arr[1];
                        break;
                    default:
                        break;
                }

                this.downLoad();
            },
        },
        watch: {
            'pars.formDatas.fromDate' (val) {
                let obj = this.$common.changeDisabledEndDate(val,this.disabledEnd,this.disabledEndDate);
                this.disabledEnd = obj.disabledEnd;
                this.disabledEndDate = obj.disabledEndDate;
            },
            'pars.formDatas1.fromDate' (val) {
                let obj = this.$common.changeDisabledEndDate(val,this.disabledEnd1,this.disabledEndDate1);
                this.disabledEnd1 = obj.disabledEnd1;
                this.disabledEndDate1 = obj.disabledEndDate1;
            },
        }

    }
</script>

<style scoped>

</style>










