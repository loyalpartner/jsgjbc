describe("6.4 Map", () => {
  test("6.4.1 基本API", function () {
    const m1 = new Map(Object.entries({
      "key1": "value1",
      "key2": "value2",
      "key3": "value3"
    }))
    expect(m1.size).toBe(3)
    expect(m1.has('key1')).toBeTruthy()
    expect(m1.has('key2')).toBeTruthy()
    expect(m1.has('key3')).toBeTruthy()

    const m2 = new Map({
      [Symbol.iterator]: function*(){
        yield ["key1", "val1"]
        yield ["key2", "val2"]
        yield ["key3", "val3"]
      }
    })
    expect(m2.size).toBe(3)
    expect(m2.has('key1')).toBeTruthy()
    expect(m2.has('key2')).toBeTruthy()
    expect(m2.has('key3')).toBeTruthy()

    const m = new Map()
    m.set('firstName', 'Matt')
      .set('lastName', 'Frisbie')
    expect(m.size).toBe(2)
    expect(m.get('firstName')).toBe('Matt')
    expect(m.get('lastName')).toBe('Frisbie')

    m.delete('firstName')
    expect(m.has('firstName')).toBeFalsy()

    const objKey = {},
          objVal = {},
          arrKey = [],
          arrVal = []
    m.set(objKey, objVal)
    m.set(arrKey, arrVal)

    objKey.foo = 'foo'
    objVal.bar = 'bar'
    arrKey.push('foo')
    arrVal.push('bar')
    expect(m.get(objKey)).toBe(objVal)
    expect(m.get(arrKey)).toBe(arrVal)

    m.clear()
    expect(m.size).toBe(0)

    // TOREAD: SameValueZero
  })
  test("6.4.2 顺序与迭代", function () {
    const m = new Map(Object.entries({
      key1: "val1",
      key2: "val2",
      key3: "val3",
    }))
    expect(m.get('key1')).toBe('val1')
    expect(m.get('key2')).toBe('val2')
    expect(m.get('key3')).toBe('val3')

    for(let [key,value] of m.entries()){
      expect(m.get(key)).toBe(value)
    }
    m.forEach((v,k) => expect(m.get(k)).toBe(v))
    expect(Array.from(m.keys())).toEqual(['key1','key2','key3'])
    expect(Array.from(m.values())).toEqual(['val1','val2','val3'])
  })
  test("6.4.3 选择 Object 还是 Map", function () {})
})
