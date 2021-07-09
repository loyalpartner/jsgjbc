test("9.1.3 创建空代理", ()=>{
  const target = { id: 'target' }
  const handler = {};

  const proxy = new Proxy(target, handler);
  expect(target.id).toBe('target');
  expect(proxy.id).toBe('target');

  target.id = 'foo';
  expect(target.id).toBe('foo');
  expect(proxy.id).toBe('foo');

  proxy.id = 'bar';
  expect(target.id).toBe('bar');
  expect(proxy.id).toBe('bar');
  
  expect(target.hasOwnProperty('id')).toBeTruthy();
  expect(proxy.hasOwnProperty('id')).toBeTruthy();

  try{
    target instanceof Proxy;
  }catch(e){
    expect(e).not.toBeNull();
  }
  try{
    proxy instanceof Proxy;
  }catch(e){
    expect(e).not.toBeNull();
  }

  expect(target === proxy).not.toBeTruthy();
})

test("9.1.2 定义捕获器", ()=>{
  const target = { id: 'target' };
  const handler = {
    get(){
      return 'handler override';
    }
  };
  const proxy = new Proxy(target, handler);

  expect(target.id).toEqual('target')
  expect(proxy.id).toEqual('handler override')

  expect(target['id']).toEqual('target')
  expect(proxy['id']).toEqual('handler override')


  expect(Object.create(target).id).toEqual('target')
  expect(Object.create(proxy).id).toEqual('handler override')
})
