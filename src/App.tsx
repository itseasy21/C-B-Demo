import './App.css';

import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './pages/LandingPage';

const AppRoutes: React.FC = () => {
    return (
        <Switch>
            <Route path="/">
                <Route path="/" component={LandingPage} />
                {/* <Route path="/trending" component={Trending} /> */}
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
