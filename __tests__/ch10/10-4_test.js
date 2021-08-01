describe("10.4 没有重载", () => {
  test("10.4", () => {
    function addSomeNumber(num){ return num + 10 }
    function addSomeNumber(num){ return num + 100 }
    expect(addSomeNumber(10)).toBe(110)
  })
})
