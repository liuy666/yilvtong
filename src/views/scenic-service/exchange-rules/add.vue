<template>
    <div>
        <Card>
            <p slot="title">{{pageName}}票号规则</p>

            <detail-form1
                :form-datas="formData"
                :form-item-list="formItemList"
                :rule-datas="ruleDatas"
                :is-list-page="false"
                :is-mixed="false"
                :label-width="labelWidth"
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
            labelWidth : 180,
            formData : {},
            formItemList : [
                {
                    label : '票号规则编号',
                    keyName : 'iticketnoruleid',
                    type: 9,
                    noShow : true
                },
                {
                    label : '票号规则代码',
                    keyName : 'szticketnorulecode',
                    type : 1,
                    isRequired : true
                },{
                    label : '票号规则名称',
                    keyName : 'szticketnorulename',
                    type : 1,
                    isRequired : true
                },{
                    label : '所属服务商',
                    keyName : 'iscenicid',
                    type : 4,
                    isRequired : true,
                    optionList : []
                },{
                    label : '票号总长度',
                    keyName : 'iticketnolen',
                    type : 1,
                    isRequired : true
                },{
                    label : '票号前缀长度',
                    keyName : 'intons2',
                    type : 1,
                    isRequired : true
                },{
                    label : '票号前缀字符',
                    keyName : 'szticketnoprefix',
                    type : 1,
                    isRequired : true
                },{
                    label : '票代码长度',
                    keyName : 'itickettypecodepos',
                    type : 1,
                    isRequired : true,
                    hasDec : '（注:与产品编码一样）',
                    isRedDec : true
                },{
                    label : '流水号长度',
                    keyName : 'iserialnolen',
                    type : 1,
                    isRequired : true
                },{
                    label : '票号后缀长度',
                    keyName : 'szticketnosuffix',
                    type : 1,
                    isRequired : true
                },{
                    label : '票号后缀字符',
                    keyName : 'sztron1',
                    type : 1,
                    isRequired : true
                },{
                    label : '',
                    type : 9,
                    labelWidth : 10,
                    hasDec : '注：票号规则组成：票号前缀 + 票代码 + 票流水号 + 票号后缀',
                    isRedDec : true
                },{
                    label : '使用状态',
                    keyName : 'byisuse',
                    type : 2,
                    isRequired : true,
                    optionList : [{
                        value : 1,
                        labelName : '启用'
                    },{
                        value : 0,
                        labelName : '禁用'
                    }]
                },{
                    label : '计算方式',
                    keyName : 'intons1',
                    type : 2,
                    isRequired : true,
                    optionList : [{
                        value : 1,
                        labelName : '十进制'
                    },{
                        value : 0,
                        labelName : '三十六进制'
                    }]
                },{
                    label : '备注',
                    keyName : 'szmemo',
                    type : 7
                }
                
            ],
            ruleDatas : {

            },
            pageName : '',
            formName : '',
            spinShow : true
        }
    },
    methods : {
        setPageName () {
            if(this.$route.name.indexOf("add") != -1){
                this.pageName = '新增';
                this.formName = "detailForm_new";
                this.spinShow = false;
                this.formItemList[0].noShow = true;
                this.setAddForm();
            }else{
                this.pageName = '修改';
                this.formName = "detailForm_edit";
                this.spinShow = true;
                this.formItemList[0].noShow = false;
                this.setEditForm();
            }
        },
        setAddForm () {
            this.formData = {
                szticketnorulecode : '',
                szticketnorulename : '',
                iscenicid : '',
                iticketnolen : 14,
                intons2 : '',
                szticketnoprefix : '',
                itickettypecodepos :'',
                iserialnolen:'',
                szticketnosuffix:2,
                sztron1:'',
                byisuse:1,
                intons1:1,
                szmemo:'',
                iserialnopos : 0
            }
        },
        setEditForm () { 
            this.$http.get(this.baseUrl+'/ticket/ticketRule/v1/getTicketruleById?access_token='+this.Cookies.get('token')+'&iticketnoruleid='+this.$route.params.id)
            .then(res => {
                if(res.data.code == 200){
                    this.formData = res.data.data;
                    this.spinShow = false;
                }
            })
        },
        getFormData(obj){    //提交表单          
            if(this.pageName == '新增'){
                this.$common.addNewData('/ticket/ticketRule/v1/ticketruleSave?flag=1',this,obj,'post',true)
            } else if(this.pageName == '修改'){
                this.$common.editData('/ticket/ticketRule/v1/ticketruleSave?flag=2', this, obj,'post',true)
            }
        },
    },
    mounted () {
        this.setPageName();
    },
    created () {
        //获取景区服务商列表
        this.$common.getScenicList(this,3,false);
    },
    watch : {
        '$route' (to) {
            this.setPageName();
        } 
    }
}
</script>
