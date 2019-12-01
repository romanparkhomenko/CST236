import React, { Component } from 'react';
import { render } from 'react-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormModule from "../FormModule";
import ReactModal from "react-modal";


export default class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }
    }

    componentDidMount() {
        this.getCartItems();
    }

    handleOpenModal = () => {
        this.setState({ showModal: true });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    getCartItems = () => {
        if (this.props.cart === 0) {
            this.setState(prevState => ({
                isLoading: true,
            }));
        } else {
            fetch('/store/api/orders/readOrderItems.php?id=' + this.props.cart, {
                method: 'GET',
            })
                .then(res => res.json())
                .then(orderItems => {
                    this.setState(prevState => ({
                        isLoading: false,
                        cart: orderItems,
                    }));
                });
        }
    };

    renderCart = (cart) => {
        return <React.Fragment>
            <table className="cart">
                <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Remove</th>
                </tr>
                </thead>
                <tbody>
                {cart.map((cartItem) =>
                    this.renderCartItem(cartItem)
                )}
                </tbody>
            </table>
            <div className="summary">
                <p className="total-cost"><span>TOTAL COST:</span> ${this.getTotalCost(cart)}</p>
                <button className="checkout-button" onClick={() => this.checkoutOrder()}>CHECKOUT NOW</button>
            </div>
        </React.Fragment>
    };

    renderCartItem = (cartItem) => {
        const {productList} = this.props;
        const productIndex = productList.findIndex(product => product.id === cartItem.products_id);
        const product = productList[productIndex];
        return <tr className="cart-item" key={product.name}>
            <td>{product.name}</td>
            <td>{cartItem.description}</td>
            <td>{cartItem.quantity}</td>
            <td>{parseFloat(cartItem.price).toFixed(2)}</td>
            <td><button className="delete-button" onClick={() => this.removeProduct(product)}>REMOVE</button></td>
        </tr>
    };

    removeProduct = (product) => {
        let confirmation = confirm('Are you sure you want to remove ' + product.name + '?');
        const values = {};
        values.orders_id = parseInt(this.props.cart);
        values.products_id = parseInt(product.id);

        if (confirmation) {
            fetch('/store/api/orders/removeOrderItem.php', {
                method: 'POST',
                body: JSON.stringify(values),
            })
                .then(res => res.json())
                .then(response => {
                    console.info(response.message);
                    this.getCartItems();
                });
        }
    };

    getTotalCost = (cart) => {
        let total = 0;
        {cart.map((cartItem) =>
            total += parseFloat(cartItem.price)
        )}

        return total.toFixed(2);
    };

    checkoutOrder = () => {
        const values = {};
        values.orders_id = parseInt(this.props.cart);
        values.users_id = parseInt(this.props.user.id);
        fetch('/store/api/orders/checkoutOrder.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json, application/x-www-form-urlencoded',
            },
            body: JSON.stringify(values),
        })
            .then(res => res.json())
            .then(orderSuccess => {
                if (orderSuccess.message === "Success") {
                    this.setState(prevState => ({
                        orderSuccess: true,
                    }));
                }
            })
            .catch(error => console.error('Error:', error));
    };

    render() {
        const { isLoading, cart, orderSuccess } = this.state;
        return (
            <React.Fragment>
                <div className="checkout">
                    <h1>Your Cart</h1>
                    {orderSuccess ? (
                        <div className="order-confirmation">
                            <h1>Your Order Has Been Processed</h1>
                        </div>
                    ) : (
                        <div className="cart">
                            {!isLoading && cart.length > 0 ? (
                                <div className="product-table">
                                    {this.renderCart(cart)}
                                </div>
                            ) : (
                                <p className="loading">No items in cart.</p>
                            )}
                        </div>
                    )}
                </div>
            </React.Fragment>
        )
    }
}
