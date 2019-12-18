import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, HashRouter } from "react-router-dom";
import Dashboard from "./modules/Dashboard";
import SidebarNav from "./modules/SidebarNav";
import myApp from 'myApp';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: myApp,
            cartActive: false,
        };
    }

    // Change Cart button appearance if cart is not empty
    handleCartActive = (cartState) => {
        this.setState(prevState => ({
            cartActive: cartState,
        }));
    };

    render() {
        const {user} = this.state;
        return (
            <React.Fragment>
                <SidebarNav
                    user={user}
                    cartActive={this.state.cartActive}
                />
                <Dashboard
                    user={user}
                    handleCartActive={this.handleCartActive}
                />
            </React.Fragment>
        )
    }
}

render((
    <HashRouter>
        <App/>
    </HashRouter>
), document.getElementById('app'));
