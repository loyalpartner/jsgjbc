describe("8.3 继承", ()=>{
  describe("8.3.1 原型链", ()=>{

    function SuperType(){ this.property = true }
    function SubType(){ this.subproperty = false }
    SuperType.prototype.getSuperValue = function() { return this.property }
    SubType.prototype = new SuperType()
    SubType.prototype.getSubValue = function() { return this.subproperty }

    let instance 
    beforeEach(()=> {
      instance = new SubType()
    })
      
    test("8.3.1", ()=>{
      let instance =  new SubType()
      expect(instance.getSuperValue()).toBe(true)
      expect(instance.getSubValue()).toBe(false)
    })

    test("1. 默认原型", ()=>{
      expect(instance.toString).toBe(Object.prototype.toString)
      expect(instance.valueOf).toBe(Object.prototype.valueOf)
    })
    test("2. 原型与继承的关系", ()=>{
      expect(instance).toBeInstanceOf(Object)
      expect(instance).toBeInstanceOf(SuperType)
      expect(instance).toBeInstanceOf(SubType)
      expect(Object.prototype.isPrototypeOf(instance)).toBeTruthy()
      expect(SuperType.prototype.isPrototypeOf(instance)).toBeTruthy()
      expect(SubType.prototype.isPrototypeOf(instance)).toBeTruthy()
    })
    test("3. 关于方法", ()=>{
      SubType.prototype.getSuperValue = function(){
        return false;
      }
      expect(instance.getSuperValue()).toBeFalsy()
      SubType.prototype = {
        getSubValue(){ return this.subproperty },
      }
      instance = new SubType()
      expect(() => instance.getSuperValue()).toThrow()
    })
    test("4. 原型链的问题", () => {
      function SuperType() {this.colors = ['red', 'green']}
      function SubType() {}
      SubType.prototype = new SuperType()

      instance = new SubType()
      instance.colors.push('black')
      instance2 = new SubType()
      expect(instance.colors).toBe(instance2.colors)
    })
  })
  describe("8.3.2 盗用构造函数", ()=>{
    test("8.3.2", ()=>{ 
      function SuperType(){
        this.colors = ['red', 'blue', 'green']
      }
      function SubType(){
        SuperType.call(this)
      }

      let instance1 = new SubType()
      instance1.colors.push('black')
      let instance2 = new SubType()
      expect(instance1.colors).toHaveLength(4)
      expect(instance2.colors).toHaveLength(3)
    })
    test("1. 传递参数", ()=>{
      function SuperType(name){
        this.name = name
      }
      function SubType(){
        SuperType.call(this, 'Nicholas')
        this.age = 29
      }

      let instance = new SubType()
      expect(instance).not.toBeInstanceOf(SuperType)
      expect(instance.name).toBe('Nicholas')
      expect(instance.age).toBe(29)

    })
    test("2. 盗用构造函数的问题", ()=>{ 
      // 缺点： 子类不能访问父类原型定义的方法
    })
  })
  describe("8.3.3 组合继承", ()=>{
    test("8.3.3", ()=>{
      function SuperType(name){
        this.name = name
        this.colors = [ 'red', 'blue', 'green']
      }
      SuperType.prototype.sayName = function(){}
      function SubType(name, age){
        SuperType.call(this, name)
        this.age = age
      }

      SubType.prototype = new SuperType()
      SubType.prototype.sayAge = function(){}

      let instance1 = new SubType("Nicholas", 29)
      instance1.colors.push('black')
      expect(instance1).toBeInstanceOf(SuperType)
      let instance2 = new SubType("Greg", 27)
      expect(instance1.colors).not.toBe(instance2.colors)
    })
  })
  describe("8.3.4 原型式继承", ()=>{
      test("8.3.4", ()=>{
        function object(o){
          function F(){}
          F.prototype = o
          return new F()
        }

        let person = {
          name: "Nicholas",
          friends: ["Shelby", "Court", "Van"]
        }

        let anotherPerson = object(person)
        anotherPerson.name = "Greg"
        anotherPerson.friends.push("Rob")
        let yetAnotherPerson = object(person)
        yetAnotherPerson.name = "Linda"
        yetAnotherPerson.friends.push("Barbie")

        expect(anotherPerson.friends).toHaveLength(5)

        // object(o) 和 ECMAScript 5 的 Object.create(o) 等价
      })
  })
  describe("8.3.5 寄生式继承", ()=>{
    function createAnother(original){
      let clone = Object.create(original)
      clone.sayHi = function(){}
      return clone;
    }

    let person = { name: "Nicholas", friends: ["Shelby", "Court", "Van"]}
    let anotherPerson = createAnother(person)

    expect(anotherPerson).toHaveProperty('sayHi')
  })
  describe("8.3.6 寄生式组合继承", ()=>{
    function inheritPrototype(subType, superType){
      let prototype = Object.create(superType.prototype)
      prototype.constructor = subType
      subType.prototype = prototype
    }

    function SuperType(name){
      this.name = name
      this.colors = [ 'red', 'blue', 'green']
    }
    SuperType.prototype.sayName = function(){}
    function SubType(name, age){
      SuperType.call(this, name)
      this.age = age
    }

    inheritPrototype(SubType, SuperType)
    SubType.prototype.sayAge = function(){}
      
  })
})
