import { Box, Button, Center, HStack } from '@chakra-ui/react';
import Chartjs from 'chart.js';
import React, { useEffect, useRef, useState } from 'react';

import CryptoInfo from '../interfaces/CryptoInfo';

interface ChartData {
    data: {
        day: number[];
        week: number[];
        year: number[];
        detail: CryptoInfo;
    };
}

const HistoryChart: React.FC<ChartData> = ({ data }) => {
    const chartRef = useRef<any>(null);
    const { day, week, year, detail } = data;
    const [timeFormat, setTimeFormat] = useState('24h');

    const determineTimeFormat = () => {
        switch (timeFormat) {
            case '24h':
                return day;
            case '7d':
                return week;
            case '1y':
                return year;
            default:
                return day;
        }
    };

    useEffect(() => {
        if (chartRef && chartRef.current && detail) {
            new Chartjs(chartRef.current, {
                type: 'line',
                data: {
                    datasets: [
                        {
                            label: `${detail.name} price`,
                            data: determineTimeFormat(),
                            backgroundColor: 'rgba(174, 305, 194, 0.5)',
                            borderColor: 'rgba(174, 305, 194, 0.4',
                            pointRadius: 0,
                        },
                    ],
                },
                options: {
                    title: {
                        text: ` (${timeFormat})`,
                    },
                    responsive: true,
                    animation: {
                        duration: 2000,
                    },
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [
                            {
                                type: 'time',
                                distribution: 'linear',
                            },
                        ],
                    },
                },
            });
        }
    });
    return (
        <Box
            as="div"
            bg="white"
            borderRadius="40px"
            border="1px"
            borderColor="gray.200"
            rounded={'2px'}
            p="3"
            mt="2"
            mb="4"
        >
            <Box>
                <canvas ref={chartRef} id="myChart" width={250} height={250}></canvas>
            </Box>

            <Center mt="1">
                <HStack spacing={4}>
                    <Button variant="outline" colorScheme="teal" onClick={() => setTimeFormat('24h')}>
                        24h
                    </Button>
                    <Button variant="outline" colorScheme="teal" onClick={() => setTimeFormat('7d')}>
                        7d
                    </Button>
                    <Button variant="outline" colorScheme="teal" onClick={() => setTimeFormat('1y')}>
                        1y
                    </Button>
                </HStack>
            </Center>
        </Box>
    );
};

export default HistoryChart;
