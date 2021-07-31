describe("10.1 箭头函数", ()=>{
    test("10.1", ()=>{
      let arrowSum = (a, b) => a + b
      expect(arrowSum(1,1)).toBe(2)

      let fnExpr = function (a, b){
        return a + b
      }
      expect(arrowSum(1,1)).toBe(2)

      let ints = [1,2,3]

      expect(ints.map(function(i){return i+1})).toEqual([2,3,4])
      expect(ints.map(t=> t+1)).toEqual([2,3,4])
      expect([2,3,4]).not.toBe([2,3,4])
      expect([2,3,4]).toEqual([2,3,4])
    })
})
