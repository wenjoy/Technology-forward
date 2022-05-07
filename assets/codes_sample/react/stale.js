function classic() {
  const fn = []
  // for (let i = 0; i < 10; i++) {
  for (var i = 0; i < 10; i++) {
    fn.push(function () {
      console.log(i)
    })
  }
  return fn
}
// classic().forEach(item => item())

let i = 0
function genFunc() {
  i++
  let n = i
  return function () {
    console.log(n)
  }
}

const fn1 = genFunc();
const fn2 = genFunc();
fn1()
fn2()