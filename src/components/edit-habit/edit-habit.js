import { Component, h, Element, Prop } from '@stencil/core';
import state from '../store/store.js';

@Component({
  tag: 'edit-habit',
  styleUrl: 'edit-habit.css',
})
export class EditHabit {

  @Element() page;
  @State() habits;

  @Prop() habitId;

  router = document.querySelector('ion-router')

  viewHome(){
    this.router.push('/')
  }

  createNewHabit(){
    if(this.page.querySelector('ion-input').value.trim()){

      const getCurrentHabitIndex = state.habits.filter((h, index) => {
        if( h.id.toString() == this.habitId.toString() ){
          state.habits[index].name = this.page.querySelector('ion-input').value.trim();
          state.habits[index].color = this.page.querySelector('#color').value;
        }
      });

      state.habits = state.habits.map(h=>h);
      console.log('updated')
      console.log(state.habits);
      this.router.push('/');
    }else{
      console.log('wrong')
      this.page.querySelector('ion-input').setFocus();
    }

  }

  componentDidLoad(){
    this.page.querySelector('ion-input').setFocus();
  }
  
  render() {
    const getCurrentHabit = state.habits.filter(h => h.id.toString() == this.habitId.toString())[0]
    
    return [
      <ion-header>
        <ion-toolbar>
        </ion-toolbar>
        <ion-toolbar>
        </ion-toolbar>
        <ion-toolbar>
          <ion-title size="large">Edit habits</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <ion-item>
          <ion-label>Habit name</ion-label>
          <ion-input required={true} value={getCurrentHabit.name} placeholder="Drinking water..."></ion-input>
        </ion-item>

        <ion-item>
          <ion-label>Color</ion-label>
          <input id="color" type="color" value={getCurrentHabit.color}></input>
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
