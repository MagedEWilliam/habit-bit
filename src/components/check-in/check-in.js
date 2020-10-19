import { Component, Prop, Element, h } from '@stencil/core';
import moment from 'moment';
import state from '../store/store';

@Component({
  tag: 'check-in',
  styleUrl: 'check-in.css',
})
export class CheckIn {

  @Element() checkin;
  @Prop() habitId;
  @Prop() zoom = false;
  @Prop() getCurrentHabit = state.habits.filter(h => h.id.toString() == this.habitId.toString())[0]

  router = document.querySelector('ion-router')

  zoomnigin() {
    this.zoom = !this.checkin.querySelector('year-calendar').zoom;
    this.checkin.querySelector('year-calendar').zoom = this.zoom;
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

    const nexturl = "/check-in/" + state.habits[next].id + '/';
    return (
      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <ion-fab-button href={nexturl} class="fab-with-label-next" color="warning">
          Next
        <ion-icon name="chevron-forward-outline"></ion-icon>
        </ion-fab-button>
      </ion-fab>);
  }

  loadYearCal() {
    return (<year-calendar zoom={this.zoom} habitId={this.habitId} getCurrentHabitColor={this.getCurrentHabit.color}></year-calendar>)
  }

  routeChanged() {
    if(this.habitId){
      this.getCurrentHabit = state.habits.filter(h => h.id.toString() == this.habitId.toString())[0]
    }
    state.checkinByHabit = { ...state.checkinByHabit }
    this.zoom = false;
  }

  componentDidLoad() {
    this.router.addEventListener('ionRouteDidChange', this.routeChanged)
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
          <ion-fab-button onClick={this.zoomnigin.bind(this)} color="light">
            {this.zoom ? <ion-icon name="search-circle-outline"></ion-icon> :
              <ion-icon name="search-outline"></ion-icon>}
          </ion-fab-button>
        </ion-fab>

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
