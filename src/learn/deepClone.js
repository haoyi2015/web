import React from 'react'

function deepClone(obj ={}){
    // 判断是否需要拷贝
    if(typeof obj !=='object' || obj == null){
        return obj
    }
    let arr =[]
    // 判断是否是一个数组
    if(Array.isArray(obj)){ // instanceof Array
        arr = []
    }else{
        arr = {}
    }
    // 遍历拷贝对象
    for(let key in obj){
        // 保证key不是原型属性
        if(obj.hasOwnProperty(key)){
            // 递归
            arr[key] = deepClone(obj[key])
        }
    }
    return arr
}

function DeepCloneComp() {
    const arr = [{name: '来说就是', id: 1002}]
    const requst = deepClone(arr)
    return(
        <div>
            { JSON.stringify(requst)}
        </div>
    )
}

export default DeepCloneComp