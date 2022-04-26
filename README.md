# 问题
## 1. 在组件内部，如果要判断外面是否声明了某个事件，需要把它声明为一个 prop 而不是一个事件。
[vue - issue](https://github.com/vuejs/core/issues/4713)

这是在实现 dialog 时，点击关闭图标向外发射一个 before-close 事件，需要判断在组件外部，这个事件是否存在，所以遇到了这个问题，因为在 vue2 中是根据 $listener 判断的（也许 vue2 时就不该这样用吧...），去 vue 的 issues 搜索，看到了这个回答。

在 element-plus 中，before-close 也确实是个 prop。
