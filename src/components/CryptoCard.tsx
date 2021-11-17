import {
    Box,
    Button,
    Center,
    Divider,
    Flex,
    HStack,
    Image,
    Link,
    Tag,
    TagLabel,
    Text,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import React from 'react';
import { IoLogoUsd } from 'react-icons/io';

import CryptoInfo from '../interfaces/CryptoInfo';

export const CryptoCard: React.FC<CryptoInfo> = ({
    id,
    symbol,
    name,
    image,
    current_price,
    market_cap,
    price_change_percentage_24h,
}) => {
    return (
        <Link href={'/crypto/' + id}>
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
                            {name}
                        </Text>
                    </VStack>
                    <Divider borderColor="gray" />
                    <Flex align="center" p={'16px'} justify="space-between">
                        <HStack>
                            <IoLogoUsd color="teal" size="24px" />
                            <Text fontSize="12px">
                                Price
                                <Text fontWeight="bold">
                                    {current_price} ({price_change_percentage_24h}%)
                                </Text>
                            </Text>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Link>
    );
};

export default CryptoCard;
