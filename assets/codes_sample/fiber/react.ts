// based on react 16.1.0
interface ReactElement {
  $$typeof: Symbol,
  operation?: string,
  type: string,
  props: {
    children: ReactElement[],
    [key: string]: any;
  },
}


//# react-reconcile
interface Fiber {
  tag: any
  stateNode: any
  alternate: Fiber
  expirationTime: number
  return: Fiber | null
  child: Fiber | null
  sibling: Fiber | null
  key: any,
  type: any,
  ref: any,
  effectTag: any,
  pendingProps: any,
  firstEffect: any,
  lastEffect: any,
  nextEffect: any,
  updateQueue: {
    first: any,
    last: any
  },
  value?: any
}
interface FiberRoot {
  current: Fiber,
  containerInfo: HTMLElement
  finishedWork: Fiber | null
  remainingExpirationTime: number
  nextScheduledRoot: FiberRoot | null
}

type ExpirationTime = number
const Sync = 1
const NoWork = 0

export const NoEffect = 0; //           0b00000000
export const PerformedWork = 1; //      0b00000001

// You can change the rest (and add more).
export const Placement = 2; //          0b00000010
export const Update = 4; //             0b00000100
export const PlacementAndUpdate = 6; // 0b00000110
export const Deletion = 8; //           0b00001000
export const ContentReset = 16; //      0b00010000
export const Callback = 32; //          0b0010000

export const IndeterminateComponent = 0; // Before we know whether it is functional or class
export const FunctionalComponent = 1;
export const ClassComponent = 2;
export const HostRoot = 3; // Root of a host tree. Could be nested inside another node.
export const HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
export const HostComponent = 5;
export const HostText = 6;
export const CallComponent = 7;
export const CallHandlerPhase = 8;
export const ReturnComponent = 9;
export const Fragment = 10;

const REACT_ELEMENT_TYPE = Symbol.for('react.element')

let isRendering = false

let isWorking = false
let nextRoot = null
let nextRenderExpirationTime = 0
let nextUnitOfWork = null
let interruptedBy = null

let isBatchingUpdates: boolean = false;
let isUnbatchingUpdates: boolean = false;
let isCallbackScheduled: boolean = false;

let nextFlushedRoot: FiberRoot | null = null;
let nextFlushedExpirationTime: ExpirationTime = NoWork;

let nextEffect = null
let firstScheduledRoot = null
let lastScheduledRoot = null

function createFiber(tag): Fiber {
  return {
    tag,
    key: null,
    type: null,
    stateNode: null,
    return: null,
    child: null,
    sibling: null,
    ref: null,
    effectTag: NoEffect,
    alternate: null,
    expirationTime: null,
    updateQueue: null,
    pendingProps: null,
    firstEffect: null,
    lastEffect: null,
    nextEffect: null,
  }
}

function unbatchedUpdates(fn: () => void) {
  fn()
}
function performAsyncWork(dl) {
  performWork(NoWork, dl);
}
function scheduleDeferredCallback(fn) {
  //@ts-ignore
  window.requestIdleCallback(fn)
}

function isHostParent(fiber: Fiber): boolean {
  return (
    fiber.tag === HostComponent ||
    fiber.tag === HostRoot ||
    fiber.tag === HostPortal
  );
}
function commitPlacement(finishedWork: Fiber) {
  let parentFiber = finishedWork.return
  let isContainer = false
  let parent = null
  // while (parentFiber !== null) {
  //   if (isHostParent(parent)) {
  //     return parent;
  //   }
  //   parentFiber = parentFiber.return
  // }

  switch (parentFiber.tag) {
    case HostComponent:
      parent = parentFiber.stateNode;
      isContainer = false;
      break;
    case HostRoot:
      parent = parentFiber.stateNode.containerInfo;
      isContainer = true;
      break;
    case HostPortal:
      parent = parentFiber.stateNode.containerInfo;
      isContainer = true;
      break;
  }

  let node = finishedWork
  while (true) {
    if (node.tag === HostComponent) {
      parent.appendChild(node.stateNode)
    } else {
      node.child.return = node
      node = node.child
    }
    if (node === finishedWork) {
      return
    }
    node.sibling.return = node.return
    node = node.sibling
  }

}

