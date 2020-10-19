import { Component, Event, Element, Watch, State,Prop, h } from "@stencil/core";
import moment from 'moment';
import state from '../store/store.js';

@Component({
  tag: 'year-calendar',
  styleUrl: 'year-calendar.css'
})
export class YearCalendar {

  @Prop() zoom = false;
  @Prop() habitId = '0';
  @Prop({ mutable: true }) displayDate = moment().format("YYYY-MM-DDTHH:mm:ssTZD");
  @Prop({ mutable: true }) getCurrentHabitColor = '#000';
  @Prop() selectedDate;
  @State() checkinByHabit = ()=> state.checkinByHabit;
  @State() invertHex = (hex) => '#' + (Number(`0x1${hex.replace('#', '')}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase();
  @Element() yearCal;

  router = document.querySelector('ion-router')
  getCurrentYear = moment(this.displayDate, "YYYY-MM-DDTHH:mm:ssTZD").format('YYYY');

  daySelected(e) {

    this.selectedDate = e.target.getAttribute('year') + '-' + e.target.getAttribute('month') + '-' + e.target.getAttribute('day');

    // check if it exists
    let alreadyChecked = [];

    if (state.checkinByHabit.hasOwnProperty(this.habitId.toString())) {
      if (state.checkinByHabit[this.habitId.toString()].hasOwnProperty(this.getCurrentYear)) {
        alreadyChecked = state.checkinByHabit[this.habitId.toString()][this.getCurrentYear].filter(h => h == this.selectedDate);
      }
    }

    if (alreadyChecked.length == 0) {
      // add new habit
      if (this.zoom) {
        if (!state.checkinByHabit.hasOwnProperty(this.habitId.toString())) {
          state.checkinByHabit[this.habitId.toString()] = {};
          if (!state.checkinByHabit[this.habitId.toString()].hasOwnProperty(this.getCurrentYear)) {
            state.checkinByHabit[this.habitId.toString()][this.getCurrentYear] = [];
          }
        }
        state.checkinByHabit = {
          ...state.checkinByHabit, [this.habitId.toString()]: {
            [this.getCurrentYear]: [...state.checkinByHabit[this.habitId.toString()][this.getCurrentYear], this.selectedDate]
          }
        }
      }
    }
    else if (alreadyChecked.length > 0) {
      console.log('delete')
      // remove habit
      state.checkinByHabit = {
        ...state.checkinByHabit, [this.habitId.toString()]: {
          [this.getCurrentYear]: [...state.checkinByHabit[this.habitId.toString()][this.getCurrentYear].filter(h => h != this.selectedDate)]
        }
      }
      this.checkinByHabit = { ...state.checkinByHabit }
    }
    state.checkinByHabit = { ...state.checkinByHabit };
    state.habits = [ ...state.habits ];

    if (!this.zoom) {
      this.zoom = true;
    }
  }
  highlights(_month, _day){
    let highlight = state.checkinByHabit[this.habitId.toString()] ? state.checkinByHabit[this.habitId.toString()][this.getCurrentYear.toString()] : {};

    if (highlight != undefined) {
      highlight = highlight.map(habit => {

        const year = moment(habit, "YYYY-M-D").format('YYYY');
        if (year == this.getCurrentYear) {
          const month = moment(habit, "YYYY-M-D").format('M')
          const day = moment(habit, "YYYY-M-D").format('D')
          return `${year}-${month}-${day}`
        }
      });
    } else {
      highlight = [];
    }
    return highlight ? highlight.filter(h => h == `${this.getCurrentYear}-${_month}-${_day}`) : [];
  }

  renderYear() {

    if (this.displayDate) {
      let changedYear = moment(this.displayDate, "YYYY-MM-DDTHH:mm:ssTZD").format('YYYY');
      this.getCurrentYear = changedYear;
      if (changedYear == this.getCurrentYear) {
        // this.selectedDate = moment(this.displayDate, "YYYY-MM-DDTHH:mm:ssTZD").format('M-D')
      }
    }

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const getDaysInMonth = (Y, M) => {
      return Number(moment(`${Number(Y)}-${Number(M)}`, 'YYYY-M').daysInMonth());
    }

    let yearData = [];
    for (let month = 1; month <= 12; month++) {

      let monthData = [];
      monthData.push(<div class="month-title">{monthNames[month - 1]}</div>)

      for (let day = 1; day <= getDaysInMonth(this.getCurrentYear, month); day++) {
        
        const is_highlighted = this.highlights(month, day);

        let classes = '';
        let style = {};
        if (is_highlighted.length > 0) {
          classes = 'highlighted';
          style = {background: this.getCurrentHabitColor, color: this.invertHex(this.getCurrentHabitColor)}
        }
        if (this.selectedDate == `${this.getCurrentYear}-${month}-${day}`) {
          classes += ' selected '
        }

        monthData.push(<div style= {style} onClick={ev=> this.daySelected(ev)} class={`day ${classes} date-${this.getCurrentYear}-${month}-${day}`} year={this.getCurrentYear} month={month} day={day}>{day.toString().padStart(2, '0')}</div>)
      }
      yearData.push(<div class="month">{...monthData}</div>)
    }
    return yearData;
  }

  routeChanged() {
    this.zoom = false;
    state.checkinByHabit = { ...state.checkinByHabit };
    state.habits = [ ...state.habits ];
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

  componentDidRender() {
    if (this.zoom) {
      this.yearCal.querySelectorAll('.day').forEach(d => {
        d.classList.add('zoomin')
      })
    } else {
      this.yearCal.querySelectorAll('.day').forEach(d => {
        d.classList.remove('zoomin')
      })
    }
  }

  disconnectedCallback() {
    setTimeout(() => {
      this.router.removeEventListener('ionRouteDidChange', this.routeChanged)
    }, 500)
  }
}