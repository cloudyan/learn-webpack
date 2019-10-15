
export default async function lazy1() {
  console.log('lazy1 loaded')
  // 动态加载 必须要 await
  const { eslog } = await import(/* webpackChunkName: "es" */ './es')
  eslog('lazy eslog')
}
