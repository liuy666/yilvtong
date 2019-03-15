<style lang="less">
    @import '../../../styles/ectrip.less';
</style>
<style scoped>

</style>
<template>
    <div>
        <Row>
            <Card>
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">服务商退票规则查询</span>
                    <top-title-opbtn
                        :btnList="btnList"
                        arguName="originData"
                        :currentRowData="currentRowData"
                        :currentLevel="currentTab"
                    ></top-title-opbtn>
                </p>

                <!-- <Table 
                    :data="tableDatas" 
                    :columns="tableColumns" 
                    :size="tableSize" 
                    stripe 
                    border 
                    highlight-row 
                    @on-current-change="getChooseData">
                </Table>

                <div class="page_content">
                    <div class="page_show">
                        显示<span class="show_span">1</span>-<span class="show_span">{{dataList}}</span>项，共<span class="show_span">{{dataList}}</span>项
                    </div>
                    <div class="page_button">
                        <Page :total="dataList" show-sizer></Page>
                    </div>
                </div> -->

                <Tabs type="card" :animated="false" v-model="currentTab" @on-click="delChildTab">
                    <TabPane v-for="(item,index) in tabList"  :key="index" :label="item.label" :name="item.name" >
                        <Table 
                            :data="item.tableDatas" 
                            :columns="tableColumns" 
                            :size="tableSize" 
                            stripe 
                            border 
                            highlight-row 
                            @on-current-change="getChooseData">
                        </Table>

                        <div class="page_content">
                            <div class="page_show">
                                显示<span class="show_span">1</span>-<span class="show_span">{{item.tableDatas.length}}</span>项，共<span class="show_span">{{item.tableDatas.length}}</span>项
                            </div>
                            <div class="page_button">
                                <Page :total="item.tableDatas.length" show-sizer></Page>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </Card>
        </Row>
    </div>
</template>

<script>
import topTitleOpbtn from '../../main-components/top-title-opbtn.vue';

export default {
    components : {
        topTitleOpbtn
    },
    data () {
        return {
            currentTab : '0',
            btnList :[
                {
                    type : 1,
                    btnlabel : "刷新"
                },{
                    type : 2,
                    btnlabel : "新增本级",
                    isAdd : true,
                    param : 'level',
                    routerName : 'origin_manage_new'
                },{
                    type : 3,
                    btnlabel : "修改",
                    routerName : 'origin_manage_edit'
                },
                {
                    type : 4,
                    btnlabel : "删除",
                    routerName : 'origin_manage_del'
                },
                {
                    type : 5,
                    btnlabel : "查看",
                    routerName : 'origin_manage_view'
                }
            ],
            tableColumns : [
                {
                    title : '编号',
                    key : 'num',
                    align : 'center'
                },
                {
                    title : '客源地编码',
                    key : 'originCode',
                    align : 'center'
                },
                {
                    title : '客源地名称',
                    key : 'originName',
                    align : 'center'
                },
                {
                    title : '层级',
                    key : 'level',
                    align : 'center',
                    render : (h,params) => {
                        return params.row.level ? params.row.level + ' 级' : '';
                    }
                },
                {
                    title : '是否使用',
                    key : 'status',
                    align : 'center',
                    render : (h,params) => {
                        return params.row.status == 1 ? '启用' : params.row.status == 0 ? '禁用' : '';
                    }
                },
                {
                    title : '操作',
                    key : 'options',
                    align : 'center',
                    render : (h,params) => {
                        return params.row.isHasChild ?  h('div',[
                            h('a',{
                                on : {
                                    click : (ev) => { debugger
                                        let oev = ev || event;
                                        ev.cancelBubble = true;
                                        this.getListData(params.row.level,params.row.originName);
                                        this.currentTab = params.row.level+'';
                                    }
                                }
                            },'[下一级] '),
                            h('a',{
                                on : {
                                    click : () => {
                                        this.$router.push({
                                            name: 'origin_manage_new',
                                            params : {level : params.row.level+1}
                                        })
                                    }
                                }
                            },' [新增下级]')
                        ]) : h('a',{
                            on : {
                                click : () => {
                                    this.$router.push({
                                        name: 'origin_manage_new',
                                        params : {level : params.row.level+1}
                                    })
                                }
                            }
                        },'[新增下级]')
                    }
                }
            ],
            tabList : [
                {
                    label : '',
                    tableDatas : []
                }
            ],
            tableSize : 'small',
            currentRowData : {}
        }
    },
    computed:{
        // dataList(){ 
        //     return this.tableDatas.length;
        // }
    },
    methods:{
        getChooseData (currentRow,oldCurrentRow) {
            this.currentRowData = currentRow;
        },
        delChildTab (name) { debugger
            this.tabList = this.tabList.slice(0,parseInt(name)+1);
            //this.$store.commit('setPageTabList',{name : 'originManage', tabList : this.tabList});
        },
        getListData (level,label) { debugger
            //发请求获取·········暂时写死
            let originArr = ['中国','北京','朝阳区'];
            let levelArr = [1,2,3];
            let isHasArr = [true,true,false]
            let newTab = {};
            newTab.tableDatas = [{
                num : 1,
                originCode : 1,
                originName : originArr[level],
                level : levelArr[level],
                status : 1,
                isHasChild : isHasArr[level]
            }];
            newTab.label = label ? label : '第一级列表';
            newTab.name = level+'';
            this.tabList[level] = newTab;
        }
    },
    created () { 
        //查询获取第一级列表数据
        if(this.$store.state.app.pageTabList['originManage']){
            this.tabList = this.$store.state.app.pageTabList['originManage'];
            this.currentTab = this.tabList.length - 1 + '';
        }else{
            this.getListData(0);
        }
    },
    beforeRouteLeave (to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        this.$store.commit('setPageTabList',{name : 'originManage', tabList : this.tabList});
        next();
    }

}
</script>