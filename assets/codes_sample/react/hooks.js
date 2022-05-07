const MyReact = (function () {
  let hooks = [], deps;
  let hooksIndex = 0;
  return {
    render(component) {
      hooksIndex = 0;
      const comp = component();
      comp.render();
      return comp
    },
    useEffect(callback, dependencies) {
      const changed = deps ? dependencies.every((dep, ind) => dep === deps[ind]) : true;
      if (changed) {
        deps = dependencies;
        callback();
      }
    },
    useState(initial) {
      let val = hooks[hooksIndex]
      //why assign to keepIndex can solve the problem of stale
      // first call useState, keepIndex memory address is 0x001
      // second call useState, keepIndex memory address is 0x002
      // but for hooksIndex, it is always 0x001
      let keepIndex = hooksIndex
      val = val ?? initial;
      const setVal = (value) => {
        // so the ref in this closure is always the 0x001. analogy of box for variable is help to understand
        hooks[keepIndex] = value;
      }
      hooksIndex++;
      return [val, setVal];
    }
  }
})()

function MyComponent() {
  const [count, setCount] = MyReact.useState(0);
  const [text, setText] = MyReact.useState('Hello');
  return {
    click() {
      setCount(count + 1);
    },
    type() {
      setText(text + ' World');
    },
    render() {
      console.log('--rendering--');
      console.log('count', count);
      console.log('text', text);
    }
  }
}

const app = MyReact.render(MyComponent);
app.click()
MyReact.render(MyComponent);
app.type()
MyReact.render(MyComponent);