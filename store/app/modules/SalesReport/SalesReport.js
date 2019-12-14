import React, { Component } from 'react';
import { render } from 'react-dom';
import FormModule from "../FormModule";
import ReactModal from "react-modal";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class SalesReport extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            startDate: new Date("2019-11-25"),
            endDate: new Date(),
            productList: "",
            orderByName: false,
            orderByPrice: false,
            orderByQuantity: true,
            reverse: false,
        };
    }

    componentDidMount() {
        this.getSalesReport('/store/api/product/getSalesReport.php?date1=20191201&date2=20191212');
    }

    // Fetch generic sales report.
    getSalesReport = (url) => {
        fetch(url, {
            method: 'GET',
        })
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Something went wrong');
                } else {
                    return res.json().then(products => {
                        if (products.length > 0) {
                            this.setState(prevState => ({
                                isLoading: false,
                                productList: products,
                                errorMessage: '',
                            }));
                        } else {
                            console.info('No products available');
                        }
                    });
                }
            })
            .catch(error => {
                this.setState(prevState => ({
                    errorMessage: error.toString(),
                }));
                console.info(error);
            });
    };

    // Handlers for datepicker
    changeStartDate = (date) => {
        this.setState(prevState => ({
            startDate: date,
        }));
    };

    changeEndDate = (date) => {
        this.setState(prevState => ({
            endDate: date,
        }));
    };

    // Date formatter from the UNIX string to legible string.
    formatDate = (date) => {
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString();
        let day = date.getDate();

        if (day < 10) {
            day = "0" + day.toString();
        }

        return year + month + day;
    };

    // Report updater and search handler
    getNewReport = () => {
        const {startDate, endDate} = this.state;

        let start = this.formatDate(startDate);
        let end = this.formatDate(endDate);
        let url = '/store/api/product/getSalesReport.php?date1=' + start + '&date2=' + end;
        this.getSalesReport(url);
    };

    // Total Cost helper
    getTotalCost = (products) => {
        let total = 0;
        {products.map((item) =>
            total += (parseFloat(item.total_price) * parseInt(item.total_quantity))
        )}

        return total.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    renderProducts = (products) => {
        return <React.Fragment>
            <table className="cart">
                <thead>
                <tr>
                    <th>#</th>
                    <th className="filter" onClick={() => this.orderByName()}>Product Name</th>
                    <th className="filter" onClick={() => this.orderByQuantity()}>Total Quantity</th>
                    <th className="filter" onClick={() => this.orderByPrice()}>Total Price</th>
                </tr>
                </thead>
                <tbody>
                {products.map((item, index) =>
                    this.renderProductItem(item, index)
                )}
                </tbody>
            </table>
            <div className="summary">
                <p className="total-cost"><span>TOTAL COST:</span> ${this.getTotalCost(products)}</p>
            </div>
        </React.Fragment>
    };

    compare = (a, b) => {
        const {orderByPrice, orderByName, orderByQuantity, reverse} = this.state;

        let productA;
        let productB;

        if (orderByPrice) {
            productA = parseFloat(a.total_price);
            productB = parseFloat(b.total_price);
        } else if (orderByName) {
            productA = a.name.toUpperCase();
            productB = b.name.toUpperCase();
        } else if (orderByQuantity) {
            productA = parseInt(a.total_quantity);
            productB = parseInt(b.total_quantity);
        }

        let comparison = 0;
        if (productA > productB) {
            comparison = 1;
        } else if (productA < productB) {
            comparison = -1;
        }

        if (reverse) {
            return comparison * -1;
        }

        return comparison;
    };

    orderByPrice = () => {
        this.setState(prevState => ({
            orderByPrice: true,
            orderByQuantity: false,
            orderByName: false,
            reverse: !prevState.reverse,
        }));
        this.filterReport();
    };

    orderByQuantity = () => {
        this.setState(prevState => ({
            orderByPrice: false,
            orderByQuantity: true,
            orderByName: false,
            reverse: !prevState.reverse,
        }));
        this.filterReport();
    };

    orderByName = () => {
        this.setState(prevState => ({
            orderByPrice: false,
            orderByQuantity: false,
            orderByName: true,
            reverse: !prevState.reverse,
        }));
        this.filterReport();
    };

    filterReport = () => {
        const {orderByPrice, orderByName, orderByQuantity, productList} = this.state;

        if (orderByPrice || orderByName || orderByQuantity ) {
            this.setState(prevState => ({
                productList: productList.sort(this.compare),
            }));
        }
    };

    renderProductItem = (product, index) => {
        return <tr className="product-card" key={product.name}>
            <td>{index + 1}</td>
            <td>{product.name}</td>
            <td>{product.total_quantity}</td>
            <td>${parseInt(product.total_price).toFixed(2)}</td>
        </tr>;
    };

    render() {
        const { isLoading, startDate, endDate, productList, errorMessage } = this.state;
        return (
            <React.Fragment>
                <div className="product-management">
                    <h1>Sales Report</h1>
                    <div className="date-selection">
                        <h3>Search product sales from a given date:</h3>
                        <p>{errorMessage}</p>
                        <div className="date-container">
                            <div>
                                <span>From:</span>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => this.changeStartDate(date)}
                                />
                            </div>
                            <div>
                                <span>To:</span>
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => this.changeEndDate(date)}
                                />
                            </div>
                            <button className="search-button" onClick={() => {this.getNewReport()}}>Get New Report</button>
                        </div>
                    </div>
                    <div className="products">
                        {!isLoading ? (
                            <div className="product-table">
                                {this.renderProducts(productList)}
                            </div>
                        ) : (
                            <p className="loading">Generating Sales Report.</p>
                        )}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
