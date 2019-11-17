import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {InputGroup, InputGroupAddon, Input, Button} from 'reactstrap';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            query: '',
        }
    }

    componentDidMount() {
        this.setState(prevState => ({
            isLoading: false,
        }));
    }

    render() {
        const { query } = this.state;
        return (
            <React.Fragment>
                <div className="search">
                    <InputGroup>
                        <Input
                            placeholder="Search"
                            onChange={(e) => { this.setState({ query: e.target.value }); }}
                            value={query}
                        />
                        <InputGroupAddon addonType="append">
                            <Button onClick={() => this.props.handleSearch(query)}>Search</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </React.Fragment>
        )
    }
}
