const FUNC_ERROR_TEXT = 'Expected a function'

const nativeMax = Math.max // 原生最大值方法
const nativeMin = Math.min // 原生最小值方法

function debounce(func, wait, options) {
  let lastArgs, // debounced 被调用后被赋值,表示至少调用 debounced一次
    lastThis, // 上次调用this
    maxWait, // 最大等待时间
    result, // return 的结果，可能一直为 undefined，没看到特别的作用
    timerId, // timerId
    lastCallTime // 上次调用debounced时间,即触发时间，不一定会调用func

  // 参数初始化
  let lastInvokeTime = 0 // 上次调用func时间，即成功执行时间
  let leading = false // 是否第一次触发时立即执行
  let maxing = false // 最大的等待时间，因为如果 debounce 的函数调用时间不满足条件，可能永远都无法触发，因此增加了这个配置，保证大于一段时间后一定能执行一次函数
  let trailing = true // 函数在每个等待时延的结束被调用

  // 基本的类型判断和处理 如果传入的 func 不是函数，抛出一段优雅的报错提示语
  if (typeof func !== 'function') {
    throw new TypeError(FUNC_ERROR_TEXT)
  }
  wait = Number(wait) || 0
  if (typeof options === 'object') {
    // 判断当前接收的的参数是否为object对象
    // 对配置的一些初始化
    leading = Boolean(options.leading) // 指定在超时的前沿调用。
    maxing = 'maxWait' in options
    maxWait = maxing ? nativeMax(Number(options.maxWait) || 0, wait) : maxWait // 允许在调用之前延迟最大时间。
    trailing = 'trailing' in options ? Boolean(options.trailing) : trailing // 指定在超时的后沿调用。
  }

  // 执行 用户传入的 func
  // 重置 lastArgs，lastThis
  // lastInvokeTime 在此时被赋值，记录上一次调用 func的时间
  function invokeFunc(time) {
    // 调用func，参数为当前时间
    const args = lastArgs // 调用参数
    const thisArg = lastThis // 调用的this

    lastArgs = lastThis = undefined // 清除lastArgs和lastThis
    lastInvokeTime = time // 上次调用时间为当前时间
    result = func.apply(thisArg, args) // 调用func，并将结果返回
    return result
  }

  //  防抖开始时执行的操作
  //  lastInvokeTime 在此时被赋值，记录上一次调用 func的时间
  //  设置了立即执行func，则执行func， 否则设置定时器
  function leadingEdge(time) {
    // 超时之前调用
    // Reset any `maxWait` timer.
    lastInvokeTime = time // 设置上次调用时间为当前时间
    // 为 trailing edge 触发函数调用设定定时器
    timerId = setTimeout(timerExpired, wait) // 开始timer
    // leading = true 执行函数
    return leading ? invokeFunc(time) : result // 如果leading为true，调用func,否则返回result
  }

  // 计算还需要等待多久
  // 没设置最大等待时间，结果为 wait - (当前时间 - 上一次触发(scroll) )  时间，也就是  wait - 已经等候时间
  // 设置了最长等待时间，结果为 最长等待时间 和 按照wait 计算还需要等待时间 的最小值
  function remainingWait(time) {
    // 设置还需要等待的时间
    const timeSinceLastCall = time - lastCallTime // 距离上次debounced函数被调用的时间 距离上次触发的时间
    const timeSinceLastInvoke = time - lastInvokeTime // 距离上次函数被执行的时间 距离上次调用func的时间
    const timeWaiting = wait - timeSinceLastCall // 用 wait 减去 timeSinceLastCall 计算出下一次trailing的位置 还需要等待的时间

    // 两种情况
    // 有maxing:比较出下一次maxing和下一次trailing的最小值，作为下一次函数要执行的时间
    // 无maxing：在下一次trailing时执行 timerExpired
    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting
  }

  // 根据时间判断 func 能否被执行
  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime // 距离上次触发时间的时间
    const timeSinceLastInvoke = time - lastInvokeTime // 距离上次调用func的时间

    // 几种满足条件的情况
    return (
      lastCallTime === undefined || // 首次
      timeSinceLastCall >= wait || // 距离上次被调用已经超过 wait
      timeSinceLastCall < 0 || // 系统时间倒退
      (maxing && timeSinceLastInvoke >= maxWait)
    ) // 超过最大等待时间
  }

  // 执行函数呢 还是继续设置定时器呢？ 防抖的核心
  // 时间满足条件，执行
  // 否则 重新设置定时器
  function timerExpired() {
    // 刷新timer
    const time = Date.now()
    // 在 trailing edge 且时间符合条件时，调用 trailingEdge函数，否则重启定时器
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    // 重启定时器，保证下一次时延的末尾触发
    timerId = setTimeout(timerExpired, remainingWait(time)) // 不调用则重置timerId
  }

  // 执行用户传入的 func 之前的最后一道屏障  func os: 执行我一次能咋地，这么多屏障？
  // 重置 定时器
  // 执行 func
  // 重置 lastArgs = lastThis 为 undefined
  function trailingEdge(time) {
    // 超时之后调用
    timerId = undefined

    // 有lastArgs才执行，意味着只有 func 已经被 debounced 过一次以后才会在 trailing edge 执行
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    // 每次 trailingEdge 都会清除 lastArgs 和 lastThis，目的是避免最后一次函数被执行了两次
    // 举个例子：最后一次函数执行的时候，可能恰巧是前一次的 trailing edge，函数被调用，而这个函数又需要在自己时延的 trailing edge 触发，导致触发多次
    lastArgs = lastThis = undefined
    return result
  }

  // 取消防抖
  //  重置所有变量  清除定时器
  function cancel() {
    // 取消执行
    if (timerId !== undefined) {
      clearTimeout(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  // 定时器已存在，去执行
  function flush() {
    // 直接执行
    return timerId === undefined ? result : trailingEdge(Date.now())
  }

  //  是否正在 等待中
  function pending() {
    return timerId !== undefined
  }

  // 正房来了！这是入口函数，在这里运筹帷幄，根据敌情调配各个函数，势必骗过用户那个傻子，我没有一直在执行但你以为我一直在响应你哦
  function debounced(...args) {
    const time = Date.now()
    const isInvoking = shouldInvoke(time) // 是否满足时间条件

    lastArgs = args // 得到参数
    lastThis = this // 得到this对象
    lastCallTime = time // 函数被调用的时间

    if (isInvoking) {
      if (timerId === undefined) {
        // 无timerId的情况有两种：1.首次调用 2.trailingEdge执行过函数
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        // 处理多次频繁的调用
        timerId = setTimeout(timerExpired, wait) // 设置定时器
        return invokeFunc(lastCallTime)
      }
    }
    // 负责一种case：trailing 为 true 的情况下，在前一个 wait 的 trailingEdge 已经执行了函数；
    // 而这次函数被调用时 shouldInvoke 不满足条件，因此要设置定时器，在本次的 trailingEdge 保证函数被执行
    if (timerId === undefined) {
      // 如果没有timer,设置定时器
      timerId = setTimeout(timerExpired, wait)
    }
    return result
  }
  debounced.cancel = cancel
  debounced.flush = flush
  debounced.pending = pending
  return debounced
}

// 简易版防抖函数

function simpleDebounce(func, time, options) {
  let leading = false // 是否第一次触发时立即执行
  // 判断当前传输函数的准确性
  if (typeof func !== 'function') {
    throw new TypeError(FUNC_ERROR_TEXT)
  }
  // 判断当前接收的的参数是否为object对象
  if (typeof options === 'object') {
    // 对配置的一些初始化
    leading = Boolean(options.leading) // 指定当前函数是否立即执行
  }
  let timeout = null
  return function() {
    timeout && clearTimeout(timeout)
    leading && !timeout && func.apply(this, arguments)
    timeout = setTimeout(() => {
      leading && (timeout = null)
      !leading && func.apply(this, arguments)
    }, time)
  }
}
export default {
  debounce,
  simpleDebounce
}
