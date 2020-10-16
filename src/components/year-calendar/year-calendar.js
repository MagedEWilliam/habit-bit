import { Component, Event, EventEmitter, Prop, h } from "@stencil/core";
import moment from 'moment';
import state from '../store/store.js';

@Component({
    tag: 'year-calendar',
    styleUrl: 'year-calendar.css'
})
export class YearCalendar {

    @Prop() habitId = '0';
    @Prop() displayDate = moment().format("YYYY-MM-DDTHH:mm:ssTZD");
    @Prop() getCurrentHabitColor = '#000';

    @State() checkinByHabit;

    getCurrentYear = moment(this.displayDate, "YYYY-MM-DDTHH:mm:ssTZD").format('YYYY');
    

    renderYear() {
        //moment("2020-10-01T15:43:40.394Z").format('YYYY-MM-DDTHH:mm:ssTZD0').substr(0, 28)
        let highlights = state.checkinByHabit[this.habitId.toString()]? state.checkinByHabit[this.habitId.toString()][this.getCurrentYear.toString()] : [];
        
        highlights = highlights.map(habit => {
            const month = moment(habit, "YYYY-M-D").format('M')
            const day = moment(habit, "YYYY-M-D").format('D')
            return `${month}-${day}`
        })

        let selectedDate = '1-1';

        if (this.displayDate) {
            let changedYear = moment(this.displayDate, "YYYY-MM-DDTHH:mm:ssTZD").format('YYYY');
            if (changedYear == this.getCurrentYear) {
                selectedDate = moment(this.displayDate, "YYYY-MM-DDTHH:mm:ssTZD").format('M-D')
            }
        }

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const getDaysInMonth = (Y,M)=>{
            return Number(moment(`${Y}-${M}`, 'YYYY-M').daysInMonth());
        }
        const year = this.getCurrentYear;

        let yearData = [];
        for (let month = 1; month <= 12; month++) {

            let monthData = [];
            monthData.push(<div class="month-title">{monthNames[month - 1]}</div>)

            for (let day = 1; day <= getDaysInMonth(Number(year), Number(month)); day++) {

                const is_highlighted = highlights? highlights.filter(h => h == `${month}-${day}`) : []
                
                let classes = '';
                if (!is_highlighted.length > 0) {
                    classes = '';
                } else {
                    classes = 'highlighted';
                }

                if (selectedDate == `${month}-${day}`) {
                    classes += ' selected '
                }

                monthData.push(<div class={`day ${classes} date-${month}-${day}`} month={month} day={day}>{day.toString().padStart(2, '0')}</div>)
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

    componentDidRender(){
        const invertHex = (hex) => '#' + (Number(`0x1${hex.replace('#','')}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase();

        document.querySelectorAll('.highlighted').forEach(h=>{

            h.style.background = this.getCurrentHabitColor;
            h.style.color = invertHex(this.getCurrentHabitColor);
        })
    }
}