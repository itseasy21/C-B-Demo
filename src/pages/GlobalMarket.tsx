import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/alert';
import { CloseButton, Heading, HStack, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import GeneralLayout from '../components/GeneralLayout';
import CoinGeckoClient from '../utility/CoinGeckoClient';

interface GlobalData {
    active_cryptocurrencies: number;
    ended_icos: number;
    market_cap_change_percentage_24h_usd: number;
    market_cap_percentage: { [currencyName: string]: number };
    markets: number;
    ongoing_icos: number;
    total_market_cap: { currencyName: string; currencyVal: number }[];
    total_volume: { currencyName: string; currencyVal: number }[];
    upcoming_icos: number;
    updated_at: number;
}

export const LandingPage: React.FC = () => {
    const [data, setData] = useState<GlobalData>();
    const [hasError, sethasError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true); //show loading state
        try {
            await CoinGeckoClient.get('ping'); //Check CoinGecko API Status

            //Fetch & Set Global Data
            const globalData = await CoinGeckoClient.get('global');
            setData(globalData.data.data);
        } catch (error) {
            sethasError('An Error Occurred.');
        }
        setIsLoading(false);
    };

    return (
        <GeneralLayout>
            {hasError ? (
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle mr={2}>An Error Occurred!</AlertTitle>
                    <AlertDescription>Unable to fetch data, please refresh.</AlertDescription>
                    <CloseButton position="absolute" right="8px" top="8px" />
                </Alert>
            ) : (
                <VStack bg="gray.100" spacing={10} pt={10}>
                    <Heading>Global Market Data</Heading>

                    {!isLoading && data ? (
                        <>
                            <HStack spacing={5}>
                                <VStack p="20px" bg="white" borderRadius="40px" border="1px" borderColor="gray.200">
                                    <Text fontWeight="bold">Active CryptoCurrencies</Text>
                                    <Text>{data.active_cryptocurrencies}</Text>
                                </VStack>
                                <VStack p="20px" bg="white" borderRadius="40px" border="1px" borderColor="gray.200">
                                    <Text fontWeight="bold">Upcoming ICOs</Text>
                                    <Text>{data.upcoming_icos}</Text>
                                </VStack>
                                <VStack p="20px" bg="white" borderRadius="40px" border="1px" borderColor="gray.200">
                                    <Text fontWeight="bold">Active ICOs</Text>
                                    <Text>{data.ongoing_icos}</Text>
                                </VStack>
                                <VStack p="20px" bg="white" borderRadius="40px" border="1px" borderColor="gray.200">
                                    <Text fontWeight="bold">Ended ICOs</Text>
                                    <Text>{data.ended_icos}</Text>
                                </VStack>
                                <VStack p="20px" bg="white" borderRadius="40px" border="1px" borderColor="gray.200">
                                    <Text fontWeight="bold">Market Cap Change</Text>
                                    <Text>{data.market_cap_change_percentage_24h_usd}%</Text>
                                </VStack>
                            </HStack>
                            <HStack spacing={10}>
                                {data.market_cap_percentage ? (
                                    <VStack p="20px" bg="white" borderRadius="40px" border="1px" borderColor="gray.200">
                                        <Heading as="h2">Market Cap Percentage</Heading>
                                        <Table variant="simple">
                                            <Thead>
                                                <Tr>
                                                    <Th>Cryptocurrency</Th>
                                                    <Th isNumeric>Percentage</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {Object.entries(data.market_cap_percentage).map((e: any, i) => (
                                                    <Tr key={i}>
                                                        <Td>{e[0]}</Td>
                                                        <Td isNumeric>{e[1]}</Td>
                                                    </Tr>
                                                ))}
                                            </Tbody>
                                        </Table>
                                    </VStack>
                                ) : undefined}
                                {data.total_market_cap ? (
                                    <VStack p="20px" bg="white" borderRadius="40px" border="1px" borderColor="gray.200">
                                        <Heading as="h2">Total Market Cap</Heading>
                                        <Table variant="simple">
                                            <Thead>
                                                <Tr>
                                                    <Th>Cryptocurrency</Th>
                                                    <Th isNumeric>Volume</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {Object.entries(data.total_market_cap)
                                                    .slice(0, 10)
                                                    .map((e: any, i) => (
                                                        <Tr key={i}>
                                                            <Td>{e[0]}</Td>
                                                            <Td isNumeric>{e[1]}</Td>
                                                        </Tr>
                                                    ))}
                                            </Tbody>
                                        </Table>
                                    </VStack>
                                ) : undefined}
                                {data.total_volume ? (
                                    <VStack p="20px" bg="white" borderRadius="40px" border="1px" borderColor="gray.200">
                                        <Heading as="h2">Total Volume</Heading>
                                        <Table variant="simple">
                                            <Thead>
                                                <Tr>
                                                    <Th>Cryptocurrency</Th>
                                                    <Th isNumeric>Price</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {Object.entries(data.total_volume)
                                                    .slice(0, 10)
                                                    .map((e: any, i) => (
                                                        <Tr key={i}>
                                                            <Td>{e[0]}</Td>
                                                            <Td isNumeric>{e[1]}</Td>
                                                        </Tr>
                                                    ))}
                                            </Tbody>
                                        </Table>
                                    </VStack>
                                ) : undefined}
                            </HStack>
                        </>
                    ) : (
                        <Spinner
                            id="loading-spinner"
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                        />
                    )}
                </VStack>
            )}
        </GeneralLayout>
    );
};

export default LandingPage;
