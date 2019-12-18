import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactModal from "react-modal";
import FormModule from "./FormModule";


export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            purchasesIsLoading: true,
            productsIsLoading: true,
            previousPurchases: [],
            productList: [],
            activeProduct: {
                name: "",
                price: "",
                description: "",
                category_name: "",
            },
        };
    }

    componentDidMount() {
        this.getPreviousPurchases();
        this.getProducts('/store/api/product/read.php');
    }

    getPreviousPurchases = () => {
        let success = false;
        fetch('/store/api/orders/readUserPurchases.php?id=' + this.props.user.id, {
            method: 'GET',
        })
            .then(res => {
                if (res.status === 200) {
                    success = true;
                }
                return res.json().then(orders => {
                    if (success && orders.length >= 1) {
                        console.info(orders);
                        this.setState(prevState => ({
                            previousPurchases: orders,
                            purchasesIsLoading: false,
                        }));
                    } else {
                        console.info('No purchases found for user');
                    }

                });
            });
    };

    setActiveProduct = (product) => {
        this.setState(prevState => ({
            activeProduct: product,
        }));
        this.handleOpenModal();
    };

    handleOpenModal = () => {
        this.setState({ showModal: true });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    renderProducts = (previousPurchases) => {
        const {productList} = this.state;
        return <div className="product-list">
            {previousPurchases.map(productItem => {
                const productIndex = productList.findIndex(product => product.id === productItem.products_id);
                const product = productList[productIndex];
                return <div className="product-card" key={product.name}>
                    <img src={product.image_name !== '' ? `/store/images/${product.image_name}` : "https://via.placeholder.com/150"} alt="placeholder" onClick={() => this.setActiveProduct(product)}/>
                    <h4 onClick={() => this.setActiveProduct(product)}>{product.name}</h4>
                    <h2 onClick={() => this.setActiveProduct(product)}>You purchased {productItem.total_quantity} of this item.</h2>
                    <p className="description" onClick={() => this.setActiveProduct(product)}>{product.description}</p>
                    <p className="category">{product.category_name}</p>
                    <button className="add-to-cart" onClick={() => this.setActiveProduct(product)}>Review</button>
                </div>
            })}
        </div>
    };

    handleSuccess = () => {
      console.info('Successfully left review!');
    };

    // Get list of products to send to other components.
    getProducts = (url) => {
        fetch(url, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(products => {
                this.setState(prevState => ({
                    productList: products,
                    productsIsLoading: false,
                }));
            });
    };

    render() {
        const {purchasesIsLoading, productsIsLoading, previousPurchases, productList, showModal, activeProduct} = this.state;
        return (
            <React.Fragment>
                <div className="home">
                    <h1>Welcome {this.props.user.firstname}</h1>
                    {!purchasesIsLoading && !productsIsLoading && previousPurchases.length > 0 && productList.length > 0 ?
                        <div className="products">
                            <h4 className="review-message">Here are some products you've recently purchased. Please take a moment to write a review!</h4>
                            {this.renderProducts(previousPurchases)}
                        </div>
                        :
                        <p>Go ahead and get started by clicking the Products link on the left!</p>
                    }
                </div>
                <ReactModal
                    isOpen={showModal}
                    onRequestClose={this.handleCloseModal}
                    shouldCloseOnOverlayClick={true}
                >
                    <button className="close-button" onClick={this.handleCloseModal}>Close</button>
                    <div className="product-content">
                        <div className="product-card">
                            <h3>Product Details</h3>
                            <img src={activeProduct.image_name !== '' ? `/store/images/${activeProduct.image_name}` : "https://via.placeholder.com/150"} alt="placeholder"/>
                            <h4>{activeProduct.name}</h4>
                            <h2>${parseInt(activeProduct.price).toFixed(2)}</h2>
                            <p className="description">{activeProduct.description}</p>
                            <p className="category">{activeProduct.category_name}</p>
                        </div>
                        <div className="review-product">
                            <FormModule
                                formTitle={"Leave Review"}
                                useProductFields={false}
                                useUserInfoFields={false}
                                useReviewFields={true}
                                methodURL={"/store/api/review/create.php"}
                                productID={activeProduct.id}
                                handleSuccess={this.handleSuccess}
                                activeProduct={activeProduct}
                                activeUser={this.props.user}
                            />
                        </div>
                    </div>
                </ReactModal>
            </React.Fragment>
        )
    }
}
