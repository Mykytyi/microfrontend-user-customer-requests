import { screen } from '@testing-library/react';
import nock from 'nock';
import React from 'react';
import { act } from 'react-dom/test-utils';
import Summary from '../../../src/frontend/components/summary/Summary';
import renderWithProviders from '../test-utils';
import setupNockTestData from '../test-utils/components/cases';
import '@testing-library/jest-dom';

nock.disableNetConnect();

describe('Summary component', () => {
  it('renders cases data', async () => {
    // it will return 6 items
    setupNockTestData('q402463', 6);

    act(() => {
      renderWithProviders(
        <Summary />,
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

    expect(screen.getByTestId('cases-loading-placeholders')).toBeInTheDocument();

    const summaryItems = await screen.findAllByTestId('summary-item');

    // if paginator works properly 6 items has to be split into [5, 1]
    expect(summaryItems.length).toBe(5);

    const paginator = await screen.findByTestId('summary-mode-navigatior');

    expect(paginator).toBeInTheDocument();
  });

  it('paginator is not shown when there is less cases.length < 6', async () => {
    setupNockTestData('q402463', 3);

    act(() => {
      renderWithProviders(
        <Summary />,
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

    // we need to wait for a full mount of a component to check paginator;
    // that is why we use a Promise wrapped by act method
    await act(async () => {
      await new Promise((resolve) => { setTimeout(resolve, 100); });
    });

    const paginator = await screen.queryByTestId('summary-mode-navigatior');

    expect(paginator).not.toBeInTheDocument();
  });

  // it('handles error response', async () => {
  //   setupNockTestData(500);
  //
  //   renderWithProviders(<Party />, {
  //     preloadedState: {
  //       config: {
  //         partyId: 500,
  //         restProxyPath: 'http://localhost:1234/api',
  //       },
  //     },
  //   });
  //
  //   expect(screen.getByTestId('party-loading-spinners')).toBeInTheDocument();
  //
  //   const errorMessage = await screen.findByText(
  //     'Kundendaten konnten nicht geladen werden',
  //   );
  //   expect(errorMessage).toBeInTheDocument();
  // });
});
