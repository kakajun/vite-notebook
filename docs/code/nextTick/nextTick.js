// #region snippet

export function nextTick(callback) {
  return new Promise(resolve => {
    let observer
    const node = document.createTextNode('')

    // 使用 MutationObserver（如果可用）
    if (MutationObserver) {
      observer = new MutationObserver(() => {
        observer.disconnect()
        resolve()
      })
      observer.observe(node, { characterData: true })
      node.data = node.data // 触发 MutationObserver
    } else {
      // 退回到 setTimeout
      setTimeout(resolve, 0)
    }

    resolve() // 在当前执行栈结束后立即调用
  }).then(callback)
}
// #endregion snippet

export function init() {
  // 这个函数现在只是为了展示如何使用 MutationObserver，它不会与 nextTick 交互
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        console.log('A child node has been added or removed.')
      } else if (mutation.type === 'attributes') {
        console.log(
          'The ' + mutation.attributeName + ' attribute was modified.'
        )
      } else if (mutation.type === 'characterData') {
        console.log('Character data inside a node has changed.')
      }
    })
  })

  const config = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true
  }
  observer.observe(document.body, config)

  // 当你想停止观察时
  // observer.disconnect();
}


