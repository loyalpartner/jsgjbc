describe("8.1 理解对象", () => {
  describe("8.1.1 属性的类型", () => {
    test("1. 数据属性", () => {
      let person = {name: "Nicholas"}
      let propDescriptor = Reflect.getOwnPropertyDescriptor(person, 'name')
      expect(propDescriptor.configurable).toBeTruthy()
      expect(propDescriptor.enumerable).toBeTruthy()
      expect(propDescriptor.writable).toBeTruthy()
      expect(propDescriptor.value).toBe('Nicholas')

      Object.defineProperty(person, 'age', {
        writable: false,
        value: 12
      })
      propDescriptor = Reflect.getOwnPropertyDescriptor(person, 'age')
      expect(propDescriptor.writable).toBeFalsy()
       // person.age = 13 // 严格模式下会抛出错误
      expect(() => person.age = 13).toThrow()
      expect(person.age).toBe(12)
    })

    test("2. 访问器属性", () => {
      let book = {year_: 2017, edition: 1}
      Object.defineProperty(book, 'year', {
        get() {return this.year_},
        set(value) {
          if (value > 2017) {
            this.year_ = value;
            this.edition += value - 2017
          }
        }
      })

      expect(book.year).toBe(2017)
      expect(book.edition).toBe(1)
      book.year = 2018
      expect(book.year).toBe(2018)
      expect(book.edition).toBe(2)
    })
  })
})
