import React, { Component } from 'react';
import { AreaChart } from 'react-chartkick';
import 'chart.js';
import axios from 'axios';
import socketIOClient from "socket.io-client";


export default class SensorDataList extends Component {
    constructor(props) {
        super(props);
        this.state = { items: {} };
        this.socket = socketIOClient('http://localhost:5000');

        this.socket.on('connect', () => {
            console.log("Socket Connected");
        });

        this.socket.on('disconnect', () => {
            this.socket.off("stream-data")
            this.socket.removeAllListeners("stream-data");
            console.log("Socket Disconnected");
        });
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/v1/data').then((res) => {
            const data = res.data && res.data.length && res.data[0],
                chartItems = {};
            res.data.forEach((item, key) => {
                chartItems[item.timestamp] = item.metric_value;
            });
            this.setState({ items: chartItems, metric_name: data.metric_name });
        });

        this.socket.on("stream-data", data => {
            console.info(data);
            this.setState((state) => {
                state.items[data.timestamp] = data.metric_value
                return state
            });
        });
    }

    render() {
        return (
            <AreaChart messages={{ empty: "Waiting for live stream" }} data={this.state.items} download={{ background: "#fff" }} xtitle='timestamp' ytitle={this.state.metric_name} />
        );
    }
}