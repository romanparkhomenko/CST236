import React, { Component } from 'react';
import { render } from 'react-dom';
import { Switch, Route } from "react-router-dom";
import ProductCatalog from "./ProductCatalog/ProductCatalog";
import Home from "./Home";
import ManageProducts from "./ManageProducts/ManageProducts";
import ManageUsers from "./ManageUsers/ManageUsers";

export default class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            searchQuery: "",
        };
    }

    render() {
        return (
            <main className="dashboard">
                <Switch>
                    <Route exact path='/store/home' render={(routeProps) => (
                        <Home {...routeProps}
                            user={this.props.user}
                        />
                    )}/>
                    <Route exact path='/store/products' render={(routeProps) => (
                        <ProductCatalog {...routeProps} />
                    )}/>
                    <Route exact path='/store/products/manage' render={(routeProps) => (
                        <ManageProducts {...routeProps} />
                    )}/>
                    <Route exact path='/store/users/manage' render={(routeProps) => (
                        <ManageUsers {...routeProps} />
                    )}/>
                </Switch>
            </main>
        )
    }
}
