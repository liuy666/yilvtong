<template>
	<div id="microMall">
		<!-- <template v-if="isShowLoading">
            <loading></loading>
        </template> -->
        <Card>
            <p slot="title" class="cardTitle">
                <span></span>
                <topBtn :btnList="btnRefresh"></topBtn>
            </p>
            <!-- <Form ref="thisForm" :model="formDatas" inline :rules="formRules">
                <FormItem
                	v-for="item in formItemList"
                    :label="item.label + '：'"
                    :prop="item.keyName"
                    :key="item.id"
                    :label-width="180">
                    <Input v-model="formDatas[item.keyName]" style="width: 200px"></Input>
                </FormItem>
                <FormItem style="margin-left: 140px;">
                    <Button
                        type="primary" 
                        @click="submitForm()" 
                        shape="circle"
                        style="margin-right: 20px;padding: 6px 25px;">确定</Button>
                </FormItem>
            </Form> -->
			<div class="showview">
				<div class="left">
					<h2>易旅通微商城</h2>
					<p class="p1">你可以手机扫码访问或者在右侧简单浏览</p>
					<div class="divqrcode">
						<qrcode-vue :value="codeUrl" :size="200" level="H" className="qrcode"></qrcode-vue>
					</div>
					<p class="p2">微商城地址：<span>(可配置到微信公众号菜单)</span></p>
					<p class="p3">{{ codeUrl }}</p>
				</div>
				<div class="iframe">
					<iframe name="preview" :src="codeUrl" frameborder="0" id="mall-iframe" scrolling="auto"></iframe>
				</div>
			</div>
        </Card>
    </div>
</template>
<script>
	import QrcodeVue from 'qrcode.vue';
	export default {
		name: 'micro-mall',
		components: {
			QrcodeVue
		},
		computed: {
			codeUrl() {
				return `http://${ this.hostName }/webchat?wxName=${this.szcompanyname}#/newHome`;
			}
		},
		data() {
			return {
				// isShowLoading: false,
				// userId: '',
				btnRefresh: [
	                {
	                    type: 1,
	                    btnlabel: '刷新'
	                }
	            ],
	            // formDatas: {
	            // 	appId: '',
	            // 	appSecret: ''
	            // },
	            // formRules: {
	            // 	appId: [
		        //     	{
		        //     		required: true, 
		        //     		message: 'appId 不能为空', 
		        //     		trigger: 'blur'
		        //     	}
	            // 	],
	            // 	appSecret: [
		        //     	{
		        //     		required: true, 
		        //     		message: 'appSecret 不能为空', 
		        //     		trigger: 'blur'
		        //     	}
	            // 	]
	            // },
	            // formItemList: [
	            // 	{
	            // 		id: 1,
	            // 		label: 'appId',
	            // 		keyName: 'appId'
	            // 	},
	            // 	{
	            // 		id: 2,
	            // 		label: 'appSecret',
	            // 		keyName: 'appSecret'
	            // 	}
				// ],
				hostName: '',
				szcompanyname: '',
			}
		},
		async created() {
			// this.isShowLoading = true;
			// const userIdRes = await this.$http.get(this.baseUrl + '/sys/employee/v1/currentUser?access_token=' + this.Cookies.get('token'));
			// console.log(userIdRes);
			// if(!userIdRes) {
			// 	this.isShowLoading = false;
			// 	return;
			// }

			// this.userId = userIdRes.data.iemployeeid;
			// const res = await this.$api.post(this.baseUrl + '/sys/weChat/v1/getWeChat/' + userIdRes.data.iemployeeid);
			// console.log(res);
			// if(!res) {
			// 	this.isShowLoading = false;
			// 	return;
			// }

			// if(res.data) {
			// 	this.formDatas.appId = res.data.appId;
			// 	this.formDatas.appSecret = res.data.appSecret;
			// }
			// this.isShowLoading = false;
			this.hostName = window.location.hostname;
			const res = await this.$http.get(`${this.baseUrl}/ec/home/v1/getGalcompanyName?url=${window.location.hostname}`)
			if (res.data.code === 200) {
				this.szcompanyname = res.data.data;
			} else {
				this.$common.showMessageModal(this, res, 1)
			}
			// console.log(this.hostName)
		},
		methods: {
			// submitForm() {
			// 	this.$refs.thisForm.validate((valid) => {
            //         if(valid) {
            //             this.execSave();
            //         } else {
            //         	return;
            //         }
            //     });
			// },
			// async execSave() {
			// 	this.isShowLoading = true;
			// 	const saveRes = await this.$api.post(this.baseUrl + '/sys/weChat/v1/menuManager',{
			// 		usid: this.userId,
			// 		...this.formDatas
			// 	});
			// 	console.log(saveRes);
			// 	if(!saveRes) {
			// 		this.isShowLoading = false;
			// 		return;
			// 	}

			// 	this.$Modal.success({
			// 		title: '操作成功',
			// 		content: '生成微商城成功'
			// 	});

			// 	// 重新查询
            //     const reRes = await this.$api.post(this.baseUrl + '/sys/weChat/v1/getWeChat/' + this.userId);
			// 	console.log(res);
			// 	if(!reRes) {
			// 		this.$Modal.success({
			// 			title: '操作成功',
			// 			content: '生成微商城成功，但重新查询时出现异常，请刷新后查看'
			// 		});
			// 		this.isShowLoading = false;
			// 		return;
			// 	}

			// 	if(reRes.data) {
			// 		this.formDatas.appId = reRes.data.appId;
			// 		this.formDatas.appSecret = reRes.data.appSecret;
			// 	}
            //     this.isShowLoading = false;
			// }
		}
	}
</script>
<style lang="less" scoped>
	.showview {
		overflow: hidden;
		padding-top: 50px;
		padding-bottom: 100px;
		.left {
			float: left;
			width: 400px;
			margin-right: 120px;
			.divqrcode {
				overflow: hidden;
				margin: 30px 0 50px;
				.qrcode {
					float: right;
				}
			}
			p,h2 {
				text-align: right;
			}
			h2 {
				margin: 120px 0 15px;
				line-height: 30px;
				font-size: 20px;
				color: #333;
			}
			.p1 {
				line-height: 20px;
				font-size: 14px;
				color: #6a6a6a;
			}
			.p2 {
				line-height: 20px;
				font-size: 14px;
				color: #333;
				margin-bottom: 15px;
				span {
					color: #9d9d9d;
					font-size: 12px;
				}
			}
			.p3 {
				line-height: 20px;
				font-size: 14px;
				color: #6a6a6a;
			}
		}
		.iframe {
			float: left;
			width: 317px;
			height: 647px;
			background: url(../../../images/tel.png) no-repeat left top;
			position: relative;
			#mall-iframe {
				width: 283px;
				height: 452px;
				position: absolute;
				left: 17px;
				top: 121px
			}
		}
	}
</style>