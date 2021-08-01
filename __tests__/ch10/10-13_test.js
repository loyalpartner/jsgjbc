describe("10.13 尾递归优化", ()=>{
    test("10.13", ()=>{
      function fib(n) {
        if (n == 2) return n
        return fib(n - 1) + fib(n - 2)
      }
      expect(()=> fib(1000)).toThrowError(RangeError)

      function fib2(n) {
        let fibImpl = (a, b, n) => {
          if (n === 0) return a
          return fibImpl(b, a + b, n - 1)
        }
        return fibImpl(0, 1, n)
      }
      expect(fib2(1000)).toBe(4.346655768693743e+208)
      expect(fib2(4)).toBe(3)
    })
})
