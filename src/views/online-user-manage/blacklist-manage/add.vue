<template>
    <div>
        <Card>
            <p slot="title">{{pageName}}黑名单用户信息</p>

            <detail-form
                :form-name="formName"
                :form-datas="formData"
                :form-item-list="formItemList"
                :is-list-page="false"
                :is-mixed="false"
            ></detail-form>

        </Card>
    </div>
</template>
<script>
export default {
    data () {
        return {
            formData : {},
            formItemList : [
                {
                    label : "用户名称",
                    keyName : "userName",
                    type : 1,
                    isRequired : true
                },{
                    label : "加入黑名单理由",
                    keyName : "reason",
                    type : 7,
                    isRequired : true
                }
            ],
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
                
            }
        },
        setEditForm () {
            let currentId = this.$route.params.id;
        },
        showChooseDialog () {

        }
    },
    mounted () {
        this.setPageName();
    },
    created () {
        
    },
    watch : {
        '$route' (to,from) {
            this.setPageName();
        } 
    }
}
</script>
