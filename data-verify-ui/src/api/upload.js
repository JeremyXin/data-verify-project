// mockUpload: 模拟后端文件上传接口
// file: File 对象
// 返回 Promise<{ success: boolean, message: string }>
export function mockUpload(file) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 模拟 80% 成功，20% 失败
      if (Math.random() < 0.8) {
        resolve({
          success: true,
          message: `文件“${file.name}”上传成功！`
        })
      } else {
        resolve({
          success: false,
          message: `文件“${file.name}”上传失败：服务器异常。`
        })
      }
    }, 1200)
  })
} 