// 考试参数
export interface Examcan {
  page: number;
  psize: number;
  key: string;
  ismy: number
  admin: string
  state: string
  begindate: string
  enddate: string
  isread:number
}

// //考试学生参数
export interface Examcans {
  page: number;
  psize: number;
  testid:number;
  key: string;
  depid: number|string;
  classid: number|string;
  state: string;
  pass: number;
  pastscores: number;
}

// 考试学生返回参数
export interface List {
	id: number;
	name: string;
	classid: number;
	sex: number;
	mobile?: any;
	username?: any;
	pass?: any;
	oldpass?: any;
	photo?: any;
	addtime: string;
	addip?: any;
	depname: string;
	classname: string;
	readtime?: any;
	scores: number;
	state: string;
	stuBeginTime?: any;
	stuEndTime?: any;
}

export interface Data {
	counts: number;
	pageCounts: number;
	pageSize: number;
	list: List[];
}

export interface RootObject {
list: any;
counts: number;
	errCode: number;
	errMsg: string;
	data: Data;
}


//考试学生试卷抽屉参数.
// //考试学生参数
export interface question {
  testid: number;
  studentid: number;
}

export interface List {
	id: number;
	testid: number;
	title: string;
	type: string;
	scores: number;
	answer?: any;
	tags?: any;
	explains?: any;
	answers?: any;
	answerid: number;
	comments?: any;
	studentanswer?: string;
	studentscores?: any;
}

export interface Data {
	list: List[];
}

export interface questionsList {
	errCode: number;
	errMsg: string;
	data: Data;
}


// 班级
export interface classdata {
  page: number;
  psize: number;
  key: string;
  depid: number|string;
}
// 班级参数
export interface List {
	id: number;
	name: string;
	classroom: string;
	depname: string;
	depid: number;
}

export interface Data {
	counts: number;
	pageCounts: number;
	pageSize: number;
	list: List[];
}

export interface  classesfan{
list: any;
	errCode: number;
	errMsg: string;
	data: Data;
}

// 阅卷参数
export interface optionList {
	testid: number;
	studentid: number;
  name:string;
}

export interface List {
	id: number;
	testid: number;
	title: string;
	type: string;
	scores: number;
	answer?: any;
	tags?: any;
	explains?: any;
	answers?: any;
	answerid: number;
	comments?: any;
	studentanswer?: string;
	studentscores?: any;
}

export interface Data {
	list: List[];
}

export interface optiondata {
list: never[];
	errCode: number;
	errMsg: string;
	data: Data;
}