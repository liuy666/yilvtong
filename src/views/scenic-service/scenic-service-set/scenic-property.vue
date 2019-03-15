<template>
    <div>
        <Card>
            <p slot="title">景区属性</p>

            <detail-form1
                :form-datas="formData"
                :form-item-list="formItemList"
                :label-width="labelWidth"
                :rule-datas="ruleDatas"
                :is-list-page="false"
                :is-mixed="false"
                @getFormData="getFormData"
            ></detail-form1>

            <Spin size="large" fix v-if="spinShow"></Spin>

        </Card>
    </div>
</template>
<script>
export default {
    data () {
        return {
            labelWidth : 200,
            formData : {},
            formItemList : [
                {
                    label : 'id',
                    keyName : "iscenicid",
                    type : 9,
                    isHidden : true
                },
                {
                    label : '服务商名称',
                    keyName : 'szscenicname',
                    type : 9
                },{
                    label : '是否通用售票',
                    keyName : 'inoteger4',
                    type : 2,
                    optionList : [{
                        value : 0,
                        labelName : '否'
                    },
                    {
                        value : 1,
                        labelName : '是'
                    }]
                },{
                    label : '订单是否可以修改',
                    keyName : 'numter1',
                    type : 2,
                    optionList : [{
                        value : 0,
                        labelName : '否'
                    },{
                        value : 1,
                        labelName : '是'
                    }]
                },{
                    label : '是否打印副卷',
                    keyName : 'inoteger1',
                    type : 2,
                    optionList : [{
                        value : 0,
                        labelName : '不打印'
                    },{
                        value : 1,
                        labelName : '是'
                    }]
                },{
                    label : '是否直接出票',
                    keyName : 'inoteger3',
                    type : 2,
                    optionList : [{
                        value : 0,
                        labelName : '否'
                    },{
                        value : 1,
                        labelName : '是'
                    }]
                },{
                    label : 'IC卡是否入库售票',
                    keyName : 'inoteger5',
                    type : 2,
                    optionList : [{
                        value : 0,
                        labelName : '否'
                    },{
                        value : 1,
                        labelName : '是'
                    }]
                },{
                    label : '预制票退票后是否可再次销售',
                    keyName : 'noted4',
                    type : 2,
                    optionList : [{
                        value : '0',
                        labelName : '不销售'
                    },{
                        value : '1',
                        labelName : '销售'
                    }]
                },{
                    label : 'IC卡检票方式',
                    keyName : 'noted5',
                    type : 2,
                    optionList : [{
                        value : '0',
                        labelName : '在线'
                    },{
                        value : '1',
                        labelName : '离线数据存服务器(指纹存数据库)'
                    },{
                        value : '2',
                        labelName : '纯离线(全部存卡里)'
                    }]
                },{
                    label : 'IC卡密码验证模式',
                    keyName : 'meet',
                    type : 2,
                    optionList : [{
                        value : '0',
                        labelName : 'A'
                    },{
                        value : '1',
                        labelName : 'B'
                    }]
                },{
                    label : '套票是否可单独退子票',
                    keyName : 'inoteger6',
                    type : 2,
                    optionList : [{
                        value : 0,
                        labelName : '否'
                    },{
                        value : 1,
                        labelName : '是'
                    }]
                },{
                    label : '是否允许现付',
                    keyName : 'inoteger7',
                    type : 2,
                    optionList : [{
                        value : 0,
                        labelName : '否'
                    },{
                        value : 1,
                        labelName : '是'
                    }]
                },{
                    label : '服务商优惠类型',
                    keyName : 'inoteger8',
                    type : 2,
                    optionList : [{
                        value : 0,
                        labelName : '最高价'
                    },{
                        value : 1,
                        labelName : '最低价'
                    },{
                        value : '2',
                        labelName : '指定产品'
                    }]
                },{
                    label : '预订成团人数',
                    keyName : 'inoteger10',
                    type : 1,
                    // isRequired : true,
                    hasDec : '(0表示不控制人数)',
                    isGrayDec : true,
                    className : 'input-small'
                },{
                    label : '可修改游览日期次数控制',
                    keyName : 'inoteger9',
                    type : 1,
                    // isRequired : true,
                    hasDec : '(0表示不控制次数)',
                    isGrayDec : true,
                    className : 'input-small'
                },{
                    label : '二维码自定义网址',
                    keyName : 'noted9',
                    type : 1,
                    // isRequired : true,
                    hasDec : '(可定义票号参数：{1})',
                    isGrayDec : true,
                    className : 'input-large'
                },{
                    label : '景区固有服务',
                    keyName : 'noted1',
                    type : 7,
                    hasDec : '最多输入400字',
                    isRedDec : true
                },{
                    label : '景区娱乐设施',
                    keyName : 'noted2',
                    type : 7,
                    hasDec : '最多输入400字',
                    isRedDec : true
                }
                
            ],
            ruleDatas : {
                noted1 : [
                    { type: 'string', max: 400, message: '最多输入400字', trigger: 'blur' }
                ],
                noted2 : [
                    { type: 'string', max: 400, message: '最多输入400字', trigger: 'blur' }
                ]
            },
            tipName : '景区属性设置',
            formName : '',
            spinShow : true
        }
    },
    methods : {
        getFormData(obj){    //提交表单          
            this.$common.editData('/ticket/provider/v1/saveScenicprovider', this, obj,'post')
        }
    },
    mounted () {
        
    },
    created () {
        //获取服务商属性信息
        this.$http.get(this.baseUrl+'/ticket/provider/v1/queryScenicProvider?access_token='+this.Cookies.get('token')+'&iscenicId='+this.$route.params.id)
        .then(res => {
            if(res.data.code == 200){
                this.formData = res.data.data;
                this.spinShow = false;
            }else{
                this.formData = {
                    szscenicname : this.$route.params.name,
                    inoteger4 : 0,
                    numter1 : 1,
                    inoteger1 : 0,
                    inoteger3 : 0,
                    inoteger5 : 1,
                    noted4 : '0',
                    noted5 : '0',
                    meet : '1',
                    inoteger6 : 0,
                    inoteger7 : 0,
                    inoteger8 : 0,
                    inoteger10 : 0,
                    inoteger9 : 0
                }
            }
        })
        
    }
}
</script>
