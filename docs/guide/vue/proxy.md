# proxy

Vue 3 会使用 Proxy 将其包裹起来，并定义一系列的陷阱函数（trap functions）来拦截和改变对象的行为。这些陷阱函数可以在对象的属性被读取、设置、删除等操作时触发，从而实现数据的响应式更新。

## 陷阱函数

被用来拦截和追踪对响应式对象属性的访问和修改，从而实现数据的变化驱动视图的更新。

- get(target, propKey, receiver)：当读取目标对象的某个属性时调用。

- set(target, propKey, value, receiver)：当给目标对象的某个属性赋值时调用。

- has(target, propKey)：当使用 in 操作符检查目标对象是否包含某个属性时调用。

- deleteProperty(target, propKey)：当使用 delete 操作符删除目标对象的某个属性时调用。

- ownKeys(target)：当使用 Object.getOwnPropertyNames()、Object.getOwnPropertySymbols() 或 Object.keys() 获取目标对象的所有属性键时调用。

- getOwnPropertyDescriptor(target, propKey)：当使用 Object.getOwnPropertyDescriptor() 获取目标对象某个属性的描述符时调用。

- defineProperty(target, propKey, desc)：当使用 Object.defineProperty() 定义目标对象的某个属性时调用。

- preventExtensions(target)：当使用 Object.preventExtensions() 使目标对象不可扩展时调用。

- isExtensible(target)：当使用 Object.isExtensible() 检查目标对象是否可扩展时调用。

- getPrototypeOf(target)：当使用 Object.getPrototypeOf() 获取目标对象的原型时调用。

- setPrototypeOf(target, proto)：当使用 Object.setPrototypeOf() 设置目标对象的原型时调用。

## 举例

<<< @/code/proxy/proxy.js
