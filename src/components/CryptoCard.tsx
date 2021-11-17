import {
    Box,
    Button,
    Center,
    Divider,
    Flex,
    HStack,
    Image,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { IoLogoUsd } from 'react-icons/io';

import CryptoInfo from '../interfaces/CryptoInfo';
import CoinGeckoClient from '../utility/CoinGeckoClient';
import HistoryChart from './HistoryChart';

export const CryptoCard: React.FC<CryptoInfo> = ({
    id,
    symbol,
    name,
    image,
    current_price,
    market_cap,
    market_cap_rank,
    total_volume,
    high_24h,
    low_24h,
    price_change_24h,
    price_change_percentage_24h,
    market_cap_change_24h,
    market_cap_change_percentage_24h,
    circulating_supply,
    total_supply,
    max_supply,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [chartData, setChartData] = useState<any>();
    const formatData = (data: any[]) => {
        return data.map((el: number[]) => {
            return {
                t: el[0],
                y: el[1].toFixed(2),
            };
        });
    };

    const fetchData = async () => {
        const [day, week, year, detail] = await Promise.all([
            CoinGeckoClient.get(`/coins/${id}/market_chart/`, {
                params: {
                    vs_currency: 'aud',
                    days: '1',
                },
            }),
            CoinGeckoClient.get(`/coins/${id}/market_chart/`, {
                params: {
                    vs_currency: 'aud',
                    days: '7',
                },
            }),
            CoinGeckoClient.get(`/coins/${id}/market_chart/`, {
                params: {
                    vs_currency: 'aud',
                    days: '365',
                },
            }),
            CoinGeckoClient.get('/coins/markets/', {
                params: {
                    vs_currency: 'aud',
                    ids: id,
                },
            }),
        ]);

        setChartData({
            day: formatData(day.data.prices),
            week: formatData(week.data.prices),
            year: formatData(year.data.prices),
            detail: detail.data[0],
        });
        console.log(chartData);
        onOpen();
    };

    return (
        <>
            <Link onClick={fetchData}>
                <Flex
                    w="100%"
                    h="100%"
                    bg="white"
                    borderRadius="40px"
                    border="1px"
                    borderColor="gray.200"
                    _hover={{
                        boxShadow: '0 10px 20px -3px rgba(59, 168, 139, 0.3),0 4px 6px -2px rgba(59, 168, 139, 0.05)',
                    }}
                    direction="column"
                >
                    <Center>
                        <Image
                            align="center"
                            pt="10px"
                            h="150px"
                            w="150px"
                            borderRadius="40px"
                            src={image}
                            objectFit="cover"
                        />
                    </Center>
                    <Box px="16px">
                        <VStack>
                            <Text fontSize="md" fontWeight="semibold" align="center">
                                {name} ({symbol})
                            </Text>
                        </VStack>
                        <Divider borderColor="gray" />
                        <Flex align="center" p={'16px'} justify="space-between">
                            <VStack>
                                <HStack>
                                    <IoLogoUsd color="teal" size="24px" />
                                    <Text fontSize="12px">
                                        Price
                                        <Text fontWeight="bold">
                                            {current_price ? current_price : 'N/A'} (
                                            {price_change_percentage_24h ? price_change_percentage_24h : 'N/A'}%)
                                        </Text>
                                    </Text>
                                </HStack>
                            </VStack>
                        </Flex>
                    </Box>
                </Flex>
            </Link>
            <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {name} ({symbol})
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {chartData ? <HistoryChart data={chartData} /> : undefined}
                        <SimpleGrid columns={2}>
                            <Text>Current Price:</Text>
                            <Text>
                                ${current_price ? current_price : 'N/A'} ({price_change_percentage_24h}%)
                            </Text>
                            <Text>Market Cap:</Text>
                            <Text>
                                ${market_cap ? market_cap.toLocaleString() : 'N/A'} (Rank: #{market_cap_rank})
                            </Text>
                            <Text>Total Volume:</Text>
                            <Text>${total_volume ? total_volume.toLocaleString() : 'N/A'}</Text>
                            <Text>24 Hour High:</Text>
                            <Text>${high_24h}</Text>
                            <Text>24 Hour Low:</Text>
                            <Text>${low_24h}</Text>
                            <Text>Price Change 24 Hour:</Text>
                            <Text>
                                {price_change_24h}$ ({price_change_percentage_24h}%)
                            </Text>
                            <Text>Market Cap Change 24 Hour:</Text>
                            <Text>
                                {market_cap_change_24h}$ ({market_cap_change_percentage_24h}%)
                            </Text>
                            <Text>Circulating Supply :</Text>
                            <Text>{circulating_supply ? circulating_supply.toLocaleString() : 'N/A'}</Text>
                            <Text>Total Supply:</Text>
                            <Text>{total_supply ? total_supply.toLocaleString() : 'N/A'}</Text>
                            <Text>Max Supply:</Text>
                            <Text>{max_supply ? max_supply.toLocaleString() : 'N/A'}</Text>
                        </SimpleGrid>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Link href={'https://www.coingecko.com/en/coins/' + id} target="_blank">
                            <Button rightIcon={<BsBoxArrowUpRight />} colorScheme="teal" variant="outline">
                                View on CoinGecko
                            </Button>
                        </Link>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CryptoCard;
