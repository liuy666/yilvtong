<template>
   <!-- 中金 -->
 <Row :style="{borderBottom:'1px solid #dcdee2'}">
    <Col span="24" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'40px'}">
        <span :style="{fontSize:'18px',fontWeight:'600'}">机构配置信息：</span>
    </Col>
    <Col span="24" :style="{margin:'20px 0'}">
        <span :style="{paddingLeft:'100px'}">机构编码：</span>
        <Input v-if="isMofit" v-model="info.institution_id" placeholder="" style="width: 300px" />
        <span v-else>{{info.institution_id}}</span>
    </Col>
    <Col span="24" :style="{margin:'20px 0'}">
        <span :style="{paddingLeft:'100px'}">机构提供的config文件夹：</span>
        <Input v-if="isMofit" v-model="info.config_path"  placeholder="" style="width: 500px" />
        <span v-else>{{info.config_path}}</span>
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

