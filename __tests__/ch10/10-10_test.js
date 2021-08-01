describe("10.10 函数属性与方法", ()=>{
  test("10.10", () => {
    function sayName(name) {}
    function sum(num1, num2) {return num1 + num2}
    function sayHi() {}
    expect(sayName).toHaveLength(1)
    expect(sum).toHaveLength(2)
    expect(sayHi).toHaveLength(0)

    expect(sum.apply(undefined, [1, 2])).toBe(3)
    expect(sum.call(undefined, 1, 2)).toBe(3)
  })
})
