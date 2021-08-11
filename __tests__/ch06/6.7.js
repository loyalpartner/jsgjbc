describe("6.7 WeakSet", () => {

  test("6.7.1 基本 API", function () {
    const val1 = {id: 1},
      val2 = {id: 2},
      val3 = {id: 3}
    
    const ws = new WeakSet([val1, val2, val3])
    expect(ws.has(val1)).toBeTruthy()
    expect(ws.has(val2)).toBeTruthy()
    expect(ws.has(val3)).toBeTruthy()

  })
  test("6.7.2 弱值", function () {})
  test("6.7.3 不可迭代值", function () {})
  test("6.7.4 使用弱集合", function () {
  })

})
