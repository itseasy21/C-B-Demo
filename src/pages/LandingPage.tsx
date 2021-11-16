import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

import GeneralLayout from '../components/GeneralLayout';
import CryptoInfo from '../interfaces/CryptoInfo';
import CoinGeckoClient from '../utility/CoinGeckoClient';

export const LandingPage: React.FC = () => {
    const [data, setData] = useState<CryptoInfo[]>([]);
    const [hasError, sethasError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentPage, setcurrentPage] = useState<number>(1);
    const [perPage, setperPage] = useState<number>(10);
    const [pageCount, setpageCount] = useState<number>(0);

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            await CoinGeckoClient.get('ping');
            if (pageCount == 0) {
                const totalCoins: Array<string> = await (await CoinGeckoClient.get('coins/list')).data;
                console.log('Total Pages: ' + Math.ceil(totalCoins.length / 10));
                setpageCount(Math.ceil(totalCoins.length / perPage));
            }
            const fetchData = await CoinGeckoClient.get('coins/markets', {
                params: {
                    per_page: 10,
                    page: currentPage,
                    vs_currency: 'aud',
                },
            });
            setData(fetchData.data);
            setIsLoading(false);
        } catch (error) {
            sethasError('CoinGecko API is Not Available at the moment!.');
            window.alert(hasError);
        }
        setIsLoading(false);
    };

    const handlePageClick = (e: any) => {
        const selectedPage: number = e.selected + 1;
        console.log(selectedPage);
        setcurrentPage(selectedPage);
    };

    return (
        <GeneralLayout>
            This is the front page
            <ReactPaginate
                previousLabel={'prev'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                // subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            />
        </GeneralLayout>
    );
};

export default LandingPage;
