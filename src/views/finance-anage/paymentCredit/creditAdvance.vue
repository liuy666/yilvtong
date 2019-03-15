
<template>
<div>
  <Row>
      <Card>
          <p slot="title" class="slot_title_height">
              <span class="title_span">授信/预付款管理 </span>
              <top-title-opbtn :btnList="btnList"></top-title-opbtn>
          </p>
           <Row :style="{marginBottom:'20px',minWidth:'1300px'}">
              <Col span="18">
                <RadioGroup v-model="selectVal" @on-change="changeselect">
                  <Radio label="queryNum">
                    <span style="margin-right:10px">按用户编号查询</span>
                    <Input v-model="userNumber" :disabled="isuserNumber" placeholder="请输入用户编号" :style="{width:'150px',marginRight:'15px'}" />
                  </Radio>
                  <Radio label="queryUser">
                    <span style="margin-right:10px">按联系人姓名模糊查询</span>
                    <Input v-model="userName" :disabled="isuserName" placeholder="请输联系人姓名" :style="{width:'150px',marginRight:'15px'}"/>
                  </Radio>
                  <Radio label="queryemail">
                    <span style="margin-right:10px">按邮箱或手机号码查询</span>
                    <Input v-model="contactWay" :disabled="iscontactWay" placeholder="请输入邮箱或手机号码" :style="{width:'150px',marginRight:'15px'}"/>
                  </Radio>
              </RadioGroup>
            </Col>
              <Col span="6">
               <Button v-if="isIsOpenUser" type="primary" shape="circle" :style="{margin:'0 10px',width:'80px'}" @click="query">查询</Button>
              <Button v-else type="primary" shape="circle" :style="{margin:'0 10px',width:'80px'}" disabled>查询</Button>
              <Button v-if="isIsOpenUser" shape="circle" style="width:80px" @click="resetQuery">重置</Button>
              <Button v-else shape="circle" style="width:80px" disabled>重置</Button>
              </Col>
            </Row>
          <radio-table
            :colname="colname"
            :total='objPage.totalPage'
            :tableData="data1"
            :isRadio="false"
            :pageNum="objPage.size"
            :pageCode="objPage.page"
            :loading="loading"
            @changePage="changePage"
            @changePageSize="changePageSize"
        ></radio-table>
      </Card>
  </Row>
</div>
</template>

