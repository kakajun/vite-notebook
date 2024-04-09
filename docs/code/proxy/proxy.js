// 假设我们有一个普通的 JavaScript 对象
const originalObject = {
  name: 'Vue',
  version: '3.x'
}

// Vue 3 响应式系统会使用类似以下的函数来创建 Proxy
function reactive(target) {
  // 使用 Proxy 包裹目标对象
  return new Proxy(target, {
    get(target, key, receiver) {
      console.log(`获取属性: ${key}`)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      console.log(`设置属性: ${key}, 值: ${value}`)
      const result = Reflect.set(target, key, value, receiver)
      // 假设这里会触发视图的更新
      updateView()
      return result
    }
  })
}

// 假设的视图更新函数
function updateView() {
  console.log('视图已更新')
}

// 创建一个响应式对象
const reactiveObject = reactive(originalObject)

// 访问属性，会触发 get 陷阱函数
console.log(reactiveObject.name) // 输出: 获取属性: name, Vue

// 修改属性，会触发 set 陷阱函数，并假设更新视图
reactiveObject.version = '3.1' // 输出: 设置属性: version, 值: 3.1, 视图已更新
