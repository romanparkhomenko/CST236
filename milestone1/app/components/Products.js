import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            productList: "",
            activeProduct: {
                name: "",
                price: "",
                description: "",
                category_name: "",
            },
            showModal: false,
        }
    }

    componentDidMount() {
        this.getProducts('/milestone1/api/product/read_paging.php?page=1');
    }

    componentDidUpdate(prevProps) {
        if (this.props.page !== prevProps.page) {
            let url = "/milestone1/api/product/read_paging.php?page=" + this.props.page;
            this.getProducts(url);
        } else if (this.props.searchQuery !== prevProps.searchQuery) {
            let url = "/milestone1/api/product/search.php?s=" + this.props.searchQuery;
            this.getProducts(url);
        }
    }

    handleOpenModal = () => {
        this.setState({ showModal: true });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    getProducts = (url) => {
        fetch(url, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(products => {
                this.setState(prevState => ({
                    isLoading: false,
                    productList: products.records,
                }));
            });
    };

    setActiveProduct = (product) => {
        this.setState(prevState => ({
            activeProduct: product,
        }));
        this.handleOpenModal();
    };

    renderProducts = (products) => {
        console.info(products);
        return products.map((product) =>
            <div className="product-card" key={product.name} onClick={() => this.setActiveProduct(product)}>
                <img src="https://via.placeholder.com/150" alt="placeholder"/>
                <h4>{product.name}</h4>
                <h2>${parseInt(product.price).toFixed(2)}</h2>
                <p className="description">{product.description}</p>
                <p className="category">{product.category_name}</p>
            </div>
        );
    };

    render() {
        const { isLoading, productList, activeProduct, showModal } = this.state;
        return (
            <React.Fragment>
                <div className="products">
                    {!isLoading ? (
                        <div className="product-list">
                            {this.renderProducts(productList)}
                        </div>
                    ) : (
                        <p className="loading">Loading Product Catalog.</p>
                    )}
                </div>
                <ReactModal
                    isOpen={showModal}
                    onRequestClose={this.handleCloseModal}
                    shouldCloseOnOverlayClick={true}
                >
                    <button onClick={this.handleCloseModal}>Close Preview</button>
                    <div className="product-card">
                        <img src="https://via.placeholder.com/300" alt="placeholder"/>
                        <h4>{activeProduct.name}</h4>
                        <h2>${parseInt(activeProduct.price).toFixed(2)}</h2>
                        <p className="description">{activeProduct.description}</p>
                        <p className="category">{activeProduct.category_name}</p>
                    </div>
                </ReactModal>
            </React.Fragment>
        )
    }
}
