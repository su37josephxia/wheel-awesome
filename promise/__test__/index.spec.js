const { BasePromise, FullPromise } = require('../index');

it('基本功能Promise返回成功测试', (done) => {
  const promise = new BasePromise((resolve, reject) => {
    setTimeout(() => {
      resolve('success');
    }, 50);
  })

  promise.then(data => {    
    expect(data).toBe('success');
    done();
  })
})

it('基本功能Promise返回失败测试', (done) => {
  const promise = new BasePromise((resolve, reject) => {
    setTimeout(() => {
      reject('fail');
    }, 50);
  })

  promise.then(data => {    
    console.log('resolve data: ', data)
  }, error => {
    expect(error).toBe('fail');
    done();
  })
})

it('完整版Promise成功返回测试', (done) => {
  const promise = new FullPromise((resolve, reject) => {
    resolve('success');
  });

  promise.then().then().then(data => {
    expect(data).toBe('success');
    done();
  })
})

it('完整版Promise失败返回测试', (done) => {
  const promise = new FullPromise((resolve, reject) => {
    reject('fail');
  });

  promise.then().then().then(data => {
    console.log('resolve data: ', data);
  }, err => {
    expect(err).toBe('fail');
    done();
  })
})