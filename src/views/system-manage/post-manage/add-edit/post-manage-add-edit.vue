<template>
    <div>
        <Card>
            <p slot="title">{{pageName}}岗位信息</p>

            <detail-form
                :form-name="formName"
                :form-datas="formData"
                :form-item-list="formItemList"
                :is-list-page="isListPage"
                :is-mixed="isMixed"
            ></detail-form>

        </Card>
    </div>
</template>
<script>
import detailForm from '../../../main-components/detail-form.vue'
export default {
    components : {
        detailForm
    },
    data () {
        return {
            addFormDatas : {
                postNum : '',
                postName : '',
                postType : 2,
                status : 1,
                postDec : ''
            },
            editFormDatas : JSON.parse(localStorage.getItem('params'))["postData"],
            formItemList : [
                {
                    label : '岗位代码',
                    keyName : 'postNum',
                    type : 1,
                    isRequired : true
                },{
                    label : '岗位名称',
                    keyName : 'postName',
                    type : 1,
                    isRequired : true
                },{
                    label : '岗位类型',
                    keyName : 'postType',
                    type : 4,
                    isRequired : true,
                    optionList : [{
                        value : 2,
                        label : '平台岗位'
                    },{
                        value : 3,
                        label : '景区岗位'
                    }]
                },{
                    label : '是否使用',
                    keyName : 'status',
                    type : 2,
                    isRequired : true,
                    optionList : [{
                        value : 0,
                        labelName : '禁用'
                    },{
                        value : 1,
                        labelName : '启用'
                    }]
                },{
                    label : '岗位描述',
                    keyName : 'postDec',
                    type : 7
                }
            ],
            isListPage : false,
            isMixed : false,
            pageName : '',
            formName : ''
        }
    },
    methods : {
        setPageName () {
            if(this.$route.name.indexOf("new") != -1){
                this.pageName = '新增';
                this.formName = "detailForm_new";
            }else{
                this.pageName = '修改';
                this.formName = "detailForm_edit"
            }
        }
    },
    mounted () {
        this.setPageName();
    },
    computed : {
        formData () { debugger
            if(this.$route.name.indexOf("new") != -1){
                return this.addFormDatas
            }else{
                return this.editFormDatas
            }
        }
    },
    watch : {
        '$route' (to){ debugger
            this.setPageName();
            this.addFormDatas = {
                postNum : '',
                postName : '',
                postType : 2,
                status : 1,
                postDec : ''
            }
            this.editFormDatas = JSON.parse(localStorage.getItem('params'))["postData"]
            // if(to.path == "/post_edit"){
            //     this.formDatas = JSON.parse(localStorage.getItem('params'))["postData"];
            // }
            // if(to.path == "/post_new"){
            //     this.formDatas = {
            //         postNum : '',
            //         postName : '',
            //         postType : 2,
            //         status : 1,
            //         postDec : ''
            //     };
            // }
        }
    }
}
</script>
