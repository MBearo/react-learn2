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
export function render (element, container) {
    // container.appendChild(element)
    const dom = element.type === 'TEXT_ELEMENT'
        ? document.createTextNode('')
        : document.createElement(element.type)

    const isProperty = key => key !== 'children'
    Object.keys(element.props)
        .filter(isProperty)
        .forEach(name => {
            dom[name] = element.props[name]
        })
    element.props.children.forEach(child => {
        render(child, dom)
    })
    container.appendChild(dom)
}
