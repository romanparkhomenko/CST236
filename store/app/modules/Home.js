import React, { Component } from 'react';
import { render } from 'react-dom';


export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            searchQuery: "",
        };
    }

    render() {
        return (
            <div className="home">
                <h1>Welcome {this.props.user.firstname}</h1>
            </div>
        )
    }
}
