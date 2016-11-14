import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_CLIENT_ID', () => {
    const initialState = Map();
    const action = {
      type: 'SET_CLIENT_ID',
      clientId: '123'
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      clientId: '123'
    }));
  });


  it('removes myVote after round completion', () => {
    const initialState = fromJS({
      vote: {
        round: 7,
        pair: ['Trainspotting', '28 days later'],
        tally: {Trainspotting: 1}
      },
      myVote: {
        round: 7,
        entry: 'Trainspotting'
      }
    });

    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          round: 8,
          pair: ['Sunshine', 'Trainspotting']
        }
      }
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        round: 8,
        pair: ['Sunshine', 'Trainspotting']
      }
    }));
  });

  
  it('does not set myVote for invalid entry', () => {
    const state = fromJS({
      vote: {
        round: 7,
        pair: ['Trainspotting', '28 days later'],
        tally: {Trainspotting: 1}
      }
    });
    const action = {type: 'VOTE', entry: 'Sunshine'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        round: 7,
        pair: ['Trainspotting', '28 days later'],
        tally: {Trainspotting: 1}
      }
    }));
  });


  it('handles VOTE by setting myVote', () => {
    const state = fromJS({
      vote: {
        round: 7,
        pair: ['Trainspotting', '28 days later'],
        tally: {Trainspotting: 1}
      }
    });
    const action = {type: 'VOTE', entry: 'Trainspotting'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        round: 7,
        pair: ['Trainspotting', '28 days later'],
        tally: {Trainspotting: 1}
      },
      myVote: {
        round: 7,
        entry: 'Trainspotting'
      }
    }));
  })
  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Trainspotting', '28 days later'],
          tally: {Trainspotting: 1}
        }
      }
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 days later'],
        tally: {Trainspotting: 1}
      }
    }));
  });

  it('handles SET_STATE with plain JS', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Trainspotting', '28 days later'],
          tally: {Trainspotting: 1}
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 days later'],
        tally: {Trainspotting: 1}
      }
    }));
  });

  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 days later'),
          tally: Map({Trainspotting: 1})
        })
      })
    }
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 days later'],
        tally: {Trainspotting: 1}
      }
    }));
  });

  
})