describe("8.2 创建对象", ()=>{
  test("8.2.2 工厂模式", ()=>{
    function createPerson(name, age, job){
      let o = new Object()
      o.name = name
      o.age = age
      o.job = job
      o.sayName = function (){

      }
      return o
    }

    let p1 = createPerson("nick", 29, "Software Engineer")
    let p2 = createPerson("greg", 27, "Doctor")

    expect(p1.name).toBe('nick')
    expect(p2.name).toBe('greg')
  })

  describe("8.2.3 构造函数模式", ()=>{
    test("8.2.3 ", ()=>{
      function Person(name, age, job) {
        this.name = name
        this.age = age
        this.job = job
        this.sayName = function () {
        }
      }
      // <==> let Person = function(name, age, job){ ... }
      let p1 = new Person("nick", 29, "Software Engineer")
      let p2 = new Person("greg", 27, "Doctor")

      expect(p1.name).toBe('nick')
      expect(p2.name).toBe('greg')
      expect(p1.constructor).toBe(p2.constructor)
      expect(p1).toBeInstanceOf(Object)
      expect(p1).toBeInstanceOf(Person)
    })

    let Person

    beforeEach(()=>{
      Person = function(name){
        if(this){
          this.name = name
          this.sayName = function(){}
        }else{
          throw new Error("this is undefined")
        }
      }
    })

    test("1. 构造函数也是函数", ()=>{
      expect(()=>Person('Jack')).toThrow()

      let obj = new Object()
      Person.call(obj, 'jest')
      expect(obj.name).toBe('jest')
    })

    test("2. 构造函数的问题", ()=>{
      let p1 = new Person('a')
      let p2 = new Person('b')

      expect(p1.sayName).not.toBe(p2.sayName)
    })
  })

  describe("8.2.4 原型模式", ()=>{
      
    test("1. 理解原型", ()=>{
      function Person() {}

      expect(typeof Person.prototype).toBe('object')
      expect(Person.prototype).toBeInstanceOf(Object)
      expect(Person.prototype.constructor).toBe(Person)
      expect(Person.prototype.__proto__).toBe(Object.prototype)
      expect(Person.prototype.__proto__.constructor).toBe(Object)
      expect(Person.prototype.__proto__.__proto__).toBe(null)

      // console.log(Person.prototype.__proto__)
      let [p1, p2] = [new Person(), new Person()]

      // 构造函数，原型对象和实例是完全不同的对象
      expect(p1).not.toBe(p2)
      expect(p1).not.toBe(Person.prototype)
      expect(Person).not.toBe(Person.prototype)

      expect(p1.__proto__).toBe(Person.prototype)
      expect(p1.__proto__.constructor).toBe(Person)

      expect(p1.__proto__).toBe(p2.__proto__)

      expect(p1).toBeInstanceOf(Person)
      expect(p1).toBeInstanceOf(Object)
      expect(Person.prototype).toBeInstanceOf(Object)

      expect(Person.prototype.isPrototypeOf(p1)).toBeTruthy()
      expect(Person.prototype.isPrototypeOf(p2)).toBeTruthy()

      expect(Object.getPrototypeOf(p1)).toBe(Person.prototype)

      // Object.setPrototypeOf 有性能问题
      let biped = { numLegs: 2}
      let person = { name: 'Matt' }
      Object.setPrototypeOf(person, biped)
      expect(person.name).toBe('Matt')
      expect(person.numLegs).toBe(2)
      expect(Object.getPrototypeOf(person)).toBe(biped)
    })

    test("2. 原型层级", ()=>{
      function Person(){}
      Person.prototype.name = "Nicholas"
      Person.prototype.age = 29
      Person.prototype.job = "Software Engineer"
      Person.prototype.sayName = function(){}

      let [p1,p2]=[new Person(), new Person()]
      p1.name = "Greg"

      expect(p1.name).toBe("Greg")
      expect(p1.hasOwnProperty('name')).toBeTruthy()
      expect(p2.name).toBe("Nicholas")
      expect(p2.hasOwnProperty('name')).toBeFalsy()

      delete p1.name
      expect(p1.name).toBe("Nicholas")
      expect(p1.hasOwnProperty('name')).toBeFalsy()
    })

    describe("3. 原型和in操作符", ()=>{
      function hasPrototypeProperty(object, name){
        return !object.hasOwnProperty(name) && name in object
      }
      function Person(){}
      Person.prototype.name = "Nicholas"
      Person.prototype.age = 29
      Person.prototype.job = "Software Engineer"
      Person.prototype.sayName = function(){}

      let [p1,p2]=[new Person(), new Person()]

      expect(p1.hasOwnProperty('name')).toBeFalsy()
      expect(hasPrototypeProperty(p1, 'name')).toBeTruthy()
      expect('name' in p1).toBeTruthy()

      p1.name = 'Greg'
      expect(p1.hasOwnProperty('name')).toBeTruthy()
      expect(hasPrototypeProperty(p1, 'name')).toBeFalsy()
      expect('name' in p1).toBeTruthy()

      delete p1.name
      expect(p1.hasOwnProperty('name')).toBeFalsy()
      expect('name' in p1).toBeTruthy()

      expect(Object.keys(Person.prototype)).toHaveLength(4)
      p1.name = 'Greg'
      p1.age = 24
      expect(Object.keys(p1)).toHaveLength(2)
      expect(Object.getOwnPropertyNames(Person.prototype)).toHaveLength(5) // [constructor, name, age, sayName, job]
    })

    describe("4. 属性和枚举顺序", ()=>{
      // for-in, Object.keys() 枚举顺序不固定
      // Object.{getOwnPropertySymbols,getOwnPropertyNames,assign} 顺序是固定
      // 先以升序枚举数值键，然后以插入顺序枚举字符串和符号键
    })
  })

  describe("8.2.5 对象迭代", () => {

    test("8.2.5", () => {
      const o = {foo: 'bar', baz: 1, qux: {}}
      expect(Object.values(o)).toHaveLength(3)
      expect(Object.values(o)[0]).toBe(o.foo)
      expect(Object.values(o)[1]).toBe(o.baz)
      expect(Object.values(o)[2]).toBe(o.qux)

      expect(Object.entries(o)[0][1]).toBe(o.foo)
      expect(Object.entries(o)[1][1]).toBe(o.baz)
      expect(Object.entries(o)[2][1]).toBe(o.qux)
    })

    test("1. 其他原型语法", ()=>{
      function Person() {}
      Person.prototype = {
        name: "Nicholas",
        age: 29,
        job: "Software Engineer",
        sayName: function(){}
      }

      // p1.constructor 不会指向 Person 了
      let p1 = new Person()
      expect(p1.constructor).not.toBe(Person)
      expect(p1.constructor).toBe(Object)

      expect(p1).toBeInstanceOf(Person)
      expect(p1).toBeInstanceOf(Object)

      // 修复 p1.constructor 的问题
      Object.defineProperty(Person.prototype, 'constructor', {
        enumerable: false, value: Person
      })
      expect(p1.constructor).toBe(Person)
    })
    test("2. 原型的动态性", ()=>{
      
    })
    test("3. 原生对象原型", ()=>{
      
    })
    test("4. 原型的问题", ()=>{
      
    })
  })
})
