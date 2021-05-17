const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class Promise {
  state = PENDING
  data = null
  reason = null
  onFulfilledCallbacks = []
  onRejectedCallbacks = []
  constructor(executor) {
    const resolve = (data) => {
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.data = data
        this.onFulfilledCallbacks.forEach(c => c(data))
      }
    }
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(c => c(reason))
      }
    }
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err)
    }
  }

  resolvePromise(x, promise, resolve, reject) {
    if (x === promise) { return (reject(new TypeError('same promise'))) }

    // if (x instanceof Promise) {
    //   x.then((d) => {
    //     resolve(d)
    //   }, (r) => {
    //     reject(r)
    //   })
    //   return
    // }

    let called = false

    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
      try {
        let then = x.then
        if (typeof then === 'function') {
          then.call(x, (y) => {
            if (called) return
            called = true
            this.resolvePromise(y, promise, resolve, reject)
          }, (r) => {
            if (called) return
            called = true
            reject(r)
          })
          return
        } else {
          if (called) return
          called = true
          resolve(x)
        }
      } catch (err) {
        if (called) return
        called = true
        reject(err)
      }
    }

    resolve(x)
  }

  then(onFulfill, onReject) {
    onFulfill = typeof onFulfill === 'function' ? onFulfill : v => v
    onReject = typeof onReject === 'function' ? onReject : e => { throw e }
    let promise
    // use const promise = new Promise may encounter problem `promise` referenced before defined, if does not use setTimeout, to avoid this error confused real reason to have to use `setTimeout`, the 2.2.4 specific, so I modify this line.
    promise = new Promise((resolve, reject) => {
      if (this.state === PENDING) {
        this.onFulfilledCallbacks.push((d) => {
          setTimeout(() => {
            try {
              resolve(onFulfill(d))
              // this.resolvePromise(onFulfill(d), promise, resolve, reject)
            } catch (err) {
              reject(err)
            }
          })
        })
        this.onRejectedCallbacks.push((r) => {
          setTimeout(() => {
            try {
              resolve(onReject(r))
              // this.resolvePromise(onReject(r), promise, resolve, reject)
            } catch (err) {
              reject(err)
            }
          })
        })
      } else if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            this.resolvePromise(onReject(this.reason), promise, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      } else {
        setTimeout(() => {
          /**
           * 必须用 setTimeout，规范里规定then 的回调不能立即执行
           * platform code 指的是engine, environment, and promise implementation code. 也就是说，除了 v8 引擎等 core code，也就是我们写的程序都执行完。就等于说是异步执行。
           * 2.2.4`onFulfilled` or `onRejected` must not be called until the execution context stack contains only platform code.
           */

          try {
            this.resolvePromise(onFulfill(this.data), promise, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      }
    })
    return promise
  }
}

Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  })
  return dfd;
}

// const p = new Promise((res, rej)=>{
//   res(123)
// }).then(()=>({then(res,rej){res(promise)}}))

// p.then(()=>{
//   console.log('dont')
// }, (e)=>{
//   console.log('e: ', e);
// })
// .then(()=>{console.log('res')}, ()=>{console.log('rej')})


module.exports = Promise