describe("10.3 理解参数", () => {
  test("10.3", () => {
    function doAdd(num1, num2) {
      arguments[0] = 1
      return num1 + num2
    }
    expect(doAdd(2, 2)).toBe(3)
    function forTest(num1, num2) {
      arguments[1] = 1
      return num1 + num2
    }
    expect(forTest(1)).toBeNaN()

    cloneArguments = arguments
    let bar = () => {
      expect(arguments).toBe(cloneArguments)
    }
    bar()
  })
})
