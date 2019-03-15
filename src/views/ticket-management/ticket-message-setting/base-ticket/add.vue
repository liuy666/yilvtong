<template>
    <div>
        <Row>
            <Card>
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">{{pageName}}基础票</span>
                </p>
                <div>
                    <detail-form1
                            :isListPage = "false"
                            :isMixed = "false"
                            :formDatas = "formDatas"
                            :ruleDatas = "ruleDatas"
                            :labelWidth = "180"
                            :formItemList = "formItemList"
                            @getFormData = "getFormData"
                            @addOrsubtractRow = "addOrsubtractRow"
                            @handleMove = "handleMove"
                            @handleSuccess = "handleSuccess"
                    ></detail-form1>
                    <Spin size="large" fix v-if="spinShow"></Spin>
                </div>
            </Card>
        </Row>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                spinShow: true,
                pageName: '',
                formDatas: {
                    timestock: [
                        {
                            time_start: '',
                            time_end: '',
                            stock: ''
                        }
                    ]
                },
                formItemList: [
                    {
                        type: 9,
                        label: '服务商名称',
                        keyName: 'szscenicname'
                    },
                    {
                        type: 9,
                        label: '产品编号',
                        keyName: 'itickettypeid',
                        noShow: true
                    },
                    {
                        type: 9,
                        label: 'IC卡代码',
                        keyName: 'icid',
                        noShow: true
                    },
                    {
                        type: 1,
                        label: '产品编码',
                        keyName: 'sztickettypecode',
                        isRequired: true,
                        hasDec: '(注：输入三位由数字或者大写英文字母组成的编码)',
                        isRedDec: true
                    },
                    {
                        type: 1,
                        label: '产品名称',
                        keyName: 'sztickettypename',
                        isRequired: true
                    },
                    {
                        type: 4,
                        label: '产品类别',
                        keyName: 'bycategorytype',
                        isRequired: true,
                        optionList: []
                    },
                    {
                        type: 4,
                        label: '检票方式',
                        keyName: 'byusage',
                        isRequired: true,
                        optionList: [
                            {
                                value: 0,
                                label: '一票一人'
                            },
                            {
                                value: 1,
                                label: '一票多人'
                            },
                        ]
                    },
                    {
                        type: 4,
                        label: '使用方式',
                        keyName: 'byuselimit',
                        isRequired: true,
                        optionList: [
                            {
                                value: 0,
                                label: '一次性'
                            },
                            {
                                value: 1,
                                label: '长期性'
                            },
                        ]
                    },
                    {
                        type: 4,
                        label: '出票方式',
                        keyName: 'bymaketicketway',
                        isRequired: true,
                        optionList: []
                    },
                    {
                        type: 4,
                        label: '介质类型',
                        keyName: 'bymediatype',
                        isRequired: true,
                        optionList: []
                    },
                    {
                        type: 18,
                        label: '上传图片列表',
                        action: this.baseUrl+'/sys/fileUpload/v1/uploadPic',
                        data: {
                            access_token: this.Cookies.get('token')
                        },
                        imgArr: [
                            {
                                url: 'http://192.168.0.108:4869/8403bace7a66ce91b42592f42f54a86b',
                            },
                            {
                                url: 'http://192.168.0.108:4869/9bc6409d50c9325be1b0b9b645e85d97',
                            }
                        ],
                    },
                    {
                        type: 9,
                        label: '印刷代码',
                        keyName: 'szticketprintcode',
                        noShow: true
                    },
                    {
                        type: 1,
                        label: '工本费',
                        keyName: 'mnominalfee',
                        isRequired: true
                    },
                    {
                        type: 2,
                        label: '是否参与入园统计',
                        keyName: 'bispersontimestat',
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
                        label: '以出票时开始计算有效时间',
                        keyName: 'int1',
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
                        type: 1,
                        label: '有效天数',
                        keyName: 'validityday',
                        isRequired: true
                    },
                    {
                        type: 1,
                        label: '排序',
                        keyName: 'isequence'
                    },
                    {
                        type: 2,
                        label: '是否启用',
                        keyName: 'byisuse',
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
                        type: 7,
                        label: '备注',
                        keyName: 'szmemo',
                    },
                    {
                        type: 2,
                        label: '是否允许分时预约',
                        keyName: 'int3',
                        isRequired: true,
                        hasDec: '温馨提示：以下分时预约相关设置请谨慎修改',
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
                        type: 11,
                        label: '分时预约日期',
                        double: true,
                        keyName: 'note3',
                        keyName1: 'note4',
                        noShow: true

                    },
                    {
                        type: 9,
                        label: '温馨提示',
                        keyName: '',
                        hasDec: '【分时预约】建议以30分钟或1小时为间隔 【库存】输入-1表示不限量',
                        isRedDec: true,
                        noShow: true
                    },
                    {
                        type: 17,
                        label: '入园时段',
                        keyName: 'timestock',
                        noShow: true,
                        colList: [
                            {
                                inputList:[
                                    {
                                        type: 2,
                                        label:'开始时间(含)',
                                        keyName: 'time_start',
                                        format: 'HH:mm'
                                    },
                                    {
                                        type: 2,
                                        label:'结束时间(不含)',
                                        keyName: 'time_end',
                                        format: 'HH:mm'
                                    },
                                    {
                                        type: 1,
                                        label:'库存',
                                        keyName: 'stock'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            getFormData (obj) {
                let arr = [];
                obj = JSON.parse(JSON.stringify(obj));
                console.log(obj.timestock);
                obj.timestock.forEach(item => {
                    if (item.time_start != '') {
                        arr.push({
                            time_start: this.$common.getCurrentTime(item.time_start),
                            time_end: this.$common.getCurrentTime(item.time_end),
                            stock: item.stock
                        })
                    } else {
                        arr.push(obj.timestock)
                    }
                });
                this.$set(obj, 'timestock', arr);
                if(this.pageName == '新增'){
                    delete obj.timestock;
                    console.log(obj);
                    this.$common.addNewData('/ticket/ticket/v1/productSave?flag=1', this, obj, 'post', true)
                }
            },
            addOrsubtractRow (num, index) {     //增加或减少行
                this.$common.addOrsubtractRow(num, index, 'timestock', this)
            },
            setPageName () {    //新增修改页面状态初始化
                if (this.$route.name.indexOf('new') != -1) {
                    this.pageName = '新增';
                    this.tabShowOrHide(true);
                    this.setAddInitData()
                } else {
                    this.pageName = '修改';
                    this.tabShowOrHide(false);
                    this.setEditInitData()
                }
            },
            tabShowOrHide (noShow, showLastThree) {    //新增修改组件的显示与否,布尔,true为不显示
                if (!showLastThree) {
                    this.formItemList.forEach((obj, index) => {
                        if ('noShow' in obj && index < (this.formItemList.length - 3)) {
                            obj.noShow = noShow
                        }
                    });
                } else {
                    this.formItemList.forEach((obj, index) => {
                        if ('noShow' in obj && index >= (this.formItemList.length - 3)) {
                            obj.noShow = noShow
                        }
                    });
                }
            },
            getInitSelect () {  //初始化下拉列表
                return new Promise((resolve,reject) => {
                    this.$http.post(this.baseUrl+'/ticket/ticket/v1/queryInitData', this.QS.stringify({
                        access_token: this.Cookies.get('token'),
                        scenicType: '01'
                    })).then(res => {
                        if (res.data.code == 200) {
                            let data = res.data.data;
                            let [a, b, c] = ['', '', ''];
                            for (let i = 0; i < this.formItemList.length; i++) {
                                switch (this.formItemList[i].keyName) {
                                    case 'bycategorytype':
                                        a = i; break;
                                    case 'bymaketicketway':
                                        b = i; break;
                                    case 'bymediatype':
                                        c = i; break;
                                    default: break
                                }
                            }
                            for (let j in data) {
                                if (j == 'protype' || j == 'mediatypelist' || j == 'cpfslist') {
                                    let x = '';
                                    switch (j) {
                                        case 'protype':
                                            x = a; break;
                                        case 'cpfslist':
                                            x = b; break;
                                        case 'mediatypelist':
                                            x = c; break;
                                        default: break
                                    }
                                    data[j].forEach(item => {
                                        this.formItemList[x].optionList.push({
                                            value: item.pmcd,
                                            label: item.pmva,
                                        })
                                    })
                                }
                            }
                            resolve()
                        } else {
                            this.$common.showMessageModal(this, res, 1);
                            this.spinShow = false;
                            reject()
                        }
                    })
                });
            },
            setAddInitData () {    //初始化新增页面
                this.formDatas = {
                    timestock: [
                        {
                            time_start: '',
                            time_end: '',
                            stock: ''
                        }
                    ],
                    szscenicname: this.$route.params.parentId.split('-')[1],
                    iscenicid: this.$route.params.parentId.split('-')[0],
                    bispersontimestat: 1,
                    int1: 1,
                    byisuse: 1,
                    int3: 0,
                    byusage: 0,
                    byuselimit: 0,
                    bycategorytype: this.formItemList[5].optionList[0].value,
                    bymaketicketway: this.formItemList[8].optionList[0].value,
                    bymediatype: this.formItemList[9].optionList[0].value,
                    mnominalfee: '0.0',
                    isequence: 0,
                    validityday: 1
                };
                this.spinShow = false;
            },
            setEditInitData () {    //初始化修改页面
                this.$http.get(`${this.baseUrl}/ticket/ticket/v1/productView`,{
                    params: {
                        access_token: this.Cookies.get('token'),
                        itickettypeid: this.$route.params.id
                    }
                }).then(res => {
                    if (res.data.code == 200) {
                        this.formDatas = res.data.data;
                        this.spinShow = false;
                    } else {
                        this.$common.showMessageModal(this, res, 1);
                        this.spinShow = false
                    }
                })
            },
            handleSuccess (arr) {   //图片上次成功
                arr.forEach(item => {
                    if (!item.url) {
                        item.url = item.response.data.info.url
                    }
                });
                this.formItemList[10].imgArr = arr
            },
            handleMove(index, direction) {    //移动图片位置
                let i = '';
                for (let j = 0; j < this.formItemList.length; j++) {
                    if (this.formItemList[j].type == 18) {
                        i = j;
                        break;
                    }
                }
                if (direction == 'left') {
                    this.swapArray(this.formItemList[i].imgArr, index, index-1)
                } else {
                    this.swapArray(this.formItemList[i].imgArr, index, index+1)
                }
            },
            swapArray(arr, index1, index2) {    //互换数组元素位置
                arr[index1] = arr.splice(index2, 1, arr[index1])[0];
                return arr;
            }
        },
        watch: {
            '$route' () {
                // this.spinShow = true;
                this.setPageName()
            },
            'formDatas.int3' (val) {
                if (val == 1) {
                    this.tabShowOrHide(false, true)
                } else {
                    this.tabShowOrHide(true, true)
                }
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
