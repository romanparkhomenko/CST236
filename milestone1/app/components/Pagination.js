import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            numberOfPages: 0,
        }
    }

    componentDidMount() {
        this.getPageNumbers('/milestone1/api/product/read_paging.php?page=1');
    }

    getPageNumbers = (url) => {
        fetch(url, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(products => {
                this.setState(prevState => ({
                    isLoading: false,
                    numberOfPages: products.paging.pages.length,
                }));
            });
    };

    renderPageNumbers = (numberOfPages) => {
        const pages = [];
        for (let i = 0; i < numberOfPages; i++) {
            pages.push(
                <button
                    className={"page-button"}
                    key={"page" + i}
                    onClick={() => this.props.handlePagination(i + 1)}
                >
                    {i + 1}
                </button>
            );
        }
        return (
            <div>
                {pages}
            </div>
        )
    };

    render() {
        const { isLoading, numberOfPages } = this.state;
        return (
            <React.Fragment>
                <div className="pagination">
                    {!isLoading ? (
                        <div className="page-buttons">
                            {this.renderPageNumbers(numberOfPages)}
                        </div>
                    ) : (
                        <p className="loading">Loading..</p>
                    )}
                </div>
            </React.Fragment>
        )
    }
}
