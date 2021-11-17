import { SearchIcon } from '@chakra-ui/icons';
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    Center,
    CloseButton,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    SimpleGrid,
    Spinner,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import CryptoCard from '../components/CryptoCard';
import GeneralLayout from '../components/GeneralLayout';
import CryptoInfo from '../interfaces/CryptoInfo';
import CoinGeckoClient from '../utility/CoinGeckoClient';

interface Filters {
    per_page: number;
    page: number;
    vs_currency: string;
    category?: string;
    ids?: string;
    order?: string;
}

interface CoinList {
    id: string;
    name: string;
    symbol: string;
}

interface Category {
    category_id: string;
    name: string;
}

export const LandingPage: React.FC = () => {
    const [coinList, setCoinList] = useState<CoinList[]>([]);
    const [data, setData] = useState<CryptoInfo[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [hasError, sethasError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentPage, setcurrentPage] = useState<number>(1);
    const [perPage, setperPage] = useState<number>(12);
    const [pageCount, setpageCount] = useState<number>(0);
    const [dataParams, setDataParams] = useState<Filters>({
        per_page: perPage,
        page: currentPage,
        vs_currency: 'aud',
    });
    //Search Params
    const [search, setSearch] = useState<string>();
    const [searchIds, setSearchIds] = useState<string | null>(null);
    const [category, setCategory] = useState<string>();
    const [sortBy, setSortBy] = useState<string>();

    useEffect(() => {
        fetchData();
    }, [currentPage, searchIds, category, sortBy, perPage]);

    const fetchData = async () => {
        setIsLoading(true); //show loading state
        try {
            await CoinGeckoClient.get('ping'); //Check CoinGecko API Status

            //Load all coins - helps with overall count & filter by keyword
            if (coinList.length == 0) {
                const totalCoins: CoinList[] = await (await CoinGeckoClient.get('coins/list')).data;
                setpageCount(Math.ceil(totalCoins.length / perPage));
                setCoinList(totalCoins);
            } else {
                setpageCount(Math.ceil(coinList.length / perPage));
            }

            //Load all categories
            if (categories.length == 0) {
                const fetchCat: Category[] = await (await CoinGeckoClient.get('coins/categories/list')).data;
                setCategories(fetchCat);
            }

            //setup filters

            //Keyword Search Filter Check
            if (searchIds && searchIds.length > 0) {
                console.log('Search IDs' + searchIds);
                const tmpParams = dataParams;
                tmpParams['ids'] = searchIds;
                setDataParams(tmpParams);
                setpageCount(1);
            } else {
                setDataParams({
                    per_page: perPage,
                    page: currentPage,
                    vs_currency: 'aud',
                });
            }

            //category filter
            if (category && category != 'none') {
                const tmpParams = dataParams;
                tmpParams['category'] = category;

                setDataParams(tmpParams);
            } else {
                const tmpParams = dataParams;
                delete tmpParams['category'];
                setDataParams(tmpParams);
            }

            //sorting filter
            if (sortBy && sortBy != 'none') {
                const tmpParams = dataParams;
                tmpParams['order'] = sortBy;

                setDataParams(tmpParams);
            } else {
                const tmpParams = dataParams;
                delete tmpParams['order'];
                setDataParams(tmpParams);
            }

            //Page Number Filter
            if (currentPage != dataParams.page) {
                const tmpParams = dataParams;
                tmpParams['page'] = currentPage;

                setDataParams(tmpParams);
            }

            //perPage Filter
            if (perPage != dataParams.per_page) {
                const tmpParams = dataParams;
                tmpParams['per_page'] = perPage;

                setDataParams(tmpParams);
            }

            const fetchData = await CoinGeckoClient.get('coins/markets', {
                params: dataParams,
            });
            setData(fetchData.data);
            setIsLoading(false);
        } catch (error) {
            sethasError('An Error Occurred.');
        }
        setIsLoading(false);
    };

    const handlePageClick = (e: any) => {
        const selectedPage: number = e.selected + 1;
        setcurrentPage(selectedPage);
    };

    const searchCrypto = (keyword: string) => {
        setSearch(keyword);
        if (keyword.length > 0) {
            const filterIds =
                keyword && coinList
                    ? coinList.filter(
                          (e: CoinList) =>
                              e.name.toLowerCase().includes(keyword.toLowerCase()) ||
                              e.symbol.toLowerCase().includes(keyword.toLowerCase()),
                      )
                    : coinList;
            if (filterIds.length > 0) {
                let tmpIds = '';
                const resultCount = filterIds.length > 100 ? 100 : filterIds.length;
                for (let i = 0; i < resultCount; i++) {
                    if (tmpIds.length > 0) tmpIds += ',' + filterIds[i].id;
                    else tmpIds += filterIds[i].id;
                }
                setSearchIds(tmpIds);
            } else {
                setSearchIds(null);
            }
        }
    };

    //Reset Filters
    const resetFilters = () => {
        setSearch('');
        setSearchIds(null);
        setCategory('none');
        setSortBy('none');
        setperPage(12);
        setDataParams({
            per_page: perPage,
            page: currentPage,
            vs_currency: 'aud',
        });
        fetchData();
    };

    return (
        <GeneralLayout>
            {hasError ? (
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle mr={2}>Your browser is outdated!</AlertTitle>
                    <AlertDescription>Your Chakra experience may be degraded.</AlertDescription>
                    <CloseButton position="absolute" right="8px" top="8px" />
                </Alert>
            ) : (
                <VStack bg={useColorModeValue('gray.100', 'gray.900')}>
                    <Heading>All Cryptos</Heading>
                    Find all the crypto's here
                    <HStack spacing={10}>
                        <HStack spacing={10}>
                            <InputGroup size="md">
                                <Input
                                    pr="4.5rem"
                                    placeholder="Search Crypto"
                                    value={search}
                                    onChange={(e) => searchCrypto(e.target.value)}
                                />
                                <InputRightElement color="gray.400" width="4.5rem">
                                    <SearchIcon />
                                </InputRightElement>
                            </InputGroup>
                            <Select onChange={(e) => setCategory(e.target.value)}>
                                <option value="none">Select Category</option>
                                {categories.map(function (cat) {
                                    if (cat.category_id.toLowerCase() === category?.toLowerCase())
                                        return (
                                            <option value={cat.category_id} selected>
                                                {cat.name}
                                            </option>
                                        );
                                    else return <option value={cat.category_id}>{cat.name}</option>;
                                })}
                            </Select>
                            <Select onChange={(e) => setSortBy(e.target.value)}>
                                <option value="none">Sort By</option>
                                <option value="market_cap_desc">Highest Market Cap</option>
                                <option value="market_cap_asc">Lowest Market Cap</option>
                                <option value="volume_desc">High Volume</option>
                                <option value="volume_asc">Low Volume</option>
                                <option value="gecko_desc">High CoinGecko Score</option>
                                <option value="gecko_asc">Lowest CoinGecko Score</option>
                            </Select>
                            <Select
                                placeholder="Per Page"
                                onChange={(e) => setperPage(Number.parseInt(e.target.value))}
                            >
                                <option value="12">12</option>
                                <option value="24">24</option>
                                <option value="48">48</option>
                                <option value="120">120</option>
                            </Select>
                            <Button colorScheme="teal" variant="solid" p="20px" onClick={resetFilters}>
                                Reset
                            </Button>
                        </HStack>
                    </HStack>
                    {isLoading ? (
                        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
                    ) : (
                        <SimpleGrid columns={{ sm: 2, md: 6 }} spacing={10} mt="20px">
                            {data &&
                                data.map((e: CryptoInfo, i) => (
                                    <Box w="180px" maxH="300px" my="16px" key={i}>
                                        <CryptoCard {...e} />
                                    </Box>
                                ))}
                        </SimpleGrid>
                    )}
                    <Center mb="20px">
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
                            activeClassName={'active'}
                        />
                    </Center>
                </VStack>
            )}
        </GeneralLayout>
    );
};

export default LandingPage;
