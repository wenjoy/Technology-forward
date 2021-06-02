export enum NODE_TYPE {
  div,
  input,
  span,
  text,
}

interface ReactNode {
  type: string,
  props: any,
  children: ReactNode[],
}

function commit(node: string): HTMLElement 
function commit(node: ReactNode): HTMLElement 
function commit(node): HTMLElement {
  let dom
  if (typeof node.type !== 'string') {
    dom = document.createTextNode(node)
  } else {
    dom = document.createElement(node.type)
    for (let k in node.props) {
      dom.setAttribute(k, node.props[k])
    }
    if (node.children?.length > 0) {
      node.children.forEach(child => {
        dom.appendChild(commit(child))
      })
    }
  }

  return dom
}

export default class Fiber {
  static render(node: ReactNode, root: HTMLElement) {
    root.appendChild(commit(node));
  }

  static createElement(name: string, props: any, ...children: ReactNode[]): ReactNode {
    return {
      type: name,
      props,
      children
    }
  }
}
