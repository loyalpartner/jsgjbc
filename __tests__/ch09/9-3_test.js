describe("9.3 代理模式", () => {
  test("9.3.1 跟踪属性访问", () => {
    const user = {name: "jake"}
    const proxy = new Proxy(user, {
      get(target, property, receiver) {
        return Reflect.get(...arguments)
      },
      set(target, property, value, receiver) {
        return Reflect.set(...arguments)
      }
    })

    expect(proxy.name).toBe('jake')
    proxy.age = 27
    expect(proxy.age).toBe(27)
  })

  test("9.3.2 隐藏属性", () => {
    const hiddenProperties = ['foo', 'bar']
    const targetObject = {
      foo: 1,
      bar: 2,
      baz: 3
    }
    const proxy = new Proxy(targetObject, {
      get(target, p, receiver) {
        if (hiddenProperties.includes(p)) {
          return undefined
        }
        return Reflect.get(...arguments)
      },
      has(target, p) {
        if (hiddenProperties.includes(p)) {
          return false
        }
        return Reflect.has(target, p)
      }
    })
    expect(proxy.foo).toBeUndefined()
    expect(proxy.bar).toBeUndefined()
    expect(proxy.baz).toBe(3)

    expect(proxy).not.toHaveProperty('foo')
    expect(proxy).not.toHaveProperty('bar')
    expect(proxy).toHaveProperty('baz')
  })

  test("9.3.3 属性验证", () => {
    const target = {onlyNumbersGoHere: 0}
    const proxy = new Proxy(target, {
      set(target, p, value, receiver) {
        if (typeof value !== 'number') {
          return false
        }
        return Reflect.set(...arguments)
      }
    })

    expect(proxy.onlyNumbersGoHere).toBe(0)
    proxy.onlyNumbersGoHere = 1
    expect(proxy.onlyNumbersGoHere).toBe(1)
    proxy.onlyNumbersGoHere = '2' // 设置失败
    expect(proxy.onlyNumbersGoHere).toBe(1)
  })

  test("9.3.4 函数与构造函数参数验证", () => {
    function median(...nums) {
      return nums.sort()[Math.floor(nums.length / 2)]
    }
    let proxy = new Proxy(median, {
      apply(target, thisArg, argumentsList) {
        for (const arg of argumentsList) {
          if (typeof arg !== 'number') {
            throw 'Non-number argument provided'
          }
        }
        return Reflect.apply(...arguments)
      }
    })

    expect(() => proxy(4, 7, 1)).not.toThrow()
    expect(() => proxy(4, '7', 1)).toThrow()

    class User {
      constructor(id) {
        this.id_ = id
      }
    }

    proxy = new Proxy(User, {
      construct(target, argumentsList, newTarget) {
        if (argumentsList[0] === undefined) {
          throw 'User cannot be instantiated without id'
        }
        return Reflect.construct(target, argumentsList)
      }
    })

    expect(() => new proxy(4)).not.toThrow()
    expect(() => new proxy()).toThrow()
  })

  test("9.3.5 数据绑定与可观察对象", () => {
    const userList = []
    class User {
      constructor(name) {
        this.name_ = name;
      }
    }

    const proxy = new Proxy(User, {
      construct() {
        const newUser = Reflect.construct(...arguments)
        userList.push(newUser)
        return newUser
      }
    })

    const [foo, bar, baz] = [new proxy('foo'), new proxy('bar'), new proxy('baz')]
    expect(userList).toContain(foo)
    expect(userList).toContain(bar)
    expect(userList).toContain(baz)
  })
})
