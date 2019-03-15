import detailForm from '../views/main-components/detail-form.vue'
import detailForm1 from '../views/main-components/detail-form1.vue'
import detailFormArea from '../views/main-components/detail-form-area.vue'
import viewDelDetail from '../views/main-components/view-del-detail.vue'
import topTitleOpbtn from '../views/main-components/top-title-opbtn.vue'
import topBtn from '../views/main-components/top-btn.vue'
import commonDialog from '../views/main-components/common-dialog.vue'
import radioTable from '../views/tables/radio-table'
import loading from '@/views/main-components/loading.vue'

const globalComponents = {
    install: function(Vue) { //核心部分，在我们使用Vue.use()时，自动调用的是install，而install导出的必须是的组件
        Vue.component('detailForm', detailForm);
        Vue.component('detailForm1', detailForm1);
        Vue.component('detailFormArea', detailFormArea);
        Vue.component('viewDelDetail', viewDelDetail);
        Vue.component('topTitleOpbtn', topTitleOpbtn);
        Vue.component('topBtn', topBtn);
        Vue.component('commonDialog', commonDialog);
        Vue.component('radioTable', radioTable);
        Vue.component('loading', loading);
    }
}

export default globalComponents;