<template>
    <div>
        <Card>
            <p slot="title">岗位与职责关联</p>
            <view-del-detail
                :form-datas="notChangeFormData"
                :form-item-list="notChangeFormItem"
                :is-show="isShow"
                :is-view="isView"
            ></view-del-detail>

            <detail-form
                :form-datas="formDatas"
                :form-item-list="formItemList"
                :is-list-page="isListPage"
                :is-mixed="isMixed"
                :tree-data="treeDatas"
            ></detail-form>

        </Card>
    </div>
</template>
<script>
import viewDelDetail from '../../main-components/view-del-detail.vue'
import detailForm from '../../main-components/detail-form.vue'
export default {
    components : {
        viewDelDetail,
        detailForm
    },
    data () {
        return {
            notChangeFormData : {
                postNum : '4',
                postName : '运营'
            },
            notChangeFormItem : [{
                label : '岗位编号',
                keyName : 'postNum'
            },{
                label : '岗位名称',
                keyName : 'postName'
            }],
            formDatas : {
                dutys : '',
                status : 1,
                description : ''
            },
            treeDatas : [
                {
                    title: 'parent 1',
                    expand: true,
                    children: [
                        {
                            title: 'parent 1-1',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-1-1'
                                },
                                {
                                    title: 'leaf 1-1-2'
                                }
                            ]
                        },
                        {
                            title: 'parent 1-2',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-2-1'
                                },
                                {
                                    title: 'leaf 1-2-1'
                                }
                            ]
                        }
                    ]
                }
            ],
            formItemList : [{
                label : '对应职责',
                keyName : 'dutys',
                type : 8
            },{
                label : '是否有效',
                keyName :'status',
                type : 2,
                optionList : [{
                    value : 0,
                    labelName : "禁用"
                },{
                    value : 1,
                    labelName : "启用"
                }]
            },{
                label : '描述',
                keyName : 'description',
                type : 7
            }],
            isShow : false,
            isView : true,
            isListPage : false,
            isMixed : false
        }
    }
}
</script>
