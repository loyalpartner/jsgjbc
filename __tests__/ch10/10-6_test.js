describe("10.6 参数扩展", ()=>{
  test("10.6.1 扩展参数", () => {
    function getSum(){
      return Array.from(arguments).reduce((a,b)=>a+b, 0)
    }
    const values = [1, 2, 3, 4, 5]
    expect(getSum.apply(null, values)).toBe(15)
    expect(getSum(...values)).toBe(15)
    expect(getSum(1, ...values)).toBe(16)
    expect(getSum(...values, 1)).toBe(16)
    expect(getSum(...values, ...values)).toBe(30)

    function getProduct(a, b, c =1){
      return a * b * c;
    }
    expect(getProduct(...[1,2])).toBe(2)
    expect(getProduct(...[1,2,3])).toBe(6)
  })
  test("10.6.2 收集参数", () => {
    function getSum(...values){
      expect(values).toBeInstanceOf(Array)
      return values.reduce((x, y) => x + y, 0)
    }

    expect(()=>{
      (function getSum(values, ...lastValue){})()
    }).not.toThrow()
    expect(()=>{
      ((values, ...lastValue)=>{})()
    }).not.toThrow()
  })
})
