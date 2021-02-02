// main.js

// 1. output 输出 commonjs 及 es 模块
// import cjsm, { clog } from './utils/commonjs'
import esm, { eslog } from './utils/es'

// clog('commonjs')
// cjsm.hello()

eslog('es module')
esm.hello()

// 2. output 动态加载
// import('./utils/lazy1').then(({ default: lazy1 }) => {
//   console.log('动态加载 lazy1 成功')
//   lazy1()
// })
// import('./utils/lazy2').then(({ lazy2 }) => {
//   console.log('动态加载 lazy2 成功')
//   lazy2()
// })

// 3. output `code splitting` by use `common chunk`
// 修改 webpack.config.js 改为多入口，加 runtime.js，并启用 splitChunks

// import { eslog } from './utils/es'
// eslog('eslog')
