import { Component, h, Element } from '@stencil/core';
import state from '../store/store.js';
import { v4 as uuidv4 } from "uuid";

@Component({
  tag: 'new-habit',
  styleUrl: 'new-habit.css',
})
export class NewHabit {

  @Element() page;
  @State() habits;

  router = document.querySelector('ion-router')

  viewHome(){
    this.router.push('/')
  }

  createNewHabit(){

    if(this.page.querySelector('ion-input').value.trim()){
      // change the state
      state.habits = [ ...state.habits, {
        order: state.habits.length,
        name: this.page.querySelector('ion-input').value.trim(),
        id: uuidv4().toString(),
        color: this.page.querySelector('#color').value
      }];
      console.log(state.habits);
      this.router.push('/')
    }else{
      this.page.querySelector('ion-input').setFocus();
    }

  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
        </ion-toolbar>
        <ion-toolbar>
        </ion-toolbar>
        <ion-toolbar>
          <ion-title size="large">New habits</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <ion-item>
          <ion-label>Habit name</ion-label>
          <ion-input required={true} placeholder="Drinking water..."></ion-input>
        </ion-item>

        <ion-item>
          <ion-label>Color</ion-label>
          <input id="color" type="color" value="#0CC5FD"></input>
        </ion-item>
        <color-picker class="ion-padding" target="color"/>

        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button color="light" onClick={this.createNewHabit.bind(this)}>
            <ion-icon name="checkmark-outline"></ion-icon>
          </ion-fab-button>
        </ion-fab>

        <ion-fab vertical="bottom" horizontal="start" slot="fixed">
          <ion-fab-button color="light" onClick={this.viewHome.bind(this)}>
            <ion-icon name="close-outline"></ion-icon>
          </ion-fab-button>
        </ion-fab>
        
      </ion-content>,
    ];
  }
}
