describe("6.2 Array", () => {
  test("6.2.1 创建数组", function () {
    expect(new Array()).toBeInstanceOf(Array)
    expect(new Array(20)).toHaveLength(20)
    expect(new Array('red', 'green', 'blue')).toHaveLength(3)

    expect(Array()).toBeInstanceOf(Array)
    expect(Array(20)).toHaveLength(20)
    expect(Array('red', 'green', 'blue')).toHaveLength(3)

    expect([]).toBeInstanceOf(Array)
    expect(['red', 'green', 'blue']).toHaveLength(3)

    expect(Array.from("Matt")).toEqual(['M', 'a', 't', 't'])

    const m = new Map().set(1, 2).set(3, 4)
    const s = new Set().add(1).add(2)
    expect(Array.from(m)).toEqual([[1, 2], [3, 4]])
    expect(Array.from(s)).toEqual([1, 2])

    const iter = {
      *[Symbol.iterator]() {
        yield 1
        yield 2
        yield 3
        yield 4
        yield 5
      }
    }
    expect(Array.from(iter)).toEqual([1, 2, 3, 4, 5])

    function getArgsArray(){
      expect(Array.from(arguments)).toEqual([1, 2, 3])
      return Array.from(arguments)
    }
    getArgsArray(1,2,3)
    expect(Array.from([1,2,3],x => x * 2)).toEqual([2,4,6])

    expect(Array.of(1, 2, 3, 4)).toEqual([1, 2, 3, 4])
  })
  test("6.2.2 数组空位", function () {
    expect([,,,]).toHaveLength(3)
    expect([1,,3]).toEqual([1,undefined,3])
    // 不建议使用数组空位
    // ES5 和 ES6 行为不一致
  })
  test("6.2.3 数组索引", function () {
    let colors = [ 'red', 'blue', 'green']
    expect(colors[3]).toBeUndefined()
    colors[3] = 'purple'
    expect(colors[3]).toBe('purple')
    expect(colors).toHaveLength(4)

    colors.length = 3
    expect(colors).toHaveLength(3)

    colors[colors.length] = 'purple'
    expect(colors[3]).toBe('purple')
    expect(colors).toHaveLength(4)

    colors[99] = 'blakc'
    expect(colors).toHaveLength(100)
  })
  test("6.2.4 检测数组", function () {
    // 1. 单个网页: value instanceof Array
    // 2. 多个网页: Array.isArray(value)
  })
  test("6.2.5 迭代器方法", function () {
    let colors = [ 'red', 'blue', 'green']
    expect(Array.from(colors.keys())).toEqual([0, 1, 2])
    expect(Array.from(colors.values())).toEqual(colors)
    expect(Array.from(colors.entries())).toEqual([[0, 'red'], [1, 'blue'], [2, 'green']])

    for(const [idx, element] of colors.entries()){
      expect(colors[idx]).toBe(element)
    }
  })
  test("6.2.6 复制和填充方法", function () {
    const zeroes = [0, 0, 0, 0, 0]
    zeroes.fill(5)
    expect(zeroes).toEqual([5, 5, 5, 5, 5])
    zeroes.fill(0)
    expect(zeroes).toEqual([0, 0, 0, 0, 0])
    zeroes.fill(3, 3)
    expect(zeroes).toEqual([0, 0, 0, 3, 3])
    zeroes.fill(0)
    zeroes.fill(3, 0, -1)
    expect(zeroes).toEqual([3, 3, 3, 3, 0])

    let ints,
      reset = () => ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    reset()

    expect(ints.copyWithin(5)).toEqual([0, 1, 2, 3, 4, 0, 1, 2, 3, 4])
    reset()
    expect(ints.copyWithin(0, 5)).toEqual([5, 6, 7, 8, 9, 5, 6, 7, 8, 9])
    reset()
    expect(ints.copyWithin(4, 0, 3)).toEqual([0, 1, 2, 3, 0, 1, 2, 7, 8, 9])
    reset()
    expect(ints.copyWithin(2, 0, 6)).toEqual([0, 1, 0, 1, 2, 3, 4, 5, 8, 9])
  })
  test("6.2.7 转换方法", function () {
    let p1 = { toLocaleString() {return "local p1"}, toString() {return "p1"} }
    let p2 = { toLocaleString(){ return "local p2"}, toString(){ return "p2"}}

    expect([p1,p2].join(',')).toBe("p1,p2")
  })
  test("6.2.8 栈方法", function () {
    let colors = []
    colors.push('red', 'blue')
    expect(colors).toEqual(['red', 'blue'])
    colors.push('green')
    expect(colors).toEqual(['red', 'blue', 'green'])
    colors.pop()
    expect(colors).toEqual(['red', 'blue'])
  })
  test("6.2.9 队列方法", function () {
    let colors = []
    colors.unshift('red', 'blue')
    expect(colors).toEqual(['red', 'blue'])
    colors.unshift('green')
    expect(colors).toEqual(['green','red', 'blue'])
    colors.shift()
    expect(colors).toEqual(['red', 'blue'])
  })
  test("6.2.10 排序方法", function () {
    let colors = ['red', 'blue', 'green']
    colors.reverse()
    expect(colors).toEqual(['green', 'blue', 'red'])

    let values = [1, 2, 5, 4, 3, 6]
    values.sort()
    expect(values).toEqual([1, 2, 3, 4, 5, 6])
    values.reverse()
    values.sort((a, b) => a - b)
    expect(values).toEqual([1, 2, 3, 4, 5, 6])
    values.sort((a, b) => b - a)
    expect(values).toEqual([6, 5, 4, 3, 2, 1])
  })
  test("6.2.11 操作方法", function () {
    let colors = ['red', 'green', 'blue']
    let colors2 = colors.concat("yellow", ['black', 'brown'])

    expect(colors2).toEqual(['red', 'green', 'blue', 'yellow', 'black', 'brown'])

    colors = ['red', 'green', 'blue']
    let newColors = ['black', 'brown']
    newColors[Symbol.isConcatSpreadable] = false
    colors2 = colors.concat("yellow", newColors)
    delete newColors[Symbol.isConcatSpreadable]
    expect(colors2).toEqual(['red', 'green', 'blue', 'yellow', ['black', 'brown']])

    // 类数组对象
    let moreNewColors = {
      [Symbol.isConcatSpreadable] : true,
      length: 2,
      0: "pink",
      1: "cyan",
    }
    colors = ['red', 'green', 'blue']
    let colors3 = colors.concat(moreNewColors)
    expect(colors3).toEqual(['red', 'green', 'blue', 'pink', 'cyan'])

    // slice
    colors = ['red', 'green', 'blue']
    expect(colors.slice(1)).toEqual(['green', 'blue'])
    expect(colors.slice(1,2)).toEqual(['green'])

    // splice
    colors = ['red', 'green', 'blue']
    colors.splice(1)
    expect(colors).toEqual(['red'])
    colors = ['red', 'green', 'blue']
    colors.splice(1, 2)
    expect(colors.splice(0,2)).toEqual(['red'])
    colors = ['red', 'green', 'blue']
    colors.splice(1, 2, "new", "new")
    expect(colors).toEqual(['red', 'new', 'new'])
  })
  test("6.2.12 搜索和位置方法", function () {})
  test("6.2.13 迭代方法", function () {})
  test("6.2.14 归并方法", function () {})
})


