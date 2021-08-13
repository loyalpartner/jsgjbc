describe("10.11 函数声明与函数表达式", ()=>{
  test("10.11", ()=>{
    expect(()=> sayHi()).toThrow()
    let sayHi = ()=>{ }
    expect(sayHi2).toBeDefined()
    function sayHi2(){}

    let result = '1'
    if (false) {
      function SayHi3(){ result = '2'}
    } else {
      function SayHi3(){ result = '3'} // 函数提升
    }
    //
    expect(()=>SayHi3).toThrow(ReferenceError)
    // expect(result).toBe('3')

    // let sayHi4
    // if (true) {
    //   function SayHi4(){ result = '2'}
    // } else {
    //   function SayHi4(){ result = '3'} 
    // }
    // SayHi4()
    // expect(result).toBe('2')
  })
})
