import { utils, writeFile } from 'xlsx'

export default {
  methods: {
    exportToExcel(): any {
      const data: any[] = [
        // 这里填充你的数据
        // 例如：{ name: 'John', age: 30, email: 'john@example.com' }
      ]

      // 创建一个工作簿
      const sheet = utils.json_to_sheet(data)
      const workbook = utils.book_new()
      utils.book_append_sheet(workbook, sheet, 'Sheet1')

      // 将工作簿写入文件
      const excelBuffer = writeFile(workbook, { bookType: 'xlsx', type: 'array' })

      // 将文件下载到用户设备
      const blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })
      const saveFile = 'example.xlsx'
      if (navigator.msSaveBlob) {
        // 兼容性处理 for IE
        navigator.msSaveBlob(blob, saveFile)
      } else {
        const link = document.createElement('a')
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob)
          link.setAttribute('href', url)
          link.setAttribute('download', saveFile)
          link.style.visibility = 'hidden'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      }
    }
  }
}
