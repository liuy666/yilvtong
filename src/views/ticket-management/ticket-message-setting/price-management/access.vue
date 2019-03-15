<template>
    <div>
        <Row>
            <Card>
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">新增{{pageName}}销售权限</span>
                </p>
                <detail-form1
                        :isListPage = "false"
                        :isMixed = "false"
                        :labelWidth = "80"
                        :formDatas = "formDatas"
                        :formItemList = "formItemList"
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
            return {
                spinShow: true,
                pageName: '',
                tipName: '',
                formDatas: {},
                formItemList: [
                    {
                        type: 9,
                        label: '产品信息',
                        keyName: 'productMsg'
                    },
                    {
                        type: 20,
                        label: '',
                        keyName: '',
                        indeterminate: false,
                        checkAll: false,
                        optionList: [],
                    },
                ]
            }
        },
        methods: {
            getFormData (obj) {
                delete obj.productMsg;
                if(this.pageName == '员工'){
                    this.$common.addNewData('/ticket/crowdKindPrice/v1/crowPriceAddsalelimits', this, obj)
                } else {
                    this.$common.addNewData('/ticket/crowdKindPrice/v1/crowPriceSaveWinlimit', this, obj)
                }
            },
            setPageName () {   //窗口或者员工
                if (this.$route.name.indexOf('window') != -1) {
                    this.pageName = '窗口';
                    this.tipName = '窗口销售权限新增';
                    this.formItemList[1].label = this.pageName;
                    this.formItemList[1].keyName = 'iwinids';
                    this.setInitData(this.pageName)
                } else {
                    this.pageName = '员工';
                    this.tipName = '员工销售权限新增';
                    this.formItemList[1].label = this.pageName;
                    this.formItemList[1].keyName = 'iempids';
                    this.setInitData(this.pageName)
                }
            },
            setInitData (pageName) {    //获取初始数据产品信息
                let url = '';
                this.$http.get(this.baseUrl+'/ticket/crowdKindPrice/v1/crowdKindPriceEditInitData',{
                    params: {
                        access_token: this.Cookies.get('token'),
                        iCrowdKindPriceid: this.$route.params.id
                    }
                }).then(res => {
                    if (res.data.code == 200) {
                        let data = res.data.data;
                        let productMsg = `${data.strtickettype}-${data.strbusiness}-${data.strcrowdkind}`;
                        this.$set(this.formDatas, 'productMsg', productMsg)
                    } else {
                        this.$common.showMessageModal(this, res, 1);
                        this.spinShow = false
                    }
                });
                if (pageName == '员工') {
                    url = this.baseUrl+'/ticket/crowdKindPrice/v1/crowPriceAddsalelimitsPage';
                    this.getAccessList(url, 'iemployeeid', 'stremployee', 'iempids', 'iempTemp')
                } else {
                    url = this.baseUrl+'/ticket/crowdKindPrice/v1/crowPricePerformAddWinsale';
                    this.getAccessList(url, 'iticketwinid', 'strticketwin', 'iwinids', 'iwinTemp')
                }
            },
            getAccessList(url, value, labelName, keyName, select) {     //获取权限列表
                this.$http.get(url ,{
                    params: {
                        access_token: this.Cookies.get('token'),
                        icrowdkindpriceid: this.formDatas.icrowdkindpriceid
                    }
                }).then(res => {
                    if (res.data.code == 200) {
                        let data = res.data.data;
                        let arr = [];
                        data.map(item => {
                            this.formItemList[1].optionList.push({
                                value: item[value],
                                labelName: item[labelName]
                            });
                            if (item[select]) {
                                arr.push(item[value])
                            }
                        });
                        this.$set(this.formDatas, keyName, arr);
                        this.spinShow = false;
                    } else {
                        this.$common.showMessageModal(this, res, 1);
                        this.spinShow = false
                    }
                })
            }
        },
        created () {
            this.$set(this.formDatas, 'icrowdkindpriceid', this.$route.params.id);
            this.setPageName()
        },
        watch: {
            '$route' () {
                this.spinShow = true;
                this.setPageName()
            },
        },
    }
</script>

<style scoped>

</style>
