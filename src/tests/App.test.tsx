import { ChakraProvider, useQuery } from '@chakra-ui/react';
import { act, render as RTLrender, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import axios, { AxiosStatic } from 'axios';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import App from '../App';
import CryptoCard from '../components/CryptoCard';
import LandingPage from '../pages/LandingPage';
import CoinGeckoClient from '../utility/CoinGeckoClient';
import { sampleData } from './SampleData';

export const render = (component: ReactNode, ...args: any) => {
    return RTLrender(<ChakraProvider>{component}</ChakraProvider>, ...args);
};

configure({ adapter: new Adapter() });

describe('CB Demo', () => {
    jest.useFakeTimers();

    it('Provide a loading state whilst data is being pulled', async () => {
        act(() => {
            render(<App />);
        });
        const text = screen.queryByTestId('loading-spinner');
        await waitFor(() => {
            expect(text).toBeDefined();
        });
    });

    // it('Show Data when Loading State is False', async () => {
    //     let landingPage: ShallowWrapper | null = null;
    //     act(() => {
    //         landingPage = shallow(<LandingPage />);
    //     });
    //     act(() => {
    //         if (landingPage) {
    //             const component = landingPage.dive();
    //             component.setState({ data: sampleData });
    //             component.setState({ isLoading: false });
    //             console.log(component);
    //             expect(component.find(CryptoCard).length).toBe(2);
    //         }
    //     });
    // });

    it('Be able to filter the list by Cryptocurrency', async () => {
        act(() => {
            render(<App />);
        });

        const sortingSelect = document.getElementById('filters');
        await waitFor(() => {
            expect(sortingSelect).toBeDefined();
        });
    });

    it('Tabs - users click makes page switches', async () => {
        act(() => {
            render(<App />);
        });

        // Before switch
        expect(screen.queryByText(/Trending Cryptos/i)).not.toBeInTheDocument();

        act(() => {
            userEvent.click(screen.getByText(/Trending/i));
        });

        // After switch
        expect(screen.queryAllByText(/Trending Cryptos/i)).toBeTruthy();
    });
});
