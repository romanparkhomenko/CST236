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
                    <Link className="sidebar-brand" to="/store/home">
                        <img id="nav-logo" src="/store/assets/images/acme-logo-white.svg" alt="acme-logo"/>
                    </Link>
                    <div className="sidebar-links">
                        <Link to="/store/home">Home</Link>
                        <Link to="/store/products">Products</Link>
                        {isAdmin ?
                            <div className="admin-controls">
                                <Link to="/store/products/manage">Manage Products</Link>
                                <Link to="/store/users/manage">Manage Users</Link>
                            </div>
                         : ''}
                        <Link to="/store/?logout=1" onClick={() => window.location = '/store/?logout=1'}>Logout</Link>
                    </div>
                </nav>
            </div>
        )
    }
}
