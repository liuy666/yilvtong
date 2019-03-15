const ticketManagement = {
	state: {
		// 当前页码*
		currentPageNum: 1,
		// 员工列表*
		employeeMap: new Map(),
	},
	mutations: {
		savePage(state,currentPageNum) {
			state.currentPageNum = currentPageNum;
		},
		saveEmployeeMap(state,val) {
			state.employeeMap = val;
		}
	}
};

export default ticketManagement;