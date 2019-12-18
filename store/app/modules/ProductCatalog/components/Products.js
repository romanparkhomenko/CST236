import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import StarRatings from 'react-star-ratings';

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            productList: "",
            activeProduct: {
                id: 1,
                name: "",
                price: "",
                description: "",
                category_name: "",
            },
            reviews: [],
            showModal: false,
        }
    }

    componentDidMount() {
        this.getProducts('/store/api/product/read_paging.php?page=1');
    }

    componentDidUpdate(prevProps) {
        if (this.props.page !== prevProps.page) {
            let url = "/store/api/product/read_paging.php?page=" + this.props.page;
            this.getProducts(url);
        } else if (this.props.searchQuery !== prevProps.searchQuery) {
            let url = "/store/api/product/search.php?s=" + this.props.searchQuery;
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

    getReviews = (activeProduct) => {
        let success = false;
        fetch('/store/api/review/readProductReviews.php?id=' + activeProduct.id, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(reviews => {
                if (reviews.length >= 1) {
                    this.setState(prevState => ({
                        reviews: reviews,
                    }));
                    reviews.map(review => {
                        return <div>
                            {review.review}
                        </div>
                    })
                } else {
                    this.setState(prevState => ({
                        reviews: [],
                    }));
                }
            });
    };

    // Date formatter from the UNIX string to legible string.
    formatDate = (reviewDate) => {
        let date = new Date(reviewDate);
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString();
        let day = date.getDate();

        if (day < 10) {
            day = "0" + day.toString();
        }

        return month + '-' + day + '-' + year;
    };

    renderReviews = () => {
        const {reviews} = this.state;
        return <div className="review-list">
            {reviews.map(review => {
                return <div className="review" key={review.id + review.stars}>
                    <h4>{review.username} <span>{this.formatDate(review.review_date)}</span></h4>
                    <p>{review.review}</p>
                    <StarRatings
                        rating={parseInt(review.stars)}
                        starRatedColor="rgb(0, 168, 107)"
                        starDimension={"25px"}
                    />
                </div>
            })}
        </div>
    };

    setActiveProduct = (product) => {
        this.setState(prevState => ({
            activeProduct: product,
        }));
        this.getReviews(product);
        this.handleOpenModal();
    };

    renderProducts = (products) => {
        console.info(products);
        return products.map((product) =>
            <div className="product-card" key={product.name}>
                <img src={product.image_name !== '' ? `/store/images/${product.image_name}` : "https://via.placeholder.com/150"} alt="placeholder" onClick={() => this.setActiveProduct(product)}/>
                <h4 onClick={() => this.setActiveProduct(product)}>{product.name}</h4>
                <h2 onClick={() => this.setActiveProduct(product)}>${parseInt(product.price).toFixed(2)}</h2>
                <p className="description" onClick={() => this.setActiveProduct(product)}>{product.description}</p>
                <p className="category">{product.category_name}</p>
                <button className="add-to-cart" onClick={() => this.props.addToCart(product)}>Add To Cart</button>
            </div>
        );
    };

    render() {
        const { isLoading, productList, activeProduct, showModal, reviews } = this.state;
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
                    <div className="product-summary">
                        <div className="product-card">
                            <img src={activeProduct.image_name !== '' ? `/store/images/${activeProduct.image_name}` : "https://via.placeholder.com/150"} alt="placeholder"/>
                            <h4>{activeProduct.name}</h4>
                            <h2>${parseInt(activeProduct.price).toFixed(2)}</h2>
                            <p className="description">{activeProduct.description}</p>
                            <p className="category">{activeProduct.category_name}</p>
                            <button className="add-to-cart" onClick={() => this.props.addToCart(activeProduct)}>Add To Cart</button>
                        </div>
                        <div className="reviews">
                            <h4>Reviews</h4>
                            {reviews.length > 0 ? this.renderReviews() : <p>This item has no reviews.</p>}
                        </div>
                    </div>
                </ReactModal>
            </React.Fragment>
        )
    }
}
