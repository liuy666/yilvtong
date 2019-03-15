<template>
    <div>
        <Row>
            <Card>
                <p slot="title" class="slot_title_height">
                    <span class="title_span">设备状态查询</span>
                    <top-btn
                            :btnList="btnList"
                    ></top-btn>
                </p>
                <detail-form1
                        :isListPage="true"
                        :isMixed="false"
                        :formDatas="pars.formDatas"
                        :formItemList="formItemList"
                        @getFormData="getFormData"
                        @clearFormData="clearFormData"
                ></detail-form1>
                <radio-table
                        :colname="colname"
                        :total='total'
                        :tableData="tableData"
                        :pageNum="pars.pageNum"
                        :pageCode="pars.pageCode"
                        :loading="loading"
                        @changePage="changePage"
                        @changePageSize="changePageSize"
                ></radio-table>
            </Card>
            <loading v-if="spinShow"></loading>
        </Row>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                searchCount: 1,
                spinShow: true,
                btnList: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    }
                ],
                formItemList: [
                    {
                        type: 4,
                        label: '所属服务商',
                        keyName:'iscenicid',
                        labelWidth: 90,
                        optionList: []
                    },
                    {
                        type: 4,
                        label: '设备类型',
                        keyName:'result',
                        labelWidth: 75,
                        optionList: []
                    },
                ],
                colname:[
                    {
                        title: '服务商名称',
                        key: 'scenicidname'
                    },
                    {
                        title: '园门名称',
                        key: 'statuswinname',
                    },
                    {
                        title: '设备名称',
                        key: 'statusgardname'
                    },
                    {
                        title: '设备类别',
                        key: 'btype'
                    },
                    {
                        title: '设备',
                        key: 'status'
                    },
                    {
                        title: '设备状态',
                        key: 'byisuse',
                        render: (h, params) => {
                            return h('span', params.row.byisuse === 1 ? '使用中' : '未使用')
                        }
                    },
                    {
                        title: '检测时间',
                        key: 'statusdtime'
                    }
                ],
                tableData:[],
                total: 0,
                loading: false,
                pars:{
                    formDatas:{
                        iscenicid: '',
                        result: ''
                    },
                },
                urlQuery:{}
            }
        },
        methods: {
            changePage(pageCode) {
                let arr = this.$store.state.page.listPagePars;
                for (let item of arr) {
                    if (item.path == this.$route.path && item.index == 1) {
                        this.pars = item.pars;
                        break;
                    }
                }
                this.pars.pageCode = pageCode;
                this.$common.currentPageData(this.baseUrl+'/ticket/accessequip/v1/statusList', this, 'get');
            },
            changePageSize(pageSize){
                let arr = this.$store.state.page.listPagePars;
                for (let item of arr) {
                    if (item.path == this.$route.path && item.index == 1) {
                        this.pars = item.pars;
                        break;
                    }
                }
                this.pars.pageNum = pageSize;
                this.$common.currentPageData(this.baseUrl+'/ticket/accessequip/v1/statusList', this, 'get');
            },
            async getFormData(data){
                this.pars.formDatas = data;
                this.pars.pageCode = 1;
                this.pars.pageNum = 10;
                await this.$common.currentPageData(this.baseUrl+'/ticket/accessequip/v1/statusList', this, 'get');
                if (this.pars.formDatas.result === '01') {
                    this.colname[1].title = '园门名称';
                    this.colname[2].title = '设备名称';
                } else if (this.pars.formDatas.result === '02') {
                    this.colname[1].title = '售票点名称';
                    this.colname[2].title = '售票窗口名称';
                }
            },
            clearFormData(){
                this.pars.formDatas = {
                    iscenicid: this.formItemList[0].optionList[0].value,
                    result: this.formItemList[1].optionList[0].value,
                }
            },
            refreshUrlQuery () {    //需要拼接在url后面的参数
                this.urlQuery = {
                    pageSize: this.pars.pageNum,
                    page: this.pars.pageCode,
                    iscenicid: this.pars.formDatas.iscenicid,
                    result: this.pars.formDatas.result,
                };
            },
        },
        async created () {
            const url = `${this.baseUrl}/ticket/accessequip/v1/selectOfSBLX`;
            const options = await this.$common.getScenicList(this, 0);
            const option1 = await this.$common.getSelectItem(url, this, 1, 'pmcd', 'pmva', 1);
            this.formItemList[0].optionList = options;
            this.formItemList[1].optionList = option1;
            this.pars.formDatas = {
                iscenicid: options[0].value,
                result: option1[0].value
            };
            await this.$common.currentPageData(this.baseUrl+'/ticket/accessequip/v1/statusList', this, 'get');
            if (this.pars.formDatas.result === '01') {
                this.colname[1].title = '园门名称';
                this.colname[2].title = '设备名称';
            } else if (this.pars.formDatas.result === '02') {
                this.colname[1].title = '售票点名称';
                this.colname[2].title = '售票窗口名称';
            }
        },
        // watch: {
        //     'pars.formDatas.result' (val) {
        //         if (val === '01') {
        //             this.colname[1].title = '园门名称';
        //             this.colname[2].title = '设备名称';
        //         } else if (val === '02') {
        //             this.colname[1].title = '售票点名称';
        //             this.colname[2].title = '售票窗口名称';
        //         }
        //     }
        // }

    }
</script>

<style scoped>

</style>
