describe("10.2 函数名", ()=>{
    test("10.2", ()=>{
      function sum(num1, num2){ return num1 + num2}
      let anotherSum = sum
      expect(anotherSum(1,1)).toBe(2)
      expect(new Function().name).toBe('anonymous')
      expect((() => _).name).toBe('')

      function foo(){}
      expect(foo.bind(null).name).toBe('bound foo')

      let dog = {
        years: 1,
        get age(){ return this.years; },
        set age(newAge){ this.years = newAge }
      }

      let pd = Object.getOwnPropertyDescriptor(dog, 'age')
      expect(pd.get.name).toBe('get age')
      expect(pd.set.name).toBe('set age')
    })
})
