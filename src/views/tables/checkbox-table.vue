<template>
    <div id="checkboxTableStyle">
    	<Form>
    		<FormItem v-if="itemList.length" v-for="item in itemList" :key="item.value">
    			<p class="label">{{ item.title }}</p>
    			<Input v-model="item.value" :disabled="item.disabled" class="inputStyle"></Input>
    		</FormItem>
    		<FormItem>
				<p class="label">{{ name }}</p>
				<div class="checkGroup">
	    			<CheckboxGroup v-model="checkPriceList" @on-change="checkAllGroupChange" class="priceList">
						<div v-for="item in priceList" :key="item.value">
							<Checkbox :label="item.value">{{ item.label }}</Checkbox>
						</div>
					</CheckboxGroup>
					<div class="checkAll">
						<Checkbox 
							:indeterminate="indeterminate" 
							v-model="checkAll" 
							@click.prevent.native="handleCheckAll">全选</Checkbox>
					</div>
				</div>
    		</FormItem>
    		<FormItem>
    			<div class="bottomButton">
			    	<Button type="primary" @click="handleSubmit" class="btn">保存</Button>
			        <Button type="ghost" @click="handleReset" class="btn">重置</Button>
			        <Button type="ghost" @click="handleClosePage" class="btn" >关闭</Button>
			    </div>
    		</FormItem>
    	</Form>
    </div>
</template>

<script>
	export default {
		name: 'checkbox-table',
		props: {
			priceList: {
				required: true,
				type: Array,
			},
			itemList: {
				required: true,
				type: Array,
			},
        	checkedList: {
        		type: Array,
        		required: true,
			},
			name: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
        		// 全选
        		checkAll: false,
        		// 已选择的销售权限列表
        		checkPriceList: [],
        		// 不确定状态
				indeterminate: false,
				resetCheckList: [],
				resetIndeterminate: false,
				resetCheckAll: false
			}
		},
		watch: {
			checkedList(val) {
				this.checkPriceList = val;
				this.resetCheckList = val;
				if(val.length === this.priceList.length) {
					this.checkAll = true;
					this.resetCheckAll = true;
					this.indeterminate = false;
					this.resetIndeterminate = false;
				} else if(!val.length) {
					this.checkAll = false;
					this.resetCheckAll = false;
					this.indeterminate = false;
					this.resetIndeterminate = false;
				} else {
					this.checkAll = false;
					this.resetCheckAll = false;
					this.indeterminate = true;
					this.resetIndeterminate = true;
				}
			}
		},
		methods: {
			handleSubmit() {
				this.$emit('submit',this.checkPriceList);
			},
			handleReset() {
				this.checkPriceList = this.resetCheckList;
				this.indeterminate = this.resetIndeterminate;
				if(this.resetCheckAll) {
					this.checkAll = true;
				} else {
					this.checkAll = false;
				}
			},
			handleClosePage() {
				this.$emit('closePage');
			},
			handleCheckAll() {
				if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;
                if (this.checkAll) {
                	this.checkPriceList = this.priceList.map(item => {
                		return item.value;
                	});
                } else {
                    this.checkPriceList = [];
                }
			},
			checkAllGroupChange(data) {
				if (data.length === this.priceList.length) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
                // console.log(data);
			}
		}
	}
</script>

<style scoped lang="less">	
	#checkboxTableStyle {
		.bottomButton {
			margin: 20px 0 60px 190px;
	    	.btn {
	    		margin: 0 5px;
	    	}
	    }
		.priceList {
	 		height:375px;
	 		overflow-y:auto;
	 		margin-left:20px;
	 		padding-top: 8px;
	 	}
	 	.checkGroup {
			float:left;
			width: 80%;
			border-radius: 4px;
			border: 1px solid #dddee1;
	 	}
	 	.label {
	 		float:left;
	 		width:170px;
	 		text-align:right;
	 		margin-right: 20px;
	 		line-height: 40px;
	 		height: 40px;
	 	}
	 	.checkAll {
			border-top: 1px solid #dddee1; 
			padding: 3px 0 0 20px;
			height:40px;
	 	}
	 	.inputStyle {
	 		float: left;
	 		width: 300px;
	 	}
	}
	
</style>

