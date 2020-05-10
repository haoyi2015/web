import React, {useState, useEffect} from 'react'

// portals 传送门
import ReactDOM from 'react-dom'

function UseComp () {
    const [count, setCount] = useState(0)
    function add(a){
        setCount(count+a)
    }
    // useEffect 数据获取或调用其他命令式的 API
    useEffect(() =>{
        document.title = `You clicked ${count} times`;
    })
    return ReactDOM.createPortal(
        <div>
            <h3>{count}</h3>
            <br />
            <button onClick={()=>add(10)}>改变count</button>
        </div>,
        document.body
    )
}
export default UseComp