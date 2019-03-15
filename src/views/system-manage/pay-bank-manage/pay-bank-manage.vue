<style lang="less">

</style>

<template>
  <div>
      <Row>
          <Card>
              <p slot="title" style="height:32px;">
                  <span style="display:inline-block;float:left;line-height:32px;">价格管理</span>
                  <top-btn
                          :btnList="btnList"
                          :currentRowData="currentRowData"
                          @refreshData = "refreshData"
                  ></top-btn>
              </p>
              <radio-table
                      :colname="colname"
                      :total='total'
                      :tableData="tableData"
                      :isRadio="true"
                      :pageNum="pars.pageNum"
                      :pageCode="pars.pageCode"
                      :loading="loading"
                      @selected="selected"
                      @changePage="changePage"
                      @changePageSize="changePageSize"
                      @isSingle="isSingle"
              ></radio-table>
          </Card>
      </Row>
  </div>
</template>

<script>



export default {
    data () {
        return {
            btnList: [
                {
                    type: 1,
                    btnlabel: '刷新'
                },
                {
                    type: 2,
                    btnlabel: '新增',
                    isAdd : true,
                    routerName : 'paybank_new',
                    belongRouterName: this.$route.name
                },
                {
                    type: 3,
                    btnlabel: '修改',
                    routerName : 'paybank_edit',
                    belongRouterName: this.$route.name
                },
                {
                    type: 4,
                    btnlabel: '删除',
                    dialogType: 'del',
                    url: ''
                },
                {
                    type: 5,
                    btnlabel: '查看',
                    routerName : 'paybank_view',
                    belongRouterName: this.$route.name
                }
            ],
            currentRowData: {},
            colname: [
                {
                    title: '行数',
                    key: 'rwid',
                },
                {
                    title: '列数',
                    key: 'colid',
                },
                {
                    title: '银行名称',
                    key: 'bankname',
                }
            ],
            tableData:[],
            total: 0,
            loading: false,
            single: 0,
            pars:{
                pageNum:10,
                pageCode:1,
            },
            urlQuery:{}
        }
    },
    methods: {
        selected(row){
            this.currentRowData["id"] = row.icrowdkindpriceid;
            this.currentRowData["name"] = 'icrowdkindpriceid';
            this.btnList[3].url = ``;
        },
        changePage(pageCode) {
            this.pars.pageCode = pageCode;
            this.$common.currentPageData(this.baseUrl+'/ticket/crowdKindPrice/v1/crowdKindPriceViewList', this, 'get')
        },
        changePageSize(pageSize){
            this.pars.pageNum = pageSize;
            this.$common.currentPageData(this.baseUrl+'/ticket/crowdKindPrice/v1/crowdKindPriceViewList', this, 'get')
        },
        refreshData(){
            this.currentRowData = {};
            this.pars.pageCode = this.pars.pageCode - this.single;
            this.$common.currentPageData(this.baseUrl+'/ticket/crowdKindPrice/v1/crowdKindPriceViewList', this, 'get')
        },
        isSingle(page){
            this.single = page
        },
        refreshUrlQuery () {
            this.urlQuery = {
                pageSize: this.pars.pageNum,
                page: this.pars.pageCode
            };
        }
    },
    created () {

    }
}
</script>
