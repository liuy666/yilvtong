
<template>
<div>
    <div class="isopen">{{this.$route.query._PAY=='CREDIT_PAY'?'未开通授信账户':'未开通预付款账户'}} 
      <span @click="goToOpen">去开通</span>
      <Button  shape="circle" style="margin-left:10px;width:80px" @click="$router.back(-1)">返回</Button>
      </div>
</div>
    
</template>

<script>
export default {
    methods: {
        goToOpen () {
            var path = '';
            if (this.$route.query.pathType === 'credit') {
                path = '/openCredit';
            } else {
                path = '/openAdvance';
            }
            this.$router.push({
                path: path,
                query: {
                    marketplaceId: this.$route.query.marketplaceId,
                    merchantId: this.$route.query.merchantId,
                    consumerId: this.$route.query.consumerId,
                    No: this.$route.query.No,
                    userName: this.$route.query.userName,
                    corpname: this.$route.query.corpname,
                    scenicareacode: this.$route.query.scenicareacode,
                    agentCode: this.$route.query.agentCode
                }
            });
        }
    }
};
</script>

 <style lang="less" scoped>
.isopen {
  background: #fff;
  padding: 20px;
  font-size: 16px;
  color: #666;
  border: 1px solid #efefef;
  span {
    color: #5db2ff;
    cursor: pointer;
  }
}
</style>


