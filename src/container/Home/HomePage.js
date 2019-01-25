import React, { Component } from 'react';
import Button from 'antd/lib/button';
import axios from 'axios'

class Home extends Component {
    click() {
        axios.get("http://localhost:8888/sample").then(res => {
            console.log(res);
            alert("Received Successful response from server!");
            this.setState({ clickMessage: res.data });
        }, err => {
            alert("Server rejected response with: " + err);
        });
    };

    constructor(props) {
        super(props);
        this.state = { clickMessage: 'Not click :(' }

        this.click = this.click.bind(this);
    };

    render() {
        return (
            <div>
                <Button onClick={this.click} type="primary">Button</Button>
                <div>Clicked??: {this.state.clickMessage}</div>
            </div>
        );
    }
}
export default Home;
