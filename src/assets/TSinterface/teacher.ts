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

// export interface TeacherList {
// 	errCode: number;
// 	errMsg: string;
// 	data: Data;
// }
export interface RootObject {
  data: Data
}

// 参数
export interface teacher {
  page:number;
  psize:number;
  depid:number;
  key:string;
}

// 删除参数
export interface teacherdeletes {
	errCode: number;
	errMsg: string;
}
// 删除传参
export interface teacherdele {
  id:number;
}


// 删除返回
export interface teacherchanges {
	errCode: number;
	errMsg: string;
}
// 删除传参
export interface teacherchange {
  oldpass:string;
  pass:string;
}

// 角色
export interface RoleList {
	id: number;
	name: string;
	menus?: any;
}

export interface RoleData {
	counts: number;
	pageCounts: number;
	pageSize: number;
	list: List[];
}

export interface RoleRootObject {
list: never[];
	errCode: number;
	errMsg: string;
	data: Data;
}
// 角色参数
export interface Rolecan {
  page:number;
  psize:number;
}
// 添加
export interface teacherRoot {
	errCode: number;
	errMsg: string;
}
export interface teacherRootAdd {
	id: number;
	username: string;
	pass: string;
	name: string;
	tel: string;
	depid: number;
	roleid: number|string;
}