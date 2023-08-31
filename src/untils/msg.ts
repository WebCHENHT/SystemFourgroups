// utils/msg.ts文件
import { ElMessage, ElMessageBox } from 'element-plus'

// 普通信息提示
export function infoMsg(msgInfo: any) {
  ElMessage({
    type: 'info',
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: msgInfo
  })
}

// 成功提示
export function succesMsg(msgInfo: any) {
  ElMessage({
    type: 'success',
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: msgInfo
  })
}

// 错误提示
export function errorMsg(msgInfo: any) {
  ElMessage({
    type: 'error',
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: msgInfo
  })
}

// 警告提示
export function warnMsg(msgInfo: any) {
  ElMessage({
    type: 'warning',
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: msgInfo
  })
}

// 带一个确定按钮或是按钮的alertBox
export function alertBox(msg: any, btnName: any, type: any) {
  const confirmName = btnName == '确定' ? '确定' : '是'
  return ElMessageBox.alert(msg, '提示', {
    type: type,
    confirmButtonText: confirmName,
    dangerouslyUseHTMLString: true
  })
}
// 带确定取消按钮或者是否按钮的弹出提示框
export function confirmBox(msg: any, btnName: any, type: any) {
  const confirmName = btnName == '确定' ? '确定' : '确定'
  const cancelsName = btnName == '确定' ? '取消' : '取消'
  return ElMessageBox.confirm(msg, '提示', {
    type: type,
    confirmButtonText: confirmName,
    cancelButtonText: cancelsName,
    closeOnClickModal: false,
    closeOnPressEscape: false,
    dangerouslyUseHTMLString: true
  })
}
