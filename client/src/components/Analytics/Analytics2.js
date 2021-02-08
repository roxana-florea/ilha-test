import {React} from 'react';
import { Component } from 'react';
import { Line } from '@reactchartjs/react-chart.js'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { confidence } from './data';
import { saveAs } from 'file-saver';


const daysOfMonth = confidence.map(item => item.date);
const hoursStudied = confidence.map(item => item.military);


const data = {
  labels: daysOfMonth,
  datasets: [
    {
      label: 'Hours of study',
      data: hoursStudied,
      fill: false,
      responsive: true,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
      
    },
  ],
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}


class LineChart  extends Component  { 
  saveCanvas() {
    //save to png
    const canvasSave = document.getElementById('stackD');
    canvasSave.toBlob(function (blob) {
        saveAs(blob, "study-time.png")
    })
}


  render(){
    let dailyAverage = (hoursStudied.reduce((a,b)=> a + b, 0))/ hoursStudied.length;

    return(
      <div className='analytics-container'>
    
     <Paper className='chart-paper'>
     <button className='download-btn' onClick={this.saveCanvas}>Download as PNG</button>
      <Line id="stackD" width={700} height={300} data={data} options={options}  responsive={true}
/>
      
      </Paper>

      <div className='paper-container'>
        <Paper className="paper">
          <Typography>Daily average</Typography>
          <Typography variant='h4' style={{textAlign:'center'}}>{dailyAverage.toFixed(2)} h</Typography>
        </Paper>

        <Paper className="paper">
        <Typography>Most played song</Typography>
        <Typography variant='h3' style={{textAlign:'center'}}>🎸</Typography>
        </Paper>
      </div>

    </div>
    )
  
  }
 
}

export default LineChart