
const isArray = action => Array.isArray(action)?true:false;
const isFunction = middlewares => middlewares.every(middleware => typeof middleware === 'function');

module.exports.compose = (args) => async () => {
let middlewares = [...args]
    if(!isArray(middlewares)) throw new TypeError('middlewares must be Array');
    if(!isFunction(middlewares)){
      throw new TypeError('middleware must be Function')
    }
    if(middlewares.length === 0){
      return null;
    }
    //生成链表
    //{next:{fn:b,next:{fn:next}}} 
    function getStatck(statck){
        if(middlewares.length>0){
          let fn = middlewares.shift()
          statck.next = { fn }  
          getStatck(statck.next)
          return statck;
        } 
    }
   let statck = getStatck({});
   let filber = statck.next;
  return dispatch(filber)
    function dispatch(filber){
        if(!filber){
          return () =>{}
        }
       return filber.fn(next = async()=>{
         await dispatch(filber.next)
        })
    }
  }


