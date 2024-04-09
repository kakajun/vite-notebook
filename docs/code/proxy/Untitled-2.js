function createLoggingProxy(target, logLabel) {
  const handler = {
    get: function (receiver, property, proxy) {
      console.log(
        `${logLabel}: Getting property "${property}" with value "${target[property]}"`
      )
      return target[property]
    },
    set: function (receiver, property, value, proxy) {
      console.log(
        `${logLabel}: Setting property "${property}" from "${target[property]}" to "${value}"`
      )
      target[property] = value;
      return true;
    }
  }
  return new Proxy(target, handler)
}

// 创建一个普通的对象
const myObject = { name: 'John Doe', age: 30 };

// 创建一个代理对象来记录对这个对象的访问和修改
const loggedObject = createLoggingProxy(myObject, 'User Object');

// 访问属性
console.log(loggedObject.name);

// 修改属性
loggedObject.age = 31;
// User Object: Getting property "name" with value "John Doe"
// 修改属性
// loggedObject.age = 31;
// User Object: Setting property "age" from "30" to "31"```
/*
在这个例子中，`createLoggingProxy` 函数接收一个目标对象
 `target` 和一个日志标签 `logLabel`，然后返回一个新的代理对象。
 代理对象通过 `Proxy` 构造函数创建，并传入一个处理器对象 `handler`，
 该处理器定义了 `get` 和 `set` 陷阱（trap）函数。
 - 当访问代理对象的属性时，`get` 陷阱函数会被调用，
 并记录属性的访问信息。- 当修改代理对象的属性时，
 `set` 陷阱函数会被调用，并记录属性的修改信息。这样，每当对
  `loggedObject` 进行访问或修改时，控制台都会输出相应的日志信息，
  从而帮助开发者监控对象的状态变化。这对于调试和理解代码的行为非常有用，
  尤其是在处理复杂的对象和数据流时。请注意，`Proxy` 可以用于拦截和自定义更多的操作，
  如函数调用、属性删除、枚举等，这为开发者提供了强大的工具来增强或修改对象的行为。

*/
