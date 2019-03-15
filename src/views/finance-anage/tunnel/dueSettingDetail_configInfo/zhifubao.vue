<template>
<!-- 支付宝 -->
  <Row :style="{borderBottom:'1px solid #dcdee2'}">
    <Col span="24" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'40px'}">
      <span :style="{fontSize:'18px',fontWeight:'600'}">机构配置信息：</span>
    </Col>
    <Col span="12" :style="{margin:'20px 0'}">
      <span :style="{paddingLeft:'100px'}">partner：</span>
      <Input v-if="isMofit" v-model="info.partner" placeholder="" style="width: 300px" />
      <span v-else>{{info.partner}}</span>
      <!-- <span >{{info.partner}}</span> -->
    </Col>
    <Col span="12" :style="{margin:'20px 0'}">
      <span :style="{paddingLeft:'100px'}">应用id：</span>
      <Input v-if="isMofit" v-model="info.app_id" placeholder="" style="width: 300px" />
      <span v-else>{{info.app_id}}</span>
      <!-- <span >{{info.app_id}}</span> -->
    </Col>
    <Col span="12" :style="{margin:'20px 0'}">
      <span :style="{paddingLeft:'100px'}">私钥：</span>
      <Input v-if="isMofit" v-model="info.privatekey" placeholder="" style="width: 300px" />
      <span v-else>{{info.privatekey}}</span>
      <!-- <span :style="myStyle">{{info.privatekey}}</span> -->
    </Col>
    <Col span="12" :style="{margin:'20px 0'}">
      <span :style="{paddingLeft:'100px'}">rsa2签名私钥：</span>
      <Input v-if="isMofit" v-model="info.openrsa2Privatekey" placeholder="" style="width: 300px" />
      <span v-else>{{info.openrsa2Privatekey}}</span>
      <!-- <span :style="myStyle">{{info.openrsa2Privatekey}}</span> -->
    </Col>
  </Row>
</template>
<script>
export default {
    props: {
        isMofit: {
            type: Boolean,
            default: false
        },
        info: {
            type: Object,
            default: () => { }
        }
    },
    watch: {
        info: {
            handler (data) {
                this.$emit('getChildInfo', data);
            },
            deep: true
        }
    }
};
</script>

