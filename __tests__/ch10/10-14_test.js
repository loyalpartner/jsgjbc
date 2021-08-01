/**
* @jest-environment jsdom
*/
describe("10.14 闭包", () => {
  test("10.14.1 this 对象", () => {
    window.identity = 'The Window'
    let object = {
      identity: 'My Object',
      getIdentity(){
        return this.identity
      }
    }

    expect(object.getIdentity()).toBe('My Object')
    expect((object.getIdentity)()).toBe('My Object')
    // 注意: 重新赋值函数会更改 this
    expect((object.getIdentity = object.getIdentity)()).toBe('The Window') 
  })
})
