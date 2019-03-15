<template>
  <div class="container">
    <Row>
      <Card>
        <p slot="title" class="slot_title_height">
            <span class="title_span">订单查询</span>
            <top-title-opbtn :btnList="btnList"></top-title-opbtn>
        </p>
        <div class="step">
          <Steps :current="3" status="error">
              <Step title="创建订单" content="这里是该步骤的描述信息"></Step>
              <Step title="已支付" content="这里是该步骤的描述信息"></Step>
              <Step title="已入园" content="这里是该步骤的描述信息"></Step>
              <Step title="已核销" content="这里是该步骤的描述信息"></Step>
          </Steps>
        </div>
        <!-- 基本信息 -->
          <div class="detailBody">
            <div :style="{paddingLeft:'20px',fontWeight:'600'}">基本信息</div>
            <div class="body">
              <Row>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                    <span>订单编号：</span><span >12112123</span>
                </Col>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span>下单账号：</span> <span >123123</span>
                </Col>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span>订单状态：</span><span >312312</span>
                </Col>
            </Row>
          </div>
        </div>
        <!-- 产品信息 -->
              <div :style="{paddingLeft:'20px',fontWeight:'600',margin:'20px  0'}">产品信息</div>
            <radio-table
            :colname="columns1"
            :total='objPage.totalPage'
            :tableData="data1"
            :isRadio="false"
            :pageNum="objPage.size"
            :pageCode="objPage.page+1"
            :loading="loading"
        ></radio-table>

        <div class="wallet">
          <p>订单实际收款：<span class="money">0.05</span>元</p>
        </div>

        <!-- 服务商信息 -->
        <div class="detailBody">
            <div :style="{paddingLeft:'20px',fontWeight:'600'}">服务商信息</div>
            <div class="body">
              <Row>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                    <span>服务商名称:</span><span >12112123</span>
                </Col>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span>联系人姓名:</span> <span >123123</span>
                </Col>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span>联系人手机号:</span><span >312312</span>
                </Col>
            </Row>
          </div>
        </div>

        <!-- 入园人信息 -->
        <div class="detailBody">
            <div :style="{paddingLeft:'20px',fontWeight:'600'}">入园人信息</div>
            <div class="body">
              <Row>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                    <span>姓名:</span><span >12112123</span>
                </Col>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span>联系手机号:</span> <span >123123</span>
                </Col>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span>身份证号码:</span><span >312312</span>
                </Col>
            </Row>
          </div>
        </div>

        <!-- 领票人信息 -->
        <div class="detailBody">
            <div :style="{paddingLeft:'20px',fontWeight:'600'}">领票人信息</div>
            <div class="body">
              <Row>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                    <span>姓名:</span><span >12112123</span>
                </Col>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span>联系手机号:</span> <span >123123</span>
                </Col>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span>身份证号码:</span><span >312312</span>
                </Col>
            </Row>
          </div>
        </div>

        <!-- 支付信息 -->
        <div class="detailBody">
            <div :style="{paddingLeft:'20px',fontWeight:'600'}">支付信息</div>
            <div class="body">
              <Row>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                    <span>支付时间:</span><span >12112123</span>
                </Col>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span>支付方式:</span> <span >123123</span>
                </Col>
            </Row>
          </div>
        </div>

        <!-- 检票信息 -->
        <div class="detailBody">
            <div :style="{paddingLeft:'20px',fontWeight:'600'}">检票信息</div>
            <div class="body">
              <Row>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                    <span>通过总次数:</span><span >12112123</span>
                </Col>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span>首次检票时间:</span> <span >123123</span>
                </Col>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span>园门:</span> <span >123123</span>
                </Col>
            </Row>
            <Row>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                    <!-- <span>通过总次数:</span><span >12112123</span> -->
                </Col>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span>第二次检票时间:</span> <span >123123</span>
                </Col>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span>园门:</span> <span >123123</span>
                </Col>
            </Row>
          </div>
        </div>


        <div class="btn">
           <Button type="primary" shape="circle" class="close">关闭</Button>
        </div>
      </Card>
    </Row>
  </div>
</template>

<script>
  export default {
      data () {
          return {
              loading: false,
              btnList: [
                  {
                      type: 1,
                      btnlabel: '刷新'
                  }
              ],
              objPage: {
                  totalPage: 0,
                  page: 0,
                  size: 10
              },
              columns1: [
                  {
                      title: '产品名称',
                      key: 'name',
                      align: 'center'
                  },
                  {
                      title: '类别',
                      key: 'type',
                      align: 'center'
                  },
                  {
                      title: '状态',
                      key: 'state',
                      align: 'center'
                  },
                  {
                      title: '单价',
                      key: 'price',
                      align: 'center'
                  },
                  {
                      title: '数量',
                      key: 'count',
                      align: 'center'
                  },
                  {
                      title: '优惠金额(元)', // 结算系统传过来的单号
                      key: 'Uprice',
                      align: 'center'
                  },
                  {
                      title: '产品总价',
                      key: 'allPrice',
                      align: 'center'
                  }
              ],
              data1: [
                  {
                      name: 'zhansan',
                      type: '类别',
                      state: '状态',
                      price: '单价',
                      count: '数量',
                      Uprice: '优惠金额',
                      allPrice: '产品总价'

                  }
              ]

          };
      }
  
  };
</script>

<style lang="less" scoped>
  .container {
    .step {
      margin: 10px 200px;
    }
    .wallet {
      text-align: right;
      margin-right: 50px;
      .money {
        font-size:20px;
        color:red;
      }
    }
    .btn {
      margin: 50px auto;
      text-align: center;
      .close {
        padding: 10px 40px;
      }
    }
  }
  .detailBody {
    margin-top: 20px;
    .body {
      padding: 20px;
      border: 1px solid #dcdee2;
      border-top: 0px;
    }
}
</style>
