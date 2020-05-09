import React, { Component } from 'react';
import { AreaChart } from 'react-chartkick';
import 'chart.js';
import axios from 'axios';
import socketIOClient from "socket.io-client";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


export default class SensorDataList extends Component {
    constructor(props) {
        super(props);
        this.state = { items: {}, running: true, monthlyItems: {} };
        this.socket = socketIOClient('http://localhost:5000/ui');
        this.pausePlay = this.pausePlay.bind(this)
        this.play = this.play.bind(this)
        this.getMonthlyData = this.getMonthlyData.bind(this)

        this.socket.on('connect', () => {
            console.log("Socket Connected");
        });

        this.socket.on('disconnect', () => {
            this.socket.off("stream-data")
            this.socket.removeAllListeners("stream-data");
            console.log("Socket Disconnected");
        });
    }

    pausePlay() {
        if (this.state.running === true) {
            this.socket.off('stream-data');
        }
        else {
            this.play()
        }

        this.setState((state) => {
            return {
                running: !state.running
            }
        })
    }

    play() {
        this.socket.on("stream-data", data => {
            console.info(data);
            this.setState((state) => {
                state.items[data.timestamp] = data.metric_value
                state.raw_data.push(data);
                return state
            });
        });
    }

    getMonthlyData() {
        axios.get('http://localhost:5000/api/v1/data/monthly').then((res) => {
            this.setState({ monthlyItems: res.data });
        });
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/v1/data').then((res) => {
            const data = res.data && res.data.length && res.data[0],
                chartItems = {};
            res.data.forEach((item, key) => {
                chartItems[item.timestamp] = item.metric_value;
            });
            this.setState({ items: chartItems, raw_data: res.data, metric_name: data.metric_name });
        });

        this.getMonthlyData()

        this.play()
    }

    render() {
        return (
            <div>
                <AreaChart messages={{ empty: "Waiting for live stream" }} data={this.state.items} download={{ background: "#fff" }} xtitle='timestamp' ytitle={this.state.metric_name} />
                <button onClick={this.pausePlay}>{this.state.running ? '⏸ Pause' : '⏩ Play'}</button>

                <ExcelFile filename="sensor_data" element={<button>Export Chart Data</button>}>
                    <ExcelSheet data={this.state.raw_data} name="Sensor Data">
                        <ExcelColumn label="Category" value="category" />
                        <ExcelColumn label="Metric Name" value="metric_name" />
                        <ExcelColumn label="Metric Value" value="metric_value" />
                        <ExcelColumn label="TimeStamp" value="timestamp" />
                    </ExcelSheet>
                </ExcelFile>

                <ExcelFile filename="sensor_monthly_data" element={<button>Export Monthly Data</button>}>
                    <ExcelSheet data={this.state.monthlyItems} name="Sensor Data">
                        <ExcelColumn label="Category" value="category" />
                        <ExcelColumn label="Metric Name" value="metric_name" />
                        <ExcelColumn label="Metric Value" value="avg_metric_value" />
                        <ExcelColumn label="TimeStamp" value="datetime_hour" />
                    </ExcelSheet>
                </ExcelFile>
            </div>
        );
    }
}