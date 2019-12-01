import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ProductCatalog from "./ProductCatalog/ProductCatalog";
import Home from "./Home";

export default class SidebarNav extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAdmin: this.props.user.admin === '1',
            searchQuery: "",
        };
    }

    render() {
        const { isAdmin } = this.state;
        return (
            <div className="sidebar">
                <nav id="sidebar">
                    <Link className="sidebar-brand" to="/">
                        <img id="nav-logo" src="/store/assets/images/acme-logo-white.svg" alt="acme-logo"/>
                    </Link>
                    <div className="sidebar-links">
                        <Link to="/">Home</Link>
                        <Link to="/products">Products</Link>
                        <Link to="/cart">Cart</Link>
                        {isAdmin ?
                            <div className="admin-controls">
                                <Link to="/products/manage">Manage Products</Link>
                                <Link to="/users/manage">Manage Users</Link>
                            </div>
                         : ''}
                        <Link to="/store/?logout=1" onClick={() => window.location = '/store/?logout=1'}>Logout</Link>
                    </div>
                </nav>
            </div>
        )
    }
}
