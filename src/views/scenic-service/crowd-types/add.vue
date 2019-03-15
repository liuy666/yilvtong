<template>
    <div>
        <Card>
            <p slot="title">{{pageName}}人群种类</p>

            <detail-form1
                :form-datas="formData"
                :form-item-list="formItemList"
                :rule-datas="ruleDatas"
                :is-list-page="false"
                :is-mixed="false"
                :defalut-color="defalutColor"
                :label-width="labelWidth"
                @getFormData="getFormData"
                @getSelectColor="getSelectColor"
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
                    label : '人群种类编码',
                    keyName : 'szcrowdkindcode',
                    type: 1,
                    isRequired : true
                },
                {
                    label : '人群种类名称',
                    keyName : 'szcrowdkindname',
                    type : 1,
                    isRequired : true
                },{
                    label : '是否启用',
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
                    label : '层级',
                    keyName : 'ilevel',
                    type : 9,
                    text : '层'
                },{
                    label : '序号',
                    keyName : 'ilevelsequence',
                    type : 1,
                    className : 'input-small',
                    hasDec : "(如不输入，系统自己生成)",
                    isRedDec : true
                },{
                    label : '描述',
                    keyName : 'szmemo',
                    type : 7
                },{
                    label : '选择颜色',
                    keyName : 'ticketcolor',
                    type : 19
                }
                
            ],
            ruleDatas : {

            },
            pageName : '',
            formName : '',
            spinShow : true,
            defalutColor : '#000000'
        }
    },
    methods : {
        setPageName () {
            if(this.$route.name.indexOf("add") != -1){
                this.pageName = '新增';
                this.formName = "detailForm_new";
                this.spinShow = false;
                this.setAddForm();
            }else{
                this.pageName = '修改';
                this.formName = "detailForm_edit";
                this.spinShow = true;
                this.setEditForm();
            }
        },
        setAddForm () {
            this.formData = {
                szcrowdkindcode : '',
                szcrowdkindname : '',
                byisuse : 1,
                ilevel : 1,
                ilevelsequence : '',
                szmemo :'',
                ticketcolor :'#000000',
                iparentid : 0,
                irootid : 0
            }
        },
        setEditForm () { 
            this.$http.get(this.baseUrl+'/ticket/crowdKind/v1/getCrowdKindInfo?access_token='+this.Cookies.get('token')+'&icrowdkindid='+this.$route.params.id)
            .then(res => {
                if(res.data.code == 200){
                    this.formData = res.data.data;
                    this.spinShow = false;
                }
            })
        },
        getFormData(obj){    //提交表单          
            if(this.pageName == '新增'){
                this.$common.addNewData('/ticket/crowdKind/v1/crowdKindSave?act=1',this,obj,'post',true)
            } else if(this.pageName == '修改'){
                this.$common.editData('/ticket/crowdKind/v1/crowdKindSave?act=2', this, obj,'post',true)
            }
        },
        getSelectColor(currentColor){
            this.formData.ticketcolor = currentColor;
        }
    },
    mounted () {
        this.setPageName();
    },
    created () {
        
    },
    watch : {
        '$route' (to) {
            this.setPageName();
        } 
    }
}
</script>
