<template>
    <div>
        <template v-for="(item, index) in menuList">
            <div style="text-align: center;" :key="index">
                <Dropdown placement="right-start" :key="index">
                    <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                        <Icon :size="20" :color="iconColor" :type="item.icon"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <template v-for="(child, i) in item.children">
                            <DropdownItem v-if="!child.children" :name="child.name" :key="i">
                                <div @click="changeMenu(child.name)">
                                    <span>{{ itemTitle(child) }}</span>
                                </div>
                            </DropdownItem>
                            <div v-else style="text-align: center;" :key="i">
                                <Dropdown :key="i" placement="right-start">
                                    <DropdownItem :name="child.name" :key="i">
                                        <div>
                                            <span>{{ itemTitle(child) }}</span>
                                            <Icon type="ios-arrow-right"></Icon>
                                        </div>
                                    </DropdownItem>
                                    <DropdownMenu slot="list">
                                        <template v-for="(child1, i1) in child.children">
                                            <DropdownItem :name="child1.name" :key="i1">
                                                <div @click="changeMenu(child1.name)">
                                                    <span>{{ itemTitle(child1) }}</span>
                                                </div>
                                            </DropdownItem>
                                        </template>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </template>
                    </DropdownMenu>
                </Dropdown>
                <!--<Dropdown v-else placement="right-start" :key="index" @on-click="changeMenu">-->
                    <!--<Button @click="changeMenu(item.children[0].name)" style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">-->
                        <!--<Icon :size="20" :color="iconColor" :type="item.children[0].icon || item.icon"></Icon>-->
                    <!--</Button>-->
                    <!--<DropdownMenu style="width: 200px;" slot="list">-->
                        <!--<DropdownItem :name="item.children[0].name" :key="'d' + index"><Icon :type="item.children[0].icon || item.icon"></Icon><span style="padding-left:10px;">{{ itemTitle(item.children[0]) }}</span></DropdownItem>-->
                    <!--</DropdownMenu>-->
                <!--</Dropdown>-->
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'sidebarMenuShrink',
    props: {
        menuList: {
            type: Array
        },
        iconColor: {
            type: String,
            default: 'white'
        },
        menuTheme: {
            type: String,
            default: 'darck'
        }
    },
    methods: {
        changeMenu (active) {
            this.$emit('on-change', active);
        },
        itemTitle (item) {
            if (typeof item.title === 'object') {
                return this.$t(item.title.i18n);
            } else {
                return item.title;
            }
        }
    }
};
</script>

<style lang="less">
    .ivu-select-dropdown{
        width: initial;
    }
    .ivu-dropdown-item{
        text-align: left;
    }
</style>
