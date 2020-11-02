import { Component, h, Element, Prop } from '@stencil/core';
import state from '../store/store.js';
import moment from 'moment';
import { v4 as uuidv4 } from "uuid";

@Component({
  tag: 'new-habit',
  styleUrl: 'new-habit.css',
})
export class NewHabit {

  @Element() comp;

  @Prop() dismiss = () => {};

  @State() habits;
  @State() checkinByHabit;

  gotoFirstHabit = ()=> state.habits.length > 0 ? '/?habitid='+state.habits[0].id : '/tutorial/';
  
  viewHome(){
   this.dismiss();
  }

  createNewHabit(){

    if(this.comp.querySelector('ion-input').value.trim()){
      const id = uuidv4().toString();
      const year = moment().format("YYYY");
      // change the state
      state.habits = [ ...state.habits, {
        order: state.habits.length,
        name: this.comp.querySelector('ion-input').value.trim(),
        id: id,
        color: this.comp.querySelector('#color').value
      }];

      const empty = {[id]:{[year]: []}};
      state.checkinByHabit = { ...state.checkinByHabit, ...empty  };

      window.location = '/'
    }else{
      this.comp.querySelector('ion-input').setFocus();
    }

  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-title size="large">New habits</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <ion-item>
          <ion-label>Did you</ion-label>
          <ion-input required={true} placeholder='"Drink water" Today?'></ion-input>
        </ion-item>

        <ion-item>
          <ion-label>Color</ion-label>
          <input id="color" type="color" value="#0CC5FD"></input>
        </ion-item>
        <color-picker class="ion-padding" target="color"/>

        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button color="light" href="/" onClick={this.createNewHabit.bind(this)}>
            <ion-icon name="checkmark-outline"></ion-icon>
          </ion-fab-button>
        </ion-fab>

        <ion-fab vertical="bottom" horizontal="start" slot="fixed">
          <ion-fab-button color="light" href="/" onClick={this.viewHome.bind(this)}>
            <ion-icon name="close-outline"></ion-icon>
          </ion-fab-button>
        </ion-fab>
        
      </ion-content>,
    ];
  }
}
