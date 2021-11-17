import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

// import Footer from "../components/Footer";
import Header from '../components/Header';

const GeneralLayout: React.FC = (props: any) => {
    return (
        <Box width="100%">
            <Header />
            {props.children}
            {/* <Footer /> */}
        </Box>
    );
};

export default GeneralLayout;
