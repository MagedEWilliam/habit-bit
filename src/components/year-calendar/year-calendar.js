import { Component, Event, Element, Watch, State,Prop, h } from "@stencil/core";
import moment from 'moment';


@Component({
  tag: 'year-calendar',
  styleUrl: 'year-calendar.css'
})
export class YearCalendar {

  @Prop() displayDate = moment().format("YYYY-MM-DDTHH:mm:ssTZD");
  @Prop() zoom = false;
  @Prop() change = ()=>{};
  
  @Element() comp;

  router = document.querySelector('ion-router')
  @State() getCurrentYear = ()=> moment(this.displayDate, "YYYY-MM-DDTHH:mm:ssTZD").format('YYYY');

  renderYear() {

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const getDaysInMonth = (Y, M) => {
      return Number(moment(`${Number(Y)}-${Number(M)}`, 'YYYY-M').daysInMonth());
    }

    let yearData = [];
    const year = this.getCurrentYear();

    for (let month = 1; month <= 12; month++) {

      let monthData = [<text font-size="12" class="month-title" y="15" x={(25*(month-1))+(month*2.1)} fill="#CECECE">{monthNames[month - 1]}</text>];


      const monthDays = getDaysInMonth(year, month);

      for (let day = 1; day <= monthDays; day++) {
        monthData.push(
            <g 
              onClick={()=> this.change(`${year}-${month}-${day}`)}
              width="25" 
              height="25" 
              y={25*day} 
              x={(25*(month-1))+(month*2)} 
              class={`day date-${year}-${month}-${day}`} date={`${year}-${month}-${day}`} year={year} month={month} day={day}>
              <rect 
                width="25" 
                height="25" 
                y={25*day} 
                x={(25*(month-1))+(month*2)} ></rect>
              <text 
                fill="white" 
                y={(25*day)+16} 
                x={(25*(month-1))+(month*2) +5}>{day.toString().padStart(2, '0')}</text>
            </g>
          );
      }
      yearData.push(<g class="month">{...monthData}</g>)
    }

    return yearData;
  }
  
  componentDidRender() {
    if(this.zoom){
      this.comp.classList.add('zoom-in')
      if(this.comp.querySelector('.selected')){
        setTimeout(()=>{
          this.comp.querySelector('.selected').scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
        }, 300, this)
      }
    }else{
      this.comp.classList.remove('zoom-in')
    }
  }
  
  componentDidLoad() {
    this.router.addEventListener('ionRouteDidChange', this.routeChanged)
  }

  render() {
    return [
      <svg width="325" height="800" class="year">
        {...this.renderYear()}
      </svg>
    ];
  }

  disconnectedCallback() {
    setTimeout(() => {
      this.router.removeEventListener('ionRouteDidChange', this.routeChanged)
    }, 500)
  }
}