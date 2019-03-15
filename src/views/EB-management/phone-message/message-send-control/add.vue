<template>
    <div>
        <Row>
            <Card>
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">{{pageName}}短信发送设置</span>
                </p>
                <detail-form1
                        :isListPage = "false"
                        :isMixed = "false"
                        :formDatas = "formDatas"
                        :formItemList = "formItemList"
                        @getFormData = "getFormData"
                ></detail-form1>
            </Card>
        </Row>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                pageName: '',
                formDatas: {},
                formItemList: [
                    {
                        type: 4,
                        label: '发送控制点名称',
                        keyName: 'controlpoin',
                        optionList: [],
                        isRequired: true
                    },
                    {
                        type: 7,
                        keyName: 'templates',
                        label: '内容模版',
                    },
                    {
                        type: 2,
                        keyName: 'byisuse',
                        label: '使用状态',
                        optionList: [
                            {
                                value: 0,
                                labelName: '禁用',
                            },
                            {
                                value: 1,
                                labelName: '启用',
                            }
                        ],
                        isRequired: true
                    }
                ]
            }
        },
        methods: {
            getFormData (obj) {
                if (this.pageName == '新增') {
                    this.$common.addNewData('/sys/contMessage/v1/add', this, obj)
                } else if (this.pageName == '修改') {
                    obj['conid'] = this.$route.params.id;
                    this.$common.editData('/sys/contMessage/v1/update', this, obj)
                }
            },
            setPageName () {
                if(this.$route.name.indexOf('new') != -1){
                    this.pageName = '新增';
                    this.formDatas = {
                        byisuse: 1,
                        controlpoin: '订单保存'
                    }
                } else {
                    this.pageName = '修改';
                    this.$http.get(`${this.baseUrl}/sys/contMessage/v1/detail/${this.$route.params.id}`)
                        .then(res => {
                            if (res.data.code == 200) {
                                let data = res.data.data;
                                let arr = this.formItemList[0].optionList;
                                for (let i = 0; i < arr.length; i++) {
                                    if (data.controlpoin == arr[i].label) {
                                        data.controlpoin = arr[i].value;
                                        break;
                                    }
                                }
                                this.formDatas = data
                            }
                        })
                }
            }
        },
        created () {
            this.$http.get(`${this.baseUrl}/sys/syspar/retrieve?access_token=${this.Cookies.get('token')}&pmky=MESG`)
                .then(res => {
                    if (res.status == 200) {
                        res.data.forEach(obj => {
                            this.formItemList[0].optionList.push({
                                value: obj.pmcd,
                                label: obj.pmva
                            })
                        });
                    }
                    this.setPageName();
                });
        },
        watch: {
            '$route' () {
                this.setPageName();
            }
        }
    }
</script>

<style scoped>

</style>
