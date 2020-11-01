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

it('Promise.all全部返回成功测试', (done) => {
  Promise.all([p1, p2, 3, 4, 5]).then(data => {
    console.log('resolve: ', data);
    expect(data).toEqual([ '1', '2', 3, 4, 5 ]);
    done();
  }, err => {
    console.log('reject: ', err);
  });
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('fail');
  }, 50)
})

it('Promise.all其中一个返回失败测试', (done) => {
  Promise.all([p1, p2, p3, 3, 4]).then(data => {
    console.log('resolve:', data);
  }, err => {
    expect(err).toBe('fail');
    done();
  })
})