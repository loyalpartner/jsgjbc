describe("8.4 继承", ()=>{
  describe("8.4.1 类定义", ()=>{
    test("8.4.1", ()=>{
      expect(()=> class Person{}).not.toThrow()
      expect(()=> { const _ = class {}}).not.toThrow()

      expect(()=>class Foo{}).not.toThrow()
      expect(()=>class Bar{ constructor(){}}).not.toThrow()
      expect(()=>class Baz { get myBaz() {} }).not.toThrow()
      expect(()=>class Qux { static myQux() {} }).not.toThrow()
    })
  })

  describe("8.4.2 类构造函数", ()=>{
    test("1. 实例化", ()=>{
      class Animal {}
      let a = new Animal()

      class Person {
        constructor(name){
          this.name = name
        }
      }
      let p1 = new Person('Nicholas')
      let p2 = new Person()
      let p3 = new Person('Jake')
      expect(p1.name).toBe('Nicholas')
      expect(p2.name).toBeUndefined()
      expect(p3.name).toBe('Jake')

      class Vegetable { 
        constructor(override){
          this.color = 'orange'
          if(override){
            return { bar: 'bar' }
          }
        }
      }
      let v1 = new Vegetable()
      let v2 = new Vegetable(true)

      expect(v1).toBeInstanceOf(Vegetable)
      expect(v2).not.toBeInstanceOf(Vegetable)

      // let thisObj
      // function Monkey(name) {
      //   // thisObj = this
      //   this.name = name
      // }
      // let m = Monkey('Nick')
      // expect(thisObj.name).toBe('Nick')

      expect(()=> p1.constructor()).toThrow()
    })
      
    test("2. 把类当成特殊函数", ()=>{
      class Person{}
      expect(Person).toBeInstanceOf(Function)
      expect(Person === Person.prototype.constructor).toBeTruthy()

      let classList = [ class { constructor(id){ this.id_ = id}}]
      function createInstance(classDefinition,id){
        return new classDefinition(id)
      }
      expect(()=> createInstance(classList[0], 1)).not.toThrow()
      expect(()=> new class Foo{}()).not.toThrow()
    })
  })

  describe("8.4.3 实例、原型和类成员", ()=>{
    test("1. 实例成员", ()=>{
      class Person {
        constructor() {
          this.name = new String('Jack')
          this.sayName = ()=> _
          this.nickNames = ['Jake', 'J-Dog']
        }
      }

      let p1 = new Person(),
          p2 = new Person()

      expect(p1.name).not.toBe(p2.name)
      expect(p1.sayName).not.toBe(p2.sayName)
      expect(p1.nickNames).not.toBe(p2.nickNames)
      expect(p1.prototype).toBe(p2.prototype)
    })

    test("2. 原型方法和访问器", ()=>{
      let symbol = Symbol('foo')
      class Person{
        constructor(){
          this.locate = ()=> _
        }
        set name(v){ this.name_ = v}
        get name(){ return this.name_}
        locate(){ this.isLocate = true }
        stringKey(){}
        [symbol](){}
        ['computed'+'Key'](){}

      }
      let p = new Person()
      p.name = 'Nicholas'

      expect(p.isLocate).toBeUndefined()
      expect(()=> p.stringKey()).not.toThrow()
      expect(()=> p[symbol]()).not.toThrow()
      expect(()=> p.computedKey()).not.toThrow()
      expect(p.name).toBe('Nicholas')
    })

    test("3. 静态类方法", ()=>{
      class Person{
        constructor(){}
        static create(){ return new Person() }
      }
    })

    test("4. 非函数原型和类成员", ()=>{
      class Person {
        sayHello() {}
      }
      Person.greeting = 'My name is'
      Person.prototype.name = 'jake'
    })

    test("5. 迭代器与生成器方法", ()=>{
      class Person {
        constructor(){
          this.nickNames = ['Jack', 'Jake', 'J-Dog']
        }

        *[Symbol.iterator]() {
          yield *this.nickNames.entries()
        }

        *createNicknameIterator(){
          yield 'Jack'
          yield 'Jake'
          yield 'J-Dog'
        }

        static *createJobIterator(){
          yield 'Butcher'
          yield 'Baker'
          yield 'Candlestick maker'
        }
      }

      let p = Person.createJobIterator()
      expect(p.next().value).toBe('Butcher')
      expect(p.next().value).toBe('Baker')
      expect(p.next().value).toBe('Candlestick maker')

      let it2 = new Person().createNicknameIterator()
      expect(it2.next().value).toBe('Jack')
      expect(it2.next().value).toBe('Jake')
      expect(it2.next().value).toBe('J-Dog')

      p = new Person()
      for (let [idx, nickname] of p){
        expect(nickname).toBe(p.nickNames[idx])
      }
    })
  })

  describe("8.4.4 继承", ()=>{
     test("1. 继承基础", ()=>{
       class Vehicle {}
       class Bus extends Vehicle {}
       
       let b = new Bus()
       expect(b).toBeInstanceOf(Bus)
       expect(b).toBeInstanceOf(Vehicle)

       function Person(){}

       class Engineer extends Person {}

       let e = new Engineer()
       expect(e).toBeInstanceOf(Engineer)
       expect(e).toBeInstanceOf(Person)
     }) 
     test("2. 构造函数、HomeObject和super()", ()=>{
       class Vehicle {
         constructor(){
           this.hasEngine = true
         }
       }

       class Bus extends Vehicle {
         constructor(){
           super() // <==> super.constructor()
         }
       }

       let b = new Bus()
       expect(b.hasEngine).toBeTruthy()
       expect(()=> {
         class Van extends Vehicle {
           constructor(){
             // 这里要么调用 super()
             // 要么返回一个对象
           }
         }
         new Van()
       }).toThrow()
     }) 
     test("3. 抽象基类", ()=>{
       class Vehicle {
         constructor() {
           if (new.target === Vehicle){
             throw new Error('Vehicle cannot be directly instantiated')
           }
         }
       }
       expect(()=>new Vehicle()).toThrow()
     }) 
     test("4. 继承内置类型", ()=>{
     }) 
     test("5. 类混入", ()=>{
       
     }) 
  })
})
