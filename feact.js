function createTextElement (text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text, // 妙啊，nodeValue就是dom的textContent
            children: []
        }
    }
}
export function createElement (type, props, ...children) {
    console.log('type', type, props, children)
    return {
        type,
        props: {
            ...props,
            children: children.map(child => typeof child === 'object'
                ? child
                : createTextElement(child))
        }
    }
}
let nextUnitOfWork = null
export function render (element, container) {
    nextUnitOfWork = {
        dom: container,
        props: {
            children: [element]
        }
    }
    while (nextUnitOfWork) {
        nextUnitOfWork = performUnitOfWork(
            nextUnitOfWork
        )
    }
}

// 执行当前的子任务，返回下一个子任务
function performUnitOfWork (fiber) {
    // 将dom添加到fiber中
    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }
    // 这没懂
    if (fiber.parent) {
        fiber.parent.dom.appendChild(fiber.dom)
    }
    // 为子元素创建fiber节点
    const elements = fiber.props.children
    let index = 0
    let prevSibling = null
    while (index < elements.length) {
        const element = elements[index]
        const newFiber = {
            type: element.type,
            props: element.props,
            parent: fiber,
            dom: null
        }
        if (index === 0) {
            fiber.child = newFiber
        } else {
            // 实现添加同级节点，sibling是下一个兄弟节点
            // 实现的很巧妙，类似vue的那个watch绑定
            prevSibling.sibling = newFiber
        }
        prevSibling = newFiber
        index++
    }
    // 返回下一个子任务
    // 顺序是子节点、兄弟节点、叔叔节点
    if (fiber.child) {
        return fiber.child
    }
    let nextFiber = fiber
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }
        nextFiber = nextFiber.parent
    }
}

function createDom (fiber) {
    const dom = fiber.type === 'TEXT_ELEMENT'
        ? document.createTextNode('')
        : document.createElement(fiber.type)

    const isProperty = key => key !== 'children'
    Object.keys(fiber.props)
        .filter(isProperty)
        .forEach(name => {
            dom[name] = fiber.props[name]
        })
    return dom
}
