// eslint-disable-next-line no-unused-vars
import { createElement, render } from '../feact'

const f = (
    <div id='a'>
        <span>fff</span>
        <span>bbb</span>
        jjj
        <div>ssss</div>
    </div>
)

console.log('jsx', f)
render(f, document.body)
