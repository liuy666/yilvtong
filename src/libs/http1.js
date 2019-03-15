import http from './http.js';
import axios from 'axios';
import Cookies from "js-cookie";
import Common from './common.js'

let api = process.env.NODE_ENV === "production" ? '' : '/api';

//财务管理-通道业务-退款审核
const http1 = {
    get:{},
    put:{},
};

http1.get.TobeExaminationApproval = function(applicationStatus ,params){
   return http.get(api+'/finance/tunnel/audit/'+applicationStatus,params);
};

//获取平台号，商户ID号
http1.get.SettleMerchantId = function(params){
    return http.get(api+'/finance/basis/getSettleMerchantId',params);
};

//退款审批
http1.put.RefundAudit = function(urlend,urlParams,bodyParams){
    return http.put(api+'/finance/tunnel/refundBills/'+urlend,urlParams,bodyParams);
}

//财务管理-通道业务-对账单

//账单资金汇总
http1.get.SummaryOfBillFunds = function(params){
    return http.get(api+'/finance/tunnel/queryGroup',params);
};

//账单资金明细
http1.get.DetailsOfBillFunds = function(params){
    return http.get(api+'/finance/tunnel/queryBillsForPage',params);
};

//机构流水
http1.get.MechanismFlow = function(params){
    return http.get(api+'/finance/tunnel/queryChannelJnl',params);
};

//对账单下载
http1.get.Downloading0fBills = function(params) {
    let downloadURI = api+'/finance/tunnel/createBill?';
    // params['access_token'] = Cookies.get('token');
    return {
        // newPromise: axios({
        //     url: downloadURI,
        //     params: params,
        // }).then((response) => {
        //     if(response.status !== 200){}
        //     Common.showMessageModal(this, '请求失败', 1);
        //     throw new Error("失败了:" + error);
        // }),
        newPromise: http.get(downloadURI,params),
        downloadURI

};
};

//财务管理-通道业务-收款设置
//支付渠道新增
http1.MerchantConfig = function(urlParams,bodyParams){
    return http.post(api+'/finance/tunnel/merchantConfig',urlParams,bodyParams);
}

//修改
http1.UpdateMerchantChannelConfigs = function(urlParamsArr,urlParams,bodyParams){
    if(urlParamsArr.length){
        return http.post(`${api}/finance/tunnel/updateMerchantChannelConfigs/${urlParamsArr.join('/')}`,urlParams,bodyParams);
    }else{
        return http.post(`${api}/finance/tunnel/updateMerchantChannelConfigs`,urlParams,bodyParams);
    }
}

//详情
http1.MerchantChannelConfig = function(urlParamsArr,params){
    if(urlParamsArr.length){
        return http.get(`${api}/finance/tunnel/merchantChannelConfig/${urlParamsArr.join('/')}`,params);
    }else{
        return http.get(`${api}/finance/tunnel/merchantChannelConfig`,params);
    }

}

export default http1;
