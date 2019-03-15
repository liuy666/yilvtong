<template>
    <div>
        <Row>

        </Row>
        <Card>
            <p slot="title">{{pageName}}服务商</p>
            <detail-form1
                :isListPage="false"
                :isMixed="false"
                :formDatas="formData"
                :ruleDatas="ruleDatas"
                :labelWidth="180"
                :formItemList="formItemList"
                :isClose="isClose"
                @getFormData="getFormData"
                @handleMove="handleMove"
                @handleSuccess="handleSuccess"
            ></detail-form1>
        </Card>
    </div>
</template>
<script>
// import BDMap from '../../main-components/map.vue';
export default {
    data () {
        return {
            isClose:true,
            labelWidth : 180,
            formData : {},
            formItemList : [
                {
                    label : '服务商编码',
                    keyName : 'szsceniccode',
                    type : 1,
                    cols : 12
                },
                {
                    label : '服务商名称',
                    keyName : 'szscenicname',
                    type : 1,
                    cols : 12
                },{
                    label : '服务商类别',
                    keyName : 'scenictype',
                    type : 1,
                    cols : 12
                },
                {
                    label : '服务商等级',
                    keyName : 'szgrade',
                    type : 1,
                    cols : 12
                },
                {
                    type : 22,
                    label : "所属地",
                    keyName : "strregion",
                    keyName1 : 'iregionalid',
                    btnLabel : "选择",
                    title: '选择地区',
                    multiple: false,
                    showCheckBox: false,
                    treeModal: false,
                    treeData: [],
                    treeType: 4,
                    cols : 12
                },
                {
                    label : '推荐次序',
                    keyName : 'iordernumber',
                    type : 1,
                    cols : 12
                },{
                    label : '联系人',
                    keyName : 'szcontact',
                    type : 1,
                    cols : 12
                },
                {
                    label : '联系电话',
                    keyName : 'szaddress',
                    type : 1,
                    cols : 12
                },
                {
                    label : '当天预订截止时间',
                    keyName : 'szlasttime',
                    type : 4,
                    cols : 12,
                    optionList : [
                        {

                        }
                    ]
                },
                {
                    label : '最多提前预订天数',
                    keyName : 'imaxdata',
                    type : 1,
                    cols : 12
                },
                {
                    label : '是否启用',
                    keyName : 'byisuse',
                    type : 2,
                    cols : 12,
                    optionList : [{
                        value : '1',
                        labelName : '是'
                    },{
                        value : '0',
                        labelName : '否'
                    }]
                },
                {
                    label : '是否允许强制退订',
                    keyName : 'iscanreturn',
                    type : 2,
                    cols : 12,
                    optionList : [{
                        value : '1',
                        labelName : '是'
                    },{
                        value : '0',
                        labelName : '否'
                    }]
                },
                {
                    label : '过了消费日期是否允许修改',
                    keyName : 'icanmodify',
                    type : 2,
                    cols : 12,
                    optionList : [{
                        value : '1',
                        labelName : '是'
                    },{
                        value : '0',
                        labelName : '否'
                    }]
                },
                {
                    label : '是否打印回执',
                    keyName : 'printreceipt',
                    type : 2,
                    cols : 12,
                    optionList : [{
                        value : '1',
                        labelName : '是'
                    },{
                        value : '0',
                        labelName : '否'
                    }]
                },
                {
                    label : '是否打印发票',
                    keyName : 'printinvoice',
                    type : 2,
                    cols : 12,
                    optionList : [{
                        value : '0',
                        labelName : '不打印'
                    },{
                        value : '1',
                        labelName : '游客打印'
                    },{
                        value : '2',
                        labelName : '旅行社打印'
                    },{
                        value : '3',
                        labelName : '全部打印'
                    }]
                },{
                    label : '详细地址',
                    keyName : 'szaddress',
                    type : 1
                },{
                    label : '地图位置',
                    keyName : 'longitude',
                    type : 1
                },{
                    label : '交通位置描述',
                    keyName : 'szlocation',
                    type : 7
                },{
                    type: 18,
                    label: '图片列表',
                    action: this.baseUrl+'/sys/fileUpload/v1/uploadPic',
                    data: {
                        access_token: this.Cookies.get('token')
                    },
                    imgArr: [
                        // {
                        //     url: 'http://192.168.0.108:4869/8403bace7a66ce91b42592f42f54a86b',
                        // },
                        // {
                        //     url: 'http://192.168.0.108:4869/9bc6409d50c9325be1b0b9b645e85d97',
                        // }
                    ],
                },{
                    label : '营业时间',
                    keyName : 'businesshours',
                    type : 7
                },{
                    label : '简介',
                    keyName : 'szsimpleintroduction',
                    type : 7
                },{
                    label : '预订说明',
                    keyName : 'strbookdescription',
                    type : 7
                },{
                    label : '详细介绍',
                    keyName : 'note',
                    type : 6,
                    defaultMsg: '',
                    config : {
                        initialFrameWidth: '80%',
                        initialFrameHeight: 350,
                        zIndex : 1
                    },
                    ueId : 'serviceUE'
                },{
                    label : '景区-补充描述',
                    keyName : 'moredescribe',
                    type : 7
                },{
                    label : '费用包含',
                    keyName : 'cost',
                    type : 7
                },{
                    label : '退票规则',
                    keyName : 'refundrules',
                    type : 7
                },{
                    label : '补充说明',
                    keyName : 'moreexplan',
                    type : 7
                },{
                    label : '入园方式',
                    keyName : 'entermode',
                    type : 7
                }
                
            ],
            ruleDatas :
             {

            },
            pageName : '',
            formName : '',
            spinShow : true,
        }
    },
    methods : {
        setPageName () {
            if(this.$route.name.indexOf("add") != -1){
                this.pageName = '新增';
                this.formName = "detailForm_new";
                this.spinShow = false;
                this.setAddForm();
            }else{
                this.pageName = '修改';
                this.formName = "detailForm_edit";
                this.spinShow = true;
                this.setEditForm();
            }
        },
        setAddForm () {
            this.formData = {
                szsceniccode : '',
                szscenicname : '',
                
            }
        },
        setEditForm () { 
            this.$http.get(this.baseUrl+'/ticket/crowdKind/v1/getCrowdKindInfo?access_token='+this.Cookies.get('token')+'&icrowdkindid='+this.$route.params.id)
            .then(res => {
                if(res.data.code == 200){
                    this.formData = res.data.data;
                    this.spinShow = false;
                }
            })
        },
        getFormData(obj){    //提交表单          
            if(this.pageName == '新增'){
                this.$common.addNewData('/ticket/crowdKind/v1/crowdKindSave?act=1',this,obj,'post',true)
            } else if(this.pageName == '修改'){
                this.$common.editData('/ticket/crowdKind/v1/crowdKindSave?act=2', this, obj,'post',true)
            }
        },
        //图片上传成功
        handleSuccess (arr) {
            arr.forEach(item => {
                if (!item.url) {
                    item.url = item.response.data.info.url
                }
            });
            this.formItemList[18].imgArr = arr
        },
        //移动图片位置
        handleMove(index, direction) {
            let i = '';
            for (let j = 0; j < this.formItemList.length; j++) {
                if (this.formItemList[j].type == 18) {
                    i = j;
                    break;
                }
            }
            if (direction == 'left') {
                this.swapArray(this.formItemList[i].imgArr, index, index-1)
            } else {
                this.swapArray(this.formItemList[i].imgArr, index, index+1)
            }
        },
        //互换数组元素位置
        swapArray(arr, index1, index2) {
            arr[index1] = arr.splice(index2, 1, arr[index1])[0];
            return arr;
        },
    },
    mounted () {
        this.setPageName();
    },
    created () {
        
    },
    watch : {
        '$route' (to) {
            this.setPageName();
        } 
    }
}
</script>
