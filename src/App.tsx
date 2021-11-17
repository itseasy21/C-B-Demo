import './App.css';

import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import GlobalMarket from './pages/GlobalMarket';
import LandingPage from './pages/LandingPage';
import Trending from './pages/Trending';

const AppRoutes: React.FC = () => {
    return (
        <Switch>
            <Route path="/">
                <Route exact path="/" component={LandingPage} />
                <Route path="/trending" component={Trending} />
                <Route path="/global" component={GlobalMarket} />
            </Route>
        </Switch>
    );
};

const App: React.FC = () => {
    return (
        <ChakraProvider>
            <Router>
                <AppRoutes />
            </Router>
        </ChakraProvider>
    );
};

export default App;
