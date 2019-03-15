<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">分组类别</span>
                    <top-btn
                            :btnList="btnList"
                            @changeIndex="changeIndex"
                    ></top-btn>
                </p>
                <radio-table
                        :colname="colname"
                        :total='total'
                        :tableData="tableData"
                        :isRadio="false"
                        :pageNum="pars.pageNum"
                        :pageCode="pars.pageCode"
                        :loading="loading"
                        @changePage="changePage"
                        @changePageSize="changePageSize"
                ></radio-table>
            </Card>
            <Card v-show="currentIndex === 12 || currentIndex === 13">
                <p slot="title" class="slot_title_height">
                    <span v-if="currentIndex === 12" class="title_span">新增分组类别</span>
                    <span v-if="currentIndex === 13" class="title_span">修改分组类别</span>
                </p>
                <detail-form1
                        :form-datas="formDatas_add"
                        :form-item-list="formItemList_add"
                        :is-list-page="false"
                        :is-mixed="false"
                        :is-close="isClose"
                        @getFormData="getFormData_add"
                        @closeCurrentPage="closeCurrentPage"
                ></detail-form1>
            </Card>
        </Row>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                searchCount: 1,
                currentIndex: 1,
                spinShow: true,
                isClose : false,
                btnList: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    },
                    {
                        type: 12,
                        btnlabel: '新增[JSFZ]同级',
                    }
                ],
                colname: [
                    {
                        title: '分组参数',
                        render: (h, params) => {
                            return params.row.id.pmky
                        }
                    },
                    {
                        title: '分组类型值',
                        render: (h, params) => {
                            return params.row.id.pmcd
                        }
                    },
                    {
                        title: '分组类型',
                        key: 'pmva'
                    },
                    {
                        title: '状态',
                        render: (h, params) => {
                            return params.row.isvalue ? '启用' : '停用'
                        }
                    },
                    {
                        title: '操作',
                        render: (h, params) => {
                            return h('span', {
                                'class': {
                                    hover_span: true
                                },
                                on: {
                                    click: () => {
                                        this.changeIndex(13, params.row)
                                    }
                                }
                            }, '修改')
                        }
                    },
                ],
                tableData:[],
                total: 0,
                loading: false,
                pars:{
                    pageNum:10,
                    pageCode:1,
                },
                urlQuery:{},
                tipName: '',
                formDatas_add: {},
                formItemList_add: [
                    {
                        type: 1,
                        label: '参数',
                        keyName: 'pmky',
                        disabled: true,
                    },
                    {
                        type: 1,
                        label: '分组编码',
                        keyName: 'pmcd',
                        hasDec: '若不输入，则系统自动生成',
                        disabled: false,
                        isRedDec: true
                    },
                    {
                        type: 1,
                        label: '分组名称',
                        keyName: 'pmva',
                        isRequired: true
                    },
                    {
                        type: 7,
                        label: '参数备注',
                        keyName: 'note',
                    },
                ]
            }
        },
        methods: {
            // 点击新增修改查看按钮跳到对应页面
            changeIndex (type, row) {
                this.spinShow = true;
                if (type === 12) {
                    this.setAddForm()
                } else if (type === 13) {
                    this.setEditForm(row)
                }
                this.currentIndex = type
            },
            changePage (pageCode) {
                this.pars.pageCode = pageCode;
                this.$common.currentPageData(this.baseUrl+'/sys/priceGroup/v1/priceGroupManager', this, 'get')
            },
            changePageSize (pageSize) {
                this.pars.pageNum = pageSize;
                this.$common.currentPageData(this.baseUrl+'/sys/priceGroup/v1/priceGroupManager', this, 'get')
            },
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pars.pageNum,
                    page: this.pars.pageCode,
                    pmky: 'JSFZ'
                };
            },
            setAddForm () {
                this.tipName = "新增";
                this.formItemList_add[1].disabled = false;
                this.formItemList_add[1].hasDec = '若不输入，则系统自动生成';
                this.formDatas_add = {
                    pmky: 'JSFZ'
                };
                this.spinShow = false;
            },
            setEditForm (row) {
                this.tipName = "修改";
                this.formItemList_add[1].disabled = true;
                this.formItemList_add[1].hasDec = '';
                this.formDatas_add = {
                    id: row.id,
                    pmky: row.id.pmky,
                    pmcd: row.id.pmcd,
                    pmva: row.pmva,
                    note: row.note
                };
                this.spinShow = false;
            },
            async getFormData_add (obj) {
                if(this.currentIndex === 12){
                    await this.$common.addNewData('/sys/priceGroup/v1/jsfzAdd', this, obj, 'post')
                } else if (this.currentIndex === 13){
                    await this.$common.editData('/sys/priceGroup/v1/jsfzEdit', this, obj, 'post')
                }
                this.currentRowData = {};
                this.$common.currentPageData(this.baseUrl+'/sys/priceGroup/v1/priceGroupManager', this, 'get')
            },
            //关闭新增查看页
            closeCurrentPage() {
                this.currentIndex = 1;
            }
        },
        created () {
            this.$common.currentPageData(this.baseUrl+'/sys/priceGroup/v1/priceGroupManager', this, 'get')
        }
    }
</script>

<style scoped>

</style>
