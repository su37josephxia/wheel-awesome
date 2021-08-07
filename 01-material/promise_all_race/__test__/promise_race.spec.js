const Promise = require('../index');

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('1');
  }, 1000)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('2')
  }, 1000);
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('fail');
  }, 50)
})

const p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 200);
})

it('Promise.race全部返回成功测试用例', (done) => {
  Promise.race([p1, p2, p4]).then(data => {
    expect(data).toBe('success');
    done();
  }, err => {
    console.log('promise.race fail: ' + err);
    done();
  })
})

it('Promise.race最快的一个返回失败测试用例', (done) => {
  Promise.race([p1, p2, p3]).then(data => {
    expect(data).toBe('success');
    done();
  }, err => {
    expect(err).toBe('fail');
    done();
  })
})