export const Download = (url: string, name: string) => {
  const a = document.createElement('a')
  a.href = url
  a.style.display = 'none'
  a.setAttribute('download', name + '.xlsx')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
