<template>
    <div>
        <Card>
            <p slot="title">{{pageName}}客源地</p>

            <detail-form1
                :form-name="formName"
                :form-datas="formData"
                :form-item-list="formItemList"
                :rule-datas="ruleDatas"
                :is-list-page="false"
                :is-mixed="false"
                :label-width="labelWidth"
                @getFormData="getFormData"
            ></detail-form1>
            <loading v-if="spinShow"></loading>
        </Card>
    </div>
</template>
<script>
export default {
    data () {
        const inputNumber = (rule, value, callback) => {
            var regPos = /^\d+(\.\d+)?$/; //非负浮点数
            var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
            if (value != '') {
                if(regPos.test(value) || regNeg.test(value)){
                    callback();
                }else{
                    callback(new Error('请输入数字'));
                }
            }else{
                callback();
            }
        };
        return {
            labelWidth : 140,
            formData : {},
            formItemList : [
                {
                    label : '客源地代码',
                    keyName : 'szregionalcode',
                    type : 1,
                    isRequired : true
                },{
                    label : '客源地名称',
                    keyName : 'szregionalname',
                    type : 1,
                    isRequired : true
                },{
                    label : '上级名称',
                    keyName : 'szinnername',
                    type : 9,
                    noShow : true
                },{
                    label : '层级',
                    keyName : 'currentLevel',
                    type : 9
                },{
                    label : '是否使用',
                    keyName : 'byisuse',
                    type : 2,
                    isRequired : true,
                    optionList : [{
                        value : 1,
                        labelName : '是'
                    },{
                        value : 0,
                        labelName : '否'
                    }]
                },{
                    label : '序号',
                    keyName : 'ilevelsequence',
                    type : 1,
                    hasDec : '(如不输入，则系统自动生成)'
                },{
                    label : '备注',
                    keyName : 'szmemo',
                    type : 7
                }
                
            ],
            ruleDatas : {
                ilevelsequence : [
                    { validator: inputNumber, trigger: 'blur' }
                ]
            },
            pageName : '',
            formName : '',
            spinShow : true
        }
    },
    computed : {
        parentName() {
            return this.$route.params.parentName ? this.$route.params.parentName : '';
        }
    },
    methods : {
        setPageName () {
            if(this.$route.params.level>1) this.formItemList[2].noShow = false;
            if(this.$route.name.indexOf("new") != -1){
                this.pageName = '新增';
                this.spinShow = false;
                this.formName = "detailForm_new";
                this.setAddForm();
            }else{
                this.pageName = '修改';
                this.spinShow = true;
                this.formName = "detailForm_edit";
                this.setEditForm();
            }
        },
        setAddForm () {
            this.formData = {
                szregionalcode : '',
                szregionalname : '',
                szinnername : this.parentName,
                ilevel : this.$route.params.level,
                currentLevel : this.$route.params.level + '级',
                byisuse : 1,
                ilevelsequence : '',
                szmemo : '',
                iparentid : this.$route.params.parentId
            }
        },
        setEditForm () { 
            this.$http.get(this.baseUrl+'/sys/sourceRegion/v1/getSourceregionById?access_token='+this.Cookies.get('token')+'&iregionalid='+this.$route.params.id)
            .then(res => {
                if(res.data && res.status == 200){
                    this.formData = res.data;
                    if(this.formData.ilevel > 1){
                        this.formItemList[2].noShow = false;
                    }
                    this.formData["currentLevel"] = this.formData.ilevel + '级';
                    this.spinShow = false;
                }
            })
        },
        getFormData(obj){    //提交表单     
            if(this.pageName == '新增'){
                this.$common.addNewData('/sys/sourceRegion/v1/saveSourceRegion?flag=1',this,obj,'post',true)
            } else if(this.pageName == '修改'){
                this.$common.editData('/sys/sourceRegion/v1/saveSourceRegion?flag=2', this, obj,'post',true)
            }
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
