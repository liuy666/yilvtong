
<template>
<div>
  <Row>
      <Card>
          <p slot="title" class="slot_title_height">
              <span class="title_span">开通预付款账户</span>
              <top-title-opbtn :btnList="btnList"></top-title-opbtn>
          </p>
          <Row :style="{borderBottom:'1px dashed #dcdee2',paddingLeft:'100px'}">
            <Col span="24" :style="{marginTop:'20px'}">
                <span>用户编号：</span>
                <span >{{this.$route.query.No?this.$route.query.No:""}}</span>
            </Col>
            <Col span="24" :style="{marginBottom:'20px',marginTop:'20px'}">
                <span>用户昵称：</span>
                <span >{{this.$route.query.userName?this.$route.query.userName:""}}</span>
            </Col>
            <Col span="24" :style="{marginBottom:'20px'}">
                <span>公司名称：</span>
                <span >{{this.$route.query.corpname?this.$route.query.corpname:""}}</span>
            </Col>
        </Row>　
        <Row :style="{borderBottom:'1px dashed #dcdee2',paddingLeft:'100px',marginTop:'20px'}">
            <Col span="24" :style="{marginBottom:'20px',marginTop:'20px'}">
                <span>余额预警值：</span>
                <Input-number :min="0" :max="99999999" v-model="warmVal" :style="{width: '150px'}" placeholder="请输入余额预警值"></Input-number>
                <!-- <Input v-model="warmVal" placeholder="余额预警值" style="width: 150px" /> -->
            </Col>
        </Row>　 
         <Row :style="{marginTop:'20px',fontSize:'16px',textAlign:'center'}" >
              <Button type="primary" shape="circle" style="width:100px;" @click="save">提交</Button>
              <Button  shape="circle" style="margin-left:30px;width:100px" @click="$router.back(-1)" >取消</Button>
         </Row>
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
            warmVal: ''
        };
    },
    methods: {
        async save () {
            if (!this.warmVal) {
                this.$Modal.warning({
                    title: '温馨提示',
                    content: '余额预警值不能为空'
                });
                return false;
            }
            try {
                var url = `${this.fm}/finance/advancePay/advancePayCreate/${this.$route.query.marketplaceId}/${this.$route.query.merchantId}/${this.$route.query.consumerId}`;
                url += '?' + this.QS.stringify({
                    access_token: this.Cookies.get('token'),
                    warningAmount: this.warmVal
                });
                this.$http.post(url).then(res => {
                    var data = res.data;
                    if (data.return_code === 'SUCCESS') {
                        this.$router.push({ name: 'Advance', query: this.$route.query });
                    } else if (data.return_code === 'FAIL') {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: data.return_msg
                        });
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }
    }
};
</script>

 <style lang="less" scoped>
.cursor {
  cursor: pointer;
}
.fl {
  float: left;
}
.fr {
  float: right;
}

.ivu-modal-body {
  padding: 0px;
}

.w_query {
  height: 100px;
  padding: 30px 20px;
}
//复选框样式
.ivu-checkbox-group {
  display: inline-block;
  margin-left: 15px;
}
.ul {
  overflow: hidden;
  width: 450px;
  span {
    float: left;
    border: 1px solid #dddddd;
    width: 40px;
    line-height: 30px;
    text-align: center;
  }
}
</style>

<style scoped>
.bodyTit >>> .ivu-radio-wrapper {
  min-height: 30px !important;
}
</style>
