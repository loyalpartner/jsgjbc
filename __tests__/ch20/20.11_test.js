const jsdom = require("jsdom")
const {JSDOM} = jsdom

describe("20.11.1 HTML模版", () => {
  test("1. 使用 DocumentFragment", () => {
    const {document, DocumentFragment} = new JSDOM(
      `
    <template id="foo">
      #document-fragment
      <p>I'm inside a template!</p>
    </template>
    `
    ).window

    const template = document.querySelector("#foo")
    const fragment = template.content
    expect(fragment).toBeInstanceOf(DocumentFragment)
    expect(template.querySelector("p")).toBeNull()
    expect(fragment.querySelector("p")).not.toBeNull()
  })

  test("2. 使用<template>标签", () => {
    const {document, DocumentFragment} = new JSDOM(``).window

    let fooElement = document.createElement("div")
    let barTemplate = document.createElement("template")
    let fragment = barTemplate.content
    for (let i = 0; i < 3; i++) {
      fragment.appendChild(document.createElement("p"))
    }

    expect(barTemplate.children).toHaveLength(0)
    expect(fragment.children).toHaveLength(3)

    fooElement.appendChild(document.importNode(fragment, true))
    expect(fooElement.children).toHaveLength(3)
  })

  test("3. 模版脚本", () => {
    const fragmentHtml = `
    <div id="foo">
      <template>
        <script>window.test = 1</script>
      </template>
    </div>`

    let window = { document } = new JSDOM("", { runScripts: "dangerously" }).window
    document.body.insertAdjacentHTML('afterbegin', fragmentHtml)

    expect(document.body.innerHTML).toBe(fragmentHtml)
  })
})
