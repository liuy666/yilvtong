<template>
    <div id="offline_order">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>
        <Card>
            <p slot="title" class="cardTitle">
                <span>线下订单</span>
                <topBtn :btnList="btnList"></topBtn>
            </p>
            <detail-form1
                :isListPage="true"
                :formDatas="formDatas"
                :formItemList="formItemList"
                customStyle="float-left"
                :btnLabelWidth="50"
                @getFormData="handleQuery"
                @clearFormData="resetForm"></detail-form1>
            <radioTable 
                :colname="colnames"
                :total="total"
                :tableData="tableData"
                :loading="isLoading"
                :pageCode="currentPage"
                @changePageSize="changeSize"
                @changePage="changePage"></radioTable>
        </Card>
    </div>
</template>

<script>
    export default {
        name: "offline-order-search",
        data() {
            return {
                isShowLoading: false,
                isLoading: false,
                total: 0,
                tableData: [],
                btnList: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    }
                ],
                formDatas: {
                    rzti: new Date(), // 起始日期
                    ldti: new Date(), // 末尾日期
                    orid: '', // 售票凭证号,
                    scenicId: '' // 服务商
                },
                formItemList: [
                    {
        				type: 4,
        				keyName: 'scenicId',
                        label: '服务商',
                        labelWidth:60,
                        class: 'float-left',
        				optionList: []
                    },
                    {
                        type: 11,
                        labelWidth: 140,
                        label: '查询日期段',
                        keyName: 'rzti',
                        keyName1: 'ldti',
                        class: 'float-left',
                        double: true,
                        dateType: 'date'
                    },
                    {
                        type: 1,
                        label: '按订单号或票号查询',
                        keyName: 'orid',
                        class: 'float-left',
                        labelWidth: 200
                    }
                ],
                colnames: [
                    {
                        title: '售票凭证号',
                        key: 'isalesvoucherid',
                        minWidth: 360
                    },
                    {
                        title: '订单号',
                        key: 'szsalesvoucherno',
                        minWidth: 170
                    },
                    {
                        title: '分销商名称',
                        key: 'corpname',
                        minWidth: 300
                    },
                    {
                        title: '用户',
                        key: 'lname',
                        minWidth: 140
                    },
                    {
                        title: '票名',
                        key: 'sztickettypename',
                        minWidth: 200
                    },
                    {
                        title: '票号',
                        key: 'szticketprintno',
                        minWidth: 170
                    }
                ],
                providerList: [],
                size: 10,
                QueryBuilder: null,
                currentPage: 1
            }
        },
        async created() {
            this.isShowLoading = true;
            const getProvider = await this.$api.get(this.baseUrl + '/ticket/provider/v1/getScenicProviderByServerName',{
                url: window.location.hostname
            });
            // console.log(getProvider);
            if(!getProvider) {
                this.isShowLoading = false;
                return;
            }

            let pList = getProvider.data;
            if(!pList.length || (pList.length === 1 && pList[0].szscenicname === '所有服务商')) {
                this.$Modal.warning({
                    title: '温馨提示',
                    content: '该景区企业下暂无服务商，请先创建服务商，'
                });
            } else {
                // 去掉所有服务商选项
                let filterList = pList.filter(item => {
                    return item.szscenicname !== '所有服务商';
                });
                this.formItemList[0].optionList = filterList.map(item => {
                    return {
                        value: item.iscenicid,
                        label: item.szscenicname
                    }
                });
                this.providerList = filterList;
                this.formDatas.scenicId = filterList[0].iscenicid;
            }
            this.resetDate();
            this.isShowLoading = false;
        },
        methods: {
            // 根据订单查询
            handleQuery() {
                let startMillisecond = Date.parse(this.formDatas.rzti),
                    endMillisecond = Date.parse(this.formDatas.ldti);
                if(endMillisecond - startMillisecond < 0) {
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '查询起始时间不能超过大于末尾时间'
                    });
                    return false;
                }
                let interval = (endMillisecond - startMillisecond) / 1000 / 3600 / 24;
                if(interval > 30) {
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '查询间隔时间不能超过30天'
                    });
                    return false;
                }
                let queryParams = {
                    rzti: this.$handle.formatDate(this.formDatas.rzti),
                    ldti: this.$handle.formatDate(this.formDatas.ldti),
                    orid: this.formDatas.orid.trim(), 
                    scenicId: this.formDatas.scenicId,
                    page: 1,
                    pageSize: this.size
                }
                this.QueryBuilder = {
                    ...queryParams
                }
                this.currentPage = 1;
                this.executeRequest(queryParams);
            },
            // 翻页查询
            changePage(pageNum) {
                let queryParams = {
                    ...this.QueryBuilder
                }
                queryParams.pageSize = this.size;
                queryParams.page = pageNum;
                this.currentPage = pageNum;
                this.executeRequest(queryParams);
            },
            // 改变每页最大显示条数
            changeSize(size) {
                this.size = size;
                this.changePage(1);
            },
            async executeRequest(args) {
                this.isLoading = true;
                const queryRes = await this.$api.get(this.baseUrl + '/ticket/ticketSale/v1/soldticketSearch',args);
                // console.log(queryRes);
                if(!queryRes) {
                    this.isLoading = false;
                    return;
                }
                
                this.tableData = queryRes.data.items;
                this.total = queryRes.data.totalCount;
                this.isLoading = false;
            },
            // 日期重置 
            resetDate() {
                // 处理当天时间
                let today1 = this.$handle.formatDate(new Date()), // 格式化当天时间，舍去时分秒
                    today2 = new Date(today1 + 'T00:00:00'), // 重新转成日期标准格式
                    today3 = today2.getTime(); // 得到具体毫秒值

                // 处理前三天时间
                let threeDay3 = today3 - 3*24*60*60*1000,
                    threeDay2 = new Date(threeDay3),
                    threeDay1 = this.$handle.formatDate(threeDay2);
                
                this.formDatas.rzti = threeDay1;
                this.formDatas.ldti = today1;
            },
            // 重置表单
            resetForm() {
                this.resetDate();
                this.formDatas.scenicId = this.providerList[0].iscenicid;
            }
        }
    }
</script>

<style scoped lang="less">
    .edit {
        tr {
            height: 55px;
        }
        td:nth-child(odd) {
            text-align: right;
            width: 120px;
        }
        td:nth-child(even) {
            padding-left: 10px;
        }
    }
</style>