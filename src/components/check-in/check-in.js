import { Component, Prop, Element, h } from '@stencil/core';
import moment from 'moment';
import state from '../store/store';

@Component({
  tag: 'check-in',
  styleUrl: 'check-in.css',
})
export class CheckIn {

  @Element() checkin;
  @State() checkinByHabit;
  @Prop() habitId;
  @Prop() zoom = false;

  @Prop() router = document.querySelector('ion-router')

  @Prop() getCurrentHabit = state.habits.filter(h => h.id.toString() == this.habitId.toString())[0]

  zoomnigin() {
    this.zoom = !this.checkin.querySelector('year-calendar').zoom;
    this.checkin.querySelector('year-calendar').zoom = this.zoom;
  }

  nextHabit() {
    let next = 0;
    state.habits.filter((h,index)=>{
      if(h.id == this.habitId) {
        if( state.habits[index+1]){
          next = index+1;
        }
        return h
      }
    })
    return next;
  }

  render() {
    return [
      <ion-content>
        <ion-grid class="ion-no-padding">
          <ion-row>
            <year-calendar zoom={this.zoom} habitId={this.habitId} getCurrentHabitColor={this.getCurrentHabit.color}></year-calendar>
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

        <ion-fab vertical="bottom" horizontal="center" slot="fixed">
          <ion-fab-button href={"/check-in/" + state.habits[this.nextHabit()].id} class="fab-with-label" color="warning">
            Next
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </ion-fab-button>
        </ion-fab>

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

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

      </ion-content>,
    ];
  }
}
