test("9.1.1 创建空代理", ()=>{
  const target = { id: 'target' }
  const handler = {}

  const proxy = new Proxy(target, handler)
  expect(target.id).toBe('target')
  expect(proxy.id).toBe('target')

  target.id = 'foo'
  expect(target.id).toBe('foo')
  expect(proxy.id).toBe('foo')

  proxy.id = 'bar'
  expect(target.id).toBe('bar')
  expect(proxy.id).toBe('bar')

  expect(target.hasOwnProperty('id')).toBeTruthy()
  expect(proxy.hasOwnProperty('id')).toBeTruthy()

  expect(()=> target instanceof Proxy).toThrow(TypeError)
  expect(()=> proxy instanceof Proxy).toThrow(TypeError)

  expect(target === proxy).not.toBeTruthy()
})

test("9.1.2 定义捕获器", ()=>{
  const target = { id: 'target' }
  const handler = {
    get(){
      return 'handler override'
    }
  }
  const proxy = new Proxy(target, handler)

  expect(target.id).toBe('target')
  expect(proxy.id).toBe('handler override')

  expect(target['id']).toBe('target')
  expect(proxy['id']).toBe('handler override')


  expect(Object.create(target).id).toBe('target')
  expect(Object.create(proxy).id).toBe('handler override')
})

describe("9.1.3 捕获器参数和反射 API", ()=>{
  test("trap", ()=>{
    const target = { foo: 'bar' }
    const handler = {
      get(trapTarget, property, receiver){
        return trapTarget[property]
      }
    }
    const proxy = new Proxy(target, handler)

    expect(proxy.foo).toBe('bar')
    expect(target.foo).toBe('bar')
  })

  test("反射", ()=>{
    const target2 = { foo: 'bar' }
    const handler2 = {
      // get(){
      //   return Reflect.get(...arguments)
      // }
      get: Reflect.get // 和上面的注释等价
    }
    const proxy2 = new Proxy(target2, handler2)
    expect(proxy2.foo).toBe('bar')
    expect(target2.foo).toBe('bar')
  })

  test("mixed", ()=>{
    const target3 = { foo: 'bar', baz: "qux" }
    const handler3 = {
      get(trapTarget, property, receiver){
        let decoration = ''
        if (property === 'foo'){
          decoration = '!!!'
        }
        return Reflect.get(...arguments) + decoration
      }
    }
    const proxy3 = new Proxy(target3, handler3)

    expect(proxy3.foo).toBe('bar!!!')
    expect(target3.foo).toBe('bar')

    expect(proxy3.baz).toBe('qux')
    expect(target3.baz).toBe('qux')
  })

})

test("9.1.4 捕获器不变式", ()=>{
  const target = {}
  Object.defineProperty(target, 'foo', {
    configurable: false,
    writable: false,
    value: 'bar'
  })

  const handler = { get(){ return 'qux' } }

  const proxy = new Proxy(target, handler)
  expect(()=> proxy.foo).toThrow()
})

test("9.1.5 可撤销代理", ()=>{
  const target = { foo: "bar" }
  const handler = { get() { return "intercepted" }}

  const { proxy, revoke } = Proxy.revocable(target, handler)
  expect(proxy.foo).toBe('intercepted')
  expect(target.foo).toBe('bar')

  revoke()
  expect(()=>proxy.foo).toThrow()
})
