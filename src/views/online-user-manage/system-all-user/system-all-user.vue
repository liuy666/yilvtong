<style scoped>

</style>
<template>
    <div>
        <Row>
            <Card>
                <p slot="title" class="slot_title_height">
                    <span class="title_span">系统总用户数</span>
                    <top-btn
                        :btn-list="btnList"
                    ></top-btn>
                </p>
                <detail-form1
                        :isListPage="true"
                        :isMixed="false"
                        :formDatas="pars.formDatas"
                        :formItemList="formItemList_list"
                        :disabledStartDate="disabledStartDate"
                        :disabledEndDate="disabledEndDate"
                        :disabledEnd="disabledEnd"
                        @getFormData="getFormData"
                        @clearFormData="clearFormData"
                        @setFastDay="setFastDay"
                ></detail-form1>
                <radio-table
                    :colname="colname"
                    :total='total'
                    :tableData="tableData"
                    :pageNum="pars.pageNum"
                    :pageCode="pars.pageCode"
                    :loading="loading"
                ></radio-table>
            </Card>
        </Row>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
export default {
    data(){
        return{
            spinShow: true,
            //按钮部分
            disabledStartDate: [9999,0],
            disabledEndDate: [9999,0],
            disabledEnd: 0,
            btnList :[
                {
                    type : 1,
                    btnlabel : "刷新"
                }
            ],
            formItemList_list: [
                {
                    type: 4,
                    label: '所属企业',
                    keyName: 'companyinfoid',
                    optionList: [],
                    labelWidth: 80
                },
                {
                    type: 11,
                    label: '日期段',
                    double: true,
                    keyName: 'rzti',
                    keyName1: 'ldti',
                    class: 'float_option_50',
                    isShowFiveOptions: true,
                    labelWidth: 65
                }
            ],
            //表格部分
            colname: [
                {
                    title: '用户类别',
                    render: (h, params) => {
                        return h('span', params.row.userType)
                    }
                },
                {
                    title: '数量',
                    key: 'userNum',
                }
            ],
            tableData: [],
            pars:{
                formDatas: {
                    rzti: '',
                    ldti: '',
                },
                pageNum:10,
                pageCode:1,
            },
            total:0,
            loading: true,
        }
    },
    methods: {
        setFastDay (day) {  //近多少多少天
            this.pars.formDatas.rzti = this.$common.getCurrentDate();
            this.pars.formDatas.ldti = this.$common.getCurrentDate();
            if (day === -1) {
                this.pars.formDatas.rzti = this.$common.getCurrentDate(this.pars.formDatas.rzti,day);
                this.pars.formDatas.ldti = this.$common.getCurrentDate(this.pars.formDatas.ldti,day);
            } else if (day < -1){
                this.pars.formDatas.rzti = this.$common.getCurrentDate(this.pars.formDatas.rzti,day+1);
                this.pars.formDatas.ldti = this.$common.getCurrentDate(this.pars.formDatas.ldti);
            }
        },
        getFormData (data) {
            if (!this.$common.validateDate(this, data.rzti, data.ldti)) return;
            this.loading = true;
            data = JSON.parse(JSON.stringify(data));
            if (data.rzti) data.rzti = this.$common.getCurrentDate(data.rzti);
            if (data.ldti) data.ldti = this.$common.getCurrentDate(data.ldti);
            this.getTableData(data)
        },
        clearFormData(){
            this.pars.formDatas = {
                rzti: '',
                ldti: '',
                companyinfoid: '',
            }
        },
        getTableData (data) {
            this.$http.get(`${this.baseUrl}/ec/custom/getCustomCount`, {
                params: {
                    access_token: this.Cookies.get('token'),
                    companyinfoid: data.companyinfoid,
                    rzti: data.rzti,
                    ldti: data.ldti,
                }
            }).then(res => {
                if (res.data.code === 200) {
                    let data = res.data.data;
                    let arr = [];
                    for (let i in data) {
                        arr.push({
                            userType: i,
                            userNum: data[i]
                        })
                    }
                    arr[1] = arr.splice(2, 1, arr[1])[0];   //互换数组元素位置
                    this.tableData = arr;
                } else {
                    this.$common.showMessageModal(this, res ,1);
                }
                this.loading = false;
                this.spinShow = false
            })
        }
    },
    async created () {
        const url = `${this.baseUrl}/sys/company/v1/getScenicCompanyInfoList`;
        const options = await this.$common.getSelectItem(url, this, 0, 'icompanyinfoid', 'szcompanyname', true);
        this.formItemList_list[0].optionList = options;
        this.getTableData(this.pars.formDatas)
    },
    watch: {
        'pars.formDatas.rzti' (val) {
            let time = 0;
            this.disabledEnd = Date.parse(val);
            time = Math.floor((new Date().getTime() - this.disabledEnd)/86400000);
            this.disabledEndDate = [-1,time]
        }
    }
}
</script>
