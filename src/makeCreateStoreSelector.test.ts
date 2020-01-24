import { assert } from 'chai';
import { makeGetStoreState } from './makeGetStoreState';
import { makeCreateStoreSelector } from './makeCreateStoreSelector';

describe('makeCreateStoreSelector', () => {
  it('getState(["foo", "bar"]) => (v => v) => ({foo: {bar: 1}}) => 1', () => {
    const getState = makeGetStoreState(['foo', 'bar']);
    const createSelector = makeCreateStoreSelector(getState);
    const selector = createSelector((value: any) => value);
    assert.equal(selector({ foo: { bar: 1 } }), 1);
  });

  it('getState(["foo", "bar"]) => (v => v.baz) => {foo: {bar: {baz: 1}}} => 1', () => {
    const getState = makeGetStoreState(['foo', 'bar']);
    const createSelector = makeCreateStoreSelector(getState);
    const selector = createSelector((value: any) => value.baz);
    assert.equal(selector({ foo: { bar: { baz: 1 } } }), 1);
  });

  it('memoization', () => {
    const getState = makeGetStoreState(['foo']);
    const createSelector = makeCreateStoreSelector(getState);

    let getDataCalls = 0;

    const getData = (value: any) => {
      getDataCalls += 1;
      return value;
    };

    const selector = createSelector(getData);

    const stateA = { foo: 1 };
    const stateB = { foo: 2 };

    selector(stateA);
    selector(stateA);
    selector(stateB);
    selector(stateB);

    assert.equal(getDataCalls, 2);
  });
});
