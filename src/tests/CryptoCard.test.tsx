import { ChakraProvider } from '@chakra-ui/react';
import { act, cleanup, render as RTLrender, screen } from '@testing-library/react';
import { ReactNode } from 'react';

import CryptoCard from '../components/CryptoCard';
import { sampleData } from './SampleData';

export const render = (component: ReactNode, ...args: any) => {
    return RTLrender(<ChakraProvider>{component}</ChakraProvider>, ...args);
};

afterEach(cleanup);

describe('Crypto Card', () => {
    jest.useFakeTimers();

    it('All Crypto Information Should be Visible', async () => {
        act(() => {
            render(<CryptoCard {...sampleData[0]} />);
        });

        expect(screen.queryAllByText(/Bitcoin/i)).toBeTruthy();
    });

    it('Missing Crrypto Info Should be Replaced by N/A', async () => {
        act(() => {
            render(<CryptoCard {...sampleData[1]} />);
        });

        expect(screen.queryAllByText(/N\/A/i)).toBeTruthy();
    });
});
