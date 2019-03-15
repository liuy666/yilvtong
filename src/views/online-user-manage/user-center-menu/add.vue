<template>
    <div>
        <Card>
            <p slot="title">{{pageName}}菜单</p>

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
import detailForm from '../../main-components/detail-form.vue'
export default {
    components : {
        detailForm
    },
    data () {
        return {
            formData : {},
            formItemList : [
                {
                    label : '菜单名称',
                    keyName : 'menuName',
                    type : 1,
                    isRequired : true
                },{
                    label : '菜单链接',
                    keyName : 'menuLink',
                    type : 1,
                    isRequired : true
                },{
                    label : '菜单状态',
                    keyName : 'menuStatus',
                    type : 2,
                    isRequired : true,
                    optionList : [{
                        value : 1,
                        labelName : '是'
                    },{
                        value : 2,
                        labelName : '否'
                    }]
                },{
                    label : '所属角色',
                    keyName : 'role',
                    type : 3,
                    isRequired : true,
                    optionList : [{
                        value : 1,
                        labelName : '操作员'
                    },{
                        value : 2,
                        labelName : '导游'
                    },{
                        value : 3,
                        labelName : '分社'
                    },{
                        value : 4,
                        labelName : '散客'
                    },{
                        value : 5,
                        labelName : '总社'
                    },{
                        value : 6,
                        labelName : '接待'
                    },{
                        value : 7,
                        labelName : '分销商'
                    }]
                },{
                    label : '备注',
                    keyName : 'dec',
                    type : 7
                }
                
            ],
            isListPage : false,
            isMixed : false,
            pageName : '',
            formName : ''
        }
    },
    computed : {
        
    },
    methods : {
        setPageName () {
            if(this.$route.name.indexOf("new") != -1){
                this.pageName = '新增';
                this.formName = "detailForm_new";
                this.setAddForm();
            }else{
                this.pageName = '修改';
                this.formName = "detailForm_edit";
                this.setEditForm();
            }
        },
        setAddForm () {
            this.formData = {
                menuName : '',
                menuLink : '',
                menuStatus : 1,
                role : [],
                dec : '',
                parantId : ''
            }
        },
        setEditForm () {
            //修改 从页面传参中取数据 暂时写死
            this.formData = JSON.parse(localStorage.getItem('params'))["userCenterMenu"];
        }
    },
    mounted () {
        this.setPageName();
    },
    created () {
        debugger
    },
    watch : {
        '$route' (to) {
            this.setPageName();
        } 
    }
}
</script>
