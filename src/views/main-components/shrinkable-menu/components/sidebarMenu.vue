<style lang="less">
    @import '../styles/menu.less';
    .icon666 {
        margin-right: 0!important;
    }
</style>

<template>
    <Menu ref="sideMenu" :accordion="true" :active-name="$route.name" :open-names="openNames" :theme="menuTheme" width="auto" @on-select="changeMenu">
        <template v-for="item in menuList">
            <!--<MenuItem v-if="item.children.length<=1" :name="item.children[0].name" :key="'menuitem' + item.name">-->
                <!--<Icon :type="item.children[0].icon || item.icon" :size="iconSize" :key="'menuicon' + item.name"></Icon>-->
                <!--<span class="layout-text" :key="'title' + item.name">{{ itemTitle(item.children[0]) }}</span>-->
            <!--</MenuItem>-->

            <Submenu :name="item.name" :key="item.name">
                <template slot="title">
                    <Icon :type="item.icon" :size="iconSize"></Icon>
                    <span class="layout-text">{{ itemTitle(item) }}</span>
                </template>
                <!--<template v-for="child in item.children">-->
                    <!---->
                <!--</template>-->
                <template v-for="child in item.children">
                    <MenuItem  v-if="child.children== undefined" :name="child.name" :key="'lv2' + child.name">
                        <Icon :type="child.icon" :size="iconSize" :key="'icon' + child.name" class="icon666"></Icon>
                        <span class="layout-text" :key="'title_' + child.name">{{ itemTitle(child) }}</span>
                    </MenuItem>
                    <Submenu v-if="child.children!== undefined" :name="child.name" :key="'lv2' + child.name">
                        <template slot="title">
                            {{ itemTitle(child) }}
                        </template>
                        <template v-for="grand in child.children">
                            <MenuItem  v-if="grand.children== undefined" :name="grand.name" :key="'lv3' + grand.name">
                                <span :key="'title_' + grand.name">{{ itemTitle(grand) }}</span>
                            </MenuItem>
                            <Submenu v-if="grand.children!== undefined" :name="grand.name" :key="'lv3' + grand.name">
                                <template slot="title">
                                    {{ itemTitle(grand) }}
                                </template>
                                <template v-for="fourth in grand.children">
                                    <MenuItem  :name="fourth.name" :key="'lv4' + fourth.name">
                                        <span :key="'title_' + fourth.name">{{ itemTitle(fourth) }}</span>
                                    </MenuItem>
                                </template>
                            </Submenu>
                        </template>
                    </Submenu>
                </template>
            </Submenu>
        </template>
    </Menu>
</template>

<script>
export default {
    name: 'sidebarMenu',
    props: {
        menuList: Array,
        iconSize: Number,
        menuTheme: {
            type: String,
            default: 'dark'
        },
        openNames: {
            type: Array
        }
    },
    methods: {
        changeMenu (active) {
            // console.log(active);
            // console.log(this.$store.state.app.pageOpenedList)
            this.$emit('on-change', active);
            // console.log(this.$store.state.app.pageOpenedList)
        },
        itemTitle (item) {
            // if (typeof item.title === 'object') {
            //     return this.$t(item.title.i18n);
            // } else {
            //     return item.title;
            // }
            /* 刘英杰修改于2018-8-18 12:02:24 去掉国际化*/
            return item.title;
        }
    },
    mounted(){
        // console.log('menuList',this.menuList)
    },
    updated () {
        // console.log('menuList',this.menuList)
        this.$nextTick(() => {
            // console.log('$nextTick')
            if (this.$refs.sideMenu) {
                // console.log(this.$refs.sideMenu)
                this.$refs.sideMenu.updateOpened();
            }
        });
    }

};
</script>
