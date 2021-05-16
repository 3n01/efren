import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Images from './Images';
import News from './News';

import Nav from './Nav';
import '../public/css/style.css';

function App() {
    return (
        <Router>
            <Nav/>
            <Switch>
            <div className="">
                <Route path="/" exact component={Images} />
                <Route path="/noticias"  component={News} />
            </div>
            </Switch>
        </Router>
    );
}

export default App;