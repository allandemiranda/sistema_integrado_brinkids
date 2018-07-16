import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import events from './events';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
class Calendar extends React.Component {
  state = { selected: 'selectable' }

  render() {

    return (

      <React.Fragment>
    
    <BigCalendar
      selectable
      events={events}
      defaultView={BigCalendar.Views.WEEK}
      scrollToTime={new Date(1970, 1, 1, 6)}
      defaultDate={new Date(2015, 3, 12)}
      onSelectEvent={event => alert(event.title)}
      onSelectSlot={slotInfo =>
        alert(
          `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
            `\nend: ${slotInfo.end.toLocaleString()}` +
            `\naction: ${slotInfo.action}`
        )
      }
    />
  </React.Fragment>
    )
  }
}



export default Calendar;