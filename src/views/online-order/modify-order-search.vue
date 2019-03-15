<template>
    <div>
        <template v-if="isShowLoading">
            <loading></loading>
        </template>
        <Card v-show="currentIndex === 1">
            <p slot="title" class="cardTitle">
                <span>订单修改查询</span>
                <topBtn :btnList="btnList"></topBtn>
            </p>
            <detail-form1
                :isListPage="true"
                :formDatas="formDatasModify"
                :formItemList="formItemListModify"
                :ruleDatas="ruleDatas"
                :btnLabelWidth="60"
                @getFormData="getFormData"
                @clearFormData="resetForm"></detail-form1>
            <radioTable 
                :colname="colnames"
                :total="total"
                :tableData="tableData"
                :loading="isLoading"></radioTable>
        </Card>
        <Card v-show="currentIndex === 2">
            <p slot="title" class="cardTitle">
                <span>修改首次游览日期</span>
                <topBtn :btnList="btnList"></topBtn>
            </p>
            <table class="edit">
                <tr>
                    <td>订单编号：</td>
                    <td>{{ orderNumber }}</td>
                </tr>
                <tr>
                    <td>服务商名称：</td>
                    <td>{{ providerName }}</td>
                </tr>
                <tr>
                    <td>首次游览日期：</td>
                    <td>
                        <DatePicker 
                            type="date" 
                            style="width: 200px"
                            v-model="visitDate"
                            :options="options"
                            :transfer="true"></DatePicker>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <Button type="primary" shape="circle" class="addpadding" @click="saveDate">保存</Button>
                        <Button type="info" shape="circle" class="addpadding" @click="handleResetDate">重置</Button>
                        <Button shape="circle" class="addpadding" @click="closeModal">关闭</Button>
                    </td>
                </tr>
            </table>
        </Card>
        <Modal v-model="isReset" width="360">
            <p slot="header" style="color:#5db2ff;">
                <span>初始化取票密码</span>
            </p>
            <div style="text-align:center">
                <img src="@/images/delete.png" />
                <p style="font-size:16px; line-height:30px;margin-top:10px;">你确定要初始化密码吗？</p>
            </div>
            <div slot="footer" style="text-align:center" >
            <Button 
                type="primary" 
                :loading="isModalLoading" 
                @click="sureEvent">确定</Button>
            <Button type="ghost" @click="cancelEvent">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "modify-order-search",
        data() {
            return {
                options: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                isShowLoading: false,
                isLoading: false,
                isReset: false,
                isModalLoading: false,
                resetPwdParams: null,
                currentIndex: 1,
                total: 0,
                tableData: [],
                orderNumber: '',
                providerName: '',
                providerId: '',
                visitDate: new Date(),
                resetDate: '',
                btnList: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    }
                ],
                formDatasModify: {
                    orid: ''
                },
                ruleDatas: {
                    orid: [
                        {
                            required: true,
                            trigger: 'blur',
                            message: '请输入需要查询的订单编号'
                        }
                    ]
                },
                formItemListModify: [
                    {
                        type: 1,
                        label: '订单编号',
                        keyName:'orid',
                        class: 'float-left',
                        labelWidth: 100
                    }
                ],
                colnames: [
                    {
                        title: '订单编号',
                        key: 'orid'
                    },
                    {
                        title: '服务商名称',
                        key: 'szscenicname'
                    },
                    {
                        title: '首次游览日期',
                        key: 'dtstartdate'
                    },
                    {
                        title: '首次游览日期修改',
                        render: (h,params) => {
                            return h('a',{
                                on: {
                                    click: () => {
                                        this.editDate(params.row.orid);
                                    }
                                }
                            },'修改');
                        }
                    },
                    {
                        title: '初始化取票密码',
                        render: (h,params) => {
                            if(params.row.notea != null) {
                                return h('a',{
                                    on: {
                                        click: () => {
                                            this.isReset = true;
                                            this.resetPwdParams = {
                                                orid: params.row.orid,
                                                iscenicid: params.row.iscenicid
                                            };
                                        }
                                    }
                                },'初始化密码');
                            }
                            else {
                                return h('span','不可初始化');
                            }
                        }
                    }
                ]
            }
        },
        methods: {
            // 根据订单查询
            async getFormData() {
                this.isLoading = true;
                const res = await this.$api.get(this.baseUrl + '/ec/editOrder/v1/orderInfo/' + this.formDatasModify.orid);
                // console.log(res);
                if(!res) {
                    this.isLoading = false;
                    return;
                }
                
                this.tableData = res.data;
                this.total = 1;
                this.isLoading = false;
            },
            // 修改游览日期
            async editDate(orid) {
                this.isShowLoading = true;
                const preEditRes = await this.$api.get(this.baseUrl +'/ec/editOrder/v1/editDatePre/' + orid);
                // console.log(preEditRes);
                if(!preEditRes) {
                    this.isShowLoading = false;
                    return;
                }

                this.orderNumber = orid;
                this.providerName = preEditRes.data.szscenicname;
                this.providerId = preEditRes.data.iscenicid;
                this.visitDate = preEditRes.data.dtstartdate;
                this.resetDate = preEditRes.data.dtstartdate;
                this.currentIndex = 2;
                this.isShowLoading = false;
            },
            // 重置首次游览日期
            handleResetDate() {
                this.visitDate = this.resetDate;
            },
            // 关闭修改页
            closeModal() {
                this.currentIndex = 1;
            },
            // 保存修改
            async saveDate() {
                // 处理当天时间
                // let today1 = this.$handle.formatDate(new Date()), // 格式化当天时间，舍去时分秒
                //     today2 = new Date(today1 + 'T00:00:00'), // 重新转成日期标准格式
                //     today3 = Date.parse(today2); // 得到具体毫秒值
                // let visitDate = Date.parse(this.visitDate);
                // if((visitDate - today3) < 0) {
                //     this.$Modal.warning({
                //         title: '温馨提示',
                //         content: '待修改的首次游览日期不能小于当前日期'
                //     });
                //     return;
                // }
                // if((visitDate - today3) === 0) {
                //     this.$Modal.warning({
                //         title: '温馨提示',
                //         content: '待修改的首次游览日期已经等于当前日期'
                //     });
                //     return;
                // }
                this.isShowLoading = true;
                const editRes = await this.$api.get(this.baseUrl + '/ec/editOrder/v1/editDate',{
                    orid: this.orderNumber,
                    iscenicid: this.providerId,
                    rzti: this.$handle.formatDate(this.visitDate)
                });
                // console.log(editRes);
                if(!editRes) {
                    this.isShowLoading = false;
                    return;
                }

                const requeryRes = await this.$api.get(this.baseUrl + '/ec/editOrder/v1/orderInfo/' + this.orderNumber);
                // console.log(requeryRes);
                this.tableData = requeryRes.data;
                this.total = 1;
                this.$Modal.success({
                    title: '操作成功',
                    content: '修改首次游览日期成功，欢迎使用易旅通智慧景区系统'
                });
                this.currentIndex = 1;
                this.isShowLoading = false;
            },
            // 重置密码
            async sureEvent() {
                this.isModalLoading = true;
                const resetPwdRes = await this.$api.get(this.baseUrl + '/ec/editOrder/v1/initOrderPassword',this.resetPwdParams);
                // console.log(resetPwdRes);
                if(!resetPwdRes) {
                    this.isModalLoading = false;
                    return;
                }

                this.$Modal.success({
                    title: '操作成功',
                    content: resetPwdRes.msg
                });
                this.isModalLoading = false;
                this.isReset = false;
            },
            // 取消重置密码
            cancelEvent() {
                this.isReset = false;
            },
            // 重置表单
            resetForm() {
                this.formDatasModify.orid = '';
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