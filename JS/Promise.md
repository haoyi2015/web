# JavaScript里面的Promise

开篇先来一个异步执行的小栗子：
```
let p = new Promise((relsolve,reject) =>{
    setTimeout(function(){
        console.log('执行开始')
        relsolve('执行返回Promise')
    },1000)
})
p.then((res) =>{
    console.log(res)
}).catch(() =>{
    
})
```




