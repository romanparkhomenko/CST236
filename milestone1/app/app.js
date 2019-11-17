import React, { Component } from 'react';
import { render } from 'react-dom';

import myApp from 'myApp';
import Products from "./components/Products";
import Search from "./components/Search";
import Pagination from "./components/Pagination";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            searchQuery: "",
        };
    }

    handleSearch = (query) => {
        this.setState(prevState => ({
            searchQuery: query,
        }));
    };

    handlePagination = (pageNumber) => {
        this.setState(prevState => ({
            page: pageNumber,
        }));
    };

    render() {
        const {page, searchQuery} = this.state;
        return (
            <React.Fragment>
                <div className="product-catalog">
                    <h2>Product Catalog</h2>
                    <div className="filter-tools">
                        <Search
                            handleSearch={this.handleSearch}
                        />
                        <Pagination
                            handlePagination={this.handlePagination}
                        />
                    </div>
                    <Products
                        page={page}
                        searchQuery={searchQuery}
                    />
                </div>
            </React.Fragment>
        )
    }
}

render(<App/>, document.getElementById('app'));
