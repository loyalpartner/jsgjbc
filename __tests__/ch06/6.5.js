/**
 * @jest-environment jsdom
 */
describe("6.5 WeakMap", () => {
  test("6.5.1 基本API", function () {
    const key1 = {id: 1},
      key2 = {id: 2},
      key3 = {id: 3}

    const wm = new WeakMap([
      [key1, "val1"],
      [key2, "val2"],
      [key3, "val3"]
    ])

    expect(wm.get(key1)).toBe('val1')
    expect(wm.get(key2)).toBe('val2')
    expect(wm.get(key3)).toBe('val3')

    expect(() => new WeakMap([['hello', 'ok']])).toThrowError(TypeError)

    const key4 = {id: 4}
    wm.set(key4, 'val4')
    expect(wm.get(key4)).toBe('val4')
    wm.delete(key4)
    expect(wm.get(key4)).toBe(undefined)
  })
  test("6.5.2 弱键", function () {})
  test("6.5.3 不可迭代键", function () {
  })
  test("6.5.4 使用弱映射", function () {})
  test("6.5.4 1. 私有变量", function () {
    const User = (() => {
      const wm = new WeakMap()
      class User {
        constructor(id) {
          this.idProperty = Symbol('id')
          this.setId(id)
        }

        setPrivate(property, value) {
          const privateMembers = wm.get(this) || {}
          privateMembers[property] = value
          wm.set(this, privateMembers)
        }

        getPrivate(property) {
          return wm.get(this)[property]
        }

        setId(id) {
          this.setPrivate(this.idProperty, id)
        }

        getId() {
          return this.getPrivate(this.idProperty)
        }
      }
      return User
    })();

    const user = new User(123)
    expect(user.getId()).toBe(123)

  })
  test("6.5.4 2. DOM 节点元数据", function () { 
    let newDiv = document.createElement("div")
    newDiv.innerText = "hello world"
    document.body.appendChild(newDiv)
    
    const wm = new WeakMap()
    wm.set(newDiv, {disable: true})
    document.body.removeChild(newDiv)

    setTimeout(()=>{
      expect(wm.get(newDiv)).toBeUndefined()
    },100)
  })
})

