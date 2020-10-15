import { Component, Event, EventEmitter, Prop, h } from "@stencil/core";

@Component({
    tag: 'year-calendar',
    styleUrl: 'year-calendar.css'
})
export class YearCalendar {

    @Prop() date = "2020-10-01T15:43:40.394Z";

    @Event() calendarSelected;

    getYear() {
        return new Date(this.date).getUTCFullYear()
    }

    renderYear() {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

        const getDaysInMonth = function (month, year) {
            return new Date(year, month, 0).getDate();
        };

        const year = this.getYear();

        let yearData = [];
        for (let month = 1; month <= 12; month++) {
            let monthData = [];
            monthData.push(<div class="month-title">{monthNames[month-1]}</div>)
            for (let day = 1; day <= getDaysInMonth(Number(month), year); day++) {
                monthData.push(<div class="day">{day.toString().padStart(2, '0')}</div>)
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
}