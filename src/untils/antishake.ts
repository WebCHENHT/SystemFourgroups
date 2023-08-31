// 防抖,当用户操作较为频繁时,只发送最后一次结果作为请求
// 在这里我用的时ts写的,对于传入的值有严格的效验
export const debounce = (func: Function, time: number, immediate = false) => {
  let timer: number | null = null;
  return (...args: any) => {
    if (timer) clearInterval(timer);
    if (immediate) {
      if (!timer) func.apply(this, args);
      timer = window.setTimeout(() => {
        timer = null;
      }, time);
    } else {
      timer = window.setTimeout(() => {
        func.apply(this, args);
      }, time);
    }
  };
};
