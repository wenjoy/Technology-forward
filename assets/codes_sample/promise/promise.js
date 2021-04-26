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

  // deferCall = (callback) => {
  //   setTimeout(callback, 0)
  // }
  resolvePromise(value, promise) {
    // console.log('value: ', value, promise, value===promise);
    if(value === promise) {throw 'TypeError'}
    return value
  }

  then(onFulfill, onReject) {
    onFulfill = typeof onFulfill === 'function' ? onFulfill : v => v
    onReject = typeof onReject === 'function' ? onReject : e => { throw e }
    const promise = new Promise((resolve, reject) => {
      if (this.state === PENDING) {
        this.onFulfilledCallbacks.push((d) => {
          setTimeout(() => {
            try {
              resolve(onFulfill(d))
            } catch (err) {
              reject(err)
            }
          })
        })
        this.onRejectedCallbacks.push((r) => {
          setTimeout(() => {
            try {
              resolve(onReject(r))
            } catch (err) {
              reject(err)
            }
          })
        })
      } else if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            const x = onReject(this.reason)
            resolve(x)
          } catch (err) {
            reject(err)
          }
        })
      } else {
        setTimeout(() => {
          try {
            resolve(this.resolvePromise(onFulfill(this.data), promise))
          } catch (err) {
            console.log('err: ', err);
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

const p = new Promise((res, rej)=>{
  res(123)
}).then(()=>p)

p.then(()=>{
  console.log('dont')
}, (e)=>{
  console.log('e: ', e);
})
.then(()=>{console.log('res')}, ()=>{console.log('rej')})


module.exports = Promise