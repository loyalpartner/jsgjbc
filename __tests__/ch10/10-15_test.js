describe("10.15 立即调用的函数表达式", ()=>{
    test("10.15", ()=>{
      // IIFE (Imediately Invoked Fuction Expression)
      // ES5
      (function (){
        for ( var i=0;i<5; i++){}
      })()
      // ES6
      {
        for ( var i=0;i<5; i++){}
      }
    })
})
