## call/apply/bind
1. call/apply 绑定 this 的原理一样，只是由于接收参数不同，所以细节处理不同。  
   在绑定 this 的原理上，可以利用《你不知道的 JavaScript》中讲解 this 的第三条，即：  
   let obj = { a: fn }，执行 obj.a() 时， fn 中 this 的指向必然 obj。  
2. bind 用 apply 或 call 实现即可。

