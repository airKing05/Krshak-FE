import { Chart } from "react-google-charts";
import  { GoogleChartOptions } from "react-google-charts";

interface LineChartProps{
  data : (string | number)[][];
}

const options: GoogleChartOptions = {
    title: "Last 6 day's price analysis",
    chart: {
        title: "last 6 day's price analysis",
        subtitle: "Sales and Expenses over the Years",
        // legend: { position: "bottom" },
    },
    legend: { position: "bottom" },
    hAxis: {
        title: 'Date',
        titleTextStyle: { color: 'black'},
        slantedText: true, // Enable slanted text
        slantedTextAngle: 45, // Rotate labels by 90 degrees (vertical)
    },
    vAxis: {
        title: 'Price',
        titleTextStyle: { color: 'black' },
    },
    // curveType: 'function', // Optional: Adds a smooth line to your chart
    // width: '100%',
    height: 500,
    backgroundColor: 'white', 
};


const LineChart: React.FC<LineChartProps> = ({data}) =>  {
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