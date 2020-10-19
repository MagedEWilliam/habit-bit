import { Component, Prop, Element, h } from '@stencil/core';
import state from '../store/store';

@Component({
  tag: 'check-in',
  styleUrl: 'check-in.css',
})
export class CheckIn {

  @Element() comp;
  @Prop() habitId;
  @Prop() zoom = false;
  @Prop() getCurrentHabit = state.habits.filter(h => h.id.toString() == this.habitId.toString())[0]

  router = document.querySelector('ion-router')

  zoomniginOrout() {
    this.zoom = !this.zoom;
    if (this.zoom) {
      this.comp.querySelector('year-calendar').classList.add('zoomin');
    } else {
      this.comp.querySelector('year-calendar').classList.remove('zoomin');
    }
  }

  zoomnigin() {
    this.zoom = true;
    this.comp.querySelector('year-calendar').classList.add('zoomin');
  }

  nextHabit() {
    let next = 0;
    state.habits.filter((h, index) => {
      if (h.id == this.habitId) {
        if (state.habits[index + 1]) {
          next = index + 1;
        }
        return h
      }
    })

    const nexturl = next >= state.habits.length-1? "/":"/check-in/" + state.habits[next].id + '/';

    return (
      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <ion-fab-button href={nexturl} class="fab-with-label-next" color="warning">
          Next
        <ion-icon name="chevron-forward-outline"></ion-icon>
        </ion-fab-button>
      </ion-fab>);
  }

  loadYearCal() {
    return (
      <year-calendar
        onClick={this.zoomnigin.bind(this)}
        zoom={this.zoom}
        habitId={this.habitId}
        getCurrentHabitColor={this.getCurrentHabit.color}></year-calendar>
    )
  }

  routeChanged() {
    if (this.habitId) {
      this.getCurrentHabit = state.habits.filter(h => h.id.toString() == this.habitId.toString())[0]
    }
    state.checkinByHabit = { ...state.checkinByHabit }
    this.zoom = false;
  }

  getDay(year, date) {
    if (state.checkinByHabit.hasOwnProperty(this.habitId)) {
      if (state.checkinByHabit[this.habitId].hasOwnProperty(year)) {
        return state.checkinByHabit[this.habitId][year].filter(y => y == date)[0]
      }
    }
    return date;
  }

  addDay(year, date) {
    if ( this.getDay(year, date) != date ) {
      state.checkinByHabit[this.habitId][year] = [...state.checkinByHabit[this.habitId][year], date]
    }

    state.checkinByHabit = {...state.checkinByHabit}
  }

  delDay(year, date) {
    if ( this.getDay(year, date) == date ) {
      state.checkinByHabit[this.habitId][year] = state.checkinByHabit[this.habitId][year].filter(y=> y != date)
    }
    state.checkinByHabit = {...state.checkinByHabit}
  }

  componentDidLoad() {
    
    this.router.addEventListener('ionRouteDidChange', this.routeChanged);

    this.comp.querySelectorAll('.day').forEach(element => {

      const year = element.getAttribute('year');
      const currentDate = `${year}-${element.getAttribute('month')}-${element.getAttribute('day')}`;

      if ( this.getDay(year, currentDate) == currentDate ) {
        element.classList.add('highlighted');
        element.style.background = this.getCurrentHabit.color;
      }

      element.addEventListener('click', e => {
        if(this.zoom){
          if ( e.target.classList.contains('highlighted') ) {
            this.delDay(year, currentDate);
            e.target.classList.remove('highlighted');
            e.target.style.background = '#CECECE';
          } else {
            this.addDay(year, currentDate);
            e.target.classList.add('highlighted');
            e.target.style.background = this.getCurrentHabit.color;
          }
        }
      })
    });
  }

  render() {
    return [
      <ion-content>
        <ion-grid class="ion-no-padding">
          <ion-row>
            {this.loadYearCal()}
          </ion-row>

          <ion-row>
            <ion-col size="1">
            </ion-col>
            <ion-col class="ion-text-center">
              <p>Did you <b>{this.getCurrentHabit.name}</b> today?</p>
            </ion-col>
            <ion-col size="1">
            </ion-col>
          </ion-row>
        </ion-grid>

        {this.nextHabit()}

        <ion-fab vertical="bottom" horizontal="start" slot="fixed">
          <ion-fab-button href="/" color="light">
            <ion-icon name="home-outline"></ion-icon>
          </ion-fab-button>
        </ion-fab>

        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button onClick={this.zoomniginOrout.bind(this)} color="light">
            {this.zoom ? <ion-icon name="search-circle-outline"></ion-icon> :
              <ion-icon name="search-outline"></ion-icon>}
          </ion-fab-button>
        </ion-fab>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

      </ion-content>,
    ];
  }

  disconnectedCallback() {
    this.router.removeEventListener('ionRouteDidChange', this.routeChanged)
  }
}
