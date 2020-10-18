import { Component, Event, EventEmitter, Prop, h } from "@stencil/core";
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
    @Prop() getCurrentHabitColor = '#000';
    @Prop() selectedDate;

    @State() checkinByHabit;

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
            if(this.zoom){
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
        else if(alreadyChecked.length > 0){
            // remove habit
            state.checkinByHabit = {
                ...state.checkinByHabit, [this.habitId.toString()]: {
                    [this.getCurrentYear]: [...state.checkinByHabit[this.habitId.toString()][this.getCurrentYear].filter(h=>h != this.selectedDate)]
                }
            }
        }
        state.checkinByHabit = { ...state.checkinByHabit };

        if (!this.zoom) {
            this.zoom = true;
        }
    }
    renderYear() {

        state.checkinByHabit = { ...state.checkinByHabit };

        if (this.displayDate) {
            let changedYear = moment(this.displayDate, "YYYY-MM-DDTHH:mm:ssTZD").format('YYYY');
            this.getCurrentYear = changedYear;
            if (changedYear == this.getCurrentYear) {
                // this.selectedDate = moment(this.displayDate, "YYYY-MM-DDTHH:mm:ssTZD").format('M-D')
            }
        }

        let highlights = state.checkinByHabit[this.habitId.toString()] ? state.checkinByHabit[this.habitId.toString()][this.getCurrentYear.toString()] : {};

        if (highlights != undefined) {
            highlights = highlights.map(habit => {

                const year = moment(habit, "YYYY-M-D").format('YYYY');
                if (year == this.getCurrentYear) {
                    const month = moment(habit, "YYYY-M-D").format('M')
                    const day = moment(habit, "YYYY-M-D").format('D')
                    return `${year}-${month}-${day}`
                }
            })
        } else {
            highlights = [];
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

                const is_highlighted = highlights ? highlights.filter(h => h == `${this.getCurrentYear}-${month}-${day}`) : []

                let classes = '';
                if (is_highlighted.length > 0) {
                    classes = 'highlighted';
                }
                if (this.selectedDate == `${this.getCurrentYear}-${month}-${day}`) {
                    classes += ' selected '
                }

                monthData.push(<div onClick={this.daySelected.bind(this)} class={`day ${classes} date-${this.getCurrentYear}-${month}-${day}`} year={this.getCurrentYear} month={month} day={day}>{day.toString().padStart(2, '0')}</div>)
            }
            yearData.push(<div class="month">{...monthData}</div>)
        }
        return yearData;
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
            document.querySelectorAll('.day').forEach(d => {
                d.classList.add('zoomin')
            })
        } else {
            document.querySelectorAll('.day').forEach(d => {
                d.classList.remove('zoomin')
            })
        }
        const invertHex = (hex) => '#' + (Number(`0x1${hex.replace('#', '')}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase();

        document.querySelectorAll('.highlighted').forEach(h => {

            h.style.background = this.getCurrentHabitColor;
            h.style.color = invertHex(this.getCurrentHabitColor);
        })
    }
}