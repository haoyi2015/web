# React生命周期
- getDefaultProps
>执行一次，创建的类会被缓存，并且映射到this.props,但是这个props不是由父组件指定的；在对象创建之前执行该方法，返回的实列只是共享
- getInitialState
>控件加载之前执行，返回值会被用于state初始值
- componentWillMount
> 在render初始化之前执行一次，如果在这个方法内调用setState，render()知道state发生变化，并且只执行一次
- render
>调用时会检查this.props和this.state返回子元素
如果不需要渲染某个标签或者组件返回null或者false
- componentDidMount
>初始化render之后执行一次，可在里面访问任何组件，注意：此方法中的子组件在父组件之前执行
- shouldComponentUpdate
> 初始化render时不会执行，当props或者state有变化时执行，并且是在render之前，如果props或者state没变化返回的时false，默认是true
当shouldComponentUpdate方法返回false时，就不会执行render()方法，componentWillUpdate和componentDidUpdate方法也不会被调用
```
boolean shouldComponentUpdate(
  object nextProps, object nextState
}

shouldComponentUpdate: function(nextProps, nextState) {
  return nextProps.id !== this.props.id;
}
```
- componentWillUpdate
>props和state发生变化时执行，并且在render方法之前执行，注意：不能用this.setState来修改状态，因为函数调用之后，就会把nextProps和nextState分别设置到this.props和this.state中。紧接着这个函数就会调用render()来更新界面
```
void componentWillUpdate(
  object nextProps, object nextState
)
```
- componentDidUpdate
>组件更新结束之后执行，render初始化不执行
- componentWillReceiveProps
>props发生变化时执行，此方法里面可以通过this.setState来更新状态，旧的可以通过this.props来获取，不会触发额外的render
- componentWillUnmount
> 当组件要被界面移除（销毁）时候调用，可做一些计算器的清理，网络请求处理