class MathOperations {
  constructor(initialValue = 0) {
    this.value = initialValue
    // 使用 Proxy 包装 this，实现链式调用
    return new Proxy(this, {
      get: function (target, prop) {
        if (typeof target[prop] === 'function') {
          return function (...args) {
            // 调用原方法并更新 this.value
            target.value = target[prop](...args)
            return this // 返回 this 以支持链式调用
          }
        } else {
          return target[prop]
        }
      }
    })
  }

  add(value) {
    return this.value + value
  }

  subtract(value) {
    return this.value - value
  }

  multiply(value) {
    return this.value * value
  }

  divide(value) {
    if (value !== 0) {
      return this.value / value
    } else {
      throw new Error('Division by zero is not allowed.')
    }
  }
}

// 使用示例
const calculator = new MathOperations(5)

// 链式调用
const result = calculator.add(3).subtract(2).multiply(3)

console.log(calculator.value) // 输出: 18
