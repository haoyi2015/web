# JavaScript事件循环

事件循环 异步 同步

执行栈：

![RUNOOB 图标](../images/1053223-20180831162152579-2034514663.png)
---
> (宏任务)：包括整体代码script，setTimeout，setInterval
(微任务)：Promise，process.nextTick
> 
> 进入整体代码(宏任务)后，开始第一次循环。接着执行所有的微任务。然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务

宏任务 >> 执行结束 >> 是否有可执行的微任务  **有** >> 执行所有微任务

宏任务 >> 执行结束 >> 是否有可执行的微任务  **没有** >> 重新开始执行宏任务

事件循环，微任务，宏任务

![RUNOOB 图标](../images/1053223-20180831162350437-143973108.png)


JS宏任务：
setTimeout setInterval setImmediate requestAnimationFrame
JS微任务：process.nextTick MutationObserver Promise.then catch finally

| 宏任务 | # | 微任务 |
| ------ | ------ | ------ |
| setTimeout |  | process.nextTick |
| setInterval |   | MutationObserver |
| setImmediate |   | Promise.then catch finally |
| requestAnimationFrame |   |  |


总结：
1 宏任务按顺序执行，且浏览器在每个宏任务之间渲染页面

2 所有微任务也按顺序执行，且在以下场景会立即执行所有微任务
  每个回调之后且js执行栈中为空
  每个宏任务结束后


  [1]: https://images2018.cnblogs.com/blog/1053223/201808/1053223-20180831162152579-2034514663.png