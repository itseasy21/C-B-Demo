import { Box } from '@chakra-ui/react';
import React from 'react';

import Header from '../components/Header';

const GeneralLayout: React.FC = (props: any) => {
    return (
        <Box width="100%">
            <Header />
            {props.children}
        </Box>
    );
};

export default GeneralLayout;
