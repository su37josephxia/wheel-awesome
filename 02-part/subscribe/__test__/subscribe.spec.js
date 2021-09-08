const EventSubscribe = require('../subcribe');

describe('test subscribe dispatch', () => {
  const eventSubscribe = new EventSubscribe();
  it('test subscribe event', () => {
    const eventHandle = () => {
      console.log('hello world!')
    }
    eventSubscribe.subscribe('aEvent', eventHandle)
    expect(eventSubscribe.eventList.aEvent).toEqual([eventHandle]);
  })
  it('test dispatch event', () => {
    let testStr = 'testStr';
    const eventHandle = () => {
      testStr = 'testStr change'
    }
    eventSubscribe.subscribe('bEvent', eventHandle)
    expect(eventSubscribe.eventList.bEvent).toEqual([eventHandle]);
    eventSubscribe.dispatch('bEvent');
    expect(testStr).toEqual('testStr change');
  })

  it('dispatch null event', () => {
    eventSubscribe.dispatch('fEvent');
  })

  describe('test unsubscribe', () => {

    // 单个监听函数
    it('test unsubscribe single', () => {
      let testStr = 'testStr';
    const eventHandle = () => {
      testStr = 'testStr change'
    }
    const unsbscribeCevent = eventSubscribe.subscribe('cEvent', eventHandle)
    expect(eventSubscribe.eventList.cEvent).toEqual([eventHandle]);
    eventSubscribe.dispatch('cEvent');
    expect(testStr).toEqual('testStr change');
    unsbscribeCevent();
    expect(eventSubscribe.eventList.cEvent).toEqual(undefined);
    })
    


    // 多个监听函数
    it('test unsubscribe multi', () => {
      const eventHandle1 = () => {}
      const eventHandle2 = () => {}
      const eventHandle3 = () => {}
      const unsbscribedevent1 = eventSubscribe.subscribe('dEvent', eventHandle1)
      const unsbscribedevent2 = eventSubscribe.subscribe('dEvent', eventHandle2)
      const unsbscribedevent3 = eventSubscribe.subscribe('dEvent', eventHandle3)
      expect(eventSubscribe.eventList.dEvent).toEqual([eventHandle1, eventHandle2, eventHandle3]);
      unsbscribedevent1();
      expect(eventSubscribe.eventList.dEvent).toEqual([eventHandle2, eventHandle3]);
      unsbscribedevent3();
      expect(eventSubscribe.eventList.dEvent).toEqual([eventHandle2]);
      unsbscribedevent2();
      expect(eventSubscribe.eventList.dEvent).toEqual(undefined);
    
    })
  })
})