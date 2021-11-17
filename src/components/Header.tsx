import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Avatar, Box, Flex, HStack, IconButton, Image, Link, useColorModeValue, useDisclosure } from '@chakra-ui/react';

import CBLogo from '../assets/images/cblogo.png';

export default function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box
                bg={'white'}
                px={4}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                boxShadow="md"
                position="sticky"
                top="0px"
                zIndex="90"
                transition="top 0.5s ease 0s"
            >
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Image src={CBLogo} maxH="60px"></Image>
                        <HStack as={'nav'} spacing={8} display={{ base: 'none', md: 'flex' }}>
                            <Link href="/">Home</Link>
                            <Link href="/trending" id="trending">
                                Trending
                            </Link>
                            <Link href="/global">Global Market Information</Link>
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Avatar
                            size={'sm'}
                            src={
                                'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                            }
                        />
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
