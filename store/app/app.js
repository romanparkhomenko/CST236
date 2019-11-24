import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./modules/Dashboard";
import SidebarNav from "./modules/SidebarNav";
import myApp from 'myApp';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: myApp,
        };
    }

    render() {
        const {user} = this.state;
        console.info(user);
        return (
            <React.Fragment>
                <SidebarNav
                    user={user}
                />
                <Dashboard
                    user={user}
                />
            </React.Fragment>
        )
    }
}

render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById('app'));
