class User {
  constructor(username, password) {
    this.username = username
    this.password = password
  }
}

const user = new User('john.doe', 'sensitive-password')
function serializeUser(user) {
  return JSON.stringify(
    new Proxy(user, {
      get(target, prop, receiver) {
        // 对于敏感字段（如 password），返回脱敏后的值
        if (prop === 'password') {
          return '[REDACTED]'
        }
        return Reflect.get(target, prop, receiver)
      }
    })
  )
}

const serializedUser = serializeUser(user)
console.log(serializedUser)
// 输出：{"username":"john.doe","password":"[REDACTED]"}

function deserializeUser(serializedUser, password) {
  const parsedData = JSON.parse(serializedUser)
  // 创建一个 User 实例
  const user = new User(parsedData.username, password)
  // 将 JSON 解析得到的其他非敏感属性复制到 User 实例上
  for (const prop in parsedData) {
    if (prop !== 'password' && parsedData.hasOwnProperty(prop)) {
      user[prop] = parsedData[prop]
    }
  }
  return user
}

const deserializedUser = deserializeUser(serializedUser, 'sensitive-password')
console.log(deserializedUser)
// 输出：User { username: 'john.doe', password: 'sensitive-password' }
