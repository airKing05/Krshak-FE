import React from "react";
import { Chart } from "react-google-charts";

const data = [
    ["date", "price", "rate"],
    ["2013", 1000, 500],
    ["2014", 1170, 800],
    ["2015", 660, 200],
    ["2016", 1030, 1000],
    ["2017", 2000, 1200],
    ["2018", 2200, 1500],
];

const options = {
    title: "Last 6 day's price analysis",
    chart: {
        title: "last 6 day's price analysis",
        subtitle: "Sales and Expenses over the Years",
        // legend: { position: "bottom" },
    },
    legend: { position: "bottom" },
    hAxis: {
        title: 'Year',
        titleTextStyle: { color: 'black' },
    },
    vAxis: {
        title: 'Price',
        titleTextStyle: { color: 'black' },
    },
    // curveType: 'function', // Optional: Adds a smooth line to your chart
    width: '100%',
    height: 400,
};

function LineChart() {
    return (
        <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
        />
    );
}

export default LineChart;