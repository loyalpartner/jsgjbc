import {XSet} from "./xset"

describe("6.6 Set", () => {
  test("6.6.1 基本 API", function () {
    const s = new Set(['val1', 'val2', 'val3'])
    expect(s.size).toBe(3)
    const s1 = new Set({
      [Symbol.iterator]: function* () {
        yield 'val1'
        yield 'val2'
        yield 'val3'
      }
    })
    expect(s1.size).toBe(3)

    s.add('Matt')
    expect(s.has('Matt')).toBeTruthy()
    s.delete('Matt')
    expect(s.has('Matt')).toBeFalsy()

    const objVal = {},
      arrVal = []

    s.add(objVal)
      .add(arrVal)
    objVal.bar = "bar"
    arrVal.push('bar')
    expect(s.has(objVal)).toBeTruthy()
    expect(s.has(arrVal)).toBeTruthy()
  })
  test("6.6.2 顺序与迭代", function () {
    const s = new Set(['val1', 'val2', 'val3'])
    for (let value of s.values()) {
      expect(s.has(value)).toBeTruthy()
    }
    for (let value of s[Symbol.iterator]()) {
      expect(s.has(value)).toBeTruthy()
    }

    expect([...s]).toEqual(Array.from(s))
    expect(Array.from(s.entries())).toEqual([['val1', 'val1'], ['val2', 'val2'], ['val3', 'val3']])
    expect(Array.from(s.keys())).toEqual(['val1', 'val2', 'val3'])
  })

  test("6.6.3 定义正式集合操作", function () {
    let a = new XSet([1, 2, 3]),
      b = new XSet([2, 3, 4])
    expect(a.union(b).size).toBe(4)
    expect(Array.from(a.union(b).values())).toEqual([1,2,3,4])
    expect(Array.from(a.difference(b).values())).toEqual([1])
    expect(Array.from(a.intersection(b).values())).toEqual([2,3])
    expect(Array.from(a.symmetricDifference(b).values())).toEqual([1,4])
  })
})
