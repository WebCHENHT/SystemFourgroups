export const Download = (url: string, name: string) => {
  const a = document.createElement('a')
  a.href = url

  a.setAttribute('download', name + '.xlsx')
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
