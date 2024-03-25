# 函数式编程

类编程是对模型的抽象, 函数式编程是对过程的抽象

- .map()、.filter() 和 .reduce() 是函数式编程的常用方法
- 使用纯函数. 纯函数是一种不改变任何外部状态且对于相同的输入总是返回相同输出的函数。
- 函数组合: 函数组合是将两个或更多的函数组合成一个函数的过程。
- 使用柯里化: 柯里化是一种将接受多个参数的函数转换成一系列使用一个参数的函数的技术。

## Maybe 函子

"Maybe 函子"是函数式编程中的一个概念，尤其在处理不确定性或可能不存在的值时非常有用。

基本结构:

Maybe 函子的基本实现包括两个主要部分：Just和Nothing。

- Just：代表一个包含值的实例。
- Nothing：代表一个不包含值的实例。

作用:

- 处理空值和错误 不是到处使用if语句检查空值
- 函数式错误处理
- 链式调用

```js
class Maybe {
  constructor(value) {
    this.value = value
  }

  static just(value) {
    return new Maybe(value)
  }

  static nothing() {
    return new Maybe(null)
  }

  map(f) {
    return this.value == null ? Maybe.nothing() : Maybe.just(f(this.value))
  }

  isNothing() {
    return this.value == null
  }

  getValue() {
    return this.isNothing() ? 'Nothing' : `Just(${this.value})`
  }
}

// 使用示例
const result = Maybe.just(5)
  .map(x => x * 2)
  .map(x => x + 1)
  .getValue()

console.log(result) // 输出: Just(11)

const result2 = Maybe.nothing()
  .map(x => x * 2)
  .map(x => x + 1)
  .getValue()

console.log(result2) // 输出: Nothing
```

## Either 函子

用于错误处理和条件逻辑，可以被看作是一个带有两个分支的容器：一个是 Left 分支，通常用于表示错误或异常情况；另一个是 Right 分支，通常用于表示成功的值。

```js
class Left {
  constructor(value) {
    this.value = value
  }

  map(f) {
    return this // 左侧值不应用任何操作
  }
}

class Right {
  constructor(value) {
    this.value = value
  }

  map(f) {
    return new Right(f(this.value)) // 右侧值应用映射操作
  }
}

// 示例使用
const divide = (numerator, denominator) => {
  if (denominator === 0) {
    return new Left('Cannot divide by 0')
  } else {
    return new Right(numerator / denominator)
  }
}

const result = divide(10, 0)
  .map(x => x * 2)
  .map(x => x + 1)

if (result instanceof Left) {
  console.log(result.value) // 输出: Cannot divide by 0
} else {
  console.log(result.value)
}
```

### 差异

Maybe 适用于处理可能缺失的值，而 Either 更适用于需要区分成功和失败操作的场景，尤其是当错误需要被详细处理时

## IO函子

用于处理副作用（如输入/输出操作）而不破坏纯函数的特性

```js
class IO {
  constructor(effect) {
    if (typeof effect !== 'function') {
      throw 'IO Usage: function required'
    }
    this.effect = effect
  }

  // 执行被封装的副作用
  run() {
    return this.effect()
  }

  // 映射一个函数到 IO 函子的值上
  map(f) {
    return new IO(() => f(this.run()))
  }

  // 组合另一个 IO 函子
  flatMap(f) {
    return f(this.run())
  }
}

// 示例：封装一个读取环境变量的副作用
const readEnv = new IO(() => process.env.PATH)
// 通过映射转换封装的结果
const logEnv = readEnv.map(value => `Path: ${value}`)
// 执行副作用
console.log(logEnv.run())
```

## Task 函子

有时也被称为 Future ,是函数式编程中用于处理异步操作的工具

### 特点和作用

- 惰性执行：
- 更强的组合性：
- 错误处理：

```js
class Task {
  constructor(fork) {
    this.fork = fork
  }

  // 创建一个成功的 Task
  static of(value) {
    return new Task((reject, resolve) => resolve(value))
  }

  // 创建一个失败的 Task
  static rejected(value) {
    return new Task((reject, resolve) => reject(value))
  }

  // 映射成功的值
  map(fn) {
    return new Task((reject, resolve) =>
      this.fork(reject, value => resolve(fn(value)))
    )
  }

  // 映射失败的值
  mapRejected(fn) {
    return new Task((reject, resolve) =>
      this.fork(value => reject(fn(value)), resolve)
    )
  }

  // 链接另一个 Task
  chain(fn) {
    return new Task((reject, resolve) =>
      this.fork(reject, value => fn(value).fork(reject, resolve))
    )
  }

  // 错误处理
  catch(fn) {
    return new Task((reject, resolve) =>
      this.fork(err => fn(err).fork(reject, resolve), resolve)
    )
  }
}

// 使用示例
const fetchUserById = id =>
  new Task((reject, resolve) => {
    setTimeout(() => {
      if (id === 1) {
        resolve({ id: 1, name: 'John Doe' })
      } else {
        reject(new Error('User not found'))
      }
    }, 1000)
  })

fetchUserById(1)
  .map(user => ({ ...user, isLoggedIn: true }))
  .fork(
    error => console.error(error),
    user => console.log(user)
  )
```

### 对比 Promise

虽然 Task 函子和 Promise 都用于处理异步操作，但它们在几个关键方面有所不同：

- 执行时机：Task 函子是惰性的，需要显式执行，而 Promise 创建时就自动执行。
- 组合性：Task 函子提供了更丰富的组合操作，使得管理复杂的异步流程更加灵活。
- 控制权：Task 函子给予了调用者更多的控制权，包括何时开始执行和如何处理错误。