function commitAllHostEffects() {
  while (nextEffect !== null) {
    switch (nextEffect.effectTag) {
      case Placement: {
        commitPlacement(nextEffect)
      }
    }
    nextEffect = nextEffect.nextEffect || null
  }
}
function commitLifeCycles(current: Fiber | null, finishedWork: Fiber): void {
  switch (finishedWork.tag) {
    case ClassComponent: {
      const instance = finishedWork.stateNode;
      if (current === null) {
        instance.componentDidMount()
      } else {
        instance.componentDidUpdate()
      }
    }
  }
}
function commitAllLifeCycles() {
  while (nextEffect !== null) {
    const effectTag = nextEffect.effectTag;

    if (effectTag & (Update | Callback)) {
      const current = nextEffect.alternate;
      commitLifeCycles(current, nextEffect);
    }
  }
}
function commitRoot(finishedWork: Fiber): ExpirationTime {
  const root = finishedWork.stateNode
  nextEffect = finishedWork.firstEffect
  commitAllHostEffects()
  commitAllLifeCycles()
  return root.current.remainingExpirationTime
}
function createFiberFromElement(
  element: ReactElement,
  expirationTime: ExpirationTime,
): Fiber {
  const fiber = createFiber(HostComponent)
  fiber.type = element.type
  fiber.pendingProps = element.props
  return fiber
}
function reconcileSingleElement(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  element: ReactElement,
  expirationTime: ExpirationTime,
): Fiber {
  const created = createFiberFromElement(element, Sync)
  created.return = returnFiber
  created.effectTag = Placement
  return created
}
function mountChildFibersInPlace(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  element: ReactElement,
): Fiber {
  return null
}

function reconcileChildren(current, workInProgress, nextChildren: ReactElement) {
  let child = null
  if (current === null) {
    child = mountChildFibersInPlace(workInProgress, workInProgress.child, nextChildren)
  } else {
    switch (nextChildren.$$typeof) {
      case REACT_ELEMENT_TYPE:
        child = reconcileSingleElement(workInProgress, workInProgress.child, nextChildren, workInProgress.expirationTime)
      default:
        break;
    }
  }
  if (Array.isArray(nextChildren)) {
    let previousFiber = null
    for (let i = 0; i < nextChildren.length; i++) {
      const nextChild = nextChildren[i]
      let fiber = null
      if (typeof nextChild === 'string') {
        fiber = createFiber(HostText)
        fiber.value = nextChild
        fiber.effectTag = Placement
      } else {
        fiber = createFiber(HostComponent)
        fiber.type = nextChild.type
        fiber.pendingProps = nextChild.props
        fiber.effectTag = Placement
      }
      fiber.return = workInProgress

      if (i === 0) {
        child = fiber
        previousFiber = fiber
      } else {
        previousFiber.sibling = fiber
      }
    }
  }
  workInProgress.child = child
}
// function mountIndeterminateComponent(current, workInProgress) {
//   const value = null
//   reconcileChildren(current, workInProgress, value);
//   return null
// }
// function updateFunctionalComponent(current, workInProgress) {
//   const value = null
//   reconcileChildren(current, workInProgress, value);
//   return null
// }
// function updateClassComponent(current: Fiber | null, workInProgress: Fiber) {
//   // constructClassInstance(workInProgress, workInProgress.pendingProps);
//   // mountClassInstance(workInProgress, renderExpirationTime);
//   // updateClassInstance(workInProgress, renderExpirationTime);
//   // return finishClassComponent( current, workInProgress, shouldUpdate, hasContext,)
//   return null
// }
function updateHostRoot(current: Fiber, workInProgress: Fiber) {
  const updateQueue = workInProgress.updateQueue
  //children come from updateQueue
  const element = updateQueue.first.partialState.element
  reconcileChildren(current, workInProgress, element)
  return workInProgress.child
}
function updateHostText(current: Fiber, workInProgress: Fiber) {
  let nextChildren
  if (workInProgress.pendingProps) {
    //children come from pendingProps
    nextChildren = workInProgress.pendingProps.children
  }
  reconcileChildren(current, workInProgress, nextChildren)
  return workInProgress.child
}
function updateHostComponent(current: Fiber, workInProgress: Fiber) {
  let nextChildren
  if (workInProgress.pendingProps) {
    //children come from pendingProps
    nextChildren = workInProgress.pendingProps.children
  }
  reconcileChildren(current, workInProgress, nextChildren)
  return workInProgress.child
}


