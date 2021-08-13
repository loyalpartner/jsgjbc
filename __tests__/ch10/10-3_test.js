describe("10.3 理解参数", () => {
  test("10.3", () => {
    function doAdd(num1, num2) {
      arguments[0] = 1
      return num1 + num2
    }
    // strict mode is 4
    // non-strict mode is 3
    expect(doAdd(2, 2)).toBe(4) 
    function forTest(num1, num2) {
      arguments[1] = 1
      return num1 + num2
    }
    expect(forTest(1)).toBeNaN()

    let cloneArguments = arguments
    let bar = () => {
      expect(arguments).toBe(cloneArguments)
    }
    bar()
  })
})
