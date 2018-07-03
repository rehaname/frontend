import React, { Component } from 'react';
import '../css/App.css';
import Button from 'antd/lib/button';
import axios from 'axios'

class Main extends Component {
    click() {
        axios.get("http://localhost:8089/sample").then(res => {
            console.log(res);
            alert("Received Successful response from server!");
            this.setState({clickMessage: res.data});
        }, err => {
            alert("Server rejected response with: " + err);
        });
    }

    constructor(props) {
        super(props);
        this.state = {clickMessage: 'Not click :('}

        this.click = this.click.bind(this);
    }

    render() {
        return (
            <div className="Main">
                <header className="App-header">
                    <h1 className="App-title">Hamster</h1>
                </header>
                <p className="App-intro">
                    <div>
                        <Button onClick={this.click} type="primary">Button</Button>
                        <div>Clicked??: {this.state.clickMessage}</div>
                    </div>
                </p>
            </div>
        );
    }
}
export default Main;
