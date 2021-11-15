import  React, { useMemo, useState }  from 'react';
import logo from './logo.svg';
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import LandingPage from './pages/LandingPage';

const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path="/">
        <Route path="/" component={LandingPage} />
        {/* <Route path="/account" component={Profile} /> */}
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
