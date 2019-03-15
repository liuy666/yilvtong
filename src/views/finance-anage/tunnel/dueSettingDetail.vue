
<template>
<div >
   <Row>
      <Card>
        <p slot="title" class="slot_title_height">
            <span class="title_span">支付渠道配置详情 </span>
            <top-title-opbtn :btnList="btnList"></top-title-opbtn>
        </p>
        <div class="detailBody">
            <div class="detailTit"></div>
            <div class="body">
              <Row :style="{borderBottom:'1px solid  #dcdee2'}">
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                    <span>支付渠道：</span>
                    <span >{{detailInfo.payChannel}}</span>
                </Col>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span>应用场景：</span>
                    <span >{{detailInfo.appScene}}</span>
                </Col>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span>状态：</span>
                    <span >{{detailInfo.state}}</span>
                </Col>
            </Row>
              <!-- 支付宝 -->
              <zhifubao v-if="this.$route.query.channelCode==='ALIPAY'" :info="detailInfo.zhifubao"/>
              <!-- 微信 -->
              <weixin v-if="this.$route.query.channelCode==='WXPAY'" :info="detailInfo.weixin"/>
              <!-- 微信公众号 -->
              <weixinhao v-if="this.$route.query.channelCode==='WXMPPAY'" :info="detailInfo.weixinhao"/>
              <!-- 银联 -->
              <yinlian v-if="this.$route.query.channelCode==='UNIONPAY'" :info="detailInfo.yinlian"/>
              <!-- 中金 -->
              <zhongjin v-if="this.$route.query.channelCode==='CPCN'" :info="detailInfo.zhongjin"/>
              <!-- 工行 -->
              <!-- <gonghang v-if="this.$route.query.channelCode==='ALIPAY'" :info="detailInfo.gonghang"/> -->
              <Row :style="{borderBottom:'1px solid #dcdee2'}">
                  <Col span="24" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'40px'}">
                      <span :style="{fontSize:'18px',fontWeight:'600'}">对应结算账号：</span>
                  </Col>
                  <Col span="8" :style="{margin:'20px 0'}">
                      <span :style="{paddingLeft:'100px'}">开户银行：</span>
                      <span >{{detailInfo.bank}}</span>
                  </Col>
                  <Col span="8" :style="{margin:'20px 0'}">
                      <span :style="{paddingLeft:'100px'}">开户城市：</span>
                      <span >{{detailInfo.city}}</span>
                  </Col>
                   <Col span="8" :style="{margin:'20px 0'}">
                      <span :style="{paddingLeft:'100px'}">开户支行：</span>
                      <span >{{detailInfo.payBank}}</span>
                  </Col>
                  <Col span="8" :style="{margin:'20px 0'}">
                      <span :style="{paddingLeft:'100px'}">开户名称：</span>
                      <span >{{detailInfo.name}}</span>
                  </Col>
                <Col span="8" :style="{margin:'20px 0'}">
                      <span :style="{paddingLeft:'100px'}">开户账号：</span>
                      <span >{{detailInfo.No}}</span>
                  </Col>
              </Row>
            </div>
        </div>
        <Row :style="{textAlign:'center',marginTop:'20px'}">
          <Col span="24">
            <Button type="primary" shape="circle" style="margin-right:10px;width:80px" @click="$router.back(-1)">返回</Button>
          </Col>
        </Row>
      </Card>
   </Row>
</div>   
</template>

<script>
import publicMethod from '@/libs/publicMethod.js';
import tradState from '@/libs/tradState.js';
import zhifubao from './dueSettingDetail_configInfo/zhifubao';
import weixin from './dueSettingDetail_configInfo/weixin';
import weixinhao from './dueSettingDetail_configInfo/weixinhao';
import yinlian from './dueSettingDetail_configInfo/yinlian';
import zhongjin from './dueSettingDetail_configInfo/zhongjin';
import gonghang from './dueSettingDetail_configInfo/gonghang';
export default {
    components: {
        zhifubao,
        weixin,
        weixinhao,
        yinlian,
        zhongjin,
        gonghang
    },
    data () {
        return {
            token: this.Cookies.get('token'),
            btnList: [
                {
                    type: 1,
                    btnlabel: '刷新'
                }
            ],
            // 详情信息
            detailInfo: {
                payChannel: '',
                appScene: '',
                state: '',
                zhifubao: {},
                weixin: {},
                weixinhao: {},
                yinlian: {},
                zhongjin: {},
                // gonghang: {},
                bank: '',
                city: '',
                payBank: '',
                name: '',
                No: ''
            }
        };
    },
    mounted () {
        this.getInfo();
    },
    methods: {
        getInfo () {
            // http://192.168.90.186:8082/finance/tunnel/merchantChannelConfig/232?access_token=121212&marketplaceId=1&merchantId=16
            try {
                this.$http.get(`${this.fm}/finance/tunnel/merchantChannelConfig/${this.$route.query.id}`, {
                    params: {
                        access_token: this.token,
                        marketplaceId: this.$route.query.marketplaceId,
                        merchantId: this.$route.query.merchantId
                    }
                }).then(res => {
                    let data = res.data;
                    if (data.return_code === 200) {
                        let item = data.content;

                        this.detailInfo = {
                            payChannel: item.paymentChannel.channelName,
                            appScene: tradState.AppScene(item.application),
                            state: tradState.state(item.openStatus),
                            zhifubao: item.paymentChannel.channelCode === 'ALIPAY' ? JSON.parse(item.channelMsg) : null,
                            weixin: item.paymentChannel.channelCode === 'WXPAY' ? JSON.parse(item.channelMsg) : null,
                            weixinhao: item.paymentChannel.channelCode === 'WXMPPAY' ? JSON.parse(item.channelMsg) : null,
                            yinlian: item.paymentChannel.channelCode === 'UNIONPAY' ? JSON.parse(item.channelMsg) : null,
                            zhongjin: item.paymentChannel.channelCode === 'CPCN' ? JSON.parse(item.channelMsg) : null,
                            bank: item.bankName || '',
                            city: item.ctiy || '',
                            payBank: item.branch || '',
                            name: item.accountName || '',
                            No: item.accountNo || ''
                        };
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }
    // finance/tunnel/refundsObject/400?access_token=23138e4a-b44a-4a4f-9d8e-3ab345c4753c&marketplaceId=1&merchantId=1&pageSize=10
    }
};
</script>

 <style lang="less" scoped>
.detailBody {
  margin-top: 20px;
  .body {
    padding: 20px;
    border: 1px solid #dcdee2;
    border-top: 0px;
  }
}
.detailTit {
  text-indent: 30px;
  font-size: 16px;
  line-height: 50px;
  color: #333;
  border: 1px solid #dcdee2;
  background: #f8f8f9;
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


