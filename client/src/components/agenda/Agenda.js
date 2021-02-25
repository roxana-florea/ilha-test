import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';
import appointments from './today-appointments';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from 'react-router-dom';


export default class Agenda extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
    };
  }

  render() {
    const { data } = this.state;

    return (
      <Paper>
      <Link to='/dashboard'>
          <ArrowBackIcon style={{marginTop:'10px', marginLeft:'10px'}}/>
      </Link>
        <Scheduler
          data={data}
          width={500}
          height={650}
        >
          <WeekView
            startDayHour={9}
            endDayHour={19}
          />

          <Appointments />
          <AppointmentTooltip
            showCloseButton
            showOpenButton
          />
          <AppointmentForm
            readOnly
          />
        </Scheduler>
      </Paper>
    );
  }
}