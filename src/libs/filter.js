import totalList from './const.js';

let normalCircle = (value,list)=>{
    if(!value&&value!==0&&value!=='0')return '';
    let count = 0,
        label = '';
    list.forEach((item)=>{
        if(item.value === value){
            label=item.label;
            count++;
        }
    });
    if(!count){
        return '';
    }else{
        return label;
    }
}

const vfilter = {
    accountsStatusFilter:(value)=>{
        return normalCircle(value,totalList.accountsStatusList);
    },

    businessTypeStatusFilter:(value)=>{
        return normalCircle(value,totalList.businessTypeStatusList);
    },

    tuikuanStatusFilter:(value)=>{
        return normalCircle(value,totalList.tuikuanStatusList);
    },
};

export default vfilter;
