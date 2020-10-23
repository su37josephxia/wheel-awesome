
module.exports.createHistory = () => {
    

         const hasRecord = (type) =>{// 查询是否有过去或者将来的状态
            return history[type].length > 0;
          },

          const hasPresent= ()=> { // 查询是否有现在的状态
            return history.present !== undefined;
          },
          
          const movePresentToPast = () {
            history.past.push(history.present);
          },

          const push = (currentState) => { // 将状态都保存，并更新当前状态
            if (hasPresent()) {
                history.past.push(history.present);
            }
            history.setPresent(currentState);
          }

          const getIndex = () => { // 获取当前状态index
            return history.past.length;
          }
          const undo =() => { // 后退
            if (this.hasRecord('past')) {
              this.gotoState(history.getIndex() - 1);
            }
          }
          const redo = ()=> { // 前进
            if (this.hasRecord('futrue')) {
              this.gotoState(history.getIndex() + 1);
            }
          }

          const history = {

        }

    
    
  };