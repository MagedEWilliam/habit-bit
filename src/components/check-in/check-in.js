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

  getCurrentHabit = state.habits.filter(h => h.id.toString() == this.habitId.toString())[0]

  router = this.checkin.querySelector('ion-router')

  componentDidLoad(){
    this.checkin.querySelector('ion-datetime').value = moment().format('YYYY-MM-DDTHH:mm:ssTZD')
    this.checkin.querySelector('year-calendar').displayDate = this.checkin.querySelector('ion-datetime').value
  }

  onChange(event){
    this.checkin.querySelector('year-calendar').displayDate = event.target.value;
  }

  onYes(event) {
    const theDate = moment(this.checkin.querySelector('ion-datetime').value, 'YYYY-MM-DDTHH:mm:ssTZD0');
    const year = theDate.format('YYYY')

    // changing the state
    if(!state.checkinByHabit.hasOwnProperty(this.habitId)){
      state.checkinByHabit = { ...state.checkinByHabit, [this.habitId.toString()] : {
        [year]: [theDate.format('YYYY-M-D')]
      }}

    }else{
      state.checkinByHabit[this.habitId][year] = [ ...state.checkinByHabit[this.habitId.toString()][year], theDate.format('YYYY-M-D')];
    }

    state.checkinByHabit = {...state.checkinByHabit}

    this.checkin.querySelector('year-calendar').displayDate = theDate.format('YYYY-MM-DDTHH:mm:ssTZD0');
  }

  onNo(event){
    console.log('NOOO')
  }

  render() {
    return [
      <ion-content>
        <ion-grid class="ion-no-padding">
          <ion-row>
            <year-calendar habitId={this.habitId} getCurrentHabitColor={this.getCurrentHabit.color}></year-calendar>
          </ion-row>

          <ion-row>
            <ion-col size="1">
            </ion-col>
            <ion-col class="ion-text-center">
              <p>Did you {} today?</p>
              <ion-button onClick={this.onYes.bind(this)} class="btn-yes" color="light">Yes</ion-button>
              <ion-button onClick={this.onNo.bind(this)} class="btn-no" color="dark">No</ion-button>
            </ion-col>
            <ion-col size="1">
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col size="1">
            </ion-col>
            <ion-col class="ion-text-center">
              <ion-datetime onIonChange={this.onChange.bind(this)} placeholder="Select Date" display-timezone="utc"></ion-datetime>
            </ion-col>
            <ion-col size="1">
            </ion-col>
          </ion-row>
        </ion-grid>

        <ion-fab vertical="bottom" horizontal="start" slot="fixed">
          <ion-fab-button href="/" color="light">
            <ion-icon name="home-outline"></ion-icon>
          </ion-fab-button>
        </ion-fab>

        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button href="/check-in/" color="light">
            <ion-icon name="share-social-outline"></ion-icon>
          </ion-fab-button>
        </ion-fab>

      </ion-content>,
    ];
  }

  componentDidRender(){
    // this.checkin.querySelector('.btn-yes').style.webkitFilter = "blur(1px)";

    this.checkin.querySelector('.btn-yes').shadowRoot.querySelector('button').style.background = this.getCurrentHabit.color;
    this.checkin.querySelector('.btn-yes').shadowRoot.querySelector('button').style.WebkitFilter = "contrast(10)";

    this.checkin.querySelector('.btn-no').shadowRoot.querySelector('button').style.background = this.getCurrentHabit.color;
    this.checkin.querySelector('.btn-no').style.WebkitFilter = "saturate(0.2) brightness(0.8)";
  }
}
