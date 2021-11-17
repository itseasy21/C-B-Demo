import { Box, Heading, SimpleGrid, Spinner, useColorModeValue, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import CryptoCard from '../components/CryptoCard';
import GeneralLayout from '../components/GeneralLayout';
import CryptoInfo from '../interfaces/CryptoInfo';
import CoinGeckoClient from '../utility/CoinGeckoClient';

export const Trending: React.FC = () => {
    const [data, setData] = useState<CryptoInfo[]>([]);
    const [hasError, sethasError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true); //show loading state
        try {
            await CoinGeckoClient.get('ping'); //Check CoinGecko API Status
            //Fetch Trending Coins
            const fetchData = await CoinGeckoClient.get('search/trending');
            const coinsData = fetchData.data.coins;
            //Add coin Ids and fetch data
            if (coinsData.length > 0) {
                let tmpIds = '';
                for (let i = 0; i < coinsData.length; i++) {
                    if (tmpIds.length > 0) tmpIds += ',' + coinsData[i].item.id;
                    else tmpIds += coinsData[i].item.id;
                }

                const fetchCoins = await CoinGeckoClient.get('coins/markets', {
                    params: {
                        vs_currency: 'aud',
                        ids: tmpIds,
                    },
                });
                setData(fetchCoins.data);
            }
            setIsLoading(false);
        } catch (error) {
            sethasError('An Error Occurred.');
            window.alert(hasError);
        }
        setIsLoading(false);
    };

    return (
        <GeneralLayout>
            <VStack bg={useColorModeValue('gray.100', 'gray.900')}>
                <Heading>Trending Cryptos</Heading>
                Find all the trending crypto's here
                {isLoading ? (
                    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
                ) : (
                    <SimpleGrid columns={{ sm: 2, md: 4 }} spacing={10} mt="20px">
                        {data &&
                            data.map((e: CryptoInfo, i) => (
                                <Box w="180px" maxH="300px" my="16px" key={i}>
                                    <CryptoCard {...e} />
                                </Box>
                            ))}
                    </SimpleGrid>
                )}
            </VStack>
        </GeneralLayout>
    );
};

export default Trending;
