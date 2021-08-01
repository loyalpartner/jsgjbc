/**
 * @jest-environment jsdom
 */
describe("10.9 函数内部", () => {
  test("10.9.1 arguments", () => {
    function factorial(num) {
      if (num < 1) {
        return 1
      } else {
        expect(arguments.callee).toBe(factorial)
        return num * arguments.callee(num - 1)
      }
    }
    expect(factorial(1)).toBe(1)
    expect(factorial(5)).toBe(120)

  })

  test("10.9.2 this", () => {
    window.color = 'red'
    let o = {color: 'blue'}
    function sayColor() {
      if (this === window) {
        expect(this.color).toBe('red')
        expect(this).toBe(window)
      } else {
        expect(this.color).toBe('blue')
        expect(this).toBe(o)
      }
    }
    sayColor()
    sayColor.bind(o)()

    let thisArg = this
    let sayColor2 = ()=> {
      if(this === thisArg) {
        expect(this.color).toBeUndefined()
      }else{
        expect(this.color).toBe('blue')
        expect(this).toBe(o)
      }
    }
    sayColor2()
    sayColor2.bind(o)()
  })
  test("10.9.3 caller", () => {
    function outer(){ inner() }
    function inner(){ 
      expect(inner.caller).toBe(outer)
      expect(arguments.callee.caller).toBe(outer)
    }
    outer()
  })
  test("10.9.4 new.target", () => {
    function King(){
      if (!new.target){
        throw 'King must be instantiated using "new"'
      }
    }
    expect(()=>King()).toThrow()
  })
})
