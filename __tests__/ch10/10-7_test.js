describe("10.7 函数声明与函数表达式", ()=>{
  test("10.7", () => {
    expect(sum).toBeInstanceOf(Function) // 函数声明提升
    function sum(num1, num2){ return num1 + num2 }

    expect(()=> sum1(1, 2)).toThrow()
    let sum1 = (num1, num2) => num1 + num2

    expect(()=> sum2(1,2)).toThrow()
    var sum2 = (num1, num2) => num1 + num2
  })
})
