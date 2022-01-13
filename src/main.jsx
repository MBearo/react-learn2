// eslint-disable-next-line no-unused-vars
import { createElement, render } from '../feact'

const aaaa = []
for (let i = 0; i < 10; i++) {
    aaaa.push(<div>{i}</div>)
}
console.log('aaaa', aaaa)
const f = (
    <div id='a'>
        <span>fff</span>
        <span>bbb</span>
        jjj
        <div>ssss</div>
        <div>1</div>
    </div>
)

console.log('jsx', f)
render(f, document.body)
