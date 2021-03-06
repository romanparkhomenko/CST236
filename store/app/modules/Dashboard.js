import React, { Component } from 'react';
import { render } from 'react-dom';
import { Switch, Route } from "react-router-dom";
import ProductCatalog from "./ProductCatalog/ProductCatalog";
import Home from "./Home";
import ManageProducts from "./ManageProducts/ManageProducts";
import ManageUsers from "./ManageUsers/ManageUsers";
import Checkout from "./Checkout/Checkout";
import SalesReport from "./SalesReport/SalesReport";

// The Dashboard handles the Browser Router and displays the modules based on the URL.
export default class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            searchQuery: "",
            cart: [],
        };
    }

    componentDidMount() {
        this.getCartNumber();
        this.getProducts('/store/api/product/read.php');
    }

    // Get list of products to send to other components.
    getProducts = (url) => {
        fetch(url, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(products => {
                this.setState(prevState => ({
                    productList: products,
                }));
            });
    };

    // Get the user's order number. If it doesn't exist a new one is created. If the order number is 0,
    // the cart will show no items added.
    getCartNumber = () => {
        fetch('/store/api/orders/read.php?user=' + this.props.user.id, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(orders => {
                let activeCartID = '';
                for (let i = 0; i < orders.length; i++) {
                    if (orders[i].fulfilled !== "1") {
                        activeCartID = orders[i].id;
                        break;
                    } else {
                        activeCartID = 0;
                    }
                }

                this.setState(prevState => ({
                    orderID: activeCartID,
                }));

                if (parseInt(activeCartID) !== 0 && activeCartID !== '') {
                    this.getCartItems(activeCartID);
                }
            });
    };

    getCartItems = (activeCartID) => {
        fetch('/store/api/orders/readOrderItems.php?id=' + activeCartID, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(orderItems => {
                this.setState(prevState => ({
                    isLoading: false,
                    cartItems: orderItems,
                }));
                if (orderItems.length > 0) {
                    this.props.handleCartActive(true);
                } else {
                    this.props.handleCartActive(false);
                }
            });
    };

    addToCart = (product) => {
        const {orderID, cart} = this.state;
        let values = {};
        values.orders_id = orderID;
        values.products_id = product.id;
        values.quantity = 1;
        values.price = product.price;
        values.description = product.description;

        fetch('/store/api/orders/createOrderItem.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json, application/x-www-form-urlencoded',
            },
            body: JSON.stringify(values),
        })
            .then(response => response.json())
            .then(responseJson => {
                cart.push(values);
                this.setState({
                    cart: cart,
                });
                this.props.handleCartActive(true);
                console.info(responseJson);
            })
            .catch(error => console.error('Error:', error));
    };

    render() {
        return (
            <main className="dashboard">
                <Switch>
                    <Route exact path='/' render={(routeProps) => (
                        <Home {...routeProps}
                            user={this.props.user}
                            productList={this.state.productList}
                        />
                    )}/>
                    <Route exact path='/products' render={(routeProps) => (
                        <ProductCatalog {...routeProps}
                            addToCart={this.addToCart}
                        />
                    )}/>
                    <Route exact path='/cart' render={(routeProps) => (
                        <Checkout {...routeProps}
                            cart={this.state.orderID}
                            user={this.props.user}
                            productList={this.state.productList}
                            handleCartActive={this.props.handleCartActive}
                        />
                    )}/>
                    <Route exact path='/products/manage' render={(routeProps) => (
                        <ManageProducts {...routeProps} />
                    )}/>
                    <Route exact path='/users/manage' render={(routeProps) => (
                        <ManageUsers {...routeProps} />
                    )}/>
                    <Route exact path='/products/report' render={(routeProps) => (
                        <SalesReport {...routeProps} />
                    )}/>
                </Switch>
            </main>
        )
    }
}
