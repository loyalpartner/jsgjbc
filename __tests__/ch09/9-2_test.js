describe("9.2 代理捕获器与反射方法", () => {
  test("9.2.1 get()", () => {
    const target = {name: "lee"};
    const proxy = new Proxy(target, {
      get(target, property, receiver) {
        return Reflect.get(target, property)
      }
    })

    // 拦截的操作
    // proxy.property
    // proxy[property]
    // Object.create(proxy)[property]
    // Reflect.get(proxy, property, receiver)
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

    // 拦截的操作
    // proxy.property = true
    // proxy[property] = true
    // Object.create(proxy)[property] = tre
    // Reflect.set(proxy, property, value, receiver)

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

    // 拦截的操作
    // property in proxy
    // property in Object.create(proxy)
    // with(proxy) {(property)}
    // Reflect.has(proxy, property)

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

    // 拦截的操作
    // Object.defineProperty(proxy, property, descriptor)
    // Reflect.defineProperty(proxy, property, descriptor)

    Object.defineProperty(proxy, 'foo', {value: 'bar'})
    expect(proxy).toHaveProperty('foo')
  })

  test("9.2.5 getOwnPropertyDescriptor()", () => {
    const target = {'foo': 1}
    const proxy = new Proxy(target, {
      getOwnPropertyDescriptor(target, p) {
        return Reflect.getOwnPropertyDescriptor(target, p)
      }
    })

    // 拦截的操作
    // Object.getOwnPropertyDescriptor(proxy, property)
    // Reflect.getOwnPropertyDescriptor(proxy, property)
    expect(Object.getOwnPropertyDescriptor(proxy, 'foo')).toBeInstanceOf(Object)
    expect(Object.getOwnPropertyDescriptor(proxy, 'foo1')).toBeUndefined()
  })

  test("9.2.6 deleteProperty", () => {
    const target = {'foo': 1, 'foo2': 2, 'foo3': 3}
    const proxy = new Proxy(target, {
      deleteProperty(target, p) {
        return Reflect.deleteProperty(target, p)
      }
    })

    // 拦截的操作
    // delete proxy.property
    // delete proxy[property]
    // Reflect.deleteProperty(proxy, property)
    delete proxy.foo
    delete proxy['foo2']
    Reflect.deleteProperty(target, 'foo3')

    expect(proxy).not.toHaveProperty('foo')
    expect(proxy).not.toHaveProperty('foo2')
    expect(proxy).not.toHaveProperty('foo3')
  })

  test("9.2.7 ownKeys()", () => {
    const target = {foo: 'foo'}
    const proxy = new Proxy(target, {
      ownKeys(target) {
        return Reflect.ownKeys(target)
      }
    })

    // 拦截的操作
    // Object.getOwnPropertyNames(proxy)
    // Object.getOwnPropertySymbols(proxy)
    // Object.keys(proxy)
    // Object.ownKeys(proxy)
    expect(Object.keys(proxy)).toHaveLength(1)
    expect(Object.getOwnPropertyNames(proxy)).toHaveLength(1)
    expect(Reflect.ownKeys(proxy)).toHaveLength(1)
  })

  test("9.2.8 getPrototypeOf", () => {
    const target = {foo: 'foo'}
    const proxy = new Proxy(target, {
      getPrototypeOf(target) {
        return Reflect.getPrototypeOf(...arguments)
      }
    })
    // 拦截的操作
    // Object.getPrototypeOf(proxy)
    // Reflect.getPrototypeOf(proxy)
    // proxy.___proto___
    // Object.prototype.isPrototypeOf(proxy)
    expect(Object.getPrototypeOf(proxy)).toBe(Object.getPrototypeOf(target))
    expect(Reflect.getPrototypeOf(proxy)).toBe(Object.getPrototypeOf(target))
    expect(proxy.___proto___).toBe(Object.___proto___)
  })

  test("9.2.9 setPrototypeOf", () => {
    const target = {foo: 'foo'}
    const proxy = new Proxy(target, {
      setPrototypeOf(target, prototype) {
        return Reflect.setPrototypeOf(...arguments)
      }
    })

    // 拦截的操作
    // Object.setPrototypeOf(proxy)
    // Reflect.setPrototypeOf(proxy)
    Object.setPrototypeOf(proxy, Object)
    expect(Object.getPrototypeOf(proxy)).toBe(Object)
  })

  test("9.2.10 isExtensible", () => {
    const target = {foo: 'foo'}
    const proxy = new Proxy(target, {
      isExtensible(target) {
        return Reflect.isExtensible(...arguments)
      }
    })

    // 拦截的操作
    // Object.isExtensible(proxy)
    // Object.isExtensible(proxy)
    expect(Object.isExtensible(proxy)).toBeTruthy()
  })

  test("9.2.11 preventExtensions", () => {
    const target = {}
    const proxy = new Proxy(target, {
      preventExtensions(target) {
        return Reflect.preventExtensions(...arguments)
      }
    })

    // 拦截的操作
    // Object.preventExtensions(proxy)
    // Reflect.preventExtensions(proxy)
    Object.preventExtensions(proxy)
    expect(Object.isExtensible(proxy)).toBeFalsy()
  })

  test("9.2.12 apply", () => {
    const target = () => 'foo'
    const proxy = new Proxy(target, {
      apply(target) {
        return Reflect.apply(...arguments)
      }
    })

    // 拦截的操作
    // proxy(...arguments)
    // Function.prototype.apply(thisArg, argumentsList)
    // Function.prototype.call(thisArg, ...argumentsList)
    // Reflect.apply(target, thisArgument, argumentsList)

    expect(proxy()).toBe('foo')
  })

  test("9.2.13 construct", () => {
    const target = function () {return {}}
    const proxy = new Proxy(target, {
      construct(target, argumentsList, newTarget) {
        return Reflect.construct(...arguments)
      }
    })
    // 拦截的操作
    // new proxy(...argumentsList)
    // Reflect.construct(...arguments)
    expect(proxy()).toBeDefined()
  })
})

