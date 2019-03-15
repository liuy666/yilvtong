import http from '@/libs/http.js';
import Qs from 'qs';
export default {
    // 获取结算商户号ID
    async getId (agent, token, type) {
        var url = `${agent}/finance/basis/getSettleMerchantId`;
        url += '?' + Qs.stringify({
            access_token: token,
            type: type
        });
        var data = await http.get(url);
        if (data.return_code === 'SUCCESS') {
            return [data.platformId, data.merchantId, data.consumerId];
        }
    }
};
