describe("9.2 代理捕获器与反射方法", () => {

  test("9.2.1 get()", () => {
    const target = {name: "lee"};
    const proxy = new Proxy(target, {
      get(target, property, receiver) {
        return Reflect.get(target, property)
      }
    })

    expect(proxy.foo).toBeUndefined()

    expect(proxy.name).toBe("lee")
    expect(proxy['name']).toBe("lee")
    expect(Object.create(proxy).name).toBe('lee')
    expect(Reflect.get(proxy, "name", undefined)).toBe('lee')
  })

  test("9.2.2 set()", () => {
    const target = {name: "lee"}

    const proxy = new Proxy(target, {
      set(target, p, value, receiver) {
        return Reflect.set(target, p, value)
      }
    })

    proxy.name = "lee1"
    expect(proxy.name).toBe('lee1')
    proxy['name'] = "lee2"
    expect(proxy['name']).toBe('lee2')
    // Object.create(proxy).name = 'lee3'
    // Reflect.set(proxy, 'name', 'lee4', undefined)
  })

  test("9.2.3 has()", () => {
    const target = {name: "lee"}
    const proxy = new Proxy(target, {
      has(target, p) {
        return Reflect.has(target, p)
      }
    })

    expect(proxy).toHaveProperty('name')
    expect(proxy).not.toHaveProperty('unknown')
  })

  test("9.2.4 defineProperty()", () => {
    const target = {name: "lee"}
    const proxy = new Proxy(target, {
      defineProperty(target, p, attributes) {
        return Reflect.defineProperty(target, p, attributes)
      }
    })
    Object.defineProperty(proxy, 'foo', {value: 'bar'})
    expect(proxy).toHaveProperty('foo')
  })

  test("9.2.5 getOwnPropertyDescriptor()", ()=>{
    const target = { 'foo': 1 }
    const proxy = new Proxy(target, {
      getOwnPropertyDescriptor(target, p){
        return Reflect.getOwnPropertyDescriptor(target, p)
      }
    })

    expect(Object.getOwnPropertyDescriptor(proxy, 'foo')).toBeInstanceOf(Object)
    expect(Object.getOwnPropertyDescriptor(proxy, 'foo1')).toBeUndefined()
  })

  test("9.2.6 deleteProperty", ()=>{
    const target = { 'foo': 1, 'foo2':2, 'foo3':3 }
    const proxy = new Proxy(target, {
      deleteProperty(target, p){
        return Reflect.deleteProperty(target, p)
      }
    })

    delete proxy.foo
    delete proxy['foo2']
    Reflect.deleteProperty(target, 'foo3')

    expect(proxy).not.toHaveProperty('foo')
    expect(proxy).not.toHaveProperty('foo2')
    expect(proxy).not.toHaveProperty('foo3')
  })

  test("9.2.7 ownKeys()", () => {
    const target = { foo: 'foo' }
    const proxy = new Proxy(target, {
      ownKeys(target){
        return Reflect.ownKeys(target)
      }
    })

    expect(Object.keys(proxy)).toHaveLength(1)
    expect(Object.getOwnPropertyNames(proxy)).toHaveLength(1)
    expect(Reflect.ownKeys(proxy)).toHaveLength(1)
  })

})

