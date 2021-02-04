import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Animation } from '@devexpress/dx-react-chart';
import { confidence as data } from './data';
import Typography from '@material-ui/core/Typography';
import './Analytics.css';


const format = () => tick => tick;

const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});
const legendLabelStyles = theme => ({
  label: {
    paddingTop: theme.spacing(1),
    whiteSpace: 'nowrap',
  },
});
const legendItemStyles = () => ({
  item: {
    flexDirection: 'column',
  },
});



const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const legendItemBase = ({ classes, ...restProps }) => (
  <Legend.Item className={classes.item} {...restProps} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
const Item = withStyles(legendItemStyles, { name: 'LegendItem' })(legendItemBase);

const demoStyles = () => ({
  chart: {
    paddingRight: '20px',
  },
  title: {
    whiteSpace: 'pre',
  },
});

const ValueLabel = (props) => {
  const { text } = props;
  return (
    <ValueAxis.Label
      {...props}
      text={`${text} h`}
    />
  );
};

const titleStyles = {
  title: {
    whiteSpace: 'pre',
  },
};
const TitleText = withStyles(titleStyles)(({ classes, ...props }) => (
  <Title.Text {...props} className={classes.title} />
));

class Analytics extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;
    const { classes } = this.props;
    const dailyAverage = (data.reduce((a,b)=> a + b.military, 0))/ data.length;

    
    return (
      <div className='analytics-container'>
      <div className="chart-container">
        <Paper elevation={3}>
          <Chart
            data={chartData}
            className={classes.chart}
            width='700'
          >
            <ArgumentAxis tickFormat={format} />
            <ValueAxis
              // max={15}
              labelComponent={ValueLabel}
            />

           
            <LineSeries
              name="Time studied"
              valueField="military"  //y axis
              argumentField='date' //x axis
              color='rgb(233, 42, 138)'
            />
            <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
            <Title
              text={`Student progress chart`}
              textComponent={TitleText}
            />
            <Animation />
          </Chart>
        </Paper>
      </div>

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
      
    );
  }
}

export default withStyles(demoStyles, { name: 'Demo' })(Analytics);
