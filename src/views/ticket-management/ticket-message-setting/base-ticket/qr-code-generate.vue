<template>
    <div>
        <Card>
            <p slot="title">
                <span style="display:inline-block;float:left;line-height:32px;">二维码</span>
            </p>
            <view-del-detail
                    :formDatas="formDatas"
                    :formItemList="formItemList"
                    :isDownload="true"
                    @downloadCode="downloadCode"
            ></view-del-detail>
        </Card>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                formDatas: {},
                formItemList: [
                    {
                        label: '景区名称',
                        keyName: 'szscenicname'
                    },
                    {
                        label: '产品名称',
                        keyName: 'itickettypeid'
                    },
                    {
                        label: '链接地址',
                        keyName: 'itickettypeid'
                    },
                    {
                        label: '二维码',
                        keyName: 'itickettypeid',
                        showElement: true,
                        qrCode: true,
                        value: 'http://sports.qq.com/nba',//显示的值、跳转的地址
                        size: 250   //中间logo的地址
                    },
                ]
            }
        },
        methods: {
            downloadCode () {
                let myCanvas = document.getElementsByTagName('canvas');
                console.log(myCanvas);
                let a = document.createElement("a");
                //设置a标签的href属性（将canvas变成png图片）
                a.href = myCanvas[0].toDataURL('image/png').replace('image/png', 'image/octet-stream');
                //设置下载文件的名字
                a.download = "扫码购二维码.png";
                //点击
                a.click()
            }
        },
        created () {

        }
    }
</script>

<style scoped>

</style>
