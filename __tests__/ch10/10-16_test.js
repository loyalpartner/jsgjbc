/**
* @jest-environment jsdom
*/

describe("10.16 私有变量", () => {
  test("10.6.2  模块模式", () => {
    class BaseComponent {}
    let application = function () {
      let components = new Array();

      components.push(new BaseComponent())

      return {
        getComponentCount() {return components.length},
        registerComponent(component) {
          if (typeof component == 'object') {
            components.push(component)
          }
        }
      }
    }
    application()
  })

  test("10.6.3 模块增强模式", () => {
      class BaseComponent{}
      let application = function (){
        let components = new Array();

        components.push(new BaseComponent())

        let app = new BaseComponent()
        app.getComponentCount = function(){
          return components.length
        }
        app.registerComponent = function (component){
          if (typeof component == 'object'){
            components.push(component)
          }
        }
        return app
      }
      application()
  })
})
