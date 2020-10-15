import { Component, h } from '@stencil/core';

@Component({
  tag: 'new-habit',
  styleUrl: 'new-habit.css',
})
export class NewHabit {

  router = document.querySelector('ion-router')

  viewHome(){
    this.router.push('/', 'backward')
  }

  render() {
    return [
      <ion-header>
        
        <ion-toolbar>
        </ion-toolbar>
        <ion-toolbar>
          <ion-title size="large">New habits</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <ion-item>
          <ion-label>Habit name</ion-label>
          <ion-input placeholder="Drinking water..."></ion-input>
        </ion-item>

        <ion-item>
          <ion-label>Color</ion-label>
          <input id="color" type="color"></input>
        </ion-item>
       <color-picker target="color"/>

        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button color="light">
            <ion-icon name="checkmark-outline"></ion-icon>
          </ion-fab-button>
        </ion-fab>

        <ion-fab vertical="bottom" horizontal="start" slot="fixed">
          <ion-fab-button color="light" onClick={()=> this.viewHome()}>
            <ion-icon name="close-outline"></ion-icon>
          </ion-fab-button>
        </ion-fab>
        
      </ion-content>,
    ];
  }
}
