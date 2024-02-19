import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithProviders from '../test-utils';
import Widget from '../../../src/frontend/components/widget/Widget';
import setupNockTestData from '../test-utils/components/cases';

/** Follow https://reactjs.org/docs/testing-recipes.html#rendering
 * for more details on testing component rendering. */
describe('Widget component', () => {
  it('The German title appears in the widget; Summary mode mounted', async () => {
    setupNockTestData('q402463', 3);

    act(() => {
      renderWithProviders(
        <Widget />,
        {
          preloadedState: {
            config: {
              caseOwner: 'q402463',
              view: 'SUMMARY',
              appId: '',
            },
          },
        },
      );
    });

    expect(screen.getByText('Meine Kundenanliegen')).toBeInTheDocument();

    const summaryMode = await screen.findByTestId('summary-mode');

    expect(summaryMode).toBeInTheDocument();
  });
});
