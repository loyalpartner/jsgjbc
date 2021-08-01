describe("10.12 递归", ()=>{
    test("10.12", ()=>{
      function factorial(num){
        if (num<1) {
          return 1
        }
        return num * factorial(num-1)
      }

      let anotherFactorial = factorial
      factorial = null
      expect(()=> anotherFactorial(5)).toThrow()

      const factorial2 = (function f(num){
        if (num<1){ return 1}
        return num * f(num-1) // arguments.callee 在严格模式会出错
      })
      expect(factorial2(5)).toBe(120)
    })
})