function beginWork(current: Fiber | null, workInProgress: Fiber): Fiber | null {
  switch (workInProgress.tag) {
    // case IndeterminateComponent:
    //   return mountIndeterminateComponent(current, workInProgress)
    // case FunctionalComponent:
    //   return updateFunctionalComponent(current, workInProgress);
    // case ClassComponent:
    //   return updateClassComponent(
    //     current,
    //     workInProgress,
    //   );
    case HostRoot:
      return updateHostRoot(current, workInProgress);
    case HostText:
      return updateHostText(current, workInProgress);
    case HostComponent:
      return updateHostComponent(current, workInProgress);
    default:
      break;
  }
  return null
}

function appendAllChildren(parent: HTMLElement, workInProgress: Fiber) {
  let node = workInProgress.child
  while(node !== null) {
    if(node.tag === HostComponent) {
      parent.appendChild(node.stateNode)
    }
    if(node.tag === HostText) {
      // parent.appendChild(node.value)
      parent.appendChild(document.createTextNode(node.value))
    }
    if(node === workInProgress) {
      return
    }
    while(node.sibling === null) {
      if (node.return === null || node.return === workInProgress) {
        return;
      }
      node = node.return
    }
    node.sibling.return = node.return
    node = node.sibling
  }
}

function completeWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderExpirationTime: ExpirationTime,
): Fiber | null {
  //  updateHostComponent( current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance);
  //  appendAllChildren(instance, workInProgress);
  let instance;
  switch (workInProgress.tag) {
    case HostComponent:
      const props = workInProgress.pendingProps
      instance = document.createElement(workInProgress.type)
      for (let k in props) {
        if (k !== 'children') {
          instance[k] = props[k]
        }
      }
      appendAllChildren(instance, workInProgress);
      break;
    case HostRoot:
      instance = workInProgress.stateNode;
      break;
    case HostText:
      instance = document.createTextNode(workInProgress.value);
      break;

    default:
      break;
  }
  workInProgress.stateNode = instance
  return null
}
function completeUnitOfWork(workInProgress: Fiber): Fiber | null {
  while (true) {
    const current = workInProgress.alternate;
    const next = completeWork(
      current,
      workInProgress,
      nextRenderExpirationTime,
    );
    const returnFiber = workInProgress.return;
    const siblingFiber = workInProgress.sibling;

    if (next !== null) {
      return next
    }

    if (returnFiber !== null) {
      returnFiber.firstEffect = workInProgress
      if(returnFiber.lastEffect !== null) {
        returnFiber.lastEffect.nextEffect = workInProgress
      }
      returnFiber.lastEffect = workInProgress
    }


    if (siblingFiber !== null) {
      return siblingFiber
    } else if (returnFiber !== null) {
      workInProgress = returnFiber
      continue
    } else {
      return null
    }
  }
}
function performUnitOfWork(workInProgress: Fiber): Fiber | null {
  const current = workInProgress.alternate
  let next = beginWork(current, workInProgress)
  if (next === null) {
    next = completeUnitOfWork(workInProgress)
  }
  return next
}

function workLoop(expirationTime: ExpirationTime) {
  while (nextUnitOfWork !== null) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }
}
function createWorkInProgress(current: Fiber): Fiber {
  let workInProgress = current.alternate
  if (workInProgress === null) {
    workInProgress = createFiber(current.tag)
  }
  workInProgress.type = current.type
  workInProgress.stateNode = current.stateNode
  workInProgress.alternate = current
  workInProgress.updateQueue = current.updateQueue
  current.alternate = workInProgress
  return workInProgress
}
function renderRoot(root: FiberRoot, expirationTime: ExpirationTime): Fiber | null {
  if (nextUnitOfWork === null) {
    nextUnitOfWork = createWorkInProgress(root.current)
  }
  workLoop(expirationTime)
  return root.current.alternate
}
function performWorkOnRoot(root: FiberRoot, expirationTime) {
  isRendering = true
  let finishedWork = root.finishedWork
  if (finishedWork !== null) {
    root.finishedWork = null
    root.remainingExpirationTime = commitRoot(finishedWork);
  } else {
    root.finishedWork = null
    finishedWork = renderRoot(root, expirationTime);
    if (finishedWork !== null) {
      root.finishedWork = null
      root.remainingExpirationTime = commitRoot(finishedWork);
    }
  }
  isRendering = false
}

