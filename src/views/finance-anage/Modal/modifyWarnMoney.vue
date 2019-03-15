
<template>
    <Modal v-model="isadjust" :styles="{width: '580px'}" :closable="false" :mask-closable="false">
        <div >
           <div class="AdjustCredit">
              <div class="title">
                  <span class="tit">余额预警值</span>
              </div>
              <div class="body" :style="{fontSize:'14px'}">
                  <div class="bodyTit" >
                      <Row>
                          <Col span="24">
                              <span>余额预警值：</span>
                              <InputNumber :max="99999999" :min="0" v-model="warnMoney"></InputNumber>
                          </Col> 
                    </Row> 
                  </div>
              </div>
          </div> 
        </div>
        <div slot="footer">
             <Row >
                <Col span="24" style="text-align:center">
                    <Button  shape="circle" style="margin-right:30px;width:100px"  @click="cacle">取消</Button>
                    <Button type="primary" shape="circle" style="width:100px" @click="sure">确定</Button>
                </Col>
            </Row>
        </div>
    </Modal>
    
</template>

<script>

export default {
    props: {
        isWarnMoney: {
            type: Boolean,
            default: false
        },
        info: {
            type: Object,
            default: () => { }
        },
        money: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            isadjust: false,
            warnMoney: 0
        };
    },
    watch: {
        isWarnMoney (TF) {
            this.isadjust = TF;
        },
        money (val) {
            this.warnMoney = +val;
        }
    },
    methods: {
        cacle () {
            this.isadjust = false;
            this.$emit('isWarnMoneyFn', this.isadjust);
        },
        sure () {
            ;
            try {
                var url = `${this.fm}/finance/advancePay/modifyAdvancePayWarningAmount/${this.info.marketplaceId}/${this.info.merchantId}/${this.info.id}`;
                url += '?' + this.QS.stringify({
                    access_token: this.Cookies.get('token'),
                    warningAmount: this.warnMoney
                });
                this.$http.put(url).then(res => {
                    this.isadjust = false;
                    this.$emit('isWarnMoneyFn', this.isadjust);
                });
            } catch (err) {
                alert(err);
            }
        }
    }
};
</script>

 <style lang="less" scoped>
.AdjustCredit {
  background: #fff;
  .title {
    line-height: 60px;
    width: 100%;
    background: #5db2ff;
    color: #fff;
    font-size: 16px;
    text-indent: 20px;
  }
  .body {
    .bodyTit {
      color: #666666;
      padding: 80px 10px;
      text-align: center;
    }
  }
}
</style>


