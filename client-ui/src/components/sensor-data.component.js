import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import socketIOClient from "socket.io-client";


export default class SensorDataList extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [] };
    }

    componentDidMount() {
        const socket = socketIOClient('http://localhost:5000');

        socket.on('connect', () => {
            console.log("Socket Connected");
            socket.on("stream-data", data => {
                console.info(data);
                let newList = [data].concat(this.state.items);

                this.setState({ items: newList });
            });
        });

        socket.on('disconnect', () => {
            socket.off("stream-data")
            socket.removeAllListeners("stream-data");
            console.log("Socket Disconnected");
        });
    }


    render() {
        this.items = this.state.items.map((item, key) =>
            <li key={key}>
                <span>{item.temperature}</span>
                <span>{item.timestamp}</span>
            </li >
        );
        return (
            <div className="row">
                <ul>
                    {this.items}
                </ul>
            </div>
        );
    }
}