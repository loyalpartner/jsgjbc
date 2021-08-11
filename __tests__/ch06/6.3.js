describe("6.3 定型数组", () => {
  test("6.3.1 历史", function () {

  })
  test("6.3.2 ArrayBuffer", function () {
    const buf = new ArrayBuffer(16)
    expect(buf.byteLength).toBe(16)
    expect(buf.slice(1,5).byteLength).toBe(4)
  })
  test("6.3.3 DataView", function () {
    const buf = new ArrayBuffer(16)

    const fullDataView = new DataView(buf)
    expect(fullDataView.byteOffset).toBe(0)
    expect(fullDataView.byteLength).toBe(16)
    expect(fullDataView.buffer).toBe(buf)

    const firstHalfDataView = new DataView(buf, 0, 8)
    expect(firstHalfDataView.byteOffset).toBe(0)
    expect(firstHalfDataView.byteLength).toBe(8)
    expect(firstHalfDataView.buffer).toBe(buf)

    const secondHalfDataView = new DataView(buf, 8)
    expect(secondHalfDataView.byteOffset).toBe(8)
    expect(secondHalfDataView.byteLength).toBe(8)
    expect(secondHalfDataView.buffer).toBe(buf)

  })
  test("6.3.3 1. ElementType", function () {
    const buf = new ArrayBuffer(2)
    const view = new DataView(buf)

    expect(view.getInt8(0)).toBe(0)
    expect(view.getInt8(1)).toBe(0)

    view.setUint8(0, 0xff)
    view.setUint8(1, 0xff)

    expect(view.getInt16(0)).toBe(-1)
  })
  test("6.3.3 2. 字节序", function () {
    const buf = new ArrayBuffer(2)
    const view = new DataView(buf)

    // Big Endian
    //1000 0000 0000 0001
    view.setUint8(0, 0x80)
    view.setUint8(1, 0x01)
    expect(view.getUint16(0)).toBe(2**15+1)

    // Little Endian
    //0000 0001 1000 0000
    view.setUint8(0, 0x80)
    view.setUint8(1, 0x01)
    expect(view.getUint16(0, true)).toBe(2**8+2**7)
  })
  test("6.3.3 3. 边界情形", function () {
    const buf = new ArrayBuffer(6)
    const view = new DataView(buf)

    expect(()=>view.getInt32(4)).toThrow(RangeError)
    expect(()=>view.getInt32(8)).toThrow(RangeError)
    expect(()=>view.getInt32(-1)).toThrow(RangeError)
    expect(()=>view.setInt32(-1)).toThrow(RangeError)

    view.setInt8(0, 1.5)
    expect(view.getInt8(0)).toBe(1)
    view.setInt8(0, [4])
    expect(view.getInt8(0)).toBe(4)
    view.setInt8(0, 'f')
    expect(view.getInt8(0)).toBe(0)
    
    expect(()=>view.setInt8(0, Symbol())).toThrow()
  })
  test("6.3.4 定型数组", function () {
    const buf = new ArrayBuffer(12)
    expect(new Int32Array(buf)).toHaveLength(3)
    expect(new Int32Array(6)).toHaveLength(6)
    
    // TODO:
  })
})
