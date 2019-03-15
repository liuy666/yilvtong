<template>
   <!-- 工行 -->
  <Row :style="{borderBottom:'1px solid #dcdee2'}">
      <Col span="24" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'40px'}">
          <span :style="{fontSize:'18px',fontWeight:'600'}">机构配置信息：工行</span>
      </Col>
      <Col span="24" :style="{margin:'20px 0'}">
          <span :style="{paddingLeft:'100px'}">需要单独部署加密机，加密机ip端口：</span>
          <span >{{saleInfo.buildTime}}</span>
      </Col>
  </Row>
</template>
<script>
export default {
    data () {
        return {
            // 销售信息
            saleInfo: {
                No: '',
                tradTime: '',
                buildTime: '',
                systemNo: '',
                businessType: '',
                vaildTime: '',
                buyer: '',
                tradMoney: '',
                origin: '',
                orderState: '',
                finishTime: ''
            }
        };
    }
};
</script>

