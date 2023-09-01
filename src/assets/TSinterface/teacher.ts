// 师资列表
export interface List {
	id: number;
	username: string;
	pass: string;
	name: string;
	tel: string;
	depid: number;
	depname: string;
	roleid: number;
	rolename: string;
}

export interface Data {
	counts: number;
	pageCounts: number;
	pageSize: number;
	list: List[];
}

export interface TeacherList {
	errCode: number;
	errMsg: string;
	data: Data;
}
// 参数
export interface teacher {
  page:number;
  psize:number;
  depid:number;
  key:string;
}