<script>
export default {
    data () {
        return {
            btnList: [
                {
                    type: 1,
                    btnlabel: '刷新'
                }
            ],
            objPage: {
                totalPage: 0,
                page: 1,
                size: 10
            },
            loading: false,
            selectVal: '',
            userNumber: '',
            isuserNumber: true,
            userName: '',
            isuserName: true,
            contactWay: '',
            iscontactWay: true,
            isIsOpenUser: true,
            token: this.Cookies.get('token'),
            colname: [
                {
                    title: '用户编号',
                    key: 'number',
                    width: 150,
                    align: 'center'
                },
                {
                    title: '用户昵称',
                    key: 'userName',
                    width: 150,
                    align: 'center'
                },
                {
                    title: '公司名称',
                    key: 'CorporateName',
                    width: 200,
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'operation',
                    width: 180,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                    color: '#5DB2FF',
                                    marginRight: '10px',
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        var user = this.data1[params.index];
                                        this.getSettleMerchantId(user, 'credit');
                                    }
                                }
                            }, '授信管理'),
                            h('span', {
                                style: {
                                    color: '#5DB2FF',
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        var user = this.data1[params.index];
                                        this.getSettleMerchantId(user, 'Advance');
                                    }
                                }
                            }, '预付款管理')
                        ]);
                    }
                },
                {
                    title: '服务商',
                    key: 'facilitator',
                    width: 150,
                    align: 'center'
                },
                {
                    title: '用户状态',
                    key: 'userStatus',
                    width: 150,
                    align: 'center'
                },
                {
                    title: '联系人',
                    key: 'Contacts',
                    width: 150,
                    align: 'center'
                },
                {
                    title: '手机号码',
                    key: 'mobilePhone',
                    width: 200,
                    align: 'center'
                },
                {
                    title: '注册时间',
                    key: 'joinDate',
                    width: 150,
                    align: 'center'
                },
                {
                    title: '最后一次登录时间',
                    key: 'LastLogin',
                    width: 150,
                    align: 'center'
                }
            ],
            data1: []
        };
    },
    mounted () {
        this.isOpenUser();
    },
    methods: {
        changePage (pageCode) {
            this.objPage.page = pageCode;
            this.getAxios();
        },
        changePageSize (pageSize) {
            this.objPage.size = pageSize;
            this.getAxios();
        },
        isOpenUser () {
            this.loading = true;
            this.data1 = [];
            try {
                this.$http.get(`${this.fm}/finance/basis/isOpenSettleAccount?access_token=${this.token}&type=1`).then(res => {
                    var data = res.data;
                    if (data.return_code === 'FAIL') {
                        this.loading = false;
                        this.isIsOpenUser = false;
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: data.return_msg
                        });
                        return false;
                    } else {
                        this.loading = false;
                        this.isIsOpenUser = true;
                        this.getAxios();
                    }
                });
            } catch (err) {
                this.loading = false;
                this.isIsOpenUser = false;
                console.log(err);
            }
        },
        async getAxios () {
            if (!this.isuserNumber) {
                if (this.userNumber === '') {
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '请输入要查询的用户编号'
                    });
                    return false;
                }
            } else if (!this.isuserName) {
                if (this.userName === '') {
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '请输入要查询的系人姓名'
                    });
                    return false;
                }
            } else if (!this.iscontactWay) {
                if (this.contactWay === '') {
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '请输入要查询的邮箱或手机号码'
                    });
                    return false;
                }
            }
            this.data1 = [];
            this.loading = true;
            let params = {
                userName: this.userNumber,
                lname: this.userName,
                emailormobile: this.contactWay,
                type: '1',
                pageSize: this.objPage.size,
                page: this.objPage.page
            };
            var data = await this.$api.get(`${this.fm}/ec/distributor/v1/getMyDistributorConditionsList`, params);
            if (data.code === 200) {
                this.loading = false;
                this.objPage.totalPage = data.data.totalCount;
                data.data.items.map((item, index) => {
                    this.data1.push(
                        {
                            number: item.usid,
                            userName: item.note6,
                            CorporateName: item.corpname,
                            facilitator: item.szscenicname ? item.szscenicname : '',
                            userStatus: item.status === '01' ? '正常' : '停用',
                            Contacts: item.lname,
                            mobilePhone: item.mobile,
                            joinDate: item.ldate ? item.ldate : '',
                            LastLogin: item.lastdate || '',
                            merchantId: item.merchantId, // 商户号
                            consumerId: item.consumerId, // 客户号
                            scenicareacode: item.scenicareacode || '',
                            agentCode: item.agentCode || ''
                        });
                });
            } else if (data.code === 400) {
                this.loading = false;
                this.$Modal.warning({
                    title: '温馨提示',
                    content: data.msg
                });
            } else {
                this.$Modal.warning({
                    title: '温馨提示',
                    content: '请求失败'
                });
            }
        },
        // 单选查询互斥
        changeselect (val) {
            if (val === 'queryNum') {
                this.isuserNumber = false;
                this.isuserName = true;
                this.iscontactWay = true;
                this.userName = '';
                this.contactWay = '';
            } else if (val === 'queryUser') {
                this.isuserNumber = true;
                this.isuserName = false;
                this.iscontactWay = true;
                this.userNumber = '';
                this.contactWay = '';
            } else if (val === 'queryemail') {
                this.isuserNumber = true;
                this.isuserName = true;
                this.iscontactWay = false;
                this.userNumber = '';
                this.userName = '';
            }
        },
        query () {
            this.objPage.page = 1;
            this.getAxios();
        },
        // 重置查询
        resetQuery () {
            this.selectVal = '';
            this.userNumber = '';
            this.userName = '';
            this.contactWay = '';
            this.isuserNumber = true;
            this.isuserName = true;
            this.iscontactWay = true;
            this.getAxios();
        },
        // 当前用户是否开通
        onIsOpen (user, pathType, serviceType, axiosData) {
            if (!user.merchantId || !user.consumerId) {
                this.$Modal.warning({
                    title: '温馨提示',
                    content: '未开户，请开户'
                });
                return false;
            }
            this.loading = true;
            var url = '';
            var params = {};
            if (pathType === 'credit') {
                url = `${this.fm}/finance/credit/creditAccountsInfo`;
                params = {
                    access_token: this.token,
                    marketplaceId: axiosData.platformId, // 平台号 axiosData.platformId
                    merchantId: user.merchantId, // 商户号
                    consumerId: user.consumerId, // 授信客户id
                    type: '1', // 1:后台管理，2：供应商管理，3：分销商管理
                    pageNumber: 0,
                    pageSize: 1
                };
            } else {
                url = `${this.fm}/finance/advancePay/advancePayAccounts/${axiosData.platformId}/${user.merchantId}`;
                params = {
                    access_token: this.token,
                    consumerId: user.consumerId,
                    type: '1', // 1:后台管理，2：供应商管理，3：分销商管理
                    pageNumber: 0,
                    pageSize: 1
                };
            }
            this.$http.get(url, { params: params }).then(res => {
                var data = res.data;
                if (data.return_code === 'SUCCESS') {
                    this.loading = false;
                    if (data.content.page.length > 0) {
                        this.$router.push({
                            path: '/' + pathType,
                            query: {
                                _PAY: serviceType,
                                marketplaceId: axiosData.platformId,
                                merchantId: user.merchantId,
                                consumerId: user.consumerId,
                                No: user.number,
                                userName: user.userName,
                                corpname: user.CorporateName,
                                scenicareacode: user.scenicareacode,
                                agentCode: user.agentCode
                            }
                        });
                    } else {
                        this.loading = false;
                        this.$router.push({
                            path: '/isOpen',
                            query: {
                                _PAY: serviceType,
                                marketplaceId: axiosData.platformId,
                                merchantId: user.merchantId,
                                consumerId: user.consumerId,
                                pathType: pathType,
                                No: user.number,
                                userName: user.userName,
                                corpname: user.CorporateName,
                                scenicareacode: user.scenicareacode,
                                agentCode: user.agentCode
                            }
                        });
                    }
                }
            });
        },
        // 获取结算商户号
        getSettleMerchantId (user, pathType) {
            this.lodaing = true;
            var serviceType = '';
            if (pathType === 'credit') {
                serviceType = 'CREDIT_PAY';
            } else {
                serviceType = 'ADVANCE_PAY';
            }
            try {
                this.$http.get(`${this.fm}/finance/basis/getSettleMerchantId`, {
                    params: {
                        access_token: this.token,
                        usid: user.number,
                        type: '1' // 1:后台管理，2：供应商管理，3：分销商管理
                    }
                }).then(res => {
                    this.loading = false;
                    var data = res.data;
                    if (data.return_code === 'SUCCESS') {
                        if (data.merchantId !== 0 || data.consumerId !== 0) {
                            this.onIsOpen(user, pathType, serviceType, data);
                        }
                    } else {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: data.msg
                        });
                    }
                });
            } catch (err) {
                this.loading = false;
                console.log(err);
            }
        }
    }
};
</script>

 <style lang="less" scoped>
.w_creditInfo {
  padding: 30px 20px;
  .creditInfo {
    border: 1px solid #5db2ff;
    height: 156px;
    position: relative;
    .tit {
      font-size: 16px;
      color: #5db2ff;
      padding: 10px 20px;
      position: absolute;
      top: -22px;
      background: #fff;
      left: 50px;
    }
    .Status {
      font-size: 14px;
      color: #666666;
      text-align: right;
      line-height: 40px;
      span {
        margin-right: 10px;
      }
      .state {
        color: #1aad19;
      }
      .stateBtn {
        color: #5db2ff;
      }
    }
  }
}
.w_query {
  padding: 30px 20px;
}
.table {
  padding: 0px 20px 30px;
  .ivu-table-cell {
    padding: 0;
  }
}
</style>


