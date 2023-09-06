//html编码
export const htmlEncode = (str: string) => {
  if (!str) return ''

  str = str.replace(/</g, '&lt;')
  str = str.replace(/>/g, '&gt;')
  str = str.replace(/\n/g, '<br>')
  str = str.replace(/ /g, '&nbsp;')

  return str
}
