import { screen } from '@testing-library/react';
import nock from 'nock';
import React from 'react';
import SummaryItems from '../../../src/frontend/components/summary/summaryItems/SummaryItems';
import renderWithProviders from '../test-utils';
// import setupNockTestData from '../test-utils/components/party';
import '@testing-library/jest-dom';

nock.disableNetConnect();

describe('SummaryItems component', () => {
  it('renders the (no cases) block', async () => {
    renderWithProviders(<SummaryItems cases={[]} />);

    expect(screen.getByTestId('no-cases-block')).toBeInTheDocument();

    const block = await screen.findByTestId('no-cases-block');
    expect(block).toHaveTextContent('Derzeit keine angenommenen oder zurückgelegten Geschäftsfälle');
  });
});