function findHighestPriorityRoot() {
  nextFlushedRoot = firstScheduledRoot;
}
function performWork(minExpirationTime, deadline) {
  findHighestPriorityRoot();
  if (nextFlushedRoot !== null) {
    performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime);
    // Find the next highest priority work.
    findHighestPriorityRoot();
  }
  // if (nextFlushedRoot !== null && !isCallbackScheduled) {
  //   isCallbackScheduled = true;
  //   scheduleDeferredCallback(performAsyncWork);
  // }
}

function requestWork(root: FiberRoot, expirationTime) {
  if (root.nextScheduledRoot === null) {
    firstScheduledRoot = lastScheduledRoot = root;
    root.nextScheduledRoot = root;
  }
  if (isBatchingUpdates) {
    // Flush work at the end of the batch.
    if (isUnbatchingUpdates) {
      // ...unless we're inside unbatchedUpdates, in which case we should
      // flush it now.
      performWorkOnRoot(root, Sync);
    }
    return;
  }

  if (expirationTime === Sync) {
    performWork(Sync, null);
  } else if (!isCallbackScheduled) {
    isCallbackScheduled = true;
    scheduleDeferredCallback(performAsyncWork);
  }
}
// ##packages/react-reconciler/src/ReactFiberScheduler.js
function scheduleWork(fiber: Fiber, expirationTime) {
  let node = fiber
  while (node !== null) {
    if (node.expirationTime === 0 || node.expirationTime > expirationTime) {
      node.expirationTime = expirationTime
    }
    if (node.alternate !== null) {
      if (node.alternate.expirationTime === 0 || node.alternate.expirationTime > expirationTime) {
        node.alternate.expirationTime = expirationTime
      }
    }
    // find parent node
    if (node.return === null && node.tag === HostRoot) {
      const root: FiberRoot = node.stateNode
      if (!isWorking && root === nextRoot && expirationTime < nextRenderExpirationTime) {
        if (nextUnitOfWork !== null) {
          // This is an interruption. (Used for performance tracking.)
          interruptedBy = fiber;
        }
        nextRoot = null;
        nextUnitOfWork = null;
        nextRenderExpirationTime = 0
      }
      requestWork(root, expirationTime)
    }
    node = node.return
  }
}
function insertUpdateIntoFiber(fiber: Fiber, update) {
  fiber.updateQueue = {
    first: update,
    last: update
  }
}
function scheduleTopLevelUpdate(current: Fiber, element: ReactElement) {
  const expirationTime = Sync
  const update = {
    expirationTime,
    partialState: { element },
    isReplace: false,
    isForced: false,
    nextCallback: null,
    next: null,
  };
  insertUpdateIntoFiber(current, update);
  scheduleWork(current, expirationTime);
}

function createContainer(container: HTMLElement): FiberRoot {
  const newFiberNode: Fiber = createFiber(HostRoot)
  const root = {
    current: newFiberNode,
    containerInfo: container,
    finishedWork: null,
    remainingExpirationTime: NoWork,
    nextScheduledRoot: null,
  }
  newFiberNode.stateNode = root
  return root
}

function updateContainer(element: ReactElement, container: FiberRoot, parentComponent) {
  const current = container.current
  scheduleTopLevelUpdate(current, element)
}

// react-dom
function renderSubtreeIntoContainer(element: ReactElement, container: HTMLElement) {
  //initial mount
  const children = element
  const fiberRoot = createContainer(container)
  const parentComponent = null
  unbatchedUpdates(() => { updateContainer(children, fiberRoot, parentComponent) })
}
function render(element: ReactElement, container: HTMLElement) {
  renderSubtreeIntoContainer(element, container)
}

// react
function createElement(type: string, props: any, ...children: ReactElement[]): ReactElement {
  return {
    $$typeof: Symbol.for('react.element'),
    type,
    props: { ...props, children }
  }
}

export default { render, createElement }