export const Down = (url: string) => {
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export const Downblob = (file: any, fileName: string) => {
  const blob = new Blob([file], { type: 'application/vnd.ms-excel' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.setAttribute('download', fileName)
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
