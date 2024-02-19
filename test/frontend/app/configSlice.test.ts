import reducer, { setConfig } from '../../../src/frontend/redux/configSlice';
import { WidgetConfig } from '../../../src/frontend/type-definitions';

// See https://redux.js.org/usage/writing-tests#reducers how to use the react-testing-library
describe('Widget config', () => {
  it('should return the initial config state', () => {
    expect(
      reducer(undefined, {
        type: Object,
      }),
    ).toEqual({
      caseOwner: undefined,
      view: null,
      appId: '',
    });
  });

  it('should handle setting values on an empty config state', () => {
    const previousState = { caseOwner: undefined, view: null, appId: '' };
    expect(
      reducer(previousState, setConfig({ caseOwner: 'que12r', view: 'SUMMARY', appId: '' })),
    ).toEqual({ caseOwner: 'que12r', view: 'SUMMARY', appId: '' });
  });

  it('should handle overwriting values on an existing config state', () => {
    const previousState: WidgetConfig = { caseOwner: 'que12r', view: 'SUMMARY', appId: '' };
    expect(
      reducer(
        previousState,
        setConfig({ caseOwner: 'q4021we', view: 'TABLE', appId: '' }),
      ),
    ).toEqual({ caseOwner: 'q4021we', view: 'TABLE', appId: '' });
  });
});
