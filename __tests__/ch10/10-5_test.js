describe("10.5 默认参数值", () => {
  test("10.5", () => {
    function makeKing(name){
      name = typeof name !== 'undefined' ? name : 'Henry'
      return `King ${name} VIII`
    }
    expect(makeKing()).toBe('King Henry VIII')
    expect(makeKing('Louis')).toBe('King Louis VIII')

    function makeKing1(name = 'Henry'){
      return `King ${name} VIII`
    }
    expect(makeKing1()).toBe('King Henry VIII')
    expect(makeKing1(undefined)).toBe('King Henry VIII')
    expect(makeKing1('Louis')).toBe('King Louis VIII')

    function makeKing2(name = 'Henry'){
      name = 'Louis'
      return `King ${arguments[0]} VIII`
    }
    expect(makeKing2()).toBe('King undefined VIII')
    expect(makeKing2('Louis')).toBe('King Louis VIII')

    function makeKing3(name = 'Henry', numerals = name){
      return `King ${name} ${numerals}`
    }

    expect(
      ()=>{
        function makeKing4( name = numerals, numerals = 'VII'){
          return `King ${name} ${numerals}`
        }
        makeKing4()
      }
    ).toThrow()

  })
})
