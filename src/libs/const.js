//下拉框里面默认的显示字段key和对应的属性value

const totalList = {};

totalList.tuikuanStatusList = [
    {
        value: '1',
        label: '全部'
    },
    {
        value: 'PENDING',
        label: '退款中'
    },
    {
        value: 'SUCCESS',
        label: '退款成功'
    },
    {
        value: 'FAILD',
        label: '退款失败'
    },
    {
        value: 'INVALID',
        label: '失效'
    },
];

totalList.billStatusList = [
    {
        value: 'BY_DAY',
        label: '按日汇总'
    },
    {
        value: 'BY_MONTH',
        label: '按月汇总'
    }
];

totalList.accountsStatusList = [
    {
        value: '1',
        label: '全部'
    },
    {
        value: 'TRADE',
        label: '交易'
    },
    {
        value: 'REFUND',
        label: '退款'
    }
];

totalList.businessTypeStatusList = [
    {
        value: '1',
        label: '全部'
    },
    {
        value: 'TRADE',
        label: '收款'
    },
    {
        value: 'REFUND',
        label: '退款'
    }
];


export default totalList;
