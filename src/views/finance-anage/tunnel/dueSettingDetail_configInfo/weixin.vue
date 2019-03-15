<template>
   <!-- 微信 -->
<Row :style="{borderBottom:'1px solid #dcdee2'}">
    <Col span="24" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'40px'}">
        <span :style="{fontSize:'18px',fontWeight:'600'}">机构配置信息：</span>
    </Col>
    <Col span="12" :style="{margin:'20px 0'}">
        <span :style="{paddingLeft:'100px'}">商户号：</span>
        <Input v-if="isMofit" v-model="info.merchant_id" placeholder="" style="width: 300px" />
        <Input v-if="isAdd" v-model="info.merchant_id" placeholder="" style="width: 300px" />
        <span v-else>{{info.merchant_id}}</span>
    </Col>
    <Col span="12" :style="{margin:'20px 0'}">
        <span :style="{paddingLeft:'100px'}">应用id：</span>
        <Input v-if="isMofit" v-model="info.app_id" placeholder="" style="width: 300px" />
        <Input v-if="isAdd" v-model="info.app_id" placeholder="" style="width: 300px" />
        <span v-else>{{info.app_id}}</span>
        <!-- <span >{{info.app_id}}</span> -->
    </Col>
    <Col span="12" :style="{margin:'20px 0'}">
        <span :style="{paddingLeft:'100px'}">签名key值：</span>
        <Input v-if="isMofit" v-model="info.key" placeholder="" style="width: 300px" />
        <Input v-if="isAdd" v-model="info.key" placeholder="" style="width: 300px" />
        <span v-else>{{info.key}}</span>
        <!-- <span >{{info.key}}</span> -->
    </Col>
    <Col span="12" :style="{margin:'20px 0'}">
        <span :style="{paddingLeft:'100px'}">密码：</span>
        <Input v-if="isMofit" v-model="info.pwd" placeholder="" style="width: 300px" />
        <Input v-if="isAdd" v-model="info.pwd" placeholder="" style="width: 300px" />
        <span v-else>{{info.pwd}}</span>
        <!-- <span >{{info.pwd}}</span> -->
    </Col>
    <Col span="12" :style="{margin:'20px 0'}">
        <span :style="{paddingLeft:'100px'}">商户私密证书：</span>
        <Input v-if="isMofit" v-model="info.privatep12_path" placeholder="" style="width: 300px" />
        <Input v-if="isAdd" v-model="info.privatep12_path" placeholder="" style="width: 300px" />
        <span v-else>{{info.privatep12_path}}</span>
        <!-- <span >{{info.privatep12_path}}</span> -->
        <!-- <i-button type="ghost"><Icon type="upload"></Icon>上传</i-button> -->
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
        isAdd: {
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

