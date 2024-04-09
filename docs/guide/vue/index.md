# nextTick

本质上是利用了浏览器的宏任务和微任务机制，在浏览器中，宏任务是 `setTimeout`、`setInterval`、`setImmediate`、`requestAnimationFrame`，微任务是 `Promise.then`。

## 举例

<<< @/code/nextTick/nextTick.js#snippet{1}
