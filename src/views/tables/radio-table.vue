<template>
    <div id="radioTable">
        <p v-if="tableTitle" class="tableTitle">{{tableTitle}}</p>
        <Table v-if="needCLickRow"
               border
               :loading="loading"
               :columns="colname"
               :data="tableDataNew"
               :height = "tableHeight"
               :size = "tableSize"
               :row-class-name="rowClassName"
               @on-row-click="selected"
               @on-select-all="selectAll"
               @on-select="selectOne"
               @on-select-cancel="cancelSelectOne"
               @on-selection-change="selectHasChange"></Table>
        <Table v-else
            border
            :loading="loading"
            :columns="colname"
            :data="tableDataNew"
            :height = "tableHeight"
            :size = "tableSize"
            :row-class-name="rowClassName"
            @on-select-all="selectAll"
            @on-select="selectOne"
            @on-select-cancel="cancelSelectOne"
            @on-selection-change="selectHasChange"></Table> 
        <div class="page_content">
            <div style="float: left;" v-if="isPrint && total>0">
                <Icon type="ios-download-outline" size="16"></Icon>打印数据列表
            </div>
            <div class="page_button" v-if="total>0">
                <Page show-sizer :total="total" :current="currentPage" :page-size="pageNumNew" :page-size-opts="pageNumSelect"
                    @on-change="changePage" @on-page-size-change="changePageSize"></Page>
            </div>
            <div v-if="total>0 && total>=pageNumNew" class="page_show">
                显示<span class="show_span">{{start}}</span>-<span class="show_span">{{end}}</span>项，共<span class="show_span">{{total}}</span>项
            </div>
            <div v-else-if="total>0 && total<pageNumNew" class="page_show">
                显示<span class="show_span">{{start}}</span>-<span class="show_span">{{total}}</span>项，共<span class="show_span">{{total}}</span>项
            </div>
            <div v-else v-show="total>0" class="page_show">
                暂无数据
            </div>
        </div>
    </div>
</template>

<script>
    import radiocom from '../tables/radio-com.vue';
    export default {
        name: 'radio-table',
        components:{
            radiocom
        },
        props:{
            tableTitle: {     //是否显示标题
                type: String,
                required: false,
            },
            isRadio:{     //是否为单选表格
                type:Boolean,
                required: false,
                default:false
            },
            isPrint:{     //是否打印
                type:Boolean,
                required: false,
                default: false
            },
            colname:{      //表头
                type: Array,
                required: true
            },
            tableData:{   //表数据
                type: Array,
                required: true
            },
            total:{     //数据总条数
                type: Number,
                required: true
            },
            watchTotal:{     //被监听的数据总条数
                type: Number
            },
            pageCode:{  //页码
                type: Number,
                required: false,
                default: 1
            },
            pageNum:{   //每页条数
                type: Number,
                required: false,
                default: 10
            },
            pageNumSelect:{   //设置每页条数
                type: Array,
                required: false,
                default(){
                    return [10,15]
                }
            },
            tableHeight: {   //表格高度
                type: Number,
                required: false
            },
            tableSize: {    //表格尺寸
                type: String,
                required: false,
                default: 'default'
            },
            loading:{
                type: Boolean,
                required: false,
            },
            needCLickRow: {    //是否需要点击整行触发
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                start: 0,
                end: 0,
                currentPage: 1,
                pageNumNew:10,
                tableDataNew:[]
            };
        },
        methods: {
            selected(row,index){    // (单选)父组件接收绑定selected事件,以便于拿到该行数据id进行操作
                for (let obj of this.tableDataNew) {
                  obj._selected = false
                }
                this.tableDataNew[index]._selected = true;
                if(this.tableDataNew.length === 1){
                    this.$emit('isSingle',1)   //该页是否只有一条数据，如果是，删除该数据时页码-1
                }
                this.$emit('selected',this.tableDataNew[index])
            },

            selectHasChange (arr) {   //多选，选项发生变化，返回已选择的数组
                this.$emit('selectHasChange', arr)
            },

            selectOne (arr, row) {  //多选表格选中某一项
                this.$emit('selectOne', arr, row);
            },

            cancelSelectOne (arr, row) {  //多选表格取消选中某一项
                this.$emit('cancelSelectOne', arr, row);
            },

            selectAll (arr) {   //多选表格全选
                this.$emit('selectAll', arr);
            },

            changePage (e) {     //选择页码
                this.currentPage = e;
                this.setEnd(e);
                //父组件接收当前页码
                this.$emit('changePage',e)
            },

            changePageSize(e){    //选择每页数据条数
                this.pageNumNew = e;
                this.setEnd(this.currentPage);
                //父组件接收每页条数
                this.$emit('changePageSize',e)
            },

            setEnd(current){   //表格正下方从几到几
                // console.log("当前第几页：" + current);
                this.start = (current-1)*this.pageNumNew+1;
                this.end = current*this.pageNumNew;
                if(this.total > 0 && this.end > this.total){
                    this.end = this.total
                }
            },

            deepCopy(){   //深拷贝表格数据，并且给每一项赋selected属性
                let arr = JSON.parse(JSON.stringify(this.tableData));
                for (let obj of arr) {
                    obj._selected = false
                }
                this.tableDataNew = arr;
            },

            rowClassName(row,index) {   //禁用行变色
                if(this.tableData.length > 0 && this.tableData[index].byisuse!=undefined){
                    if(this.tableData[index].byisuse != 1){
                        return "row-disabled";
                    }
                }
            }

        },
        computed: {

        },
        watch: {
            tableData () {
                this.deepCopy()
            },
            pageCode () {
                this.currentPage = this.pageCode;
                this.setEnd(this.pageCode)
            },
            pageNum () {
                // this.pageNumNew = this.pageNum;
                this.currentPage = this.pageCode;
                this.setEnd(this.pageCode)
            },
            watchTotal() {
                // console.log('total：' + this.total);
                // console.log('watchTotal：' + this.total);
                let current = this.$store.state.ticketManagement.currentPageNum;
                this.setEnd(current);
                this.currentPage = current;
            }
        },
        created () {
            this.currentPage = this.pageCode;
            this.pageNumNew = this.pageNum;
            this.setEnd(this.currentPage);
            this.deepCopy();
            for (let obj of this.colname) {
                obj.align = 'center'
            }
        },
        mounted () {
            if (this.isRadio && this.colname[0].title != ' ') {
                this.colname.unshift(
                    {
                        title: ' ',
                        width: 60,
                        align: 'center',
                        fixed: 'left',
                        render: (h, params) => {
                            return h(radiocom, {
                                props: {
                                    selected: params.row._selected
                                }
                            }, '');
                        }
                    }
                );
            }
        }
    };
</script>

<style>
  #radioTable .ivu-radio-group{
      display: block;
  }
  #radioTable .ivu-radio-wrapper{
      margin-right: 0;
  }
  #radioTable .ivu-radio{
      margin-right: 0;
  }
  #radioTable .tableTitle{
      margin-bottom: 15px;
      font-size: 16px;
      font-weight: 600;
      text-align: center;
  }
</style>
