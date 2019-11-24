import React, { Component } from 'react';
import { render } from 'react-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormModule from "../FormModule";
import ReactModal from "react-modal";


export default class ManageProducts extends Component {

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
        this.getProducts('/store/api/product/read.php');
    }

    handleOpenModal = () => {
        this.setState({ showModal: true });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    setActiveProduct = (product) => {
        this.setState(prevState => ({
            activeProduct: product,
        }));
        this.handleOpenModal();
    };

    renderProducts = (products) => {
        return <table>
            <thead>
            <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Category</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {products.map((product) =>
                <tr className="product-card" key={product.name}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>${parseInt(product.price).toFixed(2)}</td>
                    <td className="description">{product.description}</td>
                    <td className="category">{product.category_name}</td>
                    <td onClick={() => this.setActiveProduct(product)}>EDIT</td>
                    <td onClick={() => this.deleteProduct(product)}>DELETE</td>
                </tr>
            )}
            </tbody>
        </table>;
    };

    getProducts = (url) => {
        fetch(url, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(products => {
                this.setState(prevState => ({
                    isLoading: false,
                    productList: products,
                }));
            });
    };

    deleteProduct = (product) => {
        let confirmation = confirm('Are you sure you want to delete ' + product.name + '?');
        let productID = {id: product.id};

        if (confirmation) {
            fetch('/store/api/product/delete.php', {
                method: 'POST',
                body: JSON.stringify(productID),
            })
                .then(res => res.json())
                .then(response => {
                    console.info(response.message);
                });
            this.getProducts('/store/api/product/read.php');
        }
    };

    handleSuccess = () => {
        this.getProducts('/store/api/product/read.php');
    };

    render() {
        const { isLoading, productList, activeProduct, showModal } = this.state;
        return (
            <React.Fragment>
                <div className="product-management">
                    <h1>Manage Products</h1>
                    <div className="products">
                        {!isLoading ? (
                            <div className="product-table">
                                {this.renderProducts(productList)}
                            </div>
                        ) : (
                            <p className="loading">Loading Product Catalog.</p>
                        )}
                    </div>
                    <div className="create-product">
                        <FormModule
                            formTitle={"Create Product"}
                            useProductFields={true}
                            useUserInfoFields={false}
                            methodURL={"/store/api/product/create.php"}
                            handleSuccess={this.handleSuccess}
                        />
                    </div>
                    <ReactModal
                        isOpen={showModal}
                        onRequestClose={this.handleCloseModal}
                        shouldCloseOnOverlayClick={true}
                    >
                        <button onClick={this.handleCloseModal}>Close Preview</button>
                        <div className="product-card">
                            <h3>Original Details</h3>
                            <img src="https://via.placeholder.com/300" alt="placeholder"/>
                            <h4>{activeProduct.name}</h4>
                            <h2>${parseInt(activeProduct.price).toFixed(2)}</h2>
                            <p className="description">{activeProduct.description}</p>
                            <p className="category">{activeProduct.category_name}</p>
                        </div>
                        <div className="create-product">
                            <FormModule
                                formTitle={"Edit Product"}
                                useProductFields={true}
                                useUserInfoFields={false}
                                methodURL={"/store/api/product/edit.php"}
                                productID={activeProduct.id}
                                handleSuccess={this.handleSuccess}
                            />
                        </div>
                    </ReactModal>
                </div>
            </React.Fragment>
        )
    }
}
