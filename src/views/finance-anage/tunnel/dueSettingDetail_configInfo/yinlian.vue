<template>
   <!-- 银联 -->
<Row :style="{borderBottom:'1px solid #dcdee2'}">
    <Col span="24" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'40px'}">
        <span :style="{fontSize:'18px',fontWeight:'600'}">机构配置信息：</span>
    </Col>
    <Col span="24" :style="{margin:'20px 0'}">
        <span :style="{paddingLeft:'100px'}">商户号：</span>
        <Input v-if="isMofit" v-model="info.merchant_id" placeholder="" style="width: 300px" />
        <span v-else>{{info.merchant_id}}</span>
        <!-- <span >{{info.merchant_id}}</span> -->
    </Col>
    <Col span="12" :style="{margin:'20px 0'}">
        <span :style="{paddingLeft:'100px'}">商户私密证书：</span>
        <Input v-if="isMofit" v-model="info.private_path" placeholder="" style="width: 300px" />
        <span v-else>{{info.private_path}}</span>
        <!-- <span :style="myStyle">{{info.private_path}}</span> -->
        <!-- <i-button type="ghost"><Icon type="upload"></Icon>上传</i-button> -->
    </Col>
    <Col span="12" :style="{margin:'20px 0'}">
        <span :style="{paddingLeft:'100px'}">商户私钥证书密码：</span>
        <Input v-if="isMofit" v-model="info.private_pwd" placeholder="" style="width: 300px" />
        <span v-else>{{info.private_pwd}}</span>
        <!-- <span >{{info.private_pwd}}</span> -->
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

