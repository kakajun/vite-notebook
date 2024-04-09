const target = {} // 目标对象

const handler = {
  set: function (obj, prop, value) {
    // 在设置属性值之前进行验证
    if (prop === 'age') {
      if (typeof value !== 'number' || !Number.isInteger(value) || value < 0) {
        throw new Error('Age must be a non-negative integer.')
      }
    }
    // 如果验证通过，则设置属性值
    obj[prop] = value
    return true // 表示设置成功
  }
}

const proxy = new Proxy(target, handler) // 创建代理对象

// 尝试设置age属性
try {
  proxy.age = 25 // 设置成功，因为25是一个非负整数
  console.log(proxy.age) // 输出: 25

  proxy.age = -5 // 抛出错误，因为-5不是一个非负整数
} catch (error) {
  console.error(error.message) // 输出: Age must be a non-negative integer.
}

try {
  proxy.age = 'twenty-five' // 抛出错误，因为'twenty-five'不是一个数字
} catch (error) {
  console.error(error.message) // 输出: Age must be a non-negative integer.
}
