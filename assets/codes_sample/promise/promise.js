const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class Promise {
  state = PENDING
  data = null
  reason = null
  constructor(executor) {
    const resolve = (data) => {
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.data = data
        this.onFulfill(data)
      }
    }
    const reject = (reason) => {

      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        this.onReject(reason)
      }
    }
    try {
      executor(resolve, reject);
    }catch(err) {
      reject(err)
    }
  }
  onFulfill = () => {
    // console.log('noop fulfill')
  }
  onReject = () => {
    // console.log('noop reject')
  }

  deferCall = (callback) => {
    setTimeout(callback,0)
  }

  then(onFulfill, onReject) {
    onFulfill = typeof onFulfill === 'function' ? onFulfill : v => v
    onReject = typeof onReject === 'function' ? onReject : e => { throw e }
    const promise = new Promise((resolve, reject) => {
      if (this.state === PENDING) {
        this.onFulfill = (d) => { resolve(onFulfill(d)) }
        this.onReject = (r) => { reject(onReject(r)) }
      } else if (this.state === REJECTED) {
        this.deferCall(()=>{reject(onReject(this.reason))})
      } else {
        this.deferCall(()=>{resolve(onFulfill(this.data))})
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

var isFulfilled = false;
const d = Promise.deferred()
d.promise.then(()=>{
  console.log('1')
  console.log(isFulfilled)
})

setTimeout(()=>{
  d.resolve('123')
  isFulfilled= true
},50)

module.exports = Promise