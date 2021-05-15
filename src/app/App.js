import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Images from './Images';
import Contactos from './Contactos';

import Nav from './Nav';
import '../public/css/style.css';

function App() {
    return (
        <Router>
            <Nav/>
            <Switch>
            <div className="container">
                <Route path="/" exact component={Images} />
                <Route path="/contactos"  component={Contactos} />
            </div>
            </Switch>
        </Router>
    );
}

export default App;