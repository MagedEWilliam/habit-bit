import { Component, Event, Element, Watch, State,Prop, h } from "@stencil/core";
import moment from 'moment';

@Component({
  tag: 'year-calendar',
  styleUrl: 'year-calendar.css'
})
export class YearCalendar {

  @Prop() habitId = '0';
  @Prop() displayDate = moment().format("YYYY-MM-DDTHH:mm:ssTZD");
  @Prop() getCurrentHabitColor = '#000';
  
  @Element() yearCal;

  router = document.querySelector('ion-router')
  getCurrentYear = moment(this.displayDate, "YYYY-MM-DDTHH:mm:ssTZD").format('YYYY');

  renderYear() {

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const getDaysInMonth = (Y, M) => {
      return Number(moment(`${Number(Y)}-${Number(M)}`, 'YYYY-M').daysInMonth());
    }

    let yearData = [];

    for (let month = 1; month <= 12; month++) {

      let monthData = [<div class="month-title">{monthNames[month - 1]}</div>];

      const monthDays = getDaysInMonth(this.getCurrentYear, month);

      for (let day = 1; day <= monthDays; day++) {
        monthData.push(
        <div 
          class={`day date-${this.getCurrentYear}-${month}-${day}`} 
          year={this.getCurrentYear} 
          month={month} 
          day={day}>
          {day.toString().padStart(2, '0')}
        </div>);
      }
      yearData.push(<div class="month">{...monthData}</div>)
    }

    return yearData;
  }

  componentDidLoad() {
    this.router.addEventListener('ionRouteDidChange', this.routeChanged)
  }

  render() {
    return [
      <div class="year">
        {...this.renderYear()}
      </div>
    ];
  }

  disconnectedCallback() {
    setTimeout(() => {
      this.router.removeEventListener('ionRouteDidChange', this.routeChanged)
    }, 500)
  }
}