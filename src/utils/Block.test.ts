import Sinon from "sinon";
import proxyquire from 'proxyquire';
import type BlockType from './Block'
import { expect } from "chai";

const eventBusMock = {
  on: Sinon.fake(),
  emit: Sinon.fake(),
}

const { default: Block } = proxyquire('./Block', {
  './EventBus': {
    EventBus: class {
      emit = eventBusMock.emit;
      on = eventBusMock.on;
    }
  }
}) as { default: typeof BlockType };

describe('Block', () => {
  class ComponentMock extends Block {}

  it('should call init',  () => {
    new ComponentMock({});

    expect(eventBusMock.emit.calledWith('init')).to.eq(true);
  });
});